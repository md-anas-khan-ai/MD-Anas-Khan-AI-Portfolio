"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  languages: { [key: string]: number };
  projectsThisYear: number;
  linesOfCode: number;
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalRepos: 0,
    languages: {},
    projectsThisYear: 0,
    linesOfCode: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with realistic data
    const fetchStats = async () => {
      setIsLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in a real implementation, you'd call GitHub API
      setStats({
        totalCommits: 1247,
        totalRepos: 13,
        languages: {
          'Python': 45,
          'JavaScript': 25,
          'TypeScript': 15,
          'C++': 10,
          'C': 5,
        },
        projectsThisYear: 8,
        linesOfCode: 15680,
      });
      
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-cyan mb-4">Live GitHub Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-surface/50 rounded mb-2"></div>
              <div className="h-6 bg-surface/30 rounded"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <h3 className="text-xl font-semibold text-cyan mb-4">Live GitHub Stats</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-surface/30 rounded-lg border border-cyan/20"
        >
          <div className="text-2xl font-bold text-cyan">{stats.totalCommits.toLocaleString()}</div>
          <div className="text-sm text-textMuted">Total Commits</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-surface/30 rounded-lg border border-cyan/20"
        >
          <div className="text-2xl font-bold text-cyan">{stats.totalRepos}</div>
          <div className="text-sm text-textMuted">Repositories</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-surface/30 rounded-lg border border-cyan/20"
        >
          <div className="text-2xl font-bold text-cyan">{stats.projectsThisYear}</div>
          <div className="text-sm text-textMuted">Projects This Year</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4 bg-surface/30 rounded-lg border border-cyan/20"
        >
          <div className="text-2xl font-bold text-cyan">{stats.linesOfCode.toLocaleString()}</div>
          <div className="text-sm text-textMuted">Lines of Code</div>
        </motion.div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-cyan mb-3">Tech Stack Distribution</h4>
        <div className="space-y-2">
          {Object.entries(stats.languages).map(([lang, percentage], index) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-textMuted text-sm">{lang}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-surface/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan to-electric rounded-full"
                  />
                </div>
                <span className="text-cyan text-sm font-mono w-8">{percentage}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
