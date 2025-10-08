"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserData {
  name: string;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  preferences: {
    favoriteSection: string;
    timeSpent: number;
  };
}

export function UserPersonalization() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const initializeUser = () => {
      const existingData = localStorage.getItem('portfolio-user-data');
      
      if (existingData) {
        const data: UserData = JSON.parse(existingData);
        data.visitCount += 1;
        data.lastVisit = new Date().toISOString();
        data.preferences.timeSpent += 1;
        
        setUserData(data);
        localStorage.setItem('portfolio-user-data', JSON.stringify(data));
        
        // Show welcome back message
        setTimeout(() => {
          setShowWelcome(true);
          setTimeout(() => setShowWelcome(false), 5000);
        }, 2000);
      } else {
        // First visit
        setIsFirstVisit(true);
        const newUserData: UserData = {
          name: '',
          visitCount: 1,
          firstVisit: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
          preferences: {
            favoriteSection: '',
            timeSpent: 0
          }
        };
        setUserData(newUserData);
        localStorage.setItem('portfolio-user-data', JSON.stringify(newUserData));
      }
    };

    initializeUser();
  }, []);

  const updateUserName = (name: string) => {
    if (userData) {
      const updatedData = { ...userData, name };
      setUserData(updatedData);
      localStorage.setItem('portfolio-user-data', JSON.stringify(updatedData));
    }
  };

  const updateFavoriteSection = (section: string) => {
    if (userData) {
      const updatedData = {
        ...userData,
        preferences: { ...userData.preferences, favoriteSection: section }
      };
      setUserData(updatedData);
      localStorage.setItem('portfolio-user-data', JSON.stringify(updatedData));
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTimeSinceLastVisit = () => {
    if (!userData) return '';
    const lastVisit = new Date(userData.lastVisit);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <>
      {/* Welcome Back Message */}
      <AnimatePresence>
        {showWelcome && userData && userData.name && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 glass p-4 rounded-lg shadow-glow-strong"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-cyan">
                {getGreeting()}, {userData.name}! 👋
              </h3>
              <p className="text-sm text-textMuted">
                Welcome back to Anas's AI Portfolio
              </p>
              <p className="text-xs text-textMuted mt-1">
                Visit #{userData.visitCount} • Last seen {getTimeSinceLastVisit()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First Visit Setup */}
      <AnimatePresence>
        {isFirstVisit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass p-8 max-w-md w-full rounded-lg shadow-glow-strong"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-cyan mb-2">
                  Welcome to Anas's AI System
                </h2>
                <p className="text-textMuted">
                  Let's personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-cyan font-medium mb-2">
                    What should I call you?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow"
                    onChange={(e) => updateUserName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-cyan font-medium mb-2">
                    What interests you most?
                  </label>
                  <select
                    className="w-full bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight focus:border-cyan focus:shadow-glow"
                    onChange={(e) => updateFavoriteSection(e.target.value)}
                  >
                    <option value="">Select an option...</option>
                    <option value="projects">AI/ML Projects</option>
                    <option value="skills">Technical Skills</option>
                    <option value="resume">Resume & Experience</option>
                    <option value="contact">Contact & Collaboration</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsFirstVisit(false)}
                  className="w-full btn-primary"
                >
                  Enter System
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Stats Widget */}
      {userData && userData.name && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-6 left-6 glass p-4 rounded-lg shadow-glow z-40"
        >
          <div className="text-center">
            <h4 className="text-sm font-semibold text-cyan mb-2">
              System Status
            </h4>
            <div className="space-y-1 text-xs text-textMuted">
              <div>User: {userData.name}</div>
              <div>Visits: {userData.visitCount}</div>
              <div>Session: {userData.preferences.timeSpent}min</div>
              {userData.preferences.favoriteSection && (
                <div>Interest: {userData.preferences.favoriteSection}</div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
