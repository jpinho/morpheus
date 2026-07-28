export const meta = {
  title: "Ceiling vs. Effort",
  tagline: "Two dials control what a model can do. Neither one fixes a bad diagnosis.",
  pitch:
    "Model choice isn't one dial, it's two: tier sets the ceiling on what the model can do, effort decides how hard it thinks before it hits that ceiling. Get either one wrong and you either overpay for capability the task didn't need, or underpay and hit a wall no amount of thinking gets you past. This talk is the framework for picking both correctly – and the real ticket, run two ways, that proves why the framework isn't optional.",
  description:
    "A framework for choosing AI model tier and effort correctly, proven on a real ticket: $19 and right beats $32 and wrong. Book João Pinho to give the talk.",
};

export const dials = {
  tier: {
    name: "Tier",
    oneLiner: "The ceiling. What the model is capable of, full stop.",
    ladder: "Haiku → Sonnet → Opus → Fable",
    body:
      "Tier is raw capability – reasoning depth, world knowledge, how much state it can hold, how well it follows instructions when the task gets messy. It's fixed per model, not something you can dial up mid-task. A weaker model thinking harder never reaches a stronger model's ceiling; effort can't manufacture capability that isn't there. Pick tier for what the task actually demands, not for what feels safe to reach for.",
  },
  effort: {
    name: "Effort",
    oneLiner: "The deliberation. How hard the model thinks before it answers.",
    ladder: "low → medium → high → xhigh → max",
    body:
      "Effort is thinking tokens – how much the model deliberates before it commits to an answer. It lets a model use the capability it already has; it doesn't add capability that isn't there. And it multiplies the token count, not the rate, so tier and effort compound against your bill rather than just adding to it. max overthinks – it burns budget second-guessing an answer the model already had at high. xhigh is the sweet spot for coding and agentic work. high is the sane default for everything else.",
  },
};

export const decisionTable = [
  {
    situation: "Mechanical, high-volume, fully specified",
    hint: "rename, format, parse, fan-out reads",
    tier: "Haiku",
    effort: "– (no dial)",
  },
  {
    situation: "Most coding, exploration, scoped features",
    hint: "the workhorse – your default",
    tier: "Sonnet 5",
    effort: "medium–high",
  },
  {
    situation: "Hard coding, long-horizon agentic work",
    hint: "multi-file refactors, autonomous loops",
    tier: "Sonnet 5 / Opus 4.8",
    effort: "xhigh",
  },
  {
    situation: "Subtle bug, architecture call, threat model",
    hint: "expensive-if-wrong, path not obvious",
    tier: "Opus 4.8",
    effort: "high–xhigh",
  },
  {
    situation: "The genuinely hardest thing you have",
    hint: "",
    tier: "Fable 5",
    effort: "high+",
  },
];

export const recipe = [
  {
    n: 1,
    name: "Drive",
    text:
      "Keep the main loop in one place, one driver, running at Sonnet @ medium–high. Don't switch the driver mid-task – every handoff costs you the context it took to get there. (Sonnet 5 is on intro pricing – $2 in / $10 out per 1M tokens – through 2026-08-31, so the workhorse tier is temporarily cheaper than its list price.)",
  },
  {
    n: 2,
    name: "Delegate down",
    text:
      "Hand fan-out reads, searches, and mechanical edits to the cheapest tier that can do them – Haiku. Practice context hygiene: distil what the driver ingests from those sub-agents, and compact aggressively. Raw dumps are how you pollute the loop that actually matters.",
  },
  {
    n: 3,
    name: "Escalate up",
    text:
      "Isolate the one genuinely hard sub-problem in the task and hand it to a top tier at high effort. One scalpel, not a blanket – escalating everything balloons the bill without improving the parts that were already fine.",
  },
  {
    n: 4,
    name: "Verify sideways",
    text:
      "Spawn a fresh, independent agent and prompt it to refute the driver's conclusion, not review it. Ask it to prove the finding wrong; a majority-refute kills a bad diagnosis before it ships. This is the step that actually catches a wrong root cause – tier and effort never will.",
  },
  {
    n: 5,
    name: "Judge, don't average",
    text:
      "Run N attempts in parallel and score them, then take the winner outright. Averaging parallel outputs gives you the mush in the middle – the average of a right answer and a wrong one isn't half-right, it's wrong with more words.",
  },
];

