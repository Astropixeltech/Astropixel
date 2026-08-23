import Layout from "@/components/Layout";
import TermsPage from "@/views/TermsPage";

export const metadata = {
  title: "Terms & Conditions | AstroPixel Creative Design Agency",
  description: "Review the Terms & Conditions governing web development, UI/UX design, and agency services provided by AstroPixel Creative Design Agency.",
};

export default function Terms() {
  return (
    <Layout>
      <TermsPage />
    </Layout>
  );
}
