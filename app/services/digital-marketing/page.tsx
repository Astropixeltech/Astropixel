import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function DigitalMarketingPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="digital-marketing"
        title="Performance Marketing & SEO Agency"
        subtitle="Driving qualified organic traffic, high-converting ad campaigns, and brand authority across search engines and digital channels."
        badge="Growth & Performance"
        primaryKeyword="Digital Marketing Agency"
        secondaryKeywords={["SEO Services", "Performance Marketing", "Digital Marketing Services", "Brand Growth"]}
        description="AstroPixel is a result-driven digital marketing agency helping businesses scale online presence. From data-backed Search Engine Optimization (SEO) and technical audits to targeted paid ad campaigns, we turn visitors into loyal clients."
        features={[
          { title: "Search Engine Optimization (SEO)", desc: "Technical SEO audits, keyword research, on-page optimization, content strategy, and authority building." },
          { title: "Performance Paid Ads (PPC)", desc: "High-ROI campaigns across Google Ads, Meta Ads (Facebook & Instagram), and LinkedIn Ads." },
          { title: "Conversion Rate Optimization (CRO)", desc: "A/B landing page testing, UX friction removal, and lead funnel optimization." },
          { title: "Brand Reputation & Entity SEO", desc: "Establishing Google Knowledge Graph authority, local GMB citations, and brand dominance." }
        ]}
        process={[
          { step: "01", title: "Market Audit", desc: "Analyzing keyword opportunities, competitor gaps & conversion funnels." },
          { step: "02", title: "Strategy", desc: "Crafting custom SEO roadmap & paid channel budgets." },
          { step: "03", title: "Execution", desc: "Publishing optimized content, setting up pixel tags & ad campaigns." },
          { step: "04", title: "Optimization", desc: "Monitoring conversion metrics, CPC rates & SERP rankings." },
          { step: "05", title: "Reporting", desc: "Monthly performance reports with transparent ROI analytics." }
        ]}
        faqs={[
          { question: "How long before we see organic SEO results?", answer: "Technical SEO improvements show impact within 4 to 8 weeks, while competitive keyword ranking growth builds steadily over 3 to 6 months." },
          { question: "Do you manage ad spend budgets directly?", answer: "We manage ad strategy and execution transparently directly inside your business ad accounts." }
        ]}
      />
    </Layout>
  );
}
