"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GitHubData {
  user: {
    login: string;
    name: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    avatar_url: string;
  };
  repos: Array<{
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }>;
  languages: { [key: string]: number };
  totalStars: number;
  totalForks: number;
}

export function RealGitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Always use demo data (fake activity)
    setIsLoading(true);
    setError('Showing demo GitHub activity');
    setData({
      user: {
        login: 'md-anas-khan-ai',
        name: 'MD Anas Khan',
        public_repos: 13,
        followers: 25,
        following: 15,
        created_at: '2023-01-01T00:00:00Z',
        avatar_url: '/images/anas-khan.jpg'
      },
      repos: [
        {
          name: 'ai-chatbot-college',
          description: 'AI-powered chatbot for college queries using NLP',
          language: 'Python',
          stargazers_count: 12,
          forks_count: 3,
          updated_at: new Date().toISOString()
        },
        {
          name: 'stock-price-prediction',
          description: 'ML model for stock price prediction with 82% accuracy',
          language: 'Python',
          stargazers_count: 8,
          forks_count: 2,
          updated_at: new Date().toISOString()
        },
        {
          name: 'portfolio-website',
          description: 'Advanced AI-powered portfolio with JARVIS theme',
          language: 'TypeScript',
          stargazers_count: 15,
          forks_count: 5,
          updated_at: new Date().toISOString()
        }
      ],
      languages: { Python: 8, TypeScript: 3, JavaScript: 2 },
      totalStars: 35,
      totalForks: 10
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-cyan mb-4">GitHub Activity (Demo)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-surface/50 rounded mb-2"></div>
              <div className="h-8 bg-surface/30 rounded"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  const topLanguages = Object.entries(data.languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3"
        >
          <p className="text-yellow-400 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-cyan">GitHub Activity (Demo)</h3>
          <div className="flex items-center space-x-2">
            <img
              src={data.user.avatar_url}
              alt={data.user.name}
              className="w-8 h-8 rounded-full border border-cyan/30"
            />
            <span className="text-textMuted text-sm">@{data.user.login}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-cyan">{data.user.public_repos}</div>
            <div className="text-sm text-textMuted">Repositories</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-green-400">{data.totalStars}</div>
            <div className="text-sm text-textMuted">Total Stars</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-blue-400">{data.totalForks}</div>
            <div className="text-sm text-textMuted">Forks</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-purple-400">{data.user.followers}</div>
            <div className="text-sm text-textMuted">Followers</div>
          </motion.div>
        </div>

        {/* Language Distribution */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-cyan mb-3">Language Distribution</h4>
          <div className="space-y-2">
            {topLanguages.map(([lang, count], index) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-textMuted w-20">{lang}</span>
                <div className="flex-1 max-w-xs mx-4">
                  <div className="w-full h-2 bg-surface/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...Object.values(data.languages))) * 100}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan to-electric rounded-full"
                    />
                  </div>
                </div>
                <span className="text-cyan font-mono text-sm w-12">{count}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Repositories */}
        <div>
          <h4 className="text-lg font-semibold text-cyan mb-3">Top Repositories</h4>
          <div className="grid gap-3">
            {data.repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-4 bg-surface/30 rounded-lg border border-cyan/20 hover:border-cyan/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-cyan mb-1">{repo.name}</h5>
                    <p className="text-textMuted text-sm mb-2">{repo.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-textMuted">
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-cyan rounded-full"></span>
                        <span>{repo.language}</span>
                      </span>
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
