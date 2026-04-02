// ─── Portfolio Content Data ───────────────────────────────────────────────────
// Update PROFILE_PHOTO with your actual photo URL or relative path.
// Put your CV PDF at public/Katlego-Malaka-CV.pdf

export const personal = {
  name: 'Katlego Jeffrey Malaka',
  shortName: 'Katlego Malaka',
  initials: 'KM',
  title: 'Future Software Architect',
  tagline: "I build systems that compete nationally.",
  subtitle: 'Final-year CPUT builder · Two-time national competitor · Cape Town, SA',
  email: 'malakakatlego67@gmail.com',
  github: 'https://github.com/KJMalaka',
  githubUsername: 'KJMalaka',
  linkedin: 'https://www.linkedin.com/in/katlego-jeffrey-malaka-820a8726a/',
  location: 'Cape Town, South Africa',
  available: true,
  availabilityNote: 'Open to WIL placement · Available 2026',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
  cvPath: '/Katlego-Malaka-CV.pdf',
};

export const terminalLines = [
  { text: '$ booting katlego.dev...' },
  { text: '$ name: Katlego Jeffrey Malaka' },
  { text: '$ role: Future Software Architect @ CPUT' },
  { text: '$ stack: React · Next.js · TypeScript · Node.js · Java · Python' },
  { text: '$ awards: [2nd] MICT SETA 2026  ·  [2nd] Telkom10X 2025' },
  { text: '$ location: Cape Town, South Africa' },
  { text: '$ status: Seeking WIL 2026 — open to opportunities' },
  { text: '$ _', isCursor: true },
];

