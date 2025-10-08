"use client";
import { Navbar } from '@/components/Navbar';
import { AIBrainDemos } from '@/components/AIBrainDemos';
import { AIConsole } from '@/components/AIConsole';
import { Footer } from '@/components/Footer';

export default function AIBrainPage() {
  return (
    <div>
      <Navbar />
      <main className="container-responsive space-y-12 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold holographic-title mb-4">
            Anas's AI Brain
          </h1>
          <p className="text-textMuted max-w-2xl mx-auto">
            Interactive demonstrations of my AI/ML projects. Experience the algorithms in action and see how they work in real-time.
          </p>
        </div>

        <AIBrainDemos />
        <AIConsole />
      </main>
      <Footer />
    </div>
  );
}
