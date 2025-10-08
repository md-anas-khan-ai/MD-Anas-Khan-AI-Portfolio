import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'MD ANAS KHAN – AI-Powered Portfolio',
    template: '%s | MD ANAS KHAN',
  },
  description:
    'Advanced AI-powered portfolio of MD Anas Khan - B.Tech CSE (AI & ML) student showcasing cutting-edge projects with JARVIS-style interface.',
  openGraph: {
    title: 'MD ANAS KHAN – AI-Powered Portfolio',
    description:
      'Advanced AI-powered portfolio of MD Anas Khan - B.Tech CSE (AI & ML) student showcasing cutting-edge projects with JARVIS-style interface.',
    url: 'https://your-domain.com',
    siteName: 'MD ANAS KHAN',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-animated overflow-x-hidden">{children}</body>
    </html>
  );
}


