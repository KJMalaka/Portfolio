// ─── Portfolio Content Data ───────────────────────────────────────────────────
// Update PROFILE_PHOTO with your actual photo URL or relative path.
// Put your CV PDF at public/Katlego-Malaka-CV.pdf

import { Trophy, Zap, Atom, Settings, Database, Rocket, Smartphone, Bot } from 'lucide-react';

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
  // Save your photo to public/katlego.jpg — instruction already sent
  photo: '/katlego.jpeg',
  cvPath: '/Katlego_Malaka CV.pdf',
};

export const projects = [
  {
    id: 1,
    title: 'QueUp',
    tagline: 'Civic Tech Queue Management Platform',
    award: 'MICT SETA Skills Challenge 2026 — Western Cape, 2nd Place',
    problem: "South Africa's public service queues cost citizens thousands of hours — clinics, Home Affairs, and government offices run on paper.",
    description:
      'Led a 4-person team to build a real-time civic queue system anyone can join from their phone — no physical presence required. Architected the React + PostgreSQL stack, real-time queue updates, user notifications, and role-based management. Competed against top universities and colleges across the Western Cape, placing 2nd in the MICT SETA National Skills Challenge 2026.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Vercel'],
    image: '/saferide-screenshot.jpg',
    github: 'https://github.com/KJMalaka/QueUp1',
    live: 'https://que-up1.vercel.app/',
    category: 'Civic Tech',
    featured: true,
    impact: 'Western Cape 2nd Place — MICT SETA 2026',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'SafeRide',
    tagline: 'Emergency Ride-Booking Safety Platform',
    award: 'Telkom10X Hackathon 2025 — 2nd Place',
    problem: 'E-hailing in SA ignores personal safety. Women and vulnerable users have no SOS layer, no trusted-contact alerts, no emergency protocol.',
    description:
      'Built from zero to deployed in 48 hours at the Telkom10X Hackathon — SafeRide adds a safety-first layer to ride booking with real-time driver tracking, emergency SOS, and trusted-contact notifications. Architected the React frontend and real-time alert system under hackathon pressure. Placed 2nd nationally out of dozens of competing teams.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Vercel'],
    image: '/queup-screenshot.png',
    github: 'https://github.com/Madondo07/saferide_system',
    live: 'http://sfride.netlify.app/',
    category: 'Safety Tech',
    featured: true,
    impact: '2nd Place Nationally — Built in 48h',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'AI Study Assistant',
    tagline: 'AI-Powered Study Platform for Students',
    award: null,
    problem: 'Students drown in raw notes and PDFs with no fast way to turn them into summaries, quizzes, or a study plan they can actually stick to.',
    description:
      'A full-stack study platform that turns uploaded notes and PDFs into AI-generated summaries, quizzes, and SM-2 spaced-repetition flashcards, plus a document-grounded chatbot that answers questions strictly from the uploaded material. Built a FastAPI backend with JWT authentication and SQLAlchemy, a React + Vite frontend, and a progress dashboard tracking quiz performance across document collections. Supports Groq (Llama 3), OpenAI, or local Ollama models for inference.',
    tech: ['React', 'Vite', 'FastAPI', 'Python', 'SQLAlchemy', 'PostgreSQL', 'Groq', 'JWT'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/AI-Study-Assistant',
    live: null,
    category: 'AI / EdTech',
    featured: true,
    impact: 'AI summaries · quizzes · SM-2 flashcards · document-grounded chat',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 4,
    title: 'myCapePlanner',
    tagline: 'AI Travel Planning for Cape Town',
    award: null,
    problem: 'Planning a Cape Town trip means juggling scattered blog posts, maps, and spreadsheets with no single place to build and save an itinerary.',
    description:
      'A full-stack AI travel planner where users chat with a Gemini-powered guide to generate structured Cape Town itineraries, explore real attractions on an interactive Leaflet map, and export their plan as a PDF. Built with a React + Vite frontend and an Express/Sequelize backend with JWT authentication and persistent trip storage, keeping the Gemini API key server-side only. Deployed with a Vercel frontend and Azure App Service backend behind a GitHub Actions CI/CD pipeline.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'Google Gemini', 'Leaflet'],
    image: '/mycapeplanner-screenshot.png',
    github: 'https://github.com/KJMalaka/myCapePlanner',
    live: 'https://mycapeplanner.vercel.app/',
    category: 'AI / Travel Tech',
    featured: true,
    impact: 'Conversational AI itineraries · interactive map · PDF export',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 5,
    title: 'KayJay Content Studio',
    tagline: 'AI Content Generation Engine',
    award: null,
    problem: 'Creators need to produce blog posts, emails, code, and visuals across formats, but jumping between disconnected AI tools slows the process down and hides how the prompt actually got built.',
    description:
      'An AI content generation studio that produces blog posts, emails, code, images, and speech from a single interface, built on Groq (Llama models) for text and text-to-speech and Pollinations.ai for image generation. A visible prompt-optimization step shows exactly how a raw input gets refined before generation, alongside tone variants, remixing, and exportable history.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Groq', 'Pollinations.ai'],
    image: '/content-studio-screenshot.png',
    github: 'https://github.com/KJMalaka/Content-Engine',
    live: 'https://gemini-content-engine--malakakatlego67.replit.app/',
    category: 'AI / Content Tech',
    featured: true,
    impact: 'Multi-modal generation · visible prompt optimization · tone remix',
    color: 'from-fuchsia-500 to-purple-600',
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
    title: 'SneakerHub',
    tagline: 'SA Sneaker Culture E-Commerce Store',
    award: null,
    problem: 'SA sneaker fans had no dedicated local storefront with premium UX for top brands.',
    description:
      'A multi-page sneaker e-commerce site built for the South African market — product catalog with filtering for Nike, Converse, New Balance, Puma, and Vans; persistent shopping cart via localStorage; order receipts; contact and FAQ pages. Clean, brand-first UI with smooth animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    image: '/sneakerhub-screenshot.png',
    github: 'https://github.com/KJMalaka/SneakerHub',
    live: 'https://sneakerhu.netlify.app/',
    category: 'Frontend',
    featured: false,
    impact: '8+ pages · Cart · Filtering · Order receipts',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 9,
    title: 'Student Enrollment System',
    tagline: 'Client-Server Course Enrollment Application',
    award: null,
    problem: 'CPUT\'s Application Development Programme required a structured client-server application demonstrating real database-backed enrollment workflows for two distinct user roles.',
    description:
      'A Java client-server application where students enroll themselves in courses and admins manage rosters — adding or removing students from courses — over a persistent JDBC-backed database. Built with a clean separation between the client and server layers and object-oriented design throughout, using Maven for the build pipeline.',
    tech: ['Java', 'JDBC', 'Client-Server', 'Maven', 'OOP'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    github: 'https://github.com/KJMalaka/ADP-PROJECT',
    live: null,
    category: 'Backend',
    featured: false,
    impact: 'Client-server architecture · JDBC persistence · Student & admin roles',
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
    icon: Trophy,
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
    icon: Zap,
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
];

