import Layout from "@/components/Layout";
import PrivacyPage from "@/views/PrivacyPage";

export const metadata = {
  title: "Privacy Policy | AstroPixel Creative Design Agency",
  description: "Learn how AstroPixel Creative Design Agency protects your privacy, manages cookies, and secures client data.",
  alternates: {
    canonical: "https://astropixel.tech/privacy",
  },
  openGraph: {
    title: "Privacy Policy | AstroPixel Creative Design Agency",
    description: "Learn how AstroPixel Creative Design Agency protects your privacy, manages cookies, and secures client data.",
    url: "https://astropixel.tech/privacy",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "Privacy Policy AstroPixel" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | AstroPixel Creative Design Agency",
    description: "Learn how AstroPixel Creative Design Agency protects your privacy, manages cookies, and secures client data.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function Privacy() {
  return (
    <Layout>
      <PrivacyPage />
    </Layout>
  );
}