export const costTable = [
  {
    model: "Haiku 4.5",
    input: "$1",
    output: "$5",
    relative: "1×",
  },
  {
    model: "Sonnet 5",
    input: "$3",
    output: "$15",
    relative: "3×",
  },
  {
    model: "Opus 4.8",
    input: "$5",
    output: "$25",
    relative: "5×",
  },
  {
    model: "Fable 5",
    input: "$10",
    output: "$50",
    relative: "10×",
  },
];

export const antiPatterns = [
  {
    title: "Top tier, max effort, by reflex",
    body:
      "It's the expensive move and it's often worse than xhigh. max overthinks – it burns tokens second-guessing an answer the model already had at high. Reflexive escalation isn't rigor, it's a tax you pay for not deciding which dial the task actually needs.",
  },
  {
    title: "Averaging parallel outputs instead of judging them",
    body:
      "Run three attempts and blend them and you don't get a better answer, you get the mush in the middle. A right answer averaged with a wrong one isn't half-right, it's wrong with extra words. Score the attempts and take the winner outright.",
  },
  {
    title: "Same-family \"verification\"",
    body:
      "Asking Sonnet to check Sonnet's work checks nothing – same training, same blind spots, same failure modes. Correlated failures pass review together. Tier-diversity is not vendor-diversity; if you want an independent check, get an independent model.",
  },
  {
    title: "Polite review prompts",
    body:
      "'Review this' gets you agreement – models default to confirming whatever's in front of them. Ask it to refute the finding instead; that single change in framing turns a rubber stamp into an actual check.",
  },
  {
    title: "Pasting raw dumps into the driver",
    body:
      "Every unfiltered search result, log, or diff you hand the driver pollutes the context it's reasoning over. Distil first – summarize what a sub-agent found before it goes back into the main loop. A clean loop makes better decisions than a loaded one.",
  },
];

export const benchmark = {
  headline: "$19 and right beats $32 and wrong.",
  solo: {
    label: "Solo – Fable 5, max effort",
    spend: "$32, 31 minutes",
    diagnosis: "Confident and wrong – a clean root-cause theory that wasn't the root cause",
    shipped: "Clean, tested, lint-passing code that fixes nothing",
  },
  orchestrated: {
    label: "Orchestrated – the full recipe",
    spend: "$19",
    diagnosis: "Correct root cause – two adversarial refuters killed the wrong theory before it shipped",
    shipped: "MRs that close the ticket",
  },
  lesson:
    "Same real ticket, run two ways. Tier and effort harden execution – they get you clean code, passing tests, green lint. They do nothing for the diagnosis underneath. Only independence – a second agent instructed to refute, not agree – catches a wrong root cause before it ships. Spend more on a single top-tier pass and you buy confidence, not correctness.",
};

export const skill = {
  name: "Morpheus",
  blurb:
    "Morpheus is the Ceiling vs. Effort framework encoded as a Claude Code skill. It picks tier and effort for the task in front of it, runs the delegate/escalate/verify loop, and – unlike a static prompt – it's self-improving: it reads its own LESSONS.md before it starts and appends to it after, so every run sharpens the next one.",
  emailPrompt:
    "Email is optional – the download works without one. Leave it if you want João to reach you directly with updates to the skill or news on future talks.",
  downloadNote: "Free. No account, no paywall – just the skill.",
};

export const speaker = {
  cta: "Book João Pinho to give this talk.",
  blurb:
    "João Pinho is a Distinguished Engineer at epilot, building energy and utility SaaS. He drives AI-agent orchestration in production – not as a slide, as the job – and this talk is the framework he uses to keep that work correct and affordable at the same time.",
  note:
    "This site is João's speaker entry door – reach out here to get him in front of your team, conference, or meetup.",
};
