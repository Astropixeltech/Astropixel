import Layout from "@/components/Layout";
import NotFoundPage from "@/views/NotFound";

export const metadata = {
  title: "404 - Page Not Found | AstroPixel Agency",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <Layout>
      <NotFoundPage />
    </Layout>
  );
}

