import Layout from "@/components/Layout";
import IndexPage from "@/views/Index";

export const metadata = {
  title: "AstroPixel — UI/UX, Branding & Web Development Agency",
  description: "AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing.",
  alternates: {
    canonical: "https://astropixel.tech",
  },
  openGraph: {
    title: "AstroPixel — UI/UX, Branding & Web Development Agency",
    description: "AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing.",
    url: "https://astropixel.tech",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "AstroPixel Agency" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroPixel — UI/UX, Branding & Web Development Agency",
    description: "AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Home() {
  return (
    <Layout flushTop>
      <IndexPage />
    </Layout>
  );
}
