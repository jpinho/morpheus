export const meta = {
  title: "Ceiling vs. Effort",
  tagline: "Two dials decide what an AI agent can do. Neither one fixes a bad diagnosis.",
  pitch:
    "Tier is the ceiling on what a model can do. Effort is how hard it thinks under that ceiling. Get the tier wrong and no amount of thinking saves you; get the effort wrong and you either overpay or stall. This is how to set both – with a real ticket, run two ways, that shows what it's worth.",
  description:
    "A framework for choosing AI model tier and effort, proven on one real ticket: $19 and right beats $32 and wrong.",
};

export const dials = {
  tier: {
    name: "Tier",
    oneLiner: "The ceiling. What the model can do.",
    ladder: "Haiku → Sonnet → Opus → Fable",
    body:
      "Raw capability: reasoning, world knowledge, how much state it holds, how well it follows instructions when the task gets messy. It's fixed per model – you can't dial it up mid-task. A weaker model thinking harder never reaches a stronger one's ceiling. Pick tier for what the task demands, not for what feels safe.",
  },
  effort: {
    name: "Effort",
    oneLiner: "The deliberation. How hard the model thinks before it answers.",
    ladder: "low → medium → high → xhigh → max",
    body:
      "Thinking tokens – how much the model works before it commits to an answer. It uses the capability the model already has; it can't add capability that isn't there. And it multiplies the token count, not the rate, so tier and effort compound on your bill. max overthinks – it burns tokens second-guessing an answer it already had at high. xhigh is the sweet spot for coding and agentic work; high is the default for everything else.",
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
      "Keep the main loop in one place, one driver, at Sonnet @ medium–high. Don't switch drivers mid-task – every handoff costs the context it took to build. (Sonnet 5 is on intro pricing, $2 in / $10 out per 1M tokens, through 2026-08-31.)",
  },
  {
    n: 2,
    name: "Delegate down",
    text:
      "Hand fan-out reads, searches, and mechanical edits to the cheapest tier that can do them – Haiku. Keep the driver's context clean: distil what comes back from sub-agents, and compact aggressively. Raw dumps pollute the loop that matters.",
  },
  {
    n: 3,
    name: "Escalate up",
    text:
      "Isolate the one genuinely hard sub-problem and give it to a top tier at high effort. One scalpel, not a blanket – escalating everything runs up the bill without improving the parts that were already fine.",
  },
  {
    n: 4,
    name: "Verify sideways",
    text:
      "Spawn a fresh, independent agent and tell it to refute the driver's conclusion, not review it. A majority-refute kills a bad diagnosis before it ships. This is the step that catches a wrong root cause – tier and effort never will.",
  },
  {
    n: 5,
    name: "Judge, don't average",
    text:
      "Run N attempts in parallel, score them, and take the winner. Averaging blends the right answer with the wrong ones and leaves you with neither.",
  },
];

export const costTable = [
  { model: "Haiku 4.5", input: "$1", output: "$5", relative: "1×" },
  { model: "Sonnet 5", input: "$3", output: "$15", relative: "3×" },
  { model: "Opus 4.8", input: "$5", output: "$25", relative: "5×" },
  { model: "Fable 5", input: "$10", output: "$50", relative: "10×" },
];

export const antiPatterns = [
  {
    title: "Top tier, max effort, by reflex",
    body:
      "The expensive move, and often worse than xhigh: max burns tokens second-guessing an answer the model already had at high. Reaching for the top by default just means you didn't decide which dial the task needed.",
  },
  {
    title: "Averaging parallel outputs instead of judging them",
    body:
      "Blend three attempts and you don't get a better answer – you drag the good one toward the wrong ones. Score them and take the winner.",
  },
  {
    title: 'Same-family "verification"',
    body:
      "Sonnet checking Sonnet checks nothing – same training, same blind spots, failures that pass together. Tier-diversity is not vendor-diversity: for a real check, use a different model.",
  },
  {
    title: "Polite review prompts",
    body:
      '"Review this" gets agreement – models default to confirming what\'s in front of them. Ask it to refute the finding instead. That one change turns a rubber stamp into a real check.',
  },
  {
    title: "Pasting raw dumps into the driver",
    body:
      "Every unfiltered search result, log, or diff you paste in pollutes the context the driver reasons over. Distil first – summarise what a sub-agent found before it goes back in.",
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
    "Same ticket, two ways. Tier and effort harden execution – clean code, passing tests, green lint. They do nothing for the diagnosis underneath. Only independence – a second agent told to refute, not agree – catches a wrong root cause before it ships. A bigger solo pass buys confidence, not correctness.",
};

export const skill = {
  name: "Morpheus",
  blurb:
    "The Ceiling vs. Effort framework as a Claude Code skill. It picks tier and effort for the task in front of it and runs the delegate / escalate / verify loop. Unlike a static prompt, it's self-improving: it reads its own LESSONS.md before it starts and appends to it after, so each run sharpens the next.",
  emailPrompt:
    "Email is optional – the download works without one. Leave it if you want João to reach you with updates to the skill or future talks.",
  downloadNote: "Free. No account, no sign-up – just the skill.",
};
