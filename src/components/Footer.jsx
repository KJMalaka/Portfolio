import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xs text-white">
              {personal.initials}
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm font-mono">{personal.shortName}</p>
              <p className="text-[11px] font-mono text-slate-500">Software Engineer · Cape Town</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Ready to build something extraordinary?{' '}
              <a
                href={`mailto:${personal.email}?subject=Let's build something`}
                className="text-blue-400 font-semibold hover:underline"
              >
                Let&apos;s talk today.
              </a>
            </p>
          </div>

          {/* Social + back to top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
              aria-label="Email Katlego"
            >
              <Mail size={16} />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-200 transition-colors"
              aria-label="GitHub profile"
            >
              <Github size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={16} />
            </a>
            <button
              onClick={scrollTop}
              className="ml-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md shadow-blue-500/20"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] font-mono text-slate-600">
            © {year} {personal.name} · Cape Town, South Africa
          </p>
          <p className="text-[10px] font-mono text-slate-600">
            Built with React · Tailwind CSS · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}