export const skills = {
  primary: {
    label: 'Primary Stack',
    icon: Atom,
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
    icon: Settings,
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
    icon: Database,
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
    icon: Rocket,
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

export const certificates = [
  {
    id: 'google-ai',
    label: 'Google AI Essentials',
    icon: Smartphone,
    color: 'purple',
    count: 1,
    items: [
      { name: 'Google AI Essentials Professional Certificate', url: '/certificates/Katlego%20Malaka_GoogleAIEssentials_ProfessionalCertificate.pdf' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: Bot,
    color: 'cyan',
    count: 7,
    items: [
      { name: 'Generative AI with Large Language Models', url: '/certificates/Katlego%20Malaka_Generative%20AI%20with%20Large%20Language%20Models.pdf' },
      { name: 'Supervised Machine Learning', url: '/certificates/Katlego%20Malaka_Supervised%20Machine%20Learning.pdf' },
      { name: 'Introduction to Generative AI', url: '/certificates/Katlego%20Malaka_Introduction%20to%20Generative%20AI.pdf' },
      { name: 'Introduction to Artificial Intelligence (AI)', url: '/certificates/Katlego%20Malaka_Introduction%20to%20Artificial%20Intelligence%20(AI).pdf' },
      { name: 'AI For Everyone', url: '/certificates/Katlego%20Malaka_AI%20For%20Everyone.pdf' },
      { name: 'Generative AI: Prompt Engineering Basics', url: '/certificates/Katlego_Generative%20AI_Prompt%20Engineering%20Basics.pdf' },
      { name: 'Python for Data Science, AI & Development', url: '/certificates/Katlego%20Malaka_Python%20for%20Data%20Science%2C%20AI%20%26%20Development.pdf' },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity & AI Tools',
    icon: Zap,
    color: 'blue',
    count: 5,
    items: [
      { name: 'Discover the Art of Prompting', url: '/certificates/Katlego%20Malaka_Discover%20the%20Art%20of%20Prompting.pdf' },
      { name: 'Maximize Productivity With AI Tools', url: '/certificates/Katlego%20Malaka_Maximize%20Productivity%20With%20AI%20Tools.pdf' },
      { name: 'Stay Ahead of the AI Curve', url: '/certificates/Katlego%20Malaka_Stay%20AheadoftheAICurve.pdf' },
      { name: 'Use AI Responsibly', url: '/certificates/Katlego%20Malaka_UseAIResponsibly.pdf' },
      { name: 'Introduction to AI', url: '/certificates/Katlego%20Malaka_IntroductiontoAI.pdf' },
    ],
  },
];

export const experience = [
  {
    id: 1,
    type: 'education',
    title: 'Diploma in ICT: Application Development',
    organization: 'Cape Peninsula University of Technology (CPUT)',
    period: '2023 — 2026',
    description: 'Final-year student. Focus on full-stack web development, software engineering principles, database design, and systems analysis. Dean\'s list candidate.',
    highlights: [
      'Two-time national hackathon winner (MICT SETA 2026, Telkom10X 2025)',
      'Multiple shipped projects across React, Node.js, Java, and Python',
      'Active in tech community — Abantu Tech member',
    ],
  },
  {
    id: 2,
    type: 'experience',
    title: 'Full Stack Developer (Project Lead)',
    organization: 'QueUp — MICT SETA National Skills Challenge',
    period: '2025 — 2026',
    description: 'Led a 4-person team to design and build a real-time civic queue management system. Architected the full stack from React frontend to PostgreSQL database.',
    highlights: [
      'Placed 2nd in Western Cape regional round',
      'Real-time queue updates with WebSocket integration',
      'Role-based management for citizens and administrators',
    ],
  },
  {
    id: 3,
    type: 'experience',
    title: 'Hackathon Developer',
    organization: 'SafeRide — Telkom10X Hackathon',
    period: '2025',
    description: 'Built an emergency ride-safety platform from zero to deployment in 48 hours. Architected real-time driver tracking, SOS alerts, and trusted-contact notifications.',
    highlights: [
      'Placed 2nd nationally out of dozens of teams',
      'React frontend + Node.js backend + MySQL database',
      'Emergency SOS with trusted-contact escalation',
    ],
  },
];

export const aiSystemPrompt = `You are an AI assistant embedded in Katlego Malaka's developer portfolio. Answer recruiter and developer questions about Katlego naturally, confidently, and helpfully. Keep answers concise (2-4 sentences max). Be enthusiastic but professional.

ABOUT KATLEGO:
- Full name: Katlego Jeffrey Malaka
- Role: Full Stack Developer & Software Engineer
- Location: Cape Town, South Africa
- Education: Final-year Diploma in ICT: Application Development at CPUT (Cape Peninsula University of Technology)
- Career goal: Software Architect
- Community: Member of Abantu Tech — a Cape Town tech community where he collaborates with peers on real-world engineering projects
- Creative side: Creates Amapiano mixtapes as "KayJay" — listen at hearthis.at/kayjay-st/ — curating sets has sharpened his sense of rhythm, flow, and detail, qualities he brings to engineering

ACHIEVEMENTS:
- 2nd Place, MICT SETA National Skills Challenge 2026 (Western Cape Regional) — QueUp civic tech queue management app
  Team: Olebogeng Mokwena, Hlomla Magopeni, Phemelo Molefi, Nonkuleko Shabangu
- 2nd Place, Telkom10X Hackathon 2025 — SafeRide emergency ride safety platform (built in 48 hours)
  Team: Milani Sani, Dumisane Madondo, Phelo Mguca, Hlomla Magopeni

TECH STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, FastAPI, Java, PHP, Python, Laravel
- AI: Groq (Llama models), Google Gemini, OpenAI, Ollama, prompt engineering
- Databases: MySQL, PostgreSQL, Firebase/Firestore, MongoDB, SQLite
- DevOps: GitHub Actions, Docker, Vercel, Netlify, Azure

PROJECTS:
1. QueUp — Civic tech queue management (React, Node.js, PostgreSQL) — Award-winning — https://que-up1.vercel.app/
2. SafeRide — Emergency ride booking built in 48h hackathon (React, Node.js, MySQL) — http://sfride.netlify.app/
3. AI Study Assistant — Turns notes/PDFs into AI summaries, quizzes, and spaced-repetition flashcards (React, FastAPI, Groq) — github.com/KJMalaka/AI-Study-Assistant
4. myCapePlanner — AI travel planner for Cape Town with chat itineraries, maps, and PDF export (React, Node.js, Google Gemini) — https://mycapeplanner.vercel.app/
5. KayJay Content Studio — AI content engine generating blog posts, emails, code, images, and speech (Next.js, Groq, Pollinations.ai) — https://gemini-content-engine--malakakatlego67.replit.app/
6. CPUT CampusCare — Student healthcare booking system (Node.js, MySQL, Express) — https://clinicbookingsystem.netlify.app/
7. TechHive SA — E-commerce with real-time Firebase (React, Firestore) — https://kjmalaka.github.io/TechHive-SA/
8. SneakerHub — Sneaker e-commerce store (HTML, CSS, JavaScript) — https://sneakerhu.netlify.app/
9. Student Enrollment System (ADP Project) — Java client-server app with JDBC; students self-enroll in courses, admins add/remove students from course rosters — github.com/KJMalaka/ADP-PROJECT

CONTACT: malakakatlego67@gmail.com | github.com/KJMalaka | linkedin.com/in/katlego-jeffrey-malaka-820a8726a

If asked about salary/compensation or availability, say to contact Katlego directly at malakakatlego67@gmail.com.`;
