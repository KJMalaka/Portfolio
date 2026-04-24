// ─── Portfolio Content Data ───────────────────────────────────────────────────
// Update PROFILE_PHOTO with your actual photo URL or relative path.
// Put your CV PDF at public/Katlego-Malaka-CV.pdf

export const personal = {
  name: 'Katlego Jeffrey Malaka',
  shortName: 'Katlego Malaka',
  initials: 'KM',
  title: 'Full Stack Developer',
  tagline: "I build systems that compete nationally.",
  subtitle: 'Full Stack Developer · Final-year CPUT · Two-time award winner · Cape Town, SA',
  email: 'malakakatlego67@gmail.com',
  github: 'https://github.com/KJMalaka',
  githubUsername: 'KJMalaka',
  linkedin: 'https://www.linkedin.com/in/katlego-jeffrey-malaka-820a8726a/',
  location: 'Cape Town, South Africa',
  available: true,
  availabilityNote: 'Open to WIL placement · Available 2026',
  // Save your photo to public/katlego.jpg — instruction already sent
  photo: '/katlego.jpeg',
  cvPath: '/Katlego_Malaka CV.pdf',
};

export const terminalLines = [
  { text: '$ booting katlego.dev...' },
  { text: '$ name: Katlego Jeffrey Malaka' },
  { text: '$ role: Full Stack Developer · Software Engineer' },
  { text: '$ stack: React · Next.js · TypeScript · Node.js · Java · Python' },
  { text: '$ awards: [2nd] MICT SETA WC 2026  ·  [2nd] Telkom10X 2025' },
  { text: '$ location: Cape Town, South Africa' },
  { text: '$ status: Seeking WIL 2026 — open to opportunities' },
  { text: '$ _', isCursor: true },
];

