import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { ChatWidget } from '@/components/site/chat-widget';
import { CookieNotice } from '@/components/site/cookie-notice';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

// Display face for the cinematic wordmark only — the body face stays Jakarta.
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
  weight: ['500', '700'],
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
    default: 'HariNex Global — International Technology Transfer & Business Advisory',
    template: '%s | HariNex Global',
  },
  description:
    'HariNex Global helps businesses connect, collaborate and grow internationally through technology transfer, business advisory, supplier sourcing, technical translation, digital solutions and international project management. Headquartered in Taiwan, with representatives in India, South Korea and the United States.',
  keywords: [
    'international technology transfer',
    'international business advisory',
    'cross-border technology commercialisation',
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
    title: 'HariNex Global — International Technology Transfer & Business Advisory',
    description:
      'Connecting innovation and trusted partnerships across the globe. Technology transfer, sourcing, localisation and project management, run from Taiwan into seven markets.',
    locale: 'en_US',
    alternateLocale: ['zh_TW'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HariNex Global — International Technology Transfer & Business Advisory',
    description:
      'Connecting innovation and trusted partnerships across the globe. Technology transfer, sourcing, localisation and project management, run from Taiwan into seven markets.',
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
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable} ${mono.variable}`}>
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
          <ChatWidget />
          <CookieNotice />
        </LanguageProvider>
      </body>
    </html>
  );
}
