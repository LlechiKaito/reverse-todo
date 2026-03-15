import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';

import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'NOT-To-Do',
  description: 'やめたいことを管理するアプリ',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`h-full ${dmSans.variable} ${fraunces.variable}`}>
      <body className="h-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-dm-sans">
        {children}
      </body>
    </html>
  );
}
