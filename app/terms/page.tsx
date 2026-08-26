import Layout from "@/components/Layout";
import TermsPage from "@/views/TermsPage";

export const metadata = {
  title: "Terms & Conditions | AstroPixel Creative Design Agency",
  description: "Read the Terms and Conditions governing digital design and software development services at AstroPixel.",
  alternates: {
    canonical: "https://astropixel.tech/terms",
  },
  openGraph: {
    title: "Terms & Conditions | AstroPixel Creative Design Agency",
    description: "Read the Terms and Conditions governing digital design and software development services at AstroPixel.",
    url: "https://astropixel.tech/terms",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "Terms & Conditions AstroPixel" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | AstroPixel Creative Design Agency",
    description: "Read the Terms and Conditions governing digital design and software development services at AstroPixel.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Terms() {
  return (
    <Layout>
      <TermsPage />
    </Layout>
  );
}
