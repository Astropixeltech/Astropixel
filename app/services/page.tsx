import Layout from "@/components/Layout";
import ServicesPage from "@/views/ServicesPage";

export const metadata = {
  title: "Services | AstroPixel Creative Design Agency",
  description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, SaaS, and digital marketing.",
  alternates: {
    canonical: "https://astropixel.tech/services",
  },
  openGraph: {
    title: "Services | AstroPixel Creative Design Agency",
    description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, SaaS, and digital marketing.",
    url: "https://astropixel.tech/services",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "AstroPixel Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | AstroPixel Creative Design Agency",
    description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, SaaS, and digital marketing.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Services() {
  return (
    <Layout>
      <ServicesPage />
    </Layout>
  );
}
