"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import skills from '@/data/skills.json';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type SkillDatum = { subject: string; level: number };

const skillDescriptions: { [key: string]: string } = {
  'Python': 'Advanced proficiency in Python for AI/ML, data analysis, and web development',
  'C++': 'Strong foundation in C++ for system programming and algorithmic problem solving',
  'C': 'Solid understanding of C programming for low-level system interactions',
  'JavaScript': 'Modern JavaScript development with React, Next.js, and web technologies',
  'AI/ML': 'Machine Learning expertise with Scikit-learn, TensorFlow, and deep learning',
  'Web Dev': 'Full-stack web development with Flask, React, and modern frameworks'
};

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  // const { ref, animationVariants } = useScrollAnimation();
  const radarData: SkillDatum[] = skills.radar;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold holographic-title">Skills</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="glass p-6 relative overflow-hidden"
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,255,255,0.3)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid stroke="var(--border-muted)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: 'var(--border-muted)', fontSize: 10 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface-dark)', 
                    border: '1px solid var(--border-muted)', 
                    borderRadius: '0.5rem',
                    color: 'var(--text-light)'
                  }} 
                />
                <Radar 
                  dataKey="level" 
                  stroke="var(--primary-cyan)" 
                  fill="var(--primary-cyan)" 
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          
          {/* Hover description */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 p-3 bg-surface/90 backdrop-blur-sm border border-cyan/30 rounded-lg"
            >
              <p className="text-sm text-cyan">{skillDescriptions[hoveredSkill] || 'Skill description'}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="glass p-6 grid sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {skills.groups.map((g, index) => (
            <motion.div 
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <h3 className="font-semibold mb-2 text-cyan group-hover:text-cyan transition-colors">
                {g.title}
              </h3>
              <ul className="text-textMuted space-y-1">
                {g.items.map((i: string) => (
                  <motion.li 
                    key={i}
                    className="flex items-center space-x-2 group-hover:text-textLight transition-colors"
                    whileHover={{ x: 5 }}
                    onHoverStart={() => setHoveredSkill(i)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <div className="w-1 h-1 bg-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{i}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}


