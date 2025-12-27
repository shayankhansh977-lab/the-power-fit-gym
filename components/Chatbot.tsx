
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Dumbbell } from 'lucide-react';
import { chatWithCoach } from '../services/gemini';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "I'm Coach FitAI. Ready to crush your goals? Ask me about your form, diet, or tonight's HIIT session!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await chatWithCoach(history, input);
      const modelMessage: ChatMessage = { role: 'model', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-5 rounded-3xl shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all flex items-center space-x-3 animate-bounce"
        >
          <Dumbbell size={24} strokeWidth={2.5} />
          <span className="font-black text-sm uppercase tracking-tight pr-1">Ask AI Coach</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-zinc-900 rounded-[2.5rem] shadow-2xl w-80 sm:w-96 border border-zinc-800 overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Dumbbell size={20} />
              <h3 className="font-black uppercase tracking-tight">FitAI Elite Coach</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-xl p-2">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-zinc-900 text-zinc-300 rounded-bl-none border border-zinc-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 p-4 rounded-3xl flex items-center space-x-2 border border-zinc-800">
                  <Loader2 size={16} className="animate-spin text-emerald-500" />
                  <span className="text-xs text-zinc-500 font-bold">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-zinc-800 flex items-center space-x-3 bg-zinc-900">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-600 text-white p-3 rounded-2xl disabled:opacity-50 hover:bg-emerald-500 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
