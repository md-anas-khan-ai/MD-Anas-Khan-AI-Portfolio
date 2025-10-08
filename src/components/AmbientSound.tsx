"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Create audio context for ambient sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a simple ambient sound using Web Audio API
    const createAmbientSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      // Configure the sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
      filterNode.Q.setValueAtTime(1, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContext.currentTime + 2);
      
      // Connect nodes
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start the oscillator
      oscillator.start();
      
      // Add subtle frequency modulation for more interesting sound
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
      lfoGain.gain.setValueAtTime(10, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      
      return { oscillator, gainNode, lfo };
    };

    let soundNodes: any = null;

    const playSound = () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      soundNodes = createAmbientSound();
    };

    const stopSound = () => {
      if (soundNodes) {
        soundNodes.oscillator.stop();
        soundNodes.lfo.stop();
        soundNodes = null;
      }
    };

    if (isPlaying && !isMuted) {
      playSound();
    } else {
      stopSound();
    }

    return () => {
      stopSound();
    };
  }, [isPlaying, isMuted, volume]);

  const toggleSound = () => {
    if (isMuted) {
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4 }}
      className="fixed top-6 left-6 z-40"
    >
      <div className="glass p-3 rounded-lg shadow-glow">
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSound}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-cyan text-black shadow-glow'
                : 'bg-surface/50 text-cyan border border-cyan/30'
            }`}
            title={isMuted ? 'Enable ambient sound' : 'Disable ambient sound'}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </motion.button>

          {!isMuted && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-surface/50 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00FFFF 0%, #00FFFF ${volume * 100}%, #1A1A1A ${volume * 100}%, #1A1A1A 100%)`
                }}
              />
              <span className="text-xs text-cyan font-mono w-8">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </div>

        <div className="mt-2 text-xs text-center text-textMuted">
          {isMuted ? 'Sound Off' : 'Ambient Mode'}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00FFFF;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00FFFF;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
