import Layout from "@/components/Layout";
import WorkPage from "@/views/WorkPage";

export const metadata = {
  title: "Our Work | AstroPixel Creative Portfolio",
  description: "Browse AstroPixel's creative portfolio featuring web design, UI/UX, branding, and design projects.",
};

export default function Work() {
  return (
    <Layout>
      <WorkPage />
    </Layout>
  );
}

