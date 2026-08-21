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
        url: 'https://astropixel.tech/og-image.png',
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
    images: ['https://astropixel.tech/og-image.png'],
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
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
