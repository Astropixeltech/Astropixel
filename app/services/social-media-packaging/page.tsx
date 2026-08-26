import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export const metadata = {
  title: "Social Media & Packaging Design Agency | AstroPixel",
  description: "Crafting engaging social media creative assets, campaign banners, editorial layouts, and physical product packaging design.",
  alternates: {
    canonical: "https://astropixel.tech/services/social-media-packaging",
  },
  openGraph: {
    title: "Social Media & Packaging Design Agency | AstroPixel",
    description: "Crafting engaging social media creative assets, campaign banners, editorial layouts, and physical product packaging design.",
    url: "https://astropixel.tech/services/social-media-packaging",
    siteName: "AstroPixel",
    images: [{ url: "https://astropixel.tech/og-image.png", width: 1200, height: 630, alt: "Social Media & Packaging Design" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media & Packaging Design Agency | AstroPixel",
    description: "Crafting engaging social media creative assets, campaign banners, editorial layouts, and physical product packaging design.",
    images: ["https://astropixel.tech/og-image.png"],
  },
};

export default function SocialMediaPackagingPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="social-media-packaging"
        title="Social Media & Packaging Design"
        subtitle="Crafting high-impact social media creatives, ad campaign graphics, print marketing collateral, and custom product packaging."
        badge="Graphics & Packaging"
        primaryKeyword="Social Media & Packaging Design Agency"
        secondaryKeywords={["Social Media Graphic Design", "Product Packaging Design", "Print & Label Design", "Ad Campaign Banners"]}
        description="AstroPixel helps consumer brands, e-commerce stores, and digital businesses build strong visual touchpoints across social channels and physical unboxing experiences."
        features={[
          { title: "Social Media Campaign Kits", desc: "Custom Instagram post grids, carousel templates, LinkedIn banners, and ad design." },
          { title: "Product Packaging & Label Design", desc: "Print-ready box packaging, pouch labels, and 3D product mockup renders." },
          { title: "Marketing Collateral & Print", desc: "Brochures, flyers, business cards, merchandise, and event banner graphics." },
          { title: "Brand Motion Banners", desc: "Animated social stories, promo video graphics, and dynamic GIF banners." }
        ]}
        process={[
          { step: "01", title: "Creative Brief", desc: "Understanding campaign goals, dimensions & print specs." },
          { step: "02", title: "Visual Direction", desc: "Developing moodboards & visual style options." },
          { step: "03", title: "Design & Mockup", desc: "Crafting graphics & 3D realistic packaging mockups." },
          { step: "04", title: "Feedback & Refine", desc: "Polishing typography, color accuracy & alignment." },
          { step: "05", title: "Final Deliverables", desc: "Providing print-ready vector files (AI, PDF) & web formats." }
        ]}
        faqs={[
          { question: "Do you provide print-ready vector files for packaging?", answer: "Yes, we provide 100% print-ready vector dielines (AI, EPS, PDF) along with CMYK color profiles." },
          { question: "Can you design monthly social media graphic templates?", answer: "Yes, we create reusable Figma and Canva social media templates tailored to your brand guidelines." }
        ]}
      />
    </Layout>
  );
}