export const projects = [
  {
    id: 1,
    title: 'QueUp',
    tagline: 'Civic Tech Queue Management Platform',
    award: '🥈 MICT SETA Skills Challenge 2026 — Western Cape, 2nd Place',
    problem: "South Africa's public service queues cost citizens thousands of hours — clinics, Home Affairs, and government offices run on paper.",
    description:
      'Led a 4-person team to build a real-time civic queue system anyone can join from their phone — no physical presence required. Architected the React + PostgreSQL stack, real-time queue updates, user notifications, and role-based management. Competed against top universities and colleges across the Western Cape, placing 2nd in the MICT SETA National Skills Challenge 2026.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Vercel'],
    image: '/saferide-screenshot.jpg',
    github: 'https://github.com/KJMalaka/QueUp1',
    live: 'https://que-up1.vercel.app/',
    category: 'Civic Tech',
    featured: true,
    impact: '🥈 Western Cape 2nd Place — MICT SETA 2026',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'SafeRide',
    tagline: 'Emergency Ride-Booking Safety Platform',
    award: '🥈 Telkom10X Hackathon 2025 — 2nd Place',
    problem: 'E-hailing in SA ignores personal safety. Women and vulnerable users have no SOS layer, no trusted-contact alerts, no emergency protocol.',
    description:
      'Built from zero to deployed in 48 hours at the Telkom10X Hackathon — SafeRide adds a safety-first layer to ride booking with real-time driver tracking, emergency SOS, and trusted-contact notifications. Architected the React frontend and real-time alert system under hackathon pressure. Placed 2nd nationally out of dozens of competing teams.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Vercel'],
    image: '/queup-screenshot.png',
    github: 'https://github.com/Madondo07/saferide_system',
    live: 'http://sfride.netlify.app/',
    category: 'Safety Tech',
    featured: true,
    impact: '🥈 2nd Place Nationally — Built in 48h',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'CPUT CampusCare',
    tagline: 'Student Healthcare Booking System',
    award: null,
    problem: 'CPUT students were losing hours queuing at the campus clinic — no digital booking, no confirmation, no visibility.',
    description:
      'Digitised the entire appointment lifecycle for CPUT\'s student clinic — online booking, calendar management, and role-based dashboards for students, nurses, and admins. Implemented automated email confirmations via Nodemailer and built 3 distinct user roles from scratch. Replaced a fully manual queuing process and deployed to production on Netlify.',
    tech: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'Netlify'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    github: 'https://github.com/Madondo07/clinic_booking_cput',
    live: 'https://clinicbookingsystem.netlify.app/',
    category: 'Full-Stack',
    featured: false,
    impact: '3 user roles · Student · Nurse · Admin',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'TechHive SA',
    tagline: 'South African Tech E-Commerce Platform',
    award: null,
    problem: 'SA tech buyers lacked a local storefront with proper filtering, product comparison, and wishlist — all in real time.',
    description:
      'Built a full-featured e-commerce experience for the South African market — integrating real-time Firebase/Firestore inventory sync, dynamic product filters, a comparison tool, cart + wishlist, and zero-reload UX using React. Demonstrates production-grade state management and cloud database architecture deployed on GitHub Pages.',
    tech: ['React', 'Firebase', 'Firestore', 'JavaScript', 'GitHub Pages'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/TechHive-SA',
    live: 'https://kjmalaka.github.io/TechHive-SA/',
    category: 'Frontend',
    featured: false,
    impact: 'Real-time Firestore + LocalStorage caching',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 5,
    title: 'SneakerHub',
    tagline: 'SA Sneaker Culture E-Commerce Store',
    award: null,
    problem: 'SA sneaker fans had no dedicated local storefront with premium UX for top brands.',
    description:
      'A multi-page sneaker e-commerce site built for the South African market — product catalog with filtering for Nike, Converse, New Balance, Puma, and Vans; persistent shopping cart via localStorage; order receipts; contact and FAQ pages. Clean, brand-first UI with smooth animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/SneakerHub',
    live: 'https://sneakerhu.netlify.app/',
    category: 'Frontend',
    featured: false,
    impact: '8+ pages · Cart · Filtering · Order receipts',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 6,
    title: 'CPUT Library System',
    tagline: 'Python OOP Library Management Application',
    award: null,
    problem: 'Library resource management at CPUT lacked a structured digital system for students and staff.',
    description:
      'A console-based Python application demonstrating advanced OOP principles — inheritance, polymorphism, and resource management — to handle book lending, returns, and user management for both CPUT students and staff. Built as a deep-dive into software design patterns.',
    tech: ['Python', 'OOP', 'CLI'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/Cput-library-system',
    live: null,
    category: 'Backend',
    featured: false,
    impact: 'Demonstrates inheritance · polymorphism · OOP design',
    color: 'from-teal-500 to-green-500',
  },
  {
    id: 7,
    title: 'ADP Project',
    tagline: 'Java Application Development Project',
    award: null,
    problem: 'Required a structured Java application using industry-standard build tooling and OOP architecture.',
    description:
      'A Java application built with Maven for CPUT\'s Application Development Programme — structured around enterprise-grade conventions with a clean Maven build pipeline, modular source layout, and object-oriented design principles applied throughout.',
    tech: ['Java', 'Maven', 'OOP'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/ADP-PROJECT',
    live: null,
    category: 'Backend',
    featured: false,
    impact: 'Maven build pipeline · Enterprise Java structure',
    color: 'from-slate-500 to-slate-700',
  },
];

export const achievements = [
  {
    id: 1,
    title: 'MICT SETA National Skills Challenge',
    subtitle: 'Western Cape Regional',
    position: '2nd Place',
    year: '2026',
    project: 'QueUp — Civic Tech Queue Management',
    projectUrl: 'https://que-up1.vercel.app/',
    description:
      'Placed 2nd in the Western Cape regional round of the MICT SETA National Skills Challenge 2026. QueUp tackled one of SA\'s most persistent civic problems — public service queues — competing against top universities and colleges in the Western Cape.',
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
    projectUrl: 'http://sfride.netlify.app/',
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
- Role: Full Stack Developer & Software Engineer
- Location: Cape Town, South Africa
- Education: Final-year Diploma in ICT: Application Development at CPUT (Cape Peninsula University of Technology)
- Career goal: Software Architect
- Currently seeking: WIL (Work Integrated Learning) placement for 2026
- Community: Member of Abantu Tech — a Cape Town tech community where he collaborates with peers on real-world engineering projects
- Creative side: Creates Amapiano mixtapes as "KayJay" — listen at hearthis.at/kayjay-st/ — curating sets has sharpened his sense of rhythm, flow, and detail, qualities he brings to engineering

ACHIEVEMENTS:
- 2nd Place, MICT SETA National Skills Challenge 2026 (Western Cape Regional) — QueUp civic tech queue management app
  Team: Olebogeng Mokwena, Hlomla Magopeni, Phemelo Molefi, Nonkuleko Shabangu
- 2nd Place, Telkom10X Hackathon 2025 — SafeRide emergency ride safety platform (built in 48 hours)
  Team: Milani Sani, Dumisane Madondo, Phelo Mguca, Hlomla Magopeni

TECH STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, Java, PHP, Python, Laravel
- Databases: MySQL, PostgreSQL, Firebase/Firestore, MongoDB
- DevOps: GitHub Actions, Docker, Vercel, Netlify

PROJECTS:
1. QueUp — Civic tech queue management (React, Node.js, PostgreSQL) — Award-winning — https://que-up1.vercel.app/
2. SafeRide — Emergency ride booking built in 48h hackathon (React, Node.js, MySQL) — http://sfride.netlify.app/
3. CPUT CampusCare — Student healthcare booking system (Node.js, MySQL, Express) — https://clinicbookingsystem.netlify.app/
4. TechHive SA — E-commerce with real-time Firebase (React, Firestore) — https://kjmalaka.github.io/TechHive-SA/
5. SneakerHub — Sneaker e-commerce store (HTML, CSS, JavaScript) — https://sneakerhu.netlify.app/
6. CPUT Library System — Python OOP library management application — github.com/KJMalaka/Cput-library-system
7. ADP Project — Java Maven application development project — github.com/KJMalaka/ADP-PROJECT

CONTACT: malakakatlego67@gmail.com | github.com/KJMalaka | linkedin.com/in/katlego-jeffrey-malaka-820a8726a

If asked about salary/compensation, say to contact Katlego directly at malakakatlego67@gmail.com. If asked about availability, Katlego is actively seeking WIL placement for 2026 in Cape Town or remotely.`;
