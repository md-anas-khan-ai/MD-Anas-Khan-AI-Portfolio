"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const motivationalQuotes = [
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Technology is nothing. What's important is that you have faith in people. - Steve Jobs",
  "The best way to predict the future is to invent it. - Alan Kay",
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation is the ability to see change as an opportunity. - Steve Jobs",
  "The computer was born to solve problems that did not exist before. - Bill Gates"
];

export function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Change quote every 30 seconds
    const quoteTimer = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setQuote(randomQuote);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 glass p-4 rounded-lg shadow-glow"
    >
      <div className="text-center">
        <motion.div
          key={time.getTime()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-mono font-bold text-cyan mb-1"
        >
          {formatTime(time)}
        </motion.div>
        
        <div className="text-sm text-textMuted mb-3">
          {formatDate(time)}
        </div>

        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm text-xs text-textMuted italic"
        >
          "{quote}"
        </motion.div>
      </div>
    </motion.div>
  );
}
