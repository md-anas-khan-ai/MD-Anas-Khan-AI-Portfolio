"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export function SystemStatus() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const generateMetrics = () => {
      const newMetrics: SystemMetric[] = [
        {
          name: 'Neural Network Load',
          value: Math.random() * 30 + 60,
          unit: '%',
          status: 'excellent',
          trend: 'stable'
        },
        {
          name: 'Data Processing Speed',
          value: Math.random() * 50 + 1200,
          unit: 'ops/sec',
          status: 'good',
          trend: 'up'
        },
        {
          name: 'Memory Efficiency',
          value: Math.random() * 20 + 75,
          unit: '%',
          status: 'excellent',
          trend: 'stable'
        },
        {
          name: 'Response Time',
          value: Math.random() * 10 + 15,
          unit: 'ms',
          status: 'excellent',
          trend: 'down'
        },
        {
          name: 'Model Accuracy',
          value: Math.random() * 5 + 92,
          unit: '%',
          status: 'excellent',
          trend: 'up'
        },
        {
          name: 'System Uptime',
          value: 99.9,
          unit: '%',
          status: 'excellent',
          trend: 'stable'
        }
      ];
      setMetrics(newMetrics);
    };

    generateMetrics();
    const interval = setInterval(generateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-cyan';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-textMuted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          System Status
        </h3>
        <span className="text-xs text-textMuted">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-surface/30 rounded-lg border border-cyan/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-textMuted">{metric.name}</span>
              <span className={`text-xs ${getStatusColor(metric.status)}`}>
                {getTrendIcon(metric.trend)}
              </span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className={`text-xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value.toFixed(metric.unit === '%' ? 1 : 0)}
              </span>
              <span className="text-sm text-textMuted">{metric.unit}</span>
            </div>
            <div className="mt-2 w-full h-1 bg-surface/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className={`h-full rounded-full ${
                  metric.status === 'excellent' ? 'bg-green-400' :
                  metric.status === 'good' ? 'bg-cyan' :
                  metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-cyan/20">
        <div className="flex items-center justify-between text-xs text-textMuted">
          <span>All systems operational</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
