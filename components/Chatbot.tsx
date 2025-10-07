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

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface Message {
  role: 'user' | 'model';
  content: string;
}

const parseStreamingMarkdown = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
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
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: CHATBOT_SYSTEM_PROMPT },
      });
      setChat(newChat);
      setMessages([
        { role: 'model', content: "Hello! I'm the ITECH AI Assistant. How can I help you learn about our company today?" }
      ]);
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
          newMessages[newMessages.length - 1] = { role: 'model', content: currentModelMessage };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, but I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const fabVariants = {
    hidden: { scale: 0, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 } },
    exit: { scale: 0, opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const windowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100%-2rem)] max-w-md h-[70vh] max-h-[600px] z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
          >
            <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h3 id="chatbot-title" className="font-bold text-lg text-teal-400">ITECH AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white" aria-label="Close chat">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                      {parseStreamingMarkdown(msg.content)}
                      {isLoading && msg.role === 'model' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-slate-300 ml-1 animate-pulse"></span>}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-4 border-t border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services..."
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={isLoading}
                    aria-label="Chat input"
                  />
                  <button type="submit" className="bg-teal-600 text-white rounded-full p-2.5 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading} aria-label="Send message">
                    {isLoading ? <LoadingSpinnerIcon className="w-5 h-5" /> : <PaperAirplaneIcon className="w-5 h-5" />}
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
             <Tooltip content="Open AI Assistant" position="left">
                <motion.button
                  variants={fabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsOpen(true)}
                  className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-500 transform hover:scale-110 transition-all duration-300"
                  aria-label="Open AI Assistant"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
                </motion.button>
              </Tooltip>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
