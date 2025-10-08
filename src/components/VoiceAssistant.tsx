"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceAssistantProps {
  onNavigate: (section: string) => void;
}

export function VoiceAssistant({ onNavigate }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setTranscript('');
        };

        recognitionRef.current.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          processCommand(result);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setIsProcessing(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const processCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();

    setTimeout(() => {
      if (lowerCommand.includes('project') || lowerCommand.includes('show project')) {
        onNavigate('projects');
      } else if (lowerCommand.includes('resume') || lowerCommand.includes('show resume')) {
        onNavigate('resume');
      } else if (lowerCommand.includes('skill') || lowerCommand.includes('show skill')) {
        onNavigate('skills');
      } else if (lowerCommand.includes('about') || lowerCommand.includes('show about')) {
        onNavigate('about');
      } else if (lowerCommand.includes('contact') || lowerCommand.includes('show contact')) {
        onNavigate('contact');
      } else if (lowerCommand.includes('home') || lowerCommand.includes('go home')) {
        onNavigate('home');
      } else {
        // Default response for unrecognized commands
        console.log('Command not recognized:', command);
      }
      setIsProcessing(false);
      setTranscript('');
    }, 1000);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed top-6 right-6 z-40">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={isListening ? stopListening : startListening}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 shadow-glow-red animate-pulse' 
            : 'bg-surface border border-cyan/30 hover:border-cyan hover:shadow-glow'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice commands'}
      >
        <motion.div
          animate={isListening ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        >
          {isListening ? (
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          ) : (
            <svg className="w-6 h-6 text-cyan" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Status indicator */}
      <AnimatePresence>
        {(isListening || isProcessing || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-14 right-0 bg-surface/90 backdrop-blur-sm border border-cyan/30 rounded-lg p-3 min-w-[200px]"
          >
            <div className="text-xs text-cyan font-mono">
              {isListening && 'Listening...'}
              {isProcessing && 'Processing...'}
              {transcript && `"${transcript}"`}
            </div>
            {isListening && (
              <div className="flex space-x-1 mt-2">
                <div className="w-1 h-3 bg-cyan rounded-full animate-pulse"></div>
                <div className="w-1 h-3 bg-cyan rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-3 bg-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-3 bg-cyan rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
