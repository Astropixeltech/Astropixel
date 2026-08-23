'use client';

import { motion } from "framer-motion";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Lock, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Mail,
  Building2,
  Briefcase
} from "lucide-react";
import SEO from "@/components/SEO";

export default function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms & Conditions | AstroPixel Creative Design Agency"
        description="Terms and Conditions governing digital design and software development services at AstroPixel."
        canonical="https://astropixel.tech/terms"
      />

      <div className="overflow-x-hidden bg-background min-h-screen">
        {/* Hero — Exact About Page & Services Page Hero Header Style */}
        <section id="site-hero" className="relative overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10 rounded-b-3xl">
          {/* Dark base */}
          <div className="absolute inset-0 bg-black" />
          {/* Background image */}
          <img
            src="/hero-new-bg.png"
            alt="AstroPixel Hero Background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
            style={{ filter: "blur(48px)" }}
          />
          {/* Grid backdrop */}
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
                Terms & <span className="font-serif italic font-normal text-white">Conditions</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.15 }}
                className="text-sm lg:text-base text-white/70 max-w-lg mx-auto"
              >
                Last updated: January 2026 • AstroPixel Creative Design Agency
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content Container - Light Background matching AstroPixel Content Sections */}
        <section className="pt-12 sm:pt-16 pb-24 bg-white text-[#0B0F19]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10 sm:space-y-12">
            {/* Introduction Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-700" /> Terms Overview
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) govern your engagement with <strong className="text-slate-900 font-semibold">AstroPixel Creative Design Agency</strong> (&quot;AstroPixel&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;) across our official website (<strong className="text-slate-900">https://astropixel.tech</strong>), design proposals, and software engineering deliverables.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                By commissioning a project or accessing our services, you confirm that you have read, understood, and agreed to be legally bound by these terms.
              </p>
            </div>

            {/* Section 1: Services & Deliverables */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-700" /> 1. Scope of Services & Deliverables
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                AstroPixel delivers professional digital agency services including UI/UX design, custom web & mobile application development, brand identity assets, and custom AI workflows.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base">
                <li><strong className="text-slate-900">Project Proposals:</strong> Specific deliverables, milestone schedules, and requirements are defined in approved client statements of work.</li>
                <li><strong className="text-slate-900">Revisions:</strong> Standard project proposals include up to 2 major design revision cycles. Scope expansion beyond agreed requirements is billed at standard hourly rates.</li>
              </ul>
            </section>

            {/* Section 2: Payments & Invoicing */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-slate-700" /> 2. Payment Terms & Invoicing
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our payment terms ensure smooth execution and milestone delivery:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Initial Deposit</span>
                  <p className="text-xs text-slate-600">A 50% upfront deposit is required prior to project kickoff.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Final Settlement</span>
                  <p className="text-xs text-slate-600">The remaining 50% is due prior to final code deployment or asset transfer.</p>
                </div>
              </div>
            </section>

            {/* Section 3: Intellectual Property */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-700" /> 3. Intellectual Property Rights
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Upon 100% settlement of all project invoices, full ownership of final design assets, source code, and brand materials is transferred to the Client.
              </p>
              <p className="text-xs text-slate-500">
                *AstroPixel reserves the right to display completed design work in our agency portfolio unless restricted by a signed Non-Disclosure Agreement (NDA).
              </p>
            </section>

            {/* Section 4: Limitation of Liability */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-700" /> 4. Warranties & Limitation of Liability
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                AstroPixel warrants that services will be performed with professional diligence. We provide a 30-day post-launch warranty for custom web development.
              </p>
              <p className="text-xs text-slate-500">
                In no event shall AstroPixel or its founder, Sofiullah Ahammad, be liable for indirect or third-party server downtime damages exceeding total fees paid.
              </p>
            </section>

            {/* Contact Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-cyan-400" /> Contact Support
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If you have any questions regarding these Terms & Conditions, please contact us:
              </p>
              <div className="pt-2 text-xs sm:text-sm text-slate-200 space-y-1">
                <p><strong className="text-white">By Email:</strong> hello@astropixel.tech</p>
                <p><strong className="text-white">Website:</strong> https://astropixel.tech/</p>
                <p><strong className="text-white">Company:</strong> AstroPixel Creative Design Agency, Rajshahi, Bangladesh</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
