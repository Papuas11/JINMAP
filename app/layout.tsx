import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'JINJA MAPS',
  description: 'Local company discovery map',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
