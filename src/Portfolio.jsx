import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Database, Server, Layers } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const projects = [
    {
      id: 1,
      title: "CPUT CampusCare Booking System",
      tagline: "Full-Stack Healthcare Management Platform",
      description: "An online system for CPUT students to book clinic appointments and for staff to manage schedules and patient records securely.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      tech: ["Node.js", "Express", "MySQL", "JavaScript", "Render"],
      features: [
        "Student registration and secure login",
        "Appointment booking with calendar view",
        "Role-based dashboards (Student, Nurse, Admin)",
        "Email notifications via Nodemailer",
        "Full CRUD operations with data validation"
      ],
      metrics: [
        "3 user role types implemented",
        "100% booking confirmation rate",
        "Production-ready deployment"
      ],
      github: "#",
      live: "#",
      category: "Full-Stack"
    },
    {
      id: 2,
      title: "TechHive SA Online Store",
      tagline: "E-Commerce Platform with Smart Filtering",
      description: "A responsive South African tech store showcasing laptops and phones with advanced filtering, wishlist, and cart features.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      tech: ["React", "Firebase", "Firestore", "JavaScript", "Netlify"],
      features: [
        "Product listing with dynamic filters",
        "Search with autocomplete",
        "Shopping cart and wishlist functionality",
        "Product comparison tool",
        "Light/dark theme toggle",
        "Mobile-responsive design"
      ],
      metrics: [
        "Real-time Firebase integration",
        "LocalStorage caching for performance",
        "Fully responsive across all devices"
      ],
      github: "#",
      live: "#",
      category: "Frontend"
    }
  ];

  const skills = {
    frontend: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design"],
    backend: ["Node.js", "Express.js", "REST APIs", "Authentication", "JWT"],
    database: ["MySQL", "MongoDB", "Firebase", "Firestore"],
    tools: ["Git/GitHub", "VS Code", "Postman", "XAMPP", "Render", "Netlify"]
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                KM
              </div>
              <span className="text-xl font-bold">Katlego Malaka</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-blue-400 transition-colors ${
                    activeSection === section ? 'text-blue-400' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 px-4 capitalize hover:bg-slate-800 rounded"
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative group">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Katlego Malaka"
                  className="w-32 h-32 rounded-2xl object-cover shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-transform border-4 border-blue-500"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center font-bold text-5xl shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-transform">
                  KM
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>

              {/* Upload Button */}
              <label
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-sm font-semibold">Upload Photo</span>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Katlego Jeffrey Malaka
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-4">
            Application Developer | Second Year IT Student | CPUT
          </p>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Building practical, full-stack solutions with modern web technologies.
            Currently seeking internship opportunities for 2026.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-slate-600 hover:border-blue-400 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Katlego Malaka"
                    className="w-64 h-64 rounded-3xl object-cover shadow-2xl border-4 border-blue-500/50"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="text-8xl font-bold mb-4">KM</div>
                      <label
                        htmlFor="about-upload"
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer transition-colors inline-block"
                      >
                        Add Photo
                      </label>
                    </div>
                  </div>
                )}
                {profileImage && (
                  <label
                    htmlFor="about-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <span className="text-white font-semibold">Change Photo</span>
                  </label>
                )}
                <input
                  id="about-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <p className="text-lg text-slate-300 mb-4">
                I'm a second-year Application Development student at Cape Peninsula University of Technology (CPUT),
                passionate about creating practical solutions that solve real-world problems.
              </p>
              <p className="text-lg text-slate-300 mb-4">
                My focus is on full-stack web development, with expertise in building scalable applications
                using modern JavaScript frameworks and databases. I thrive on learning new technologies and
                applying them to meaningful projects.
              </p>
              <p className="text-lg text-slate-300">
                Currently preparing for internship opportunities where I can contribute to impactful projects
                while continuing to grow as a developer.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-slate-700/50 p-6 rounded-lg text-center">
              <Code className="mx-auto mb-3 text-blue-400" size={40} />
              <h3 className="font-semibold mb-2">Full-Stack</h3>
              <p className="text-sm text-slate-400">End-to-end development</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg text-center">
              <Database className="mx-auto mb-3 text-purple-400" size={40} />
              <h3 className="font-semibold mb-2">Database</h3>
              <p className="text-sm text-slate-400">SQL & NoSQL</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg text-center">
              <Server className="mx-auto mb-3 text-green-400" size={40} />
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-slate-400">APIs & Services</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg text-center">
              <Layers className="mx-auto mb-3 text-pink-400" size={40} />
              <h3 className="font-semibold mb-2">Deployment</h3>
              <p className="text-sm text-slate-400">Cloud hosting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-center text-slate-400 mb-12">Practical applications built with modern technologies</p>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors`}
              >
                <div className="lg:w-1/2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm mb-4">
                    {project.category}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-blue-400 mb-4">{project.tagline}</p>
                  <p className="text-slate-300 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-slate-200">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-slate-400">
                      {project.features.slice(0, 4).map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-slate-200">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <Github size={20} />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-slate-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 capitalize text-blue-400">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {skillList.map((skill, i) => (
                    <li key={i} className="text-slate-300">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-slate-400 mb-12">
            I'm actively seeking internship opportunities for 2026. Let's discuss how I can contribute to your team!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Mail size={24} />
              <span>Email Me</span>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-700 text-center text-slate-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">
            KM
          </div>
          <span className="font-semibold text-slate-300">Katlego Malaka</span>
        </div>
        <p>© 2025 Built with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
}
