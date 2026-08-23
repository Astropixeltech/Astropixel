import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function WebDevelopmentPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="web-development"
        title="Next.js & Modern Web Development Agency"
        subtitle="Engineering ultra-fast, SEO-optimized React & Next.js websites, custom CMS builds, and web platforms engineered for performance."
        badge="Full-Stack Engineering"
        primaryKeyword="Web Development Agency"
        secondaryKeywords={["Web Design & Development", "Next.js Development Agency", "React Web Development", "Headless CMS"]}
        description="AstroPixel is a full-stack web development agency specializing in Next.js, React, Node.js, and TypeScript. We build lightning-fast web applications with clean code, sub-second page loads, mobile responsiveness, and robust SEO architecture."
        features={[
          { title: "Next.js App Router Architecture", desc: "Server-side rendering (SSR), static site generation (SSG), and edge API optimization." },
          { title: "Custom Headless CMS Integration", desc: "Empowering content teams with Strapi, Sanity, or Supabase backend management." },
          { title: "Responsive & Mobile-First Coding", desc: "Pixel-perfect HTML5/Tailwind CSS execution matching design specifications 1:1." },
          { title: "Core Web Vitals & Technical SEO", desc: "100/100 Lighthouse speed scores, structured data, canonical tags, and clean sitemaps." }
        ]}
        process={[
          { step: "01", title: "Architecture", desc: "Planning tech stack, database schema, and APIs." },
          { step: "02", title: "Frontend Dev", desc: "Building modular React components & Tailwind UI." },
          { step: "03", title: "Backend & API", desc: "Developing secure REST & GraphQL endpoints." },
          { step: "04", title: "Testing", desc: "Cross-browser, mobile responsiveness, and speed tests." },
          { step: "05", title: "Deployment", desc: "Deploying to Vercel/AWS with SSL & CDN acceleration." }
        ]}
        faqs={[
          { question: "Why do you use Next.js for web development?", answer: "Next.js delivers unmatched loading speeds, built-in SEO capabilities, server-side rendering, and enterprise-grade reliability." },
          { question: "Do you provide ongoing website maintenance after launch?", answer: "Yes, all custom web development projects include a 30-day post-launch warranty plus flexible ongoing support packages." }
        ]}
      />
    </Layout>
  );
}
