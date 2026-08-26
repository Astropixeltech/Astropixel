import Layout from "@/components/Layout";
import WorkPage from "@/views/WorkPage";

export const metadata = {
  title: "Our Work | AstroPixel Creative Portfolio",
  description: "Browse AstroPixel's creative portfolio featuring web design, UI/UX, branding, and design projects.",
  alternates: {
    canonical: "https://astropixel.tech/work",
  },
  openGraph: {
    title: "Our Work | AstroPixel Creative Portfolio",
    description: "Browse AstroPixel's creative portfolio featuring web design, UI/UX, branding, and design projects.",
    url: "https://astropixel.tech/work",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "AstroPixel Portfolio Work" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | AstroPixel Creative Portfolio",
    description: "Browse AstroPixel's creative portfolio featuring web design, UI/UX, branding, and design projects.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Work() {
  return (
    <Layout>
      <WorkPage />
    </Layout>
  );
}