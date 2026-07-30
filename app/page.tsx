import SignupDownload from "@/components/SignupDownload";
import {
  antiPatterns,
  benchmark,
  costTable,
  decisionTable,
  dials,
  meta,
  recipe,
  speaker,
} from "@/lib/content";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="eyebrow block">{eyebrow}</span>
      <h2 className="display mt-3 inline-block border-b-[3px] border-ceiling pb-2 text-3xl text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="text-ink">
      {/* header */}
      <header className="sticky top-0 z-10 border-b border-rule bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="font-serif text-lg font-semibold tracking-tightish">
            <span className="text-ceiling">Ceiling</span>{" "}
            <span className="italic text-dim">vs.</span>{" "}
            <span className="text-effort">Effort</span>
          </a>
          <nav className="hidden gap-6 text-sm text-dim sm:flex">
            <a href="#framework" className="hover:text-ink">Framework</a>
            <a href="#recipe" className="hover:text-ink">Recipe</a>
            <a href="#skill" className="hover:text-ink">Skill</a>
            <a href="#speak" className="hover:text-ink">Speak</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:pt-24">
        <h1 className="display text-5xl leading-[1.05] sm:text-7xl">
          <span className="text-ceiling">Ceiling</span>{" "}
          <span className="italic font-normal text-dim">vs.</span>{" "}
          <span className="text-effort">Effort</span>
        </h1>
        <p className="mt-5 font-serif text-2xl text-ink/90 sm:text-3xl">{meta.tagline}</p>
        <p className="mt-6 max-w-readable text-lg leading-relaxed text-ink/80">{meta.pitch}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#skill"
            className="rounded-md bg-ceiling px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Get the skill
          </a>
          <a
            href="#speak"
            className="rounded-md border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/50"
          >
            Book the talk
          </a>
        </div>
      </section>

      {/* benchmark band — the proof */}
      <section className="border-y border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="display text-3xl text-ink sm:text-4xl">{benchmark.headline}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[benchmark.orchestrated, benchmark.solo].map((c) => (
              <div key={c.label} className="rounded-lg border border-rule bg-white p-6">
                <span className="eyebrow">{c.label}</span>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-dim">Spend</dt>
                    <dd className="text-right font-mono">{c.spend}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-dim">Diagnosis</dt>
                    <dd className="text-right">{c.diagnosis}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-dim">Shipped</dt>
                    <dd className="text-right">{c.shipped}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-readable text-[15px] leading-relaxed text-ink/70">
            {benchmark.lesson}
          </p>
        </div>
      </section>

      {/* framework: two dials */}
      <section id="framework" className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading eyebrow="The mental model" title="Two dials, not one" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[dials.tier, dials.effort].map((d, i) => (
            <div key={d.name} className="rounded-lg border border-rule p-6">
              <div
                className="h-[3px] w-10 rounded"
                style={{ background: i === 0 ? "#8c1d2c" : "#2f4a85" }}
              />
              <h3 className="display mt-4 text-xl" style={{ color: i === 0 ? "#8c1d2c" : "#2f4a85" }}>
                {d.name}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-dim">{d.oneLiner}</p>
              <p className="mt-3 font-mono text-sm text-ink/70">{d.ladder}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{d.body}</p>
            </div>
          ))}
        </div>

        {/* decision table */}
        <div className="mt-14">
          <span className="eyebrow">The cheatsheet</span>
          <h3 className="display mt-2 text-2xl">Pick tier and effort</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th className="py-2 pr-4 font-sans text-xs font-bold uppercase tracking-widest text-dim">Situation</th>
                  <th className="py-2 pr-4 font-sans text-xs font-bold uppercase tracking-widest text-dim">Tier</th>
                  <th className="py-2 font-sans text-xs font-bold uppercase tracking-widest text-dim">Effort</th>
                </tr>
              </thead>
              <tbody>
                {decisionTable.map((r) => (
                  <tr key={r.situation} className="border-b border-rule align-top">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{r.situation}</div>
                      {r.hint && <div className="text-xs text-dim">{r.hint}</div>}
                    </td>
                    <td className="py-3 pr-4 font-semibold">{r.tier}</td>
                    <td className="py-3">
                      <span className="chip">{r.effort}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* cost table */}
        <div className="mt-14">
          <span className="eyebrow">What it costs</span>
          <h3 className="display mt-2 text-2xl">Per 1M tokens</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th className="py-2 pr-4 font-sans text-xs font-bold uppercase tracking-widest text-dim">Model</th>
                  <th className="py-2 pr-4 text-right font-sans text-xs font-bold uppercase tracking-widest text-dim">Input</th>
                  <th className="py-2 pr-4 text-right font-sans text-xs font-bold uppercase tracking-widest text-dim">Output</th>
                  <th className="py-2 text-right font-sans text-xs font-bold uppercase tracking-widest text-dim">Relative</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {costTable.map((r) => (
                  <tr key={r.model} className="border-b border-rule">
                    <td className="py-3 pr-4 font-sans font-semibold">{r.model}</td>
                    <td className="py-3 pr-4 text-right">{r.input}</td>
                    <td className="py-3 pr-4 text-right">{r.output}</td>
                    <td className="py-3 text-right">{r.relative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-dim">Effort multiplies the token count, not the rate – the two dials compound.</p>
        </div>
      </section>

      {/* recipe */}
      <section id="recipe" className="border-t border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionHeading eyebrow="The workflow" title="One shape, always" />
          <ol className="space-y-5">
            {recipe.map((m) => (
              <li key={m.n} className="flex gap-4">
                <span className="mt-1 font-mono text-sm font-bold text-ceiling">{m.n}</span>
                <p className="text-[15px] leading-relaxed text-ink/85">
                  <span className="font-semibold text-ink">{m.name}</span> – {m.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* anti-patterns */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading eyebrow="What not to do" title="Anti-patterns" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {antiPatterns.map((a) => (
            <li key={a.title} className="border-l-2 border-ceiling pl-4">
              <span className="font-semibold">{a.title}.</span>{" "}
              <span className="text-ink/75">{a.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* skill download */}
      <section id="skill" className="border-t border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionHeading eyebrow="Take it home" title="The skill" />
          <div className="max-w-2xl">
            <SignupDownload />
          </div>
        </div>
      </section>

      {/* speaker */}
      <section id="speak" className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading eyebrow="For organisers" title={speaker.cta} />
        <p className="max-w-readable text-lg leading-relaxed text-ink/85">{speaker.blurb}</p>
        <p className="mt-4 max-w-readable text-[15px] text-dim">{speaker.note}</p>
        <a
          href="mailto:j.pinho@epilot.cloud?subject=Ceiling%20vs.%20Effort%20talk"
          className="mt-6 inline-block rounded-md bg-effort px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Invite me to speak
        </a>
      </section>

      {/* footer */}
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-dim sm:flex-row sm:items-center">
          <span>
            <span className="text-ceiling">Ceiling</span> <span className="italic">vs.</span>{" "}
            <span className="text-effort">Effort</span> · João Pinho
          </span>
          <span className="text-xs">Two dials. One workflow.</span>
        </div>
      </footer>
    </main>
  );
}
