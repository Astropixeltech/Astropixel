import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function SaaSDevelopmentPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="saas-development"
        title="SaaS Product Engineering & MVP Development"
        subtitle="Transforming complex SaaS product ideas into scalable, production-ready web applications with multi-tenant architecture and seamless Stripe payments."
        badge="SaaS Engineering"
        primaryKeyword="SaaS Development Company"
        secondaryKeywords={["SaaS Development Agency", "SaaS Product Development", "MVP Engineering", "SaaS Application Architecture"]}
        description="AstroPixel helps founders and product teams build, launch, and scale Software-as-a-Service (SaaS) products. From MVP validation to enterprise SaaS architecture, our engineering team in Bangladesh delivers high-margin software solutions."
        features={[
          { title: "SaaS MVP Development", desc: "Rapid 6-8 week MVP build cycles to validate core product value with real paying users." },
          { title: "Multi-Tenant Database Architecture", desc: "Secure data isolation, role-based permissions (RBAC), and tenant management." },
          { title: "Stripe & Subscription Billing Integration", desc: "Automated recurring billing, trial periods, invoices, and subscription downgrades/upgrades." },
          { title: "AI & Custom API Integrations", desc: "Embedding OpenAI, Anthropic LLMs, or custom microservices directly into your SaaS workflow." }
        ]}
        process={[
          { step: "01", title: "Product Blueprint", desc: "Mapping core feature set & MVP scope." },
          { step: "02", title: "UX & DB Schema", desc: "Designing multi-tenant architecture & UI workflows." },
          { step: "03", title: "Agile Development", desc: "Sprint-based frontend and backend engineering." },
          { step: "04", title: "Billing & Auth", desc: "Integrating authentication, Stripe, and emails." },
          { step: "05", title: "Launch & Scale", desc: "Production release on AWS/Vercel with monitoring." }
        ]}
        faqs={[
          { question: "How long does it take to launch a SaaS MVP with AstroPixel?", answer: "Our structured SaaS MVP development program delivers launch-ready products within 6 to 10 weeks." },
          { question: "Can you help integrate AI functionality into our existing SaaS?", answer: "Yes, we build custom AI workflows, LLM agents, vector database search, and automated data processing tools." }
        ]}
      />
    </Layout>
  );
}
