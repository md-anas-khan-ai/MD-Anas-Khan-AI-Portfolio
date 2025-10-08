"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ThemeMode = 'jarvis' | 'cyberpunk' | 'matrix' | 'classic';

interface ThemeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  effects: string[];
  icon: string;
}

const themes: Record<ThemeMode, ThemeConfig> = {
  jarvis: {
    name: 'JARVIS Mode',
    description: 'Iron Man inspired interface with cyan and blue accents',
    colors: {
      primary: '#00FFFF',
      secondary: '#0080FF',
      accent: '#FF0080',
      background: '#000000'
    },
    effects: ['Holographic UI', 'Glowing borders', 'Particle effects'],
    icon: '🤖'
  },
  cyberpunk: {
    name: 'Cyberpunk Mode',
    description: 'Neon purple and pink with futuristic aesthetics',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      background: '#0A0A0A'
    },
    effects: ['Neon glows', 'Digital rain', 'Purple accents'],
    icon: '🌃'
  },
  matrix: {
    name: 'Matrix Mode',
    description: 'Green digital rain with terminal aesthetics',
    colors: {
      primary: '#00FF00',
      secondary: '#00CC00',
      accent: '#FFFFFF',
      background: '#000000'
    },
    effects: ['Digital rain', 'Green terminal', 'Matrix code'],
    icon: '💚'
  },
  classic: {
    name: 'Classic Mode',
    description: 'Clean modern design with subtle animations',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF'
    },
    effects: ['Smooth transitions', 'Clean design', 'Minimal effects'],
    icon: '🎨'
  }
};

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('jarvis');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeMode;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: ThemeMode) => {
    const themeConfig = themes[theme];
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', themeConfig.colors.primary);
    root.style.setProperty('--theme-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--theme-accent', themeConfig.colors.accent);
    root.style.setProperty('--theme-background', themeConfig.colors.background);
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  };

  const handleThemeChange = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-surface/50 border border-cyan/30 rounded-lg hover:border-cyan hover:shadow-glow transition-all duration-300"
      >
        <span className="text-lg">{themes[currentTheme].icon}</span>
        <span className="text-cyan font-medium">{themes[currentTheme].name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-cyan"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 glass p-4 rounded-lg shadow-glow-strong z-50"
          >
            <h3 className="text-lg font-semibold text-cyan mb-4">System Modes</h3>
            
            <div className="space-y-3">
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  whileHover={{ x: 5 }}
                  onClick={() => handleThemeChange(key as ThemeMode)}
                  className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                    currentTheme === key
                      ? 'border-cyan bg-cyan/10 shadow-glow'
                      : 'border-borderMuted hover:border-cyan/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{theme.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-cyan">{theme.name}</h4>
                      <p className="text-sm text-textMuted">{theme.description}</p>
                      <div className="flex space-x-1 mt-1">
                        {theme.effects.map((effect, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-surface/50 rounded-full text-cyan"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.colors.secondary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-cyan/20">
              <p className="text-xs text-textMuted">
                Theme preferences are saved locally and will persist across sessions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
