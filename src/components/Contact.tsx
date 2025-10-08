"use client";
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Please write a message'),
  _gotcha: z.string().optional(), // honeypot
});

export function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setStatus(parsed.error.issues[0].message);
      return;
    }
    if (parsed.data._gotcha) {
      setStatus('');
      return; // spam
    }

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      const endpoint = formId ? `https://formspree.io/f/${formId}` : '/api/contact';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        }),
      });
      if (res.ok) {
        setStatus('Thanks! I will get back to you soon.');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('Failed to send. Please try again later.');
      }
    } catch {
      setStatus('Network error. Please try again.');
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold holographic-title">Contact</h2>
      <div className="glass p-6">
        <form onSubmit={onSubmit} className="grid gap-4" aria-label="Contact form">
          <input className="bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow" name="name" placeholder="Your name" required />
          <input className="bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow" type="email" name="email" placeholder="Your email" required />
          <textarea className="bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow" name="message" placeholder="Your message" rows={5} required />
          <input className="hidden" tabIndex={-1} autoComplete="off" name="_gotcha" />
          <button className="btn-primary justify-self-start">
            Send Message
          </button>
        </form>
        {status && <p className="mt-3 text-textMuted">{status}</p>}
        <div className="mt-6 flex gap-6 text-textMuted">
          <a href="mailto:md.anaskhan.aiml@gmail.com" className="hover:text-cyan transition-all duration-300">Email</a>
          <a href="https://linkedin.com/in/md-anas-khan-ai" target="_blank" rel="noreferrer" className="hover:text-cyan transition-all duration-300">LinkedIn</a>
          <a href="https://github.com/md-anas-khan-ai" target="_blank" rel="noreferrer" className="hover:text-cyan transition-all duration-300">GitHub</a>
        </div>
      </div>
    </section>
  );
}


