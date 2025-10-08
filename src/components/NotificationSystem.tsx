"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration: number;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const systemNotifications = [
      {
        id: 1,
        type: 'success' as const,
        title: 'System Online',
        message: 'All AI modules are operational and ready',
        duration: 5000
      },
      {
        id: 2,
        type: 'info' as const,
        title: 'New Visitor',
        message: 'Welcome to Anas\'s AI Portfolio System',
        duration: 4000
      },
      {
        id: 3,
        type: 'success' as const,
        title: 'GitHub Connected',
        message: 'Live data synchronization active',
        duration: 3000
      }
    ];

    // Show notifications with delays
    systemNotifications.forEach((notification, index) => {
      setTimeout(() => {
        setNotifications(prev => [...prev, notification]);
        
        // Auto-remove after duration
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, notification.duration);
      }, index * 2000);
    });
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-500/10';
      case 'error': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-cyan bg-cyan/10';
      default: return 'border-cyan bg-cyan/10';
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`glass p-4 rounded-lg border-l-4 max-w-sm ${getNotificationColor(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getNotificationIcon(notification.type)}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-cyan text-sm">{notification.title}</h4>
                <p className="text-textMuted text-xs mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-textMuted hover:text-cyan text-sm"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
