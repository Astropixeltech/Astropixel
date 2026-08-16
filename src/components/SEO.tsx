import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

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
  "AstroPixel is a creative design agency in Rajshahi, Bangladesh, founded by Sofiullah Ahammad. Specializing in logo design, branding, UI/UX, web & social media design. From zero to impact.";
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
  const location = useLocation();
  const currentUrl = canonical || `${DOMAIN}${location.pathname}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AstroPixel" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
