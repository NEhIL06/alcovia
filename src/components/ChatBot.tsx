'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import type { ChatMessage } from '@/lib/types';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! Ask me anything about today\'s operations.', timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.content }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.answer || data.error || 'No response',
        timestamp: new Date().toISOString(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Failed to get response. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 z-50"
      >
        <MessageCircle size={22} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-2xl flex flex-col z-50 animate-fade-in" style={{ height: '480px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
          <span className="text-sm font-medium">Ops Assistant</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)]'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-card)] px-3 py-2 rounded-lg">
              <Loader2 size={16} className="animate-spin text-[var(--text-muted)]" />
            </div>
          </div>
        )}
        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[var(--border)]">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about today's operations..."
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
