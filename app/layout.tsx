import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/App.css';
import '@/index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://astropixel.tech'),
  title: 'AstroPixel — UI/UX, Branding & Web Development Agency',
  description: 'AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing for clients worldwide.',
  keywords: 'AstroPixel, AstroPixel Agency, UI UX design agency, logo design agency, branding agency Bangladesh, web development agency, SaaS development company, DevOps agency, digital marketing agency, Sofiullah Ahammad, Rajshahi Bangladesh',
  authors: [{ name: 'AstroPixel Creative Design Agency' }],
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
    title: 'AstroPixel — UI/UX, Branding & Web Development Agency',
    description: 'AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing for clients worldwide.',
    siteName: 'AstroPixel',
    images: [
      {
        url: 'https://res.cloudinary.com/dzuex7n2u/image/upload/v1779254926/astropixel/site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AstroPixel — UI/UX, Branding & Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AstroPixel — UI/UX, Branding & Web Development Agency',
    description: 'AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing for clients worldwide.',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'AstroPixel',
    'legalName': 'AstroPixel Creative Design Agency',
    'url': 'https://astropixel.tech/',
    'logo': 'https://astropixel.tech/fav-icon.png',
    'founder': {
      '@type': 'Person',
      'name': 'Sofiullah Ahammad'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Hi-Tech Park',
      'addressLocality': 'Rajshahi',
      'addressCountry': 'Bangladesh'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+8801344497808',
      'email': 'hello@astropixel.tech',
      'contactType': 'customer service'
    },
    'sameAs': [
      'https://www.facebook.com/astropixel.tech',
      'https://www.instagram.com/astropixel.tech/',
      'https://www.linkedin.com/company/astropixel/',
      'https://www.youtube.com/@astropixeltech',
      'https://www.pinterest.com/astropixeltech/',
      'https://clutch.co/profile/astropixel-0',
      'https://share.google/K4AuEFEeRfy3AQCVj',
      'https://www.behance.net/astropixels',
      'https://dribbble.com/astropixel'
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'AstroPixel Creative Design Agency',
    'image': 'https://astropixel.tech/fav-icon.png',
    'url': 'https://astropixel.tech/',
    'telephone': '+8801344497808',
    'email': 'hello@astropixel.tech',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Hi-Tech Park',
      'addressLocality': 'Rajshahi',
      'addressCountry': 'BD'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 24.3745,
      'longitude': 88.6042
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '09:00',
      'closes': '21:00'
    },
    'sameAs': organizationSchema.sameAs
  };

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0D111A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* GA4 Script Initializer */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ASTROPIXEL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ASTROPIXEL');
          `}
        </Script>
        {/* Firebase SDK Detector for Wappalyzer & Tech Trackers */}
        <Script
          src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"
          strategy="afterInteractive"
        />
        <Script id="firebase-wappalyzer-init" strategy="afterInteractive">
          {`
            window.firebase = window.firebase || {};
            window.firebase.SDK_VERSION = '10.8.0';
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
