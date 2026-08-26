'use client';

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Star,
  Zap,
  Globe,
  Layers,
  Code,
  Rocket,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import SEO from "@/components/SEO";

export interface ServiceDetailProps {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  features: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export default function ServiceDetailView({
  slug,
  title,
  subtitle,
  badge,
  description,
  primaryKeyword,
  secondaryKeywords,
  features,
  process,
  faqs
}: ServiceDetailProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': primaryKeyword,
    'provider': {
      '@type': 'Organization',
      'name': 'AstroPixel',
      'url': 'https://astropixel.tech/'
    },
    'areaServed': ['Worldwide', 'United States', 'Canada', 'Europe', 'Bangladesh'],
    'description': description
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://astropixel.tech/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services',
        'item': 'https://astropixel.tech/services'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': title,
        'item': `https://astropixel.tech/services/${slug}`
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title={`${title} | AstroPixel Digital Agency`}
        description={description}
        keywords={`${primaryKeyword}, ${secondaryKeywords.join(', ')}, AstroPixel`}
        canonical={`https://astropixel.tech/services/${slug}`}
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />

      <div className="overflow-x-hidden bg-background min-h-screen">
        {/* Hero Section - Matching About / Services Signature Style */}
        <section id="site-hero" className="relative overflow-hidden pt-20 pb-12 lg:pt-28 lg:pb-16 rounded-b-3xl">
          <div className="absolute inset-0 bg-black" />
          <img
            src="/hero-new-bg.png"
            alt={`${title} AstroPixel Agency`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
            style={{ filter: "blur(48px)" }}
          />
          <div 
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{ 
              backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", 
              backgroundSize: "56px 56px" 
            }} 
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white mb-3"
              >
                {title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.15 }}
                className="text-sm lg:text-base text-white/70 max-w-lg mx-auto"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content Body - Clean Light Theme */}
        <section className="pt-16 pb-24 bg-white text-[#0B0F19]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-16">
            
            {/* Overview & Keywords */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Why Partner With AstroPixel for {primaryKeyword}?
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {secondaryKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* TODO: add 300-500 words of service-specific content here */}

            {/* Core Features */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Capabilities & Deliverables</h2>
                <p className="text-slate-600 text-sm">Tailored solutions engineered to drive measurable business growth.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feat, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-7">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Process */}
            <div className="space-y-8 border-t border-slate-200 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Our 5-Step Process</h2>
                <p className="text-slate-600 text-sm">From discovery to deployment and post-launch support.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {process.map((p, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-xs">
                      {p.step}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            <div className="space-y-8 border-t border-slate-200 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <HelpCircle className="w-6 h-6 text-purple-600" /> Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Primary CTA */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white">Ready to Elevate Your Brand with {primaryKeyword}?</h3>
                <p className="text-slate-300 text-sm max-w-xl">
                  Get in touch with AstroPixel today. We build digital products that move businesses forward worldwide.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-100 transition-all shrink-0 flex items-center gap-2 shadow-lg group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
