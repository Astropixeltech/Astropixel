'use client';

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Globe, Zap, Target, CheckCircle, ArrowRight, Sparkles, Rocket, Heart, Camera, Palette, Code, Instagram, Facebook, Linkedin, ExternalLink, Plus, Minus } from "lucide-react";
import Link from "next/link";

import logoFullPng from "@/assets/logo-full.png";
import logoAssetJson from "@/assets/logo.png.asset.json";
import journeyLogoJson from "@/assets/alphazero-up-logo.png.asset.json";
const logo = (logoFullPng as any)?.src || logoFullPng || logoAssetJson.url;
const journeyLogo = (logoFullPng as any)?.src || logoFullPng || journeyLogoJson.url;
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import heroBgCustom from "@/assets/hero-bg-custom.webp";
const heroBgUrl = (heroBgCustom as any)?.src || heroBgCustom;
import ctaBlueWaves from "@/assets/about-cta-blue-waves.png.asset.json";
import TeamBento from "@/components/TeamBento";
import { Users, Award } from "lucide-react";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { useHomepageSection, useHomepageSectionItems } from "@/hooks/useHomepageSections";
import brand1 from "@/assets/brands/b1.png.asset.json";
import brand2 from "@/assets/brands/b2.png.asset.json";
import brand3 from "@/assets/brands/b3.png.asset.json";
import brand4 from "@/assets/brands/b4.png.asset.json";


import SEO from "@/components/SEO";

