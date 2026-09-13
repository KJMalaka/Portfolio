import { useState, useRef, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { track } from '@vercel/analytics';
import { MessageCircle, X, Send, Bot, User, Sparkles, FileText, ChevronDown } from 'lucide-react';
import knowledgeBase from '../data/knowledgeBase.json';

const QUICK_PROMPTS = [
  'What stack does QueUp use?',
  'Tell me about his hackathon awards',
  'What backend frameworks do you use?',
  'How can I contact him?',
];

const FALLBACK_ANSWER =
  "I don't have a specific answer for that yet. Try asking about a project (QueUp, BathoBank, Ikhono AI…), his stack, education, or awards — or contact him directly at malakakatlego67@gmail.com.";

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'do', 'does', 'did', 'what', 'which', 'who',
  'how', 'tell', 'me', 'about', 'you', 'your', 'his', 'him', 'he', 'can',
  'could', 'i', 'to', 'of', 'for', 'in', 'on', 'with', 'use', 'used', 'using',
]);

// Local, deterministic Q&A — no external API calls, no hallucination risk.
// Fuse's Bitap matcher looks for the query AS A SUBSTRING of each field, so a
// full sentence query almost never matches short keyword tags like "queup" —
// we strip filler words down to the meaningful terms first, then fall back to
// matching term-by-term if the trimmed phrase still comes up empty.
function useKnowledgeSearch() {
  const fuse = useMemo(
    () =>
      new Fuse(knowledgeBase, {
        keys: [
          { name: 'question', weight: 0.3 },
          { name: 'keywords', weight: 0.5 },
          { name: 'answer', weight: 0.2 },
        ],
        threshold: 0.35,
        distance: 200,
        ignoreLocation: true,
        includeScore: true,
      }),
    []
  );

  return (query) => {
    const terms = query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w));

    if (terms.length === 0) return FALLBACK_ANSWER;

    const trimmed = terms.join(' ');
    let results = fuse.search(trimmed);

    if (results.length === 0) {
      // Try each significant term on its own and keep the best score seen.
      let best = null;
      for (const term of terms) {
        const hits = fuse.search(term);
        if (hits.length && (!best || hits[0].score < best.score)) best = hits[0];
      }
      results = best ? [best] : [];
    }

    return results.length > 0 ? results[0].item.answer : FALLBACK_ANSWER;
  };
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-2xl rounded-bl-sm w-fit">
      <div className="typing-indicator flex gap-1">
        <span /><span /><span />
      </div>
    </div>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-message flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-none ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </div>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-slate-800 text-slate-100 rounded-bl-sm'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function CVGenerator() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!company.trim() || !role.trim()) {
      setError('Please enter both company name and role.');
      return;
    }
    setError('');
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'cv', company, role }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const { text } = JSON.parse(data);
              full += text;
              setResult(full);
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setResult('');
      setError('Could not generate right now. The AI service may be unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-slate-400 leading-relaxed">
        Enter your company and role — the AI will generate a tailored cover letter highlighting the most relevant projects and skills for you.
      </p>
      <input
        type="text"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Company name"
      />
      <input
        type="text"
        placeholder="Role / position"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Role or position"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all"
        aria-label="Generate tailored cover letter"
      >
        <Sparkles size={14} aria-hidden="true" />
        {loading ? 'Generating…' : 'Generate Cover Letter'}
      </button>

      {result && (
        <div className="mt-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
          {result}
        </div>
      )}
    </div>
  );
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('chat'); // 'chat' | 'cv'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Katlego's AI assistant. Ask me anything about his skills, projects, or experience — I know everything about him.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const search = useKnowledgeSearch();

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, open, loading]);

  const sendMessage = (text) => {
    const userMsg = text.trim();
    if (!userMsg || loading) return;

    track('chat_message_sent');
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Small delay so the reply doesn't feel like a jarring instant lookup.
    setTimeout(() => {
      const answer = search(userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setLoading(false);
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() =>
          setOpen((v) => {
            if (!v) track('chat_opened');
            return !v;
          })
        }
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open
            ? 'bg-slate-700 rotate-0 scale-95'
            : 'bg-gradient-to-br from-blue-600 to-purple-600 hover:scale-110 shadow-blue-500/40'
        }`}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant — Ask Katlego'}
        aria-expanded={open}
        aria-controls="ai-chat-panel"
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" aria-hidden="true" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="ai-chat-panel"
          role="dialog"
          aria-label="AI assistant chat"
          aria-modal="false"
          className="glass-strong fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={14} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Ask Katlego</p>
                <p className="text-blue-200 text-xs">
                  {tab === 'chat' ? 'Grounded answers, no hallucinations' : 'Powered by Groq'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700 bg-slate-800/50">
            <button
              onClick={() => setTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'chat'
                  ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={tab === 'chat'}
            >
              <MessageCircle size={13} aria-hidden="true" /> Chat
            </button>
            <button
              onClick={() => setTab('cv')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'cv'
                  ? 'text-purple-400 border-b-2 border-purple-500 bg-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={tab === 'cv'}
            >
              <FileText size={13} aria-hidden="true" /> Custom CV
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {tab === 'chat' ? (
              <>
                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  aria-live="polite"
                  aria-label="Chat messages"
                >
                  {messages.map((msg, i) => (
                    <ChatMessage key={i} msg={msg} />
                  ))}

                  {loading && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick prompts */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 rounded-lg text-xs transition-colors border border-slate-700"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-slate-700 flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Katlego…"
                    disabled={loading}
                    className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    aria-label="Chat input"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-xl transition-colors flex-none"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <CVGenerator />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
