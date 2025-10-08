"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-8 h-8 border-2 border-cyan rounded-full bg-cyan/20 backdrop-blur-sm shadow-glow">
          <div className="w-full h-full border border-cyan/50 rounded-full animate-ping"></div>
        </div>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div className="w-16 h-16 border border-cyan/30 rounded-full bg-cyan/10 backdrop-blur-sm">
          <div className="w-full h-full border border-cyan/20 rounded-full animate-pulse"></div>
        </div>
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="fixed pointer-events-none z-30"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <div className="w-32 h-32 border border-cyan/20 rounded-full bg-cyan/5 backdrop-blur-sm">
          <div className="w-full h-full border border-cyan/10 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </>
  );
}
