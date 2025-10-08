"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const auraResponses = {
  greeting: "Hello! I'm AURA — Anas's AI Assistant 👋. What would you like to explore?",
  projects: "Anas has built 13+ impressive projects including AI chatbots, stock prediction systems, and face recognition apps. His latest work includes an AI Resume Screening System with 88% accuracy and a Fake News Detection model with 93% precision. Would you like to know more about any specific project?",
  skills: "Anas is proficient in Python, C++, and C with expertise in AI/ML frameworks like Scikit-learn, Pandas, and OpenCV. He's also skilled in web development with Flask, React, and Next.js. His soft skills include problem-solving, team collaboration, and continuous learning.",
  resume: "Anas is a B.Tech CSE (AI & ML) student at Netaji Subhash Engineering College with strong academic performance. He's open to internships and has demonstrated expertise in algorithmic thinking and clean code development. Would you like me to generate a targeted resume for a specific role?",
  contact: "You can reach Anas at md.anaskhan.aiml@gmail.com or connect with him on LinkedIn (linkedin.com/in/md-anas-khan-ai) and GitHub (github.com/md-anas-khan-ai). He's always interested in discussing AI/ML opportunities and collaborations.",
  default: "I can help you learn about Anas's projects, skills, resume, or contact information. Just ask me anything about his background or work!"
};

export function AuraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: auraResponses.greeting,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAuraResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('project') || message.includes('work') || message.includes('built')) {
      return auraResponses.projects;
    } else if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return auraResponses.skills;
    } else if (message.includes('resume') || message.includes('cv') || message.includes('experience')) {
      return auraResponses.resume;
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return auraResponses.contact;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return auraResponses.greeting;
    } else {
      return auraResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const auraResponse: Message = {
        id: Date.now() + 1,
        text: getAuraResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, auraResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-cyan to-electric rounded-full shadow-glow-strong flex items-center justify-center z-40 hover:shadow-glow-strong"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white rounded-full"
        >
          <div className="w-full h-full border-t-2 border-cyan rounded-full animate-spin"></div>
        </motion.div>
        <span className="absolute text-xs font-bold text-black">AURA</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 h-96 glass rounded-lg shadow-glow-strong z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan rounded-full animate-pulse"></div>
                <h3 className="text-cyan font-bold">AURA Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-textMuted hover:text-cyan transition-colors"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-cyan text-black'
                        : 'bg-surface/50 text-textLight border border-cyan/30'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface/50 text-textLight border border-cyan/30 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask AURA anything..."
                  className="flex-1 bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-cyan text-black rounded hover:bg-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
