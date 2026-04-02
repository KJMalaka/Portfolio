import { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { personal } from '../data/portfolio';

export default function Contact() {
  const { ref: headingRef } = useRevealOnScroll();
  const { ref: formRef } = useRevealOnScroll();
  const { ref: linksRef } = useRevealOnScroll();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

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
      // Fallback: open mailto link so recruiter can still reach out
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
      aria-label="Contact"
    >
      <div className="max-w-5xl mx-auto">

        <div ref={headingRef} className="reveal text-center mb-14">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">
            I'm ready to build{' '}
            <span className="gradient-text">something great</span> with your team.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Actively seeking WIL placement for 2026. I respond within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <MapPin size={14} className="text-slate-400" aria-hidden="true" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Cape Town, South Africa · Remote-ready
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div ref={formRef} className="reveal-left">
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-7 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                Send a message
              </h3>

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl text-sm mb-4 border border-green-200 dark:border-green-500/20">
                  <CheckCircle size={16} aria-hidden="true" />
                  Message sent! I'll get back to you within 24 hours.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 rounded-xl text-sm mb-4 border border-red-200 dark:border-red-500/20">
                  <AlertCircle size={16} className="mt-0.5 flex-none" aria-hidden="true" />
                  <span>
                    Form service unavailable.{' '}
                    <a
                      href={`mailto:${personal.email}?subject=WIL Enquiry`}
                      className="underline font-medium"
                    >
                      Email me directly
                    </a>{' '}
                    instead.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
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
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
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
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the role or opportunity..."
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      aria-required="true"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-sm"
                    aria-label="Send message"
                  >
                    <Send size={15} aria-hidden="true" />
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links & info */}
          <div ref={linksRef} className="reveal-right flex flex-col justify-center gap-5">
            <div className="space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-colors group"
                aria-label={`Email ${personal.email}`}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center flex-none">
                  <Mail className="text-blue-600 dark:text-blue-400" size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {personal.email}
                  </p>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-colors group"
                aria-label="GitHub profile"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-none">
                  <Github className="text-slate-700 dark:text-slate-300" size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">GitHub</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    github.com/{personal.githubUsername}
                  </p>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-colors group"
                aria-label="LinkedIn profile"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center flex-none">
                  <Linkedin className="text-blue-700 dark:text-blue-400" size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">LinkedIn</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Katlego Jeffrey Malaka
                  </p>
                </div>
              </a>
            </div>

            {/* Availability card */}
            <div className="p-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot live" aria-hidden="true" />
                <span className="text-sm font-semibold">Available for WIL 2026</span>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed">
                Final-year CPUT student, Cape Town. Open to in-person or remote placements. I bring two national competition placements and 4 shipped projects to any team from day one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
