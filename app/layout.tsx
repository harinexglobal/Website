import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HariNex Global — Technology Transfer & Cross-Border Advisory | Taiwan ↔ India',
    template: '%s | HariNex Global',
  },
  description:
    'HariNex Global is a cross-border technology transfer, corporate trade advisory and specialised technical localisation firm bridging Taiwan, India and global markets.',
  keywords: [
    'technology transfer Taiwan India',
    'cross-border advisory',
    'technical translation Traditional Chinese',
    'supplier sourcing Taiwan',
    'regulatory coordination TFDA CDSCO',
    'HariNex Global',
    '瀚瑞國際',
  ],
  authors: [{ name: 'HariNex Global Co., Ltd.' }],
  openGraph: {
    type: 'website',
    siteName: 'HariNex Global',
    title: 'HariNex Global — Technology Transfer & Cross-Border Advisory',
    description:
      'The bilateral gateway for technology transfer, strategic sourcing and industrial execution between Taiwan, India and global markets.',
    locale: 'en_US',
    alternateLocale: ['zh_TW'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HariNex Global — Technology Transfer & Cross-Border Advisory',
    description:
      'The bilateral gateway for technology transfer, strategic sourcing and industrial execution between Taiwan, India and global markets.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-white font-sans">
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>

          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
