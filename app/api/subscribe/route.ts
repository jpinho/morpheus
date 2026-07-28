import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Strict enough to reject markup, control chars, and obvious junk. We are not
// verifying deliverability — just making sure only plausible addresses are stored,
// so an export to a sheet can't carry a `<script>` or `=FORMULA` payload.
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const MAX_BODY = 2048; // a signup is tiny; anything bigger is abuse

// Best-effort in-memory rate limit. Serverless instances are ephemeral and not
// shared, so this stops casual single-source floods — NOT a distributed attack.
// Real protection needs a shared store (KV) or the platform firewall; see README.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory bound against unbounded growth
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a real person never fills the hidden "website" field; bots do.
  // Pretend success and store nothing.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const consent = raw.consent === true;
  const source = typeof raw.source === "string" ? raw.source.slice(0, 40) : "site";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: "storage_unconfigured" }, { status: 500 });
  }

  // Minimal record — email, timestamp, and where the submit came from. No
  // user-agent or referer: nothing to disclose beyond the email itself.
  const ts = new Date().toISOString();
  const record = { email, ts, source };
  const id = `${ts.replace(/[:.]/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;

  try {
    await put(`signups/${id}.json`, JSON.stringify(record), {
      access: "private",
      token,
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "store_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
