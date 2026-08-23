import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function UIUXDesignPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="ui-ux-design"
        title="UI/UX Design & Product Strategy Agency"
        subtitle="We design intuitive, high-converting digital products, mobile apps, and SaaS interfaces for growth-stage startups and enterprises worldwide."
        badge="Product Design & Strategy"
        primaryKeyword="UI/UX Design Agency"
        secondaryKeywords={["UI/UX Design Company", "Product Design Agency", "UX Design Services", "SaaS UI UX"]}
        description="AstroPixel is a premier UI/UX design agency in Rajshahi, Bangladesh serving international clients across the US, Canada, Europe, and Asia. We blend deep user research, wireframing, interactive prototyping, and design systems to build digital experiences users love."
        features={[
          { title: "User Research & Discovery", desc: "Comprehensive user personas, journey mapping, usability testing, and competitor benchmarking." },
          { title: "SaaS & Web App UI/UX", desc: "Complex dashboard layouts, workflows, data visualization, and seamless user onboarding." },
          { title: "Mobile App Design (iOS & Android)", desc: "Pixel-perfect mobile interfaces tailored for native iOS and Android user behavior." },
          { title: "Design Systems & Component Libraries", desc: "Scalable Figma design systems, UI kits, and tokenized component guidelines." }
        ]}
        process={[
          { step: "01", title: "Discovery", desc: "Understanding goals, audience, and market requirements." },
          { step: "02", title: "Wireframing", desc: "Structuring UX flow & information architecture." },
          { step: "03", title: "Visual UI Design", desc: "Crafting modern, accessible, high-fidelity interfaces." },
          { step: "04", title: "Prototyping", desc: "Building interactive Figma flows for user testing." },
          { step: "05", title: "Hand-off", desc: "Seamless developer hand-off with design tokens & specs." }
        ]}
        faqs={[
          { question: "What deliverables are included in a UI/UX design project?", answer: "Complete Figma source files, interactive prototypes, user flow maps, mobile & desktop breakpoints, and structured component libraries." },
          { question: "How long does a typical SaaS UI/UX design project take?", answer: "Most SaaS MVP designs take between 3 to 6 weeks depending on complex workflows and revision iterations." }
        ]}
      />
    </Layout>
  );
}
