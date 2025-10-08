"use client";
import { motion } from 'framer-motion';

export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Horizontal scan lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 4px']
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Vertical scan lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 255, 0.05) 2px, rgba(0, 255, 255, 0.05) 4px)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '4px 0px']
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Moving scan beam */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%)',
          width: '100%',
          height: '2px'
        }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Corner glitch effects */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 128, 255, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
    </div>
  );
}
