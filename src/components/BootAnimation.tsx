"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootAnimationProps {
  onComplete: () => void;
}

export function BootAnimation({ onComplete }: BootAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const bootSteps = [
    "Initializing MD ANAS KHAN System...",
    "Loading AI Modules...",
    "Connecting to Neural Networks...",
    "Calibrating Holographic Interface...",
    "System Online ✅"
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const targetText = bootSteps[currentStep];
      let currentIndex = 0;
      setIsTyping(true);
      setDisplayText('');

      const typeInterval = setInterval(() => {
        if (currentIndex < targetText.length) {
          setDisplayText(targetText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Wait before moving to next step
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 1500);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else {
      // Boot sequence complete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto border-4 border-cyan rounded-full flex items-center justify-center"
          >
            <div className="w-24 h-24 border-2 border-cyan rounded-full animate-spin">
              <div className="w-full h-full border-t-2 border-cyan rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-cyan holographic-title"
            >
              JARVIS SYSTEM
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg text-textMuted font-mono min-h-[2rem]"
            >
              {displayText}
              {isTyping && <span className="animate-pulse text-cyan">|</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center space-x-2"
            >
              {bootSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < currentStep ? 'bg-cyan' : 'bg-gray-600'
                  } ${index === currentStep ? 'animate-pulse' : ''}`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-grid-pattern animate-pulse"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
