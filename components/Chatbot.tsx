import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { CHATBOT_SYSTEM_PROMPT } from '../constants';
import { Tooltip } from './Tooltip';
import { 
  ChatBubbleOvalLeftEllipsisIcon, 
  XMarkIcon, 
  PaperAirplaneIcon, 
  LoadingSpinnerIcon 
} from './IconComponents';

let aiInstance: GoogleGenAI | null = null;
const getAi = (): GoogleGenAI | null => {
  try {
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
      console.error("API_KEY is not available. AI features will be disabled.");
      return null;
    }
    if (!aiInstance) {
      aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return aiInstance;
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
    return null;
  }
};

interface Message {
  role: 'user' | 'model';
  content: string;
}

const parseStreamingMarkdown = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-slate-700">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const ai = getAi();
      if (ai) {
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: CHATBOT_SYSTEM_PROMPT },
        });
        setChat(newChat);
        setMessages([
          { role: 'model', content: "Hello! I am the ITECH Intelligence Assistant. How can I help you explore our 7 subsidiaries, sovereign AI solutions, or investment opportunities today?" }
        ]);
      } else {
        setMessages([
          { role: 'model', content: "Notice: The AI Assistant is currently in standby mode because GEMINI_API_KEY is not configured." }
        ]);
      }
    } else {
      setChat(null);
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await chat.sendMessageStream({ message: input });
      
      let currentModelMessage = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of responseStream) {
        currentModelMessage += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'model',
            content: currentModelMessage
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error communicating with AI assistant:", error);
      setMessages(prev => [
        ...prev,
        { role: 'model', content: "I apologize, but I am unable to process your request at this moment. Please reach out via our contact page." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[540px] max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
          >
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-[28px] shadow-2xl h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <div>
                    <h3 id="chatbot-title" className="font-black text-xs uppercase tracking-wider text-slate-900">
                      ITECH Assistant
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                      Autonomous Intelligence
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors" 
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8fafc]">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-2xl rounded-br-xs shadow-sm font-medium' 
                        : 'bg-white text-slate-700 rounded-2xl rounded-bl-xs border border-slate-200/80 shadow-xs font-normal'
                    }`}>
                      {msg.role === 'model' ? parseStreamingMarkdown(msg.content) : msg.content}
                      {isLoading && msg.role === 'model' && index === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-3 bg-amber-400 ml-1 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-3 border-t border-slate-100 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about divisions, AI, investment..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full py-2.5 px-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                    disabled={isLoading || !chat}
                    aria-label="Chat input"
                  />
                  <button 
                    type="submit" 
                    className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0 shadow-xs" 
                    disabled={isLoading || !chat} 
                    aria-label="Send message"
                  >
                    {isLoading ? <LoadingSpinnerIcon className="w-4 h-4" /> : <PaperAirplaneIcon className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
            <Tooltip content="Open ITECH Intelligence Assistant" position="left">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setIsOpen(true)}
                className="bg-slate-900 text-amber-400 rounded-full p-4 shadow-xl hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 border border-slate-700/60 flex items-center justify-center group"
                aria-label="Open AI Assistant"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-2 right-2 border-2 border-slate-900"></span>
              </motion.button>
            </Tooltip>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};