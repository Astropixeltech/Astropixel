import Layout from "@/components/Layout";
import ContactPage from "@/views/ContactPage";

export const metadata = {
  title: "Contact Us | AstroPixel Creative Design Agency",
  description: "Get in touch with AstroPixel Creative Design Agency in Rajshahi, Bangladesh. Start your next project with us.",
};

export default function Contact() {
  return (
    <Layout>
      <ContactPage />
    </Layout>
  );
}

