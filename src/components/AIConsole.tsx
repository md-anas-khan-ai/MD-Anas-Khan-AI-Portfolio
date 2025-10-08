"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsoleMessage {
  id: number;
  timestamp: string;
  type: 'AI' | 'Code' | 'System' | 'Status' | 'Data';
  message: string;
  color: string;
}

export function AIConsole() {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const messageTemplates = [
    { type: 'AI' as const, messages: [
      'Processing neural network weights...',
      'Training model on new dataset...',
      'Optimizing hyperparameters...',
      'Validating model accuracy...',
      'Deploying AI model to production...',
      'Analyzing sentiment patterns...',
      'Detecting fake news patterns...',
      'Processing natural language queries...'
    ], color: 'text-cyan' },
    { type: 'Code' as const, messages: [
      'Building new feature branch...',
      'Running unit tests...',
      'Deploying to staging environment...',
      'Optimizing database queries...',
      'Refactoring legacy code...',
      'Implementing new API endpoints...',
      'Updating documentation...',
      'Code review completed...'
    ], color: 'text-green-400' },
    { type: 'System' as const, messages: [
      'Checking system dependencies...',
      'Monitoring server performance...',
      'Backing up project files...',
      'Updating security protocols...',
      'Scanning for vulnerabilities...',
      'Optimizing memory usage...',
      'Synchronizing with GitHub...',
      'Validating SSL certificates...'
    ], color: 'text-blue-400' },
    { type: 'Status' as const, messages: [
      '97% model accuracy achieved ✅',
      'All systems operational ✅',
      'Database connection stable ✅',
      'API response time: 45ms ✅',
      'Memory usage: 68% ✅',
      'CPU utilization: 23% ✅',
      'Network latency: 12ms ✅',
      'Security scan passed ✅'
    ], color: 'text-green-500' },
    { type: 'Data' as const, messages: [
      'Processing 10,000+ data points...',
      'Extracting features from dataset...',
      'Cleaning and preprocessing data...',
      'Generating data visualizations...',
      'Exporting results to CSV...',
      'Updating data pipeline...',
      'Validating data integrity...',
      'Creating data backup...'
    ], color: 'text-purple-400' }
  ];

  const addMessage = () => {
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    const message = template.messages[Math.floor(Math.random() * template.messages.length)];
    const timestamp = new Date().toLocaleTimeString();
    
    const newMessage: ConsoleMessage = {
      id: messageIdRef.current++,
      timestamp,
      type: template.type,
      message,
      color: template.color
    };

    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Keep only last 20 messages
      return updated.slice(-20);
    });
  };

  useEffect(() => {
    // Add initial messages
    const initialMessages = [
      { type: 'System' as const, message: 'Initializing AI systems...', color: 'text-blue-400' },
      { type: 'AI' as const, message: 'Loading neural networks...', color: 'text-cyan' },
      { type: 'Status' as const, message: 'All systems online ✅', color: 'text-green-500' }
    ];

    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: messageIdRef.current++,
          timestamp: new Date().toLocaleTimeString(),
          ...msg
        }]);
      }, index * 1000);
    });

    // Add new messages periodically
    const interval = setInterval(addMessage, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-cyan flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          AI System Console
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-textMuted hover:text-cyan transition-colors"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              ref={consoleRef}
              className="h-64 overflow-y-auto bg-black/50 rounded-lg p-4 font-mono text-sm border border-cyan/20"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2 mb-1"
                >
                  <span className="text-textMuted text-xs w-16 flex-shrink-0">
                    {msg.timestamp}
                  </span>
                  <span className={`text-xs font-bold w-12 flex-shrink-0 ${msg.color}`}>
                    [{msg.type}]
                  </span>
                  <span className="text-textLight flex-1">
                    {msg.message}
                  </span>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-start space-x-2 mt-2"
              >
                <span className="text-textMuted text-xs w-16 flex-shrink-0">
                  {new Date().toLocaleTimeString()}
                </span>
                <span className="text-cyan text-xs font-bold w-12 flex-shrink-0">
                  [AI]
                </span>
                <span className="text-textLight flex-1">
                  Processing...
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
