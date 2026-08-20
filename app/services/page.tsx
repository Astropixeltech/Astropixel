import Layout from "@/components/Layout";
import ServicesPage from "@/views/ServicesPage";

export const metadata = {
  title: "Services | AstroPixel Creative Design Agency",
  description: "Explore AstroPixel's creative services: UI/UX design, branding, logo design, web development, and social media graphics.",
};

export default function Services() {
  return (
    <Layout>
      <ServicesPage />
    </Layout>
  );
}

