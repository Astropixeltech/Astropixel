import Layout from "@/components/Layout";
import AboutPage from "@/views/AboutPage";

export const metadata = {
  title: "About Us | AstroPixel Creative Design Agency",
  description: "Learn about AstroPixel - A creative design agency in Rajshahi, Bangladesh founded by Sofiullah Ahammad.",
};

export default function About() {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
}

