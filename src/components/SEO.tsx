'use client';

import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = "AstroPixel — Creative Design Agency in Rajshahi, Bangladesh";
const DEFAULT_DESCRIPTION =
  "AstroPixel is a creative design agency in Rajshahi, Bangladesh by Sofiullah Ahammad. Specializing in logo design, branding, UI/UX & web development.";
const DEFAULT_KEYWORDS =
  "AstroPixel, creative agency Rajshahi, logo design Bangladesh, branding agency Bangladesh, UI UX design agency, web design agency, Sofiullah Ahammad";
const DEFAULT_OG_IMAGE = "https://astropixel.tech/og-image.png";
const DOMAIN = "https://astropixel.tech";

export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SEOProps) => {
  const pathname = usePathname();
  const currentUrl = canonical || `${DOMAIN}${pathname || ''}`;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default SEO;
