"use client";
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BootAnimation } from '@/components/BootAnimation';
import { AuraChatbot } from '@/components/AuraChatbot';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { CursorEffect } from '@/components/CursorEffect';
import { ParticleBackground } from '@/components/ParticleBackground';
import { GitHubStats } from '@/components/GitHubStats';
import { AIConsole } from '@/components/AIConsole';
import { ThemeSelector } from '@/components/ThemeSelector';
import { AmbientSound } from '@/components/AmbientSound';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { RealGitHubStats } from '@/components/RealGitHubStats';
import { SystemStatus } from '@/components/SystemStatus';
import { LiveClock } from '@/components/LiveClock';
import { ScanLines } from '@/components/ScanLines';
import { NotificationSystem } from '@/components/NotificationSystem';

export default function HomePage() {
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isBootComplete) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isBootComplete]);

  return (
    <>
      {!isBootComplete && <BootAnimation onComplete={() => setIsBootComplete(true)} />}
      
      {isBootComplete && (
        <>
          <ParticleBackground />
          <ScanLines />
          <CursorEffect />
          <VoiceAssistant onNavigate={handleNavigate} />
          <AuraChatbot />
          <AmbientSound />
          <LiveClock />
          <NotificationSystem />
          
          <div>
            <Navbar />
            <main className="container-responsive space-y-24 py-24">
              <section id="home">
                <Hero />
                <div className="mt-12">
                  <AIConsole />
                </div>
              </section>
              <section id="about">
                <About />
              </section>
              <section id="skills">
                <Skills />
                <div className="mt-12">
                  <RealGitHubStats />
                </div>
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="analytics">
                <AnalyticsDashboard />
                <div className="mt-12">
                  <SystemStatus />
                </div>
              </section>
              <section id="contact">
                <Contact />
              </section>
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}


