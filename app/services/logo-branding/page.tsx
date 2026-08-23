import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function LogoBrandingPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="logo-branding"
        title="Logo Design & Brand Identity Agency"
        subtitle="Crafting iconic logo designs, comprehensive brand guidelines, and visual identity systems that position your business for market leadership."
        badge="Brand Identity & Strategy"
        primaryKeyword="Logo & Branding Agency"
        secondaryKeywords={["Brand Identity Design", "Logo Design Agency", "Branding Services", "Corporate Identity"]}
        description="AstroPixel crafts memorable brand identities and logos that command attention. Based in Rajshahi, Bangladesh, our creative agency delivers full brand strategy, typography, color palettes, vector assets, and brand books for tech startups and global brands."
        features={[
          { title: "Custom Logo Mark & Logotype", desc: "Original, trademark-ready logo concepts designed for scalability across digital & print." },
          { title: "Complete Brand Guidelines", desc: "Comprehensive brand books defining color palettes, typography hierarchy, and usage rules." },
          { title: "Visual Assets & Stationery", desc: "Business cards, letterheads, email signatures, presentation decks, and social banners." },
          { title: "Brand Re-Positioning & Refresh", desc: "Modernizing legacy brands for digital-first audiences and international markets." }
        ]}
        process={[
          { step: "01", title: "Brand Audit", desc: "Analyzing brand values, competitors, and target audience." },
          { step: "02", title: "Concepting", desc: "Exploring vector logo marks and typography directions." },
          { step: "03", title: "Refinement", desc: "Polishing selected concepts to perfection." },
          { step: "04", title: "Brand Book", desc: "Documenting guidelines and design token standards." },
          { step: "05", title: "Asset Delivery", desc: "Providing full SVG, EPS, PNG, and print-ready files." }
        ]}
        faqs={[
          { question: "Will I own full commercial copyright for my logo?", answer: "Yes, 100% full commercial copyright and master vector files (AI, EPS, SVG) are transferred to you upon project completion." },
          { question: "What is the difference between a logo design and a full brand identity?", answer: "A logo is a single visual mark, whereas a full brand identity includes typography, color systems, brand voice guidelines, and complete marketing asset templates." }
        ]}
      />
    </Layout>
  );
}
