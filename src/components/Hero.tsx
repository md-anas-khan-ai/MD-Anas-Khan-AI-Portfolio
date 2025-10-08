"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SmartResumeGenerator } from './SmartResumeGenerator';

export function Hero() {
  return (
    <section className="relative pt-24" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(125,211,252,0.12),transparent_35%)]" />
      </div>

      <div className="grid sm:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 id="hero-title" className="text-3xl sm:text-5xl font-bold leading-tight holographic-title">
            MD ANAS KHAN
          </h1>
          <p className="mt-3 text-cyan font-medium">
            B.Tech CSE (AI & ML) Student • Aspiring Software Developer • Open to Internships
          </p>
          <p className="mt-4 text-textMuted max-w-xl">
            Focused on algorithmic thinking, clean code, and practical AI/ML applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/resume.pdf" className="btn-outline">
              Download Resume (PDF)
            </Link>
            <SmartResumeGenerator />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="justify-self-center">
          <div className="glass p-2">
            <Image
              src="/images/anas-khan.jpg"
              width={320}
              height={320}
              alt="MD Anas Khan portrait"
              className="rounded-lg object-cover"
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


