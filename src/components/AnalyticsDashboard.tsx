"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnalyticsData {
  skillsUsage: { skill: string; usage: number; trend: 'up' | 'down' | 'stable' }[];
  projectActivity: { month: string; projects: number; commits: number }[];
  systemStatus: {
    uptime: string;
    performance: number;
    memory: number;
    cpu: number;
  };
  visitorStats: {
    totalVisits: number;
    uniqueVisitors: number;
    avgSessionTime: string;
    bounceRate: number;
  };
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { ref, animationVariants } = useScrollAnimation();

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: AnalyticsData = {
        skillsUsage: [
          { skill: 'Python', usage: 95, trend: 'up' },
          { skill: 'AI/ML', usage: 88, trend: 'up' },
          { skill: 'React', usage: 75, trend: 'stable' },
          { skill: 'Flask', usage: 82, trend: 'up' },
          { skill: 'JavaScript', usage: 70, trend: 'down' },
          { skill: 'C++', usage: 65, trend: 'stable' }
        ],
        projectActivity: [
          { month: 'Jan', projects: 2, commits: 45 },
          { month: 'Feb', projects: 3, commits: 67 },
          { month: 'Mar', projects: 4, commits: 89 },
          { month: 'Apr', projects: 5, commits: 112 },
          { month: 'May', projects: 6, commits: 134 },
          { month: 'Jun', projects: 8, commits: 156 }
        ],
        systemStatus: {
          uptime: '99.9%',
          performance: 94,
          memory: 68,
          cpu: 23
        },
        visitorStats: {
          totalVisits: 1247,
          uniqueVisitors: 892,
          avgSessionTime: '4m 32s',
          bounceRate: 12.5
        }
      };
      
      setData(mockData);
      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-cyan mb-4">System Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-cyan">System Analytics</h3>
      
      {/* System Status */}
      <div className="glass p-6">
        <h4 className="text-lg font-semibold text-cyan mb-4">System Status</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-green-400">{data.systemStatus.uptime}</div>
            <div className="text-sm text-textMuted">Uptime</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-cyan">{data.systemStatus.performance}%</div>
            <div className="text-sm text-textMuted">Performance</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-yellow-400">{data.systemStatus.memory}%</div>
            <div className="text-sm text-textMuted">Memory</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-blue-400">{data.systemStatus.cpu}%</div>
            <div className="text-sm text-textMuted">CPU</div>
          </motion.div>
        </div>
      </div>

      {/* Skills Usage */}
      <div className="glass p-6">
        <h4 className="text-lg font-semibold text-cyan mb-4">Skills Usage Frequency</h4>
        <div className="space-y-3">
          {data.skillsUsage.map((skill, index) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="text-textMuted w-20">{skill.skill}</span>
                <div className="flex-1 max-w-xs">
                  <div className="w-full h-2 bg-surface/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.usage}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan to-electric rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-cyan font-mono text-sm w-12">{skill.usage}%</span>
                <span className={`text-xs ${
                  skill.trend === 'up' ? 'text-green-400' : 
                  skill.trend === 'down' ? 'text-red-400' : 'text-textMuted'
                }`}>
                  {skill.trend === 'up' ? '↗' : skill.trend === 'down' ? '↘' : '→'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Activity */}
      <div className="glass p-6">
        <h4 className="text-lg font-semibold text-cyan mb-4">Project Activity Timeline</h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {data.projectActivity.map((month, index) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-xs text-textMuted mb-1">{month.month}</div>
              <div className="space-y-1">
                <div className="h-8 bg-gradient-to-t from-cyan/20 to-cyan/60 rounded flex items-end justify-center">
                  <span className="text-xs text-cyan font-mono">{month.projects}</span>
                </div>
                <div className="text-xs text-textMuted">{month.commits} commits</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visitor Stats */}
      <div className="glass p-6">
        <h4 className="text-lg font-semibold text-cyan mb-4">Visitor Analytics</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-cyan">{data.visitorStats.totalVisits.toLocaleString()}</div>
            <div className="text-sm text-textMuted">Total Visits</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-green-400">{data.visitorStats.uniqueVisitors.toLocaleString()}</div>
            <div className="text-sm text-textMuted">Unique Visitors</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-yellow-400">{data.visitorStats.avgSessionTime}</div>
            <div className="text-sm text-textMuted">Avg Session</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center p-4 bg-surface/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-blue-400">{data.visitorStats.bounceRate}%</div>
            <div className="text-sm text-textMuted">Bounce Rate</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
