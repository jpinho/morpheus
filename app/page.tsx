import SignupDownload from "@/components/SignupDownload";
import {
  antiPatterns,
  benchmark,
  costTable,
  decisionTable,
  dials,
  meta,
  recipe,
} from "@/lib/content";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="eyebrow block">
        <span className="text-dim/60">{"// "}</span>
        {eyebrow}
      </span>
      <h2 className="display mt-3 inline-block border-b-[3px] border-ceiling pb-2 text-3xl text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function TermWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">{title}</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function LogRow({
  mark,
  ok,
  label,
  value,
}: {
  mark: string;
  ok: boolean;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 py-1">
      <span className={ok ? "text-ok" : "text-ceiling"}>{mark}</span>
      <span className="w-20 shrink-0 text-dim">{label}</span>
      <span className="text-ink/90">{value}</span>
    </div>
  );
}

// node colors encode the direction of each move: down = cheap/dim,
// up = ceiling red, sideways = effort blue, judge = green
const traceColor = ["border-ink/60", "border-dim", "border-ceiling", "border-effort", "border-ok"];

export default function Home() {
  return (
    <main className="text-ink">
      {/* header */}
      <header className="sticky top-0 z-10 border-b border-rule bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="font-serif text-lg font-semibold tracking-tightish">
            <span className="text-ceiling">Ceiling</span>{" "}
            <span className="italic text-dim">vs.</span>{" "}
            <span className="text-effort">Effort</span>
          </a>
          <nav className="hidden gap-6 font-mono text-[13px] text-dim sm:flex">
            <a href="#framework" className="transition hover:text-ink">framework</a>
            <a href="#recipe" className="transition hover:text-ink">recipe</a>
            <a href="#skill" className="transition hover:text-ink">skill</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-16 sm:pt-24">
          <p className="font-mono text-sm text-dim">
            <span className="text-effort">~</span> $ how to actually drive AI agents
            <span className="caret" aria-hidden />
          </p>
          <h1 className="display mt-6 text-5xl leading-[1.05] sm:text-7xl">
            <span className="text-ceiling">Ceiling</span>{" "}
            <span className="italic font-normal text-dim">vs.</span>{" "}
            <span className="text-effort">Effort</span>
          </h1>
          <p className="mt-5 font-serif text-2xl text-ink/90 sm:text-3xl">{meta.tagline}</p>
          <p className="mt-6 max-w-readable text-lg leading-relaxed text-ink/75">{meta.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#skill"
              className="rounded-md bg-ceiling px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Get the skill
            </a>
            <a
              href="#framework"
              className="rounded-md border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              See the framework
            </a>
          </div>
        </div>
      </section>

      {/* benchmark band — the proof, as two session logs */}
      <section className="border-y border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="display text-3xl text-ink sm:text-4xl">{benchmark.headline}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <TermWindow title="orchestrated – the full recipe">
              <LogRow mark="$" ok label="spend" value={benchmark.orchestrated.spend} />
              <LogRow mark="✓" ok label="diagnosis" value={benchmark.orchestrated.diagnosis} />
              <LogRow mark="✓" ok label="shipped" value={benchmark.orchestrated.shipped} />
              <div className="mt-3 border-t border-rule pt-2 text-ok">exit 0</div>
            </TermWindow>
            <TermWindow title="solo – fable-5 @ max">
              <LogRow mark="$" ok={false} label="spend" value={benchmark.solo.spend} />
              <LogRow mark="✗" ok={false} label="diagnosis" value={benchmark.solo.diagnosis} />
              <LogRow mark="✗" ok={false} label="shipped" value={benchmark.solo.shipped} />
              <div className="mt-3 border-t border-rule pt-2 text-ceiling">exit 1</div>
            </TermWindow>
          </div>
          <p className="mt-6 max-w-readable text-[15px] leading-relaxed text-ink/60">
            {benchmark.lesson}
          </p>
        </div>
      </section>

      {/* framework: two dials */}
      <section id="framework" className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading eyebrow="the mental model" title="Two dials, not one" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[dials.tier, dials.effort].map((d, i) => (
            <div key={d.name} className="rounded-lg border border-rule bg-panel p-6">
              <span className={`font-mono text-xs ${i === 0 ? "text-ceiling" : "text-effort"}`}>
                dial 0{i + 1}
              </span>
              <h3 className={`display mt-2 text-xl ${i === 0 ? "text-ceiling" : "text-effort"}`}>
                {d.name}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-dim">{d.oneLiner}</p>
              <p className="mt-3 font-mono text-sm text-ink/70">{d.ladder}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{d.body}</p>
            </div>
          ))}
        </div>

        {/* decision table */}
        <div className="mt-14">
          <span className="eyebrow">
            <span className="text-dim/60">{"// "}</span>the cheatsheet
          </span>
          <h3 className="display mt-2 text-2xl">Pick tier and effort</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink/40 text-left">
                  <th className="py-2 pr-4 font-mono text-xs font-normal text-dim">situation</th>
                  <th className="py-2 pr-4 font-mono text-xs font-normal text-dim">tier</th>
                  <th className="py-2 font-mono text-xs font-normal text-dim">effort</th>
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
          <span className="eyebrow">
            <span className="text-dim/60">{"// "}</span>what it costs
          </span>
          <h3 className="display mt-2 text-2xl">Per 1M tokens</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink/40 text-left">
                  <th className="py-2 pr-4 font-mono text-xs font-normal text-dim">model</th>
                  <th className="py-2 pr-4 text-right font-mono text-xs font-normal text-dim">input</th>
                  <th className="py-2 pr-4 text-right font-mono text-xs font-normal text-dim">output</th>
                  <th className="py-2 text-right font-mono text-xs font-normal text-dim">relative</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {costTable.map((r) => (
                  <tr key={r.model} className="border-b border-rule">
                    <td className="py-3 pr-4 font-sans font-semibold">{r.model}</td>
                    <td className="py-3 pr-4 text-right text-ink/85">{r.input}</td>
                    <td className="py-3 pr-4 text-right text-ink/85">{r.output}</td>
                    <td className="py-3">
                      <span className="flex items-center justify-end gap-3">
                        <span
                          aria-hidden
                          className="h-1.5 rounded-full bg-gradient-to-r from-effort to-ceiling"
                          style={{ width: `${parseFloat(r.relative) * 8}px` }}
                        />
                        {r.relative}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-dim">Effort multiplies the token count, not the rate – the two dials compound.</p>
        </div>
      </section>

      {/* recipe — rendered as an agent trace */}
      <section id="recipe" className="border-t border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionHeading eyebrow="the workflow" title="One shape, always" />
          <ol className="ml-2 space-y-9 border-l border-rule sm:ml-3">
            {recipe.map((m, i) => (
              <li key={m.n} className="relative pl-8 sm:pl-10">
                <span
                  aria-hidden
                  className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-paper ${traceColor[i]}`}
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  <span className="font-mono text-xs text-dim">{m.n}/5</span>
                  <h3 className="font-semibold text-ink">{m.name}</h3>
                  <span className="chip">{m.agent}</span>
                </div>
                <p className="mt-2 max-w-readable text-[15px] leading-relaxed text-ink/75">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* anti-patterns */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading eyebrow="what not to do" title="Anti-patterns" />
        <ul className="grid gap-5 sm:grid-cols-2">
          {antiPatterns.map((a) => (
            <li key={a.title} className="flex gap-3">
              <span aria-hidden className="mt-0.5 font-mono text-ceiling">✗</span>
              <p className="text-[15px] leading-relaxed">
                <span className="font-semibold text-ink">{a.title}.</span>{" "}
                <span className="text-ink/70">{a.body}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* skill download */}
      <section id="skill" className="border-t border-rule bg-tint">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <SectionHeading eyebrow="take it home" title="The skill" />
          <div className="max-w-2xl">
            <SignupDownload />
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-dim sm:flex-row sm:items-center">
          <span>
            <span className="text-ceiling">Ceiling</span> <span className="italic">vs.</span>{" "}
            <span className="text-effort">Effort</span> · João Pinho
          </span>
          <span className="font-mono text-xs">two dials · one workflow</span>
        </div>
      </footer>
    </main>
  );
}
