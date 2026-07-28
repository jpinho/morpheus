import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Basic, deliberately permissive email shape check. We are not verifying
// deliverability — just rejecting obvious junk before it hits storage.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const consent = raw.consent === true;
  const source = typeof raw.source === "string" ? raw.source.slice(0, 80) : "site";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  // Email is optional on the site, but if someone submits one we require the
  // consent box — that's the lawful basis for contacting them later.
  if (!consent) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: "storage_unconfigured" }, { status: 500 });
  }

  const ts = new Date().toISOString();
  const record = {
    email,
    source,
    ts,
    ua: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    ref: req.headers.get("referer")?.slice(0, 300) ?? null,
  };
  const id = `${ts.replace(/[:.]/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;

  try {
    // access: "private" — signups require the store token to read. Never public.
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
