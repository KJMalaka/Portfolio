// Deep-dive content for the three flagship builds. Each page argues the
// engineering decisions behind the project, not just the feature list —
// what was rejected, what broke, and what would change with hindsight.

export const caseStudies = {
  queup: {
    slug: 'queup',
    title: 'QueUp',
    tagline: 'Civic Tech Queue Management Platform',
    award: '2nd Place — MICT SETA National Skills Challenge 2026 (Western Cape Regional)',
    diagram: '/queup-architecture.svg',
    github: 'https://github.com/KJMalaka/QueUp1',
    live: 'https://que-up1.vercel.app/',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'WebSockets', 'Vercel'],
    problem:
      "South Africa's public service queues cost citizens thousands of hours — clinics, Home Affairs, and government offices run on paper, first-come-first-served lines. The constraint wasn't just technical: we had a fixed competition timeline, a 4-person team, and had to demo a real-time system convincingly against teams from other universities, not just describe one.",
    architecture:
      "React frontend talking to a Node/Express API over both REST (actions: join, leave, admin operations) and WebSockets (live position updates), backed by PostgreSQL. The API is the single source of truth for queue state — clients don't compute their own position from stale local data, they receive it. PostgreSQL over a document store because queue position, role assignment, and notification state all need relational integrity: losing someone's place in a queue isn't an acceptable edge case to debug in production.",
    rejected: [
      {
        option: 'Firebase Realtime Database / Firestore for the real-time layer',
        why: "Would have given us real-time sync almost for free, but queue position and role-based access needed relational constraints and transactional guarantees that a document store makes awkward — we'd have been fighting the database instead of using it.",
      },
      {
        option: 'Client-side polling instead of WebSockets',
        why: 'Simpler to build under time pressure, but polling intervals either feel laggy (long interval) or hammer the API (short interval). A live queue needs to feel live — WebSockets push state the moment it changes.',
      },
    ],
    brokeAndFixed:
      "Early on, two people joining the same queue slot within milliseconds of each other could both succeed — the check-then-insert happened in application code, so both requests read 'slot available' before either write landed. Moving the uniqueness guarantee down to a database-level constraint fixed it at the source instead of trying to catch every race condition in application logic.",
    wouldChange:
      "For anything beyond a single-instance demo, WebSocket connections need a pub/sub layer (Redis, most likely) so state changes reach clients connected to a different server instance. We'd also add integration tests specifically for concurrent join/leave sequences — the kind of bug that only shows up under real concurrent load, not manual testing.",
    validation:
      "Placed 2nd in the Western Cape regional round of the MICT SETA National Skills Challenge 2026, competing against top universities and colleges across the province.",
  },

  bathobank: {
    slug: 'bathobank',
    title: 'BathoBank',
    tagline: 'Core Banking Backend with Domain-Driven Design',
    award: null,
    diagram: '/bathobank-architecture.svg',
    github: 'https://github.com/KJMalaka/BathoBank',
    live: null,
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'JUnit 5', 'React'],
    problem:
      "Coursework required a production-style core banking system, not a toy CRUD app — something that actually demonstrates domain modelling, transactional integrity, and layered architecture the way a real fintech backend would need to. That meant the bar wasn't 'does it work' but 'would this survive contact with a code review at a bank.'",
    architecture:
      "A strict Controller → Service → Factory → Repository → Domain layering across 10 domain entities — customers, accounts, transactions, cards, branches, beneficiaries, KYC documents. A transfer generates two linked transaction records (debit + credit) written inside one transactional boundary, so either both land or neither does. Deposits, withdrawals, and card issuance are covered by JUnit 5 tests across all four layers, not just the service layer where most projects stop.",
    rejected: [
      {
        option: 'A flatter architecture — Controller calling Repository directly for simple operations',
        why: "Faster to write, but it hides where business rules live and makes it easy to bypass validation for 'just this one case.' Banking logic needs one place where the rules are enforced, not several places that each hope the others did it right.",
      },
      {
        option: 'A NoSQL store for flexibility',
        why: 'Accounts, transactions, and beneficiaries are inherently relational — foreign keys and ACID transactions across tables are exactly what banking data needs, not something to route around.',
      },
    ],
    brokeAndFixed:
      "An early version of the transfer logic wrote the debit and credit as two separate save() calls outside a shared transaction. An exception thrown between the two calls left a debit posted with no matching credit — money vanishing from the model. Wrapping both writes in a single @Transactional boundary with rollback-on-failure closed that gap.",
    wouldChange:
      "Add idempotency keys so a retried request (client timeout, double-click) can't submit the same transfer twice. Also extend testing past JUnit unit coverage into integration tests that spin up a real database, since unit tests with mocked repositories can pass while the actual SQL constraints still fail.",
    validation:
      "Full JUnit 5 test coverage across all four architectural layers — the kind of coverage most student projects stop short of once the happy path works.",
  },

  'ikhono-ai': {
    slug: 'ikhono-ai',
    title: 'Ikhono AI',
    tagline: 'AI Roadmaps Turning Skills Into Income',
    award: null,
    diagram: '/ikhono-architecture.svg',
    github: 'https://github.com/KJMalaka/IkhonoAI',
    live: 'https://ikhono-ai.vercel.app',
    tech: ['React', 'Vite', 'FastAPI', 'Supabase', 'Groq', 'Tavily'],
    problem:
      "South African youth with real skills — gaming, DJing, art — have no grounded way to know which monetisation path actually works right now. Platform payout thresholds, algorithm rules, and what's 'working' on a given platform shift constantly — a model answering purely from its training data would confidently give stale advice.",
    architecture:
      "React/Vite frontend, FastAPI backend, Groq for fast LLM inference, Tavily for live web search at request time, Supabase for auth, persistence, and Row Level Security. A user describes a skill and income goal; the backend classifies the skill and stage (zero income through sponsorship-ready), then ranks and generates roadmap steps enriched with a live search result and a source link for each step — not just a model's opinion.",
    rejected: [
      {
        option: "Answering purely from the model's training data, no live search",
        why: 'Cheaper and simpler, but the entire value proposition is currency — a roadmap that confidently cites a payout threshold that changed six months ago is worse than no roadmap.',
      },
      {
        option: 'A single shared table for roadmaps without Row Level Security',
        why: "Roadmaps are personal financial-ish plans. RLS had to be there from the first migration, not bolted on later once 'it works' — retrofitting access control onto live data is how leaks happen.",
      },
    ],
    brokeAndFixed:
      "Early on, when the live search returned thin or irrelevant results for a niche skill, the model would still generate a confident-sounding step with no real source behind it. The fix was a fallback: if grounding is weak, the step gets flagged as unverified in the UI instead of being presented with the same confidence as a sourced one.",
    wouldChange:
      "Cache results for repeated skill/stage combinations — right now every request re-runs the full search + classification pipeline even for common queries, which costs latency and API spend it doesn't need to. Also add a lightweight feedback control so users can flag a step that looks stale, closing the loop instead of relying on us to notice.",
    validation:
      "Live and in use at ikhono-ai.vercel.app — the only one of the three flagship builds still actively deployed and reachable end-to-end (behind sign-in).",
  },
};

export const caseStudySlugs = Object.keys(caseStudies);
