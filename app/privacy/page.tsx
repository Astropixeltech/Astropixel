import Layout from "@/components/Layout";
import PrivacyPage from "@/views/PrivacyPage";

export const metadata = {
  title: "Privacy Policy | AstroPixel Creative Design Agency",
  description: "Learn how AstroPixel Creative Design Agency protects your privacy, manages cookies, and secures client data.",
};

export default function Privacy() {
  return (
    <Layout>
      <PrivacyPage />
    </Layout>
  );
}
