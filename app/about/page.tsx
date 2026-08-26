import Layout from "@/components/Layout";
import AboutPage from "@/views/AboutPage";

export const metadata = {
  title: "About Us | AstroPixel Creative Design Agency",
  description: "Learn about AstroPixel - A creative design agency in Rajshahi, Bangladesh founded by Sofiullah Ahammad.",
  alternates: {
    canonical: "https://astropixel.tech/about",
  },
  openGraph: {
    title: "About Us | AstroPixel Creative Design Agency",
    description: "Learn about AstroPixel - A creative design agency in Rajshahi, Bangladesh founded by Sofiullah Ahammad.",
    url: "https://astropixel.tech/about",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "About AstroPixel" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | AstroPixel Creative Design Agency",
    description: "Learn about AstroPixel - A creative design agency in Rajshahi, Bangladesh founded by Sofiullah Ahammad.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function About() {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
}