import type { Metadata, Viewport } from 'next';
import '@/App.css';
import '@/index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://astropixel.tech'),
  title: 'AstroPixel — Creative Design Agency in Rajshahi, Bangladesh',
  description: 'AstroPixel is a creative design agency in Rajshahi, Bangladesh by Sofiullah Ahammad. Specializing in logo design, branding, UI/UX & web development.',
  keywords: 'AstroPixel, creative agency Rajshahi, logo design Bangladesh, branding agency Bangladesh, UI UX design agency, web design agency, Sofiullah Ahammad',
  authors: [{ name: 'AstroPixel Creative Agency' }],
  alternates: {
    canonical: 'https://astropixel.tech/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://astropixel.tech/',
    title: 'AstroPixel — Creative Design Agency in Rajshahi, Bangladesh',
    description: 'AstroPixel is a creative design agency in Rajshahi, Bangladesh by Sofiullah Ahammad. Specializing in logo design, branding, UI/UX & web development.',
    siteName: 'AstroPixel',
    images: [
      {
        url: 'https://res.cloudinary.com/dzuex7n2u/image/upload/v1779254926/astropixel/site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AstroPixel Creative Design Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AstroPixel — Creative Design Agency in Rajshahi, Bangladesh',
    description: 'AstroPixel is a creative design agency in Rajshahi, Bangladesh by Sofiullah Ahammad. Specializing in logo design, branding, UI/UX & web development.',
    images: ['https://res.cloudinary.com/dzuex7n2u/image/upload/v1779254926/astropixel/site/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="canonical" href="https://astropixel.tech" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="preload" href="/hero-bg-custom.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/marquee/badam.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/marquee/coconuct.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/marquee/GHEE.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/marquee/creativity-to-create.png" as="image" fetchPriority="high" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
