import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/layout/theme-script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-stack',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    default: 'AI/ML Mastery — understand it, build it, teach it',
    template: '%s · AI/ML Mastery',
  },
  description:
    'A complete, adaptive AI/ML learning platform. 214 structured units from Python fundamentals to Generative AI and MLOps, with daily tests, interactive labs and mastery tracking.',
  applicationName: 'AI/ML Mastery',
  keywords: ['machine learning', 'deep learning', 'python', 'AI', 'curriculum', 'interview preparation'],
  authors: [{ name: 'AI/ML Mastery' }],
  openGraph: {
    title: 'AI/ML Mastery',
    description: 'From Python fundamentals to Generative AI — 214 units, daily tests, adaptive learning.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070a12' },
    { media: '(prefers-color-scheme: light)', color: '#f6f8fc' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
