"use client";

import { useState } from "react";
import { skill } from "@/lib/content";

const SKILL_FILE = "/morpheus-skill.zip";

export default function SignupDownload() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (!consent) {
      setState("error");
      setMsg("Tick the box so I know it's OK to email you.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent, source: "download" }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("done");
        setMsg("Got it — I'll ping you when the skill improves.");
      } else {
        setState("error");
        setMsg(
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : "Something broke on my end. The download still works.",
        );
      }
    } catch {
      setState("error");
      setMsg("Couldn't reach the server. The download still works.");
    }
  }

  return (
    <div className="rounded-lg border border-rule bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <span className="eyebrow">Get the skill</span>
        <h3 className="display text-2xl text-ink">{skill.name}</h3>
      </div>
      <p className="mt-3 max-w-readable text-[15px] leading-relaxed text-ink/80">
        {skill.blurb}
      </p>

      {/* Download is free and unconditional. */}
      <div className="mt-5">
        <a
          href={SKILL_FILE}
          download
          className="inline-flex items-center gap-2 rounded-md bg-ceiling px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          ↓ Download the skill
        </a>
        <p className="mt-2 text-xs text-dim">{skill.downloadNote}</p>
      </div>

      {/* Optional email — clearly framed, never required. */}
      <div className="mt-7 border-t border-rule pt-6">
        {state === "done" ? (
          <p className="text-sm font-medium text-effort">{msg}</p>
        ) : (
          <form onSubmit={submitEmail} className="flex flex-col gap-3">
            <label className="text-sm text-ink/80" htmlFor="email">
              {skill.emailPrompt}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-rule bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-effort focus:ring-1 focus:ring-effort sm:max-w-xs"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-md border border-effort px-5 py-2.5 text-sm font-semibold text-effort transition hover:bg-effortbg disabled:opacity-50"
              >
                {state === "sending" ? "Sending…" : "Keep me posted"}
              </button>
            </div>
            <label className="flex items-start gap-2 text-xs text-dim">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-effort"
              />
              <span>
                Email me updates about the skill and future talks. No spam, unsubscribe
                anytime. Optional — the download above needs none of this.
              </span>
            </label>
            {state === "error" && <p className="text-xs text-ceiling">{msg}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
