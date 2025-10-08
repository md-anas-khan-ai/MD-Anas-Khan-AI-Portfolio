"use client";
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { projects as projectData, type ProjectItem, type ProjectCategory } from '@/data/projects';

export function Projects() {
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const [sort, setSort] = useState<'Newest' | 'Oldest' | 'Title'>('Newest');
  const [query, setQuery] = useState('');

  const filtered: ProjectItem[] = useMemo(() => {
    let arr = [...projectData];
    if (category !== 'All') arr = arr.filter((p) => p.category === category);
    if (query.trim()) arr = arr.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'Newest') arr.sort((a, b) => Number(b.year.slice(0, 4)) - Number(a.year.slice(0, 4)));
    if (sort === 'Oldest') arr.sort((a, b) => Number(a.year.slice(0, 4)) - Number(b.year.slice(0, 4)));
    if (sort === 'Title') arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [category, sort]);

  const categories: (ProjectCategory | 'All')[] = ['All', 'Cognitive', 'Predictive', 'Vision', 'Generative', 'Smart', 'AI/ML', 'Web Dev', 'Academic', 'Personal'];

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-semibold holographic-title">Projects</h2>
        <div className="h-1 w-28 rounded bg-[#FF6B00] shadow-[0_0_15px_#FF6B00]" aria-hidden="true" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            className={`px-3 py-2 rounded border tap-target transition-all focus:outline-none focus:ring-2 focus:ring-cyan/50 ${c === category ? 'bg-[#FF6B00] text-black border-[#FF6B00] shadow-[0_0_15px_#FF6B00]' : 'border-cyan/30 hover:ring-2 hover:ring-cyan/40 text-cyan'}`}
            onClick={() => setCategory(c)}
            aria-pressed={c === category}
            aria-current={c === category ? 'true' : undefined}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto w-full sm:w-auto flex items-center gap-2 mt-2 sm:mt-0">
          <label htmlFor="search" className="sr-only">Search projects</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-surface/80 border border-cyan/30 rounded px-3 py-2 text-cyan w-full sm:w-48 placeholder:text-textMuted/70"
            aria-label="Search projects by name"
          />
          <label htmlFor="sort" className="text-textMuted text-sm">Sort</label>
          <select
            id="sort"
            className="bg-surface/80 border border-cyan/30 rounded px-2 py-2 text-cyan w-full sm:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Title</option>
          </select>
        </div>
      </div>

      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="col-span-full text-center text-textMuted py-12 border border-dashed border-cyan/30 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects match your search.
            </motion.div>
          )}
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}


