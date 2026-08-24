import Layout from "@/components/Layout";
import TermsPage from "@/views/TermsPage";

export const metadata = {
  title: "Terms and Conditions | AstroPixel Creative Design Agency",
  description: "Read the Terms and Conditions for working with AstroPixel Creative Design Agency.",
  alternates: {
    canonical: "https://astropixel.tech/terms",
  },
  openGraph: {
    title: "Terms and Conditions | AstroPixel Creative Design Agency",
    description: "Read the Terms and Conditions for working with AstroPixel Creative Design Agency.",
    url: "https://astropixel.tech/terms",
  },
};

export default function Terms() {
  return (
    <Layout>
      <TermsPage />
    </Layout>
  );
}
