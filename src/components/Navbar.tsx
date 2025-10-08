"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeSelector } from './ThemeSelector';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-cyan/30 shadow-glow' : 'bg-transparent'
      }`}
    >
      <nav className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-cyan holographic-title">MD ANAS KHAN</Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <ThemeSelector />
        </div>

        <button
          className="md:hidden p-3 rounded hover:bg-white/5 tap-target"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="block w-6 h-0.5 bg-surfaceLight mb-1" />
          <span className="block w-6 h-0.5 bg-surfaceLight mb-1" />
          <span className="block w-6 h-0.5 bg-surfaceLight" />
        </button>

        <ul className="hidden md:flex gap-6 text-textMuted">
          <li>
            <Link 
              href="/#about" 
              className={`hover:text-cyan transition-all duration-300 relative ${
                activeSection === 'about' ? 'text-cyan' : ''
              }`}
            >
              About
              {activeSection === 'about' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
          <li>
            <Link 
              href="/ai-brain" 
              className="hover:text-cyan transition-all duration-300"
            >
              AI Brain
            </Link>
          </li>
          <li>
            <Link 
              href="/#projects" 
              className={`hover:text-cyan transition-all duration-300 relative ${
                activeSection === 'projects' ? 'text-cyan' : ''
              }`}
            >
              Projects
              {activeSection === 'projects' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
          <li>
            <Link 
              href="/resume" 
              className="hover:text-cyan transition-all duration-300"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link 
              href="/#contact" 
              className={`hover:text-cyan transition-all duration-300 relative ${
                activeSection === 'contact' ? 'text-cyan' : ''
              }`}
            >
              Contact
              {activeSection === 'contact' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="md:hidden border-t border-cyan/30 bg-dark/95 backdrop-blur-md">
          <ul className="container-responsive py-4 space-y-3 text-textMuted">
            <li><Link href="/#about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/ai-brain" onClick={() => setOpen(false)}>AI Brain</Link></li>
            <li><Link href="/#projects" onClick={() => setOpen(false)}>Projects</Link></li>
            <li><Link href="/resume" onClick={() => setOpen(false)}>Resume</Link></li>
            <li><Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li className="pt-2">
              <ThemeSelector />
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}