export const projects = [
  {
    id: 1,
    title: 'QueUp',
    tagline: 'Civic Tech Queue Management Platform',
    award: '🥈 MICT SETA National Skills Challenge 2026 — Grand Finale, 2nd Place',
    problem: "South Africa's public service queues cost citizens thousands of hours annually.",
    description:
      'Built QueUp to eliminate the wait. Anyone can join, track, and manage civic queues digitally — from clinic visits to Home Affairs — without leaving home. Competed nationally at the MICT SETA Grand Finale and placed 2nd against universities across South Africa.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/QueUp1',
    live: 'https://que-up1-one.vercel.app/',
    category: 'Civic Tech',
    featured: true,
    impact: 'National finalist — MICT SETA 2026',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'SafeRide',
    tagline: 'Emergency Ride-Booking Safety Platform',
    award: '🥈 Telkom10X Hackathon 2025 — 2nd Place',
    problem: 'E-hailing in SA ignores personal safety. Women and vulnerable users have no SOS layer.',
    description:
      'Built in 48 hours at Telkom\'s 10X Hackathon: SafeRide adds a safety-first layer to ride booking — real-time driver tracking, emergency SOS, and trusted-contact alerts. Placed 2nd nationally out of dozens of competing teams.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop',
    github: 'https://github.com/Madondo07/saferide_system',
    live: 'https://saferide-system.vercel.app/booking',
    category: 'Safety Tech',
    featured: true,
    impact: 'Built in 48h — Telkom10X 2025',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'CPUT CampusCare',
    tagline: 'Student Healthcare Booking System',
    award: null,
    problem: 'CPUT students were losing hours queuing at the campus clinic with no way to book ahead.',
    description:
      'Digitised the entire appointment lifecycle for CPUT\'s student clinic — online booking, calendar management, role-based dashboards for students, nurses, and admins, plus automated email confirmations via Nodemailer. Production-deployed on Netlify.',
    tech: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'Netlify'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    github: 'https://github.com/Madondo07/clinic_booking_cput',
    live: 'https://clinicbookingsystem.netlify.app/',
    category: 'Full-Stack',
    featured: false,
    impact: '3 user roles — Student · Nurse · Admin',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'TechHive SA',
    tagline: 'South African Tech E-Commerce Platform',
    award: null,
    problem: 'SA tech buyers lacked a local store with proper filtering, comparison, and wishlist features.',
    description:
      'A full-featured e-commerce store built for the South African market — real-time Firebase inventory sync, dynamic product filters, comparison tool, cart + wishlist, and zero-reload UX. Deployed on GitHub Pages with Firestore as the backend.',
    tech: ['React', 'Firebase', 'Firestore', 'JavaScript', 'GitHub Pages'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/TechHive-SA',
    live: 'https://kjmalaka.github.io/TechHive-SA/',
    category: 'Frontend',
    featured: false,
    impact: 'Real-time Firestore + LocalStorage caching',
    color: 'from-orange-500 to-amber-500',
  },
];

export const achievements = [
  {
    id: 1,
    title: 'MICT SETA National Skills Challenge',
    subtitle: 'Grand Finale',
    position: '2nd Place',
    year: '2026',
    project: 'QueUp — Civic Tech Queue Management',
    projectUrl: 'https://que-up1-one.vercel.app/',
    description:
      'Competed at national level against universities and colleges across South Africa. QueUp tackled one of SA\'s most persistent civic problems — public service queues — and made the Grand Finale, placing 2nd nationally.',
    team: [
      'Olebogeng Mokwena',
      'Hlomla Magopeni',
      'Phemelo Molefi',
      'Nonkuleko Shabangu',
    ],
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    icon: '🏆',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 2,
    title: 'Telkom10X Hackathon',
    subtitle: 'National Hackathon',
    position: '2nd Place',
    year: '2025',
    project: 'SafeRide — Emergency Ride Safety Platform',
    projectUrl: 'https://saferide-system.vercel.app/booking',
    description:
      '48 hours. One problem. SafeRide was built from zero to deployed — a safety-first ride booking platform targeting the gap between e-hailing convenience and personal safety in South Africa.',
    team: [
      'Milani Sani',
      'Dumisane Madondo',
      'Phelo Mguca',
      'Hlomla Magopeni',
    ],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    icon: '⚡',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
];

export const skills = {
  primary: {
    label: 'Primary Stack',
    icon: '⚛️',
    color: 'blue',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    items: [
      { name: 'React', context: '5+ projects shipped' },
      { name: 'Next.js', context: 'SSR + API routes' },
      { name: 'TypeScript', context: 'Type-safe codebases' },
      { name: 'JavaScript', context: 'ES6+ proficient' },
      { name: 'Tailwind CSS', context: 'Production UI design' },
    ],
  },
  backend: {
    label: 'Backend & Languages',
    icon: '⚙️',
    color: 'green',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    items: [
      { name: 'Node.js', context: 'REST APIs + auth systems' },
      { name: 'Express.js', context: 'Used in 3 projects' },
      { name: 'Java', context: 'OOP + data structures' },
      { name: 'PHP / Laravel', context: 'MVC + Eloquent ORM' },
      { name: 'Python', context: 'Scripting + automation' },
    ],
  },
  data: {
    label: 'Databases',
    icon: '🗄️',
    color: 'purple',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    items: [
      { name: 'MySQL', context: 'Relational schema design' },
      { name: 'PostgreSQL', context: 'Used in QueUp (award-winning)' },
      { name: 'Firebase / Firestore', context: 'Real-time sync, TechHive SA' },
      { name: 'MongoDB', context: 'Document stores' },
    ],
  },
  devops: {
    label: 'DevOps & Tooling',
    icon: '🚀',
    color: 'cyan',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    items: [
      { name: 'GitHub Actions', context: 'CI/CD pipelines' },
      { name: 'Docker', context: 'Containerisation' },
      { name: 'Vercel', context: '2 live productions deployed' },
      { name: 'Netlify', context: 'Static + serverless hosting' },
      { name: 'Git', context: 'Daily version control' },
    ],
  },
};

export const aiSystemPrompt = `You are an AI assistant embedded in Katlego Malaka's developer portfolio. Answer recruiter and developer questions about Katlego naturally, confidently, and helpfully. Keep answers concise (2-4 sentences max). Be enthusiastic but professional.

ABOUT KATLEGO:
- Full name: Katlego Jeffrey Malaka
- Location: Cape Town, South Africa
- Education: Final-year Diploma in ICT: Application Development at CPUT (Cape Peninsula University of Technology)
- Career goal: Software Architect
- Currently seeking: WIL (Work Integrated Learning) placement for 2026

ACHIEVEMENTS:
- 2nd Place, MICT SETA National Skills Challenge 2026 (Grand Finale) — QueUp civic tech queue management app
  Team: Olebogeng Mokwena, Hlomla Magopeni, Phemelo Molefi, Nonkuleko Shabangu
- 2nd Place, Telkom10X Hackathon 2025 — SafeRide emergency ride safety platform (built in 48 hours)
  Team: Milani Sani, Dumisane Madondo, Phelo Mguca, Hlomla Magopeni

TECH STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, Java, PHP, Python, Laravel
- Databases: MySQL, PostgreSQL, Firebase/Firestore, MongoDB
- DevOps: GitHub Actions, Docker, Vercel, Netlify

PROJECTS:
1. QueUp — Civic tech queue management (React, Node.js, PostgreSQL) — AWARD-WINNING — https://que-up1-one.vercel.app/
2. SafeRide — Emergency ride booking built in 48h hackathon (React, Node.js, MySQL) — https://saferide-system.vercel.app/booking
3. CPUT CampusCare — Student healthcare booking system (Node.js, MySQL, Express) — https://clinicbookingsystem.netlify.app/
4. TechHive SA — E-commerce platform with real-time Firebase (React, Firestore) — https://kjmalaka.github.io/TechHive-SA/

CONTACT: malakakatlego67@gmail.com | github.com/KJMalaka | linkedin.com/in/katlego-jeffrey-malaka-820a8726a

If asked about salary/compensation, say to contact Katlego directly at malakakatlego67@gmail.com. If asked about availability, Katlego is actively seeking WIL placement for 2026 in Cape Town or remotely.`;
