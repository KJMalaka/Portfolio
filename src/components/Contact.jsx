import { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { personal } from '../data/portfolio';

export default function Contact() {
  const { ref: headingRef } = useRevealOnScroll();
  const { ref: formRef } = useRevealOnScroll();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Send failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-section lg:py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-950"
      aria-label="Contact"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="section-label text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-slate-100 font-mono">
            Let&apos;s build something great together
          </h2>
          <p className="text-slate-400 text-xs font-mono mt-3">
            I respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div ref={formRef} className="reveal-left">
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-mono font-semibold text-slate-100 mb-5">
                Send a message
              </h3>

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-400 rounded-lg text-xs font-mono mb-4 border border-green-500/20">
                  <CheckCircle size={14} />
                  Message sent! I&apos;ll get back to you within 24 hours.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 text-red-400 rounded-lg text-xs font-mono mb-4 border border-red-500/20">
                  <AlertCircle size={14} className="mt-0.5 flex-none" />
                  <span>
                    Form unavailable.{' '}
                    <a href={`mailto:${personal.email}`} className="underline font-medium">
                      Email me directly
                    </a>{' '}
                    instead.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400/50 text-white font-mono text-xs font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                  >
                    <Send size={14} />
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="reveal-right flex flex-col justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="glass-card flex items-center gap-3 p-4 rounded-xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-none">
                <Mail size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-medium">Email</p>
                <p className="text-xs font-mono font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {personal.email}
                </p>
              </div>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 p-4 rounded-xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-none">
                <Github size={18} className="text-slate-300" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-medium">GitHub</p>
                <p className="text-xs font-mono font-semibold text-slate-200">
                  github.com/{personal.githubUsername}
                </p>
              </div>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 p-4 rounded-xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-none">
                <Linkedin size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-medium">LinkedIn</p>
                <p className="text-xs font-mono font-semibold text-slate-200">
                  Katlego Jeffrey Malaka
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

