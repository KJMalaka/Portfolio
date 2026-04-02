import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, FileText, ChevronDown } from 'lucide-react';

const QUICK_PROMPTS = [
  "What's Katlego's strongest skill?",
  "Tell me about QueUp",
  "What competitions has he won?",
  "Is he available for WIL 2026?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm w-fit">
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
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
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
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Enter your company and role — Claude will generate a tailored cover letter highlighting the most relevant projects and skills for you.
      </p>
      <input
        type="text"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Company name"
      />
      <input
        type="text"
        placeholder="Role / position"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
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
      content: "Hi! I'm Katlego's AI assistant. Ask me anything about his skills, projects, or availability — I know everything about him. 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, open, streamingText]);

  const sendMessage = async (text) => {
    const userMsg = text.trim();
    if (!userMsg || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    setStreamingText('');

    const history = [
      ...messages.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: userMsg },
    ];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, type: 'chat' }),
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
              setStreamingText(full);
            } catch { /* skip */ }
          }
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't reach the AI service right now. You can contact Katlego directly at malakakatlego67@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
      setStreamingText('');
    }
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
        onClick={() => setOpen((v) => !v)}
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
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-fade-in"
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
                <p className="text-blue-200 text-xs">Powered by Claude AI</p>
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
          <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <button
              onClick={() => setTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'chat'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 bg-white dark:bg-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              aria-pressed={tab === 'chat'}
            >
              <MessageCircle size={13} aria-hidden="true" /> Chat
            </button>
            <button
              onClick={() => setTab('cv')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'cv'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500 bg-white dark:bg-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
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

                  {/* Streaming message */}
                  {loading && !streamingText && <TypingIndicator />}
                  {streamingText && (
                    <ChatMessage msg={{ role: 'assistant', content: streamingText }} />
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick prompts */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg text-xs transition-colors border border-slate-200 dark:border-slate-700"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Katlego…"
                    disabled={loading}
                    className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    aria-label="Chat input"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors flex-none"
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
