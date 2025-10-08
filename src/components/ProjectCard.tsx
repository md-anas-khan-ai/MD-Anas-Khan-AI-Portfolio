"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectItem } from '@/data/projects';

export function ProjectCard({ project }: { project: ProjectItem }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article whileHover={{ y: -3, scale: 1.03 }} className="glass p-5 transition-all duration-300 shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_15px_#FF6B00]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-textMuted text-sm">{project.year} · {project.category}</p>
        </div>
        <button className="px-3 py-1 rounded border border-cyan hover:bg-cyan/10 text-cyan transition-all duration-300" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-controls={`project-modal-${project.id}`}>
          Details
        </button>
      </div>
      {project.image && (
        <div className="mt-3">
          <Image src={project.image} alt={`${project.title} preview`} width={800} height={450} className="rounded-md border border-cyan/30 object-cover w-full h-40" />
        </div>
      )}
      <p className="mt-3 text-textMuted">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        {project.github && (
          <Link href={project.github} className="text-cyan hover:underline transition-all duration-300" target="_blank" rel="noreferrer">
            GitHub
          </Link>
        )}
        {project.liveDemo && (
          <Link href={project.liveDemo} className="text-cyan hover:underline transition-all duration-300" target="_blank" rel="noreferrer">
            Live
          </Link>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-title-${project.id}`}
              id={`project-modal-${project.id}`}
              className="glass p-6 max-w-lg w-full mx-4 ring-1 ring-[#FF6B00]/40 shadow-[0_0_15px_#FF6B00]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h4 id={`project-title-${project.id}`} className="font-semibold">{project.title} – Details</h4>
                <button className="px-2 py-1 rounded hover:bg-white/5" onClick={() => setOpen(false)} aria-label="Close modal">
                  ✕
                </button>
              </div>
              <div className="mt-4 text-textMuted space-y-3">
                {project.image && (
                  <div className="rounded-lg overflow-hidden ring-1 ring-[#FF6B00]/30 shadow-[0_0_15px_#FF6B00]">
                    <Image src={project.image} alt={`${project.title} preview`} width={1200} height={675} className="w-full h-48 object-cover" />
                  </div>
                )}
                <svg viewBox="0 0 300 120" className="w-full h-28" role="img" aria-label="Architecture diagram">
                  <rect x="10" y="20" width="80" height="40" rx="6" fill="#0EA5E9" opacity="0.4" />
                  <text x="50" y="45" fontSize="10" textAnchor="middle" fill="#F8FAFC">Client</text>
                  <rect x="110" y="20" width="80" height="40" rx="6" fill="#7DD3FC" opacity="0.4" />
                  <text x="150" y="45" fontSize="10" textAnchor="middle" fill="#F8FAFC">API</text>
                  <rect x="210" y="20" width="80" height="40" rx="6" fill="#0EA5E9" opacity="0.4" />
                  <text x="250" y="45" fontSize="10" textAnchor="middle" fill="#F8FAFC">Model</text>
                  <line x1="90" y1="40" x2="110" y2="40" stroke="#94A3B8" />
                  <line x1="190" y1="40" x2="210" y2="40" stroke="#94A3B8" />
                </svg>
                <ul className="list-disc list-inside">
                  {(project.outcomes && project.outcomes.length > 0 ? project.outcomes : [
                    'Clean API boundaries and modular components',
                    'Measured outcomes and accuracy improvements',
                  ]).map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <div className="flex gap-3 pt-2">
                  {project.github && (
                    <Link href={project.github} className="btn-outline" target="_blank" rel="noreferrer">GitHub</Link>
                  )}
                  {project.liveDemo && (
                    <Link href={project.liveDemo} className="btn-primary" target="_blank" rel="noreferrer">Demo</Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}