const AboutPage = () => {
  const { t } = useLanguage();
  const { getContent } = usePageContent('about');
  const { data: teamMembers } = useTeamMembers();
  const { section: sisterSection } = useHomepageSection('sister_brands', 'agency', 'home');
  const { data: sisterItems } = useHomepageSectionItems(sisterSection?.id);

  const founder = teamMembers?.find(m => m.name.toLowerCase().includes('sofiullah') || m.role.toLowerCase().includes('founder'));

  const c = (key: string, translationKey: string) => {
    const dbContent = getContent(key);
    return dbContent || t(translationKey);
  };

  const values = [
    { icon: Target, title: c("values.brandFocused", "about.values.brandFocused"), desc: c("values.brandFocusedDesc", "about.values.brandFocusedDesc") },
    { icon: Zap, title: c("values.zeroToImpact", "about.values.zeroToImpact"), desc: c("values.zeroToImpactDesc", "about.values.zeroToImpactDesc") },
    { icon: Globe, title: c("values.globalReach", "about.values.globalReach"), desc: c("values.globalReachDesc", "about.values.globalReachDesc") },
  ];

  const whyChoose = [
    c("why1", "about.why1"), c("why2", "about.why2"), c("why3", "about.why3"), c("why4", "about.why4"), c("why5", "about.why5"),
  ];

  const locationAddress =
    getContent("location.address") ||
    getContent("location.description") ||
    t("about.location.address");

  const locationDescription =
    getContent("location.desc") ||
    t("about.location.desc");

  const founderExpertise = [
    { icon: Camera, label: "Photography" },
    { icon: Palette, label: "Graphic Design" },
    { icon: Code, label: "Web Development" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <>
      <SEO 
        title="About AstroPixel — Founder Sofiullah Ahammad" 
        description="Learn about AstroPixel, a creative design agency in Rajshahi, Bangladesh, founded by Sofiullah Ahammad. From zero to impact." 
        canonical="https://astropixel.tech/about" 
        jsonLd={faqSchema}
      />
      <div className="overflow-x-hidden">
      {/* Hero — Services style */}
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
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white mb-3">
              About <span className="font-serif italic font-normal text-white">Us</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-sm lg:text-base text-white/70 max-w-lg mx-auto">
              A creative design agency building bold brands and digital experiences from Rajshahi, Bangladesh.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="pt-28 lg:pt-36 pb-2 lg:pb-2 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Split editorial header */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center mb-20 lg:mb-28">
              {/* Left: Standalone Favicon Logo (30% width) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3 relative flex items-center justify-center min-h-[200px] lg:min-h-[280px]"
              >
                <motion.img
                  src="/fav-icon.png"
                  alt="AstroPixel Favicon Logo"
                  width={280}
                  height={280}
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Right: label + heading + copy + button (70% width) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="text-sm text-muted-foreground tracking-wide mb-6">
                  / {(c("story.badge", "about.story.badge") || "about").toLowerCase()} /
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-8">
                  {c("story.title", "about.story.title")}{" "}
                  <span className="font-serif italic font-normal gradient-text">Astropixel</span>{" "}
                  {c("story.title2", "about.story.title2")}
                </h2>
                <div className="space-y-5 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
                  <p>{c("story.card1.desc", "about.story.card1.desc")}</p>
                  <p>{c("story.card2.desc", "about.story.card2.desc")}</p>
                </div>
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 pl-2 pr-6 py-2 rounded-full border border-primary/40 text-sm font-medium hover:bg-primary/5 transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/40 text-primary group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                  <span className="gradient-text font-semibold">Explore more</span>
                </a>
              </motion.div>
            </div>


          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="pt-2 lg:pt-2 pb-8 lg:pb-12 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-5 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
                <span>›</span><span>Team</span><span>‹</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight">People <span className="font-serif italic font-normal">behind</span> the work</h2>
            </motion.div>
            <TeamBento />
          </div>
        </div>
      </section>

      {/* Brand Constellation Section */}
      <section className="py-20 lg:py-28 relative bg-white overflow-hidden">
        {/* Boxy grid pattern background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h2 className="font-display font-bold leading-[1.05] tracking-tight text-3xl sm:text-4xl lg:text-5xl text-black">
              {(() => {
                const t = (sisterSection?.title || 'Our brand constellation').trim();
                const words = t.split(' ');
                const first = words.slice(0, Math.max(1, words.length - 1)).join(' ');
                const last = words[words.length - 1] || '';
                return (
                  <>
                    <span className="text-black/60">{first}</span>{" "}
                    <span className="text-black relative">
                      {last}
                      <span className="absolute -top-1 -right-3 text-cyan-300 text-xs animate-pulse">✦</span>
                    </span>
                  </>
                );
              })()}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {(() => {
              const activeSister = (sisterItems ?? []).filter((it) => it.is_active && it.image_url);
              const sisterLogos = activeSister.length
                ? activeSister.map((it, i) => ({
                    src: (it.title?.toLowerCase().includes('wiki') || it.image_url?.includes('wiki')) ? '/brands/bepro-click.png' : (it.image_url as string),
                    alt: it.title || `Brand ${i + 1}`,
                    href: it.url || undefined,
                    invert: true,
                    large: i === activeSister.length - 1,
                  }))
                : [
                    { src: "/brands/static-vibes.png", alt: "Static Vibes", invert: true },
                    { src: "/brands/bepro-click.png", alt: "Bepro.click", href: "https://bepro.click", invert: true },
                    { src: brand3.url, alt: "Alpha Portfolio", href: "https://portfolio.astropixel.tech/", invert: true },
                    { src: brand4.url, alt: "Learn with Astropixel", invert: true, large: true },
                  ];
              return <LogoCloud logos={sisterLogos} />;
            })()}
          </motion.div>
        </div>
      </section>

      {/* Process cards — floating tilted cards with dynamically-aligned red S-curve connectors */}
      <section data-process-section className="pt-8 lg:pt-12 pb-2 lg:pb-2 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FAFAFA 0%, #F3F3F4 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4 lg:mb-6"
            >
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                <span>›</span><span>VALUES</span><span>‹</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight">Built on Strong Values</h2>
            </motion.div>
            <ProcessCards values={values} />
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <FaqSection />

      

      </div>
    </>

  );
};

const FAQS = [
  { q: "How Much Does A Design Project Cost?", a: "Project pricing depends on scope, complexity, and timeline. We share a clear quote after a short discovery call — no hidden costs, no surprises." },
  { q: "How Long Does A Project Take?", a: "Most projects are completed within a few days to a couple of weeks, depending on the requirements and revisions." },
  { q: "What Design Services Do You Offer?", a: "Brand identity, graphic design, web design & development, UI/UX, video & motion, and SEO / content marketing — all under one roof." },
  { q: "Do You Offer Revisions?", a: "Yes — every package includes multiple rounds of revisions so we can refine the work until it feels exactly right." },
  { q: "How Do We Get Started?", a: "Click Get Started, share a few details about your project, and we'll reach out within 24 hours to plan the next step." },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <section className="px-4 md:px-8 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[28px] md:rounded-[36px] p-8 md:p-14 lg:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(180deg,#ECFEFF 0%,#D5F8FE 42%,#F5FEFF 78%,#FFFFFF 100%)",
            boxShadow: "inset 0 -120px 110px -65px rgba(255,255,255,0.98)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-white/75 to-white pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start mb-10 md:mb-14">
            <div className="relative">
              <h2 className="font-display font-bold text-[#083344] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Frequently<br />Asked Question
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[#155E75] text-base md:text-[17px] leading-relaxed max-w-md">
                Have questions about our design services? Here are some common queries to help you understand how we work and what you can expect.
              </p>
              <Link href="/contact" className="inline-flex w-fit items-center justify-center px-7 py-3 rounded-full text-white font-semibold shadow-[0_10px_30px_-8px_rgba(8,145,178,0.55)] transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#06B6D4 0%,#0891B2 100%)" }}>
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-white shadow-[0_10px_30px_-20px_rgba(8,145,178,0.15)] overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left">
                    <span className="font-display font-semibold text-[#083344] text-base md:text-lg">{item.q}</span>
                    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-[#0891B2] text-white" : "border border-[#A5F3FC] text-[#0891B2]"}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-8 pb-6 text-[#164E63] leading-relaxed">{item.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};



const faqs = [
  { 
    q: "What services does AstroPixel offer?", 
    a: "AstroPixel is a full-service creative design and software development agency. We specialize in UI/UX design, custom web and SaaS development, brand identity and logo design, DevOps cloud engineering, and performance digital marketing tailored for global startups and enterprises." 
  },
  { 
    q: "Do you work with international startups and small businesses?", 
    a: "Yes, AstroPixel works with clients worldwide including the US, Canada, Europe, Asia, and Bangladesh. We tailor custom design and software development strategies for every stage—from early-stage founders building an MVP to established enterprises scaling digital products." 
  },
  { 
    q: "How long does a typical web design project take?", 
    a: "A typical web design or branding project takes between 2 to 6 weeks depending on project complexity and scope requirements. We provide a clear milestone roadmap and timeline before project kickoff to ensure transparent delivery." 
  },
  { 
    q: "Can I learn digital design and programming skills with AstroPixel?", 
    a: "Yes, AstroPixel Learn offers comprehensive academy courses in UI/UX design, web development, graphic design, and freelancing taught by industry practitioners to empower aspiring designers and software engineers." 
  },
  { 
    q: "How do I start a project with AstroPixel?", 
    a: "You can start a project by contacting our team via email at hello@astropixel.tech or booking a consultation on our contact page. We conduct an initial discovery session to outline your project goals and scope." 
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="pt-2 lg:pt-2 pb-16 lg:pb-24 relative" style={{ background: "linear-gradient(180deg, #F3F3F4 0%, #FAFAFA 100%)" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
            <span>›</span> FAQ <span>‹</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
            Everything you need to know before working with us — or learning with us.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 lg:px-8 lg:py-6 text-left"
                >
                  <span className="font-display text-lg lg:text-xl font-semibold">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)" }}
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 lg:px-8 lg:pb-7 text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type ProcessValue = { icon: any; title: string; desc: string };

const ProcessCards = ({ values }: { values: ProcessValue[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<{ d: string; x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const positions = [
    "md:absolute md:left-0 md:top-[158px] md:w-[285px] lg:w-[300px]",
    "md:absolute md:left-[calc(50%-142px)] lg:left-[calc(50%-150px)] md:top-[46px] md:w-[285px] lg:w-[300px]",
    "md:absolute md:right-0 md:top-[178px] md:w-[285px] lg:w-[300px]",
  ];
  const rotations = [-4, 2, 4];
  const zIndex = [30, 30, 30];

  const compute = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next: typeof paths = [];
    for (let i = 0; i < cardRefs.current.length - 1; i++) {
      const a = cardRefs.current[i];
      const b = cardRefs.current[i + 1];
      if (!a || !b) continue;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const isVertical = Math.abs(br.top - ar.top) > Math.abs(br.left - ar.left);
      let x1: number, y1: number, x2: number, y2: number, d: string;
      if (isVertical) {
        // Mobile: connect bottom of card i to top of card i+1 with horizontal S-curve
        x1 = ar.left + ar.width / 2 - cRect.left;
        y1 = ar.bottom - cRect.top + 2;
        x2 = br.left + br.width / 2 - cRect.left;
        y2 = br.top - cRect.top - 2;
        const dy = y2 - y1;
        const sway = Math.min(120, Math.max(60, dy * 0.6));
        const side = i % 2 === 0 ? 1 : -1;
        d = `M ${x1} ${y1} C ${x1 + side * sway} ${y1 + dy * 0.35}, ${x2 - side * sway} ${y2 - dy * 0.35}, ${x2} ${y2}`;
      } else {
        x1 = ar.right - cRect.left + 2;
        y1 = ar.top + ar.height / 2 - cRect.top;
        x2 = br.left - cRect.left - 2;
        y2 = br.top + br.height / 2 - cRect.top;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const direction = y2 < y1 ? -1 : 1;
        const wave = Math.min(180, Math.max(130, Math.abs(dx) * 0.9));
        d = `M ${x1} ${y1} C ${x1 + dx * 0.35} ${y1 + direction * wave}, ${x2 - dx * 0.35} ${y2 - direction * wave}, ${x2} ${y2}`;
      }
      next.push({ d, x1, y1, x2, y2 });
    }
    setSize({ w: container.offsetWidth, h: container.offsetHeight });
    setPaths(next);
  };

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(compute);
    const timer = window.setTimeout(compute, 650);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [values.length]);

  useEffect(() => {
    const ro = new ResizeObserver(() => compute());
    if (containerRef.current) ro.observe(containerRef.current);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 sm:gap-4 pt-6 pb-8 px-1 md:block md:min-h-[520px]">
      {/* Dynamic connector overlay — behind cards, non-interactive */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
        style={{ zIndex: 20 }}
        fill="none"
      >
        <defs>
          <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <g key={i}>
            <circle cx={p.x1} cy={p.y1} r={6} stroke="url(#connectorGradient)" strokeWidth={2.4} fill="#FAFAFA" />
            <motion.path
              d={p.d}
              stroke="url(#connectorGradient)"
              strokeWidth={2.8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.1 }}
            />
            <circle cx={p.x2} cy={p.y2} r={6} stroke="url(#connectorGradient)" strokeWidth={2.4} fill="#FAFAFA" />
          </g>
        ))}
      </svg>

      {values.map((value, index) => (
        <motion.div
          key={value.title}
          ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el; }}
          data-process-card
          initial={{ opacity: 0, y: 30, rotate: rotations[index] }}
          whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          whileHover={{ y: -12, rotate: 0, scale: 1.03, transition: { duration: 0.3 } }}
          style={{ zIndex: zIndex[index] }}
          className={`relative aspect-square w-[230px] sm:w-[270px] shrink-0 snap-center bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col justify-between ${positions[index]} shadow-[0_20px_45px_-20px_rgba(0,0,0,0.18)] hover:shadow-[0_40px_80px_-25px_rgba(0,0,0,0.30)] transition-all duration-300`}
        >
          <div className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold text-foreground leading-none tracking-tight">
            {index + 1}
          </div>
          <div>
            <h3 className="text-base sm:text-xl lg:text-2xl font-display font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">
              {value.title}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed line-clamp-3">{value.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


export default AboutPage;