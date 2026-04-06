import type { Metadata } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alcovia Ops Dashboard',
  description: 'Operations dashboard for Alcovia automation systems',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
