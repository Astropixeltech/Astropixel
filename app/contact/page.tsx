import Layout from "@/components/Layout";
import ContactPage from "@/views/ContactPage";

export const metadata = {
  title: "Contact Us | AstroPixel Creative Design Agency",
  description: "Get in touch with AstroPixel Creative Design Agency in Rajshahi, Bangladesh. Start your next project with us.",
  alternates: {
    canonical: "https://astropixel.tech/contact",
  },
  openGraph: {
    title: "Contact Us | AstroPixel Creative Design Agency",
    description: "Get in touch with AstroPixel Creative Design Agency in Rajshahi, Bangladesh. Start your next project with us.",
    url: "https://astropixel.tech/contact",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "Contact AstroPixel Agency" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | AstroPixel Creative Design Agency",
    description: "Get in touch with AstroPixel Creative Design Agency in Rajshahi, Bangladesh. Start your next project with us.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Contact() {
  return (
    <Layout>
      <ContactPage />
    </Layout>
  );
}
