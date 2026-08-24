import Layout from "@/components/Layout";
import ServicesPage from "@/views/ServicesPage";

export const metadata = {
  title: "Services | AstroPixel Creative Design Agency",
  description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, and social media graphics.",
  alternates: {
    canonical: "https://astropixel.tech/services",
  },
  openGraph: {
    title: "Services | AstroPixel Creative Design Agency",
    description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, and social media graphics.",
    url: "https://astropixel.tech/services",
  },
};

export default function Services() {
  return (
    <Layout>
      <ServicesPage />
    </Layout>
  );
}

