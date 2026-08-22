'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Palette, 
  Layers, 
  Smartphone, 
  Image, 
  FileText,
  Layout,
  MessageCircle,
  ArrowRight,
  Monitor,
  ShoppingCart,
  Search,
  Share2,
  PenTool,
  Code,
  Zap,
  Rocket,
  CheckCircle,
  Video,
  TrendingUp,
  Target,
  BarChart3,
  Film,
  Clapperboard,
  Megaphone,
  Users,
  Laptop,
  FileSpreadsheet,
  Presentation,
  Database,
  Printer,
  Loader2,
  Sparkles,
  Globe,
  Mail,
  Phone,
  Settings,
  Shield,
  Award,
  Heart,
  Star,
  Plus,
  Minus
} from "lucide-react";
import ctaBlueWaves from "@/assets/about-cta-blue-waves.png.asset.json";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { usePageHero } from "@/hooks/usePageHero";
import { useServices } from "@/hooks/useServices";
import heroBgCustom from "@/assets/hero-bg-custom.webp";
const heroBgUrl = (heroBgCustom as any)?.src || heroBgCustom;
import brandIdentityImage from "@/assets/brand-identity-showcase.jpg.asset.json";
import productUIImage from "@/assets/product-ui-showcase.jpg.asset.json";
import webDevImage from "@/assets/web-dev-showcase.jpg.asset.json";
import seoMarketingImage from "@/assets/seo-marketing-showcase.png.asset.json";


// Icon mapping for dynamic services
const iconMap: Record<string, typeof Sparkles> = {
  Palette, Layers, Smartphone, Image, FileText, Layout, MessageCircle,
  Monitor, ShoppingCart, Search, Share2, PenTool, Code, Zap, Video,
  TrendingUp, Target, BarChart3, Film, Clapperboard, Megaphone, Users,
  Laptop, FileSpreadsheet, Presentation, Database, Printer, Sparkles,
  Globe, Mail, Phone, Settings, Shield, Award, Heart, Star, CheckCircle
};

import SEO from "@/components/SEO";

const ServicesPage = () => {
  const { t } = useLanguage();
  const hero = usePageHero("services");
  const { data: allServices, isLoading } = useServices();

  // Show all active services
  const services = allServices || [];

  const processSteps = [
    { step: "01", titleKey: "services.process.discover", descKey: "services.process.discoverDesc", icon: Search },
    { step: "02", titleKey: "services.process.design", descKey: "services.process.designDesc", icon: PenTool },
    { step: "03", titleKey: "services.process.develop", descKey: "services.process.developDesc", icon: Code },
    { step: "04", titleKey: "services.process.deliver", descKey: "services.process.deliverDesc", icon: Rocket },
  ];

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Sparkles;
    return iconMap[iconName] || Sparkles;
  };


  return (
    <>
      <SEO 
        title="Creative Services — Logo, Branding, UI/UX, Web Dev | AstroPixel" 
        description="Explore AstroPixel design services: Logo & Brand Identity, UI/UX Design, Web Development, SaaS, and Digital Marketing." 
        canonical="https://astropixel.tech/services" 
      />
      {/* Hero */}
      <section id="site-hero" className="relative overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10 rounded-b-3xl">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black" />
        {/* Background image */}
        <img
          src="/hero-new-bg.png"
          alt="AstroPixel Creative Design Services Hero Background"
          width={1920}
          height={1080}
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white mb-3"
            >
              Our <span className="font-serif italic font-normal text-white">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm lg:text-base text-white/70 max-w-md mx-auto"
            >
              Comprehensive design, branding, and web development solutions built for scale.
            </motion.p>
          </div>
        </div>
      </section>


      {/* Dynamic Services — Musemind-style alternating editorial rows */}
      <section className="py-20 lg:py-28 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : !services || services.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No services found.</div>
            ) : (
              <div className="space-y-24 lg:space-y-36">
                {services.map((service, index) => {
                  const IconComponent = getIcon(service.icon);
                  const isEven = index % 2 === 0;
                  const palettes = [
                    { bg: "#EFE9FF", accent: "#7C3AED" }, // purple
                    { bg: "#FDE4EC", accent: "#EC4899" }, // pink
                    { bg: "#DFF5E1", accent: "#10B981" }, // green
                    { bg: "#FEF3C7", accent: "#F59E0B" }, // amber
                  ];
                  const palette = palettes[index % palettes.length];

                  const TextSide = (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col justify-center"
                    >
                      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight mb-4 sm:mb-6">
                        {service.title}
                      </h3>
                      <p className="text-foreground/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-10 max-w-[52ch]">
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
                          {service.features.slice(0, 8).map((feature, idx) => (
                            <li
                              key={idx}
                              className="group flex items-center justify-between py-3.5 sm:py-5 cursor-pointer"
                            >
                              <div className="flex items-center gap-4 sm:gap-6">
                                <span className="text-xs sm:text-sm font-mono text-foreground/40 tabular-nums">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="text-base sm:text-lg lg:text-xl font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                                  {feature}
                                </span>
                              </div>
                              <ArrowRight
                                size={18}
                                className="text-foreground/50 group-hover:text-foreground group-hover:translate-x-1 transition-all"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  );

                  const titleLower = (service.title || "").toLowerCase();
                  const isBrandIdentity =
                    titleLower.includes("brand") ||
                    titleLower.includes("identity") ||
                    titleLower.includes("illustration") ||
                    titleLower.includes("ব্র্যান্ড") ||
                    titleLower.includes("ইলাস্ট্রেশন");
                  const isProductUI =
                    titleLower.includes("product") ||
                    titleLower.includes("ui") ||
                    titleLower.includes("ux") ||
                    titleLower.includes("প্রোডাক্ট") ||
                    titleLower.includes("ইউআই");
                  const isWebDev =
                    titleLower.includes("web") ||
                    titleLower.includes("development") ||
                    titleLower.includes("ওয়েব");
                  const isSEO =
                    titleLower.includes("seo") ||
                    titleLower.includes("marketing") ||
                    titleLower.includes("content") ||
                    titleLower.includes("মার্কেটিং");
                  const customImage = isBrandIdentity
                    ? brandIdentityImage.url
                    : isWebDev
                    ? webDevImage.url
                    : isProductUI
                    ? productUIImage.url
                    : isSEO
                    ? seoMarketingImage.url
                    : null;

                  const VisualSide = (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7 }}
                      className="relative rounded-2xl sm:rounded-[32px] overflow-hidden aspect-[16/10] sm:aspect-[4/5] lg:aspect-[5/6] flex items-center justify-center"
                      style={{ background: customImage ? "#0a0a0a" : palette.bg }}
                    >
                      {customImage ? (
                        <img
                          src={customImage}
                          alt={`AstroPixel Creative Service — ${service.title}`}
                          width={600}
                          height={720}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          {/* soft blurred orbs */}
                          <div
                            className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-40"
                            style={{ background: palette.accent }}
                          />
                          <div
                            className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full blur-3xl opacity-30"
                            style={{ background: palette.accent }}
                          />

                          {/* Center icon medallion */}
                          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
                            <div
                              className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] flex items-center justify-center"
                            >
                              <IconComponent size={40} className="sm:w-14 sm:h-14" style={{ color: palette.accent }} />
                            </div>
                            <span
                              className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
                              style={{ color: palette.accent }}
                            >
                              {String(index + 1).padStart(2, "0")} · Service
                            </span>
                          </div>

                          {/* floating chips */}
                          {service.features?.slice(0, 2).map((f, i) => (
                            <div
                              key={i}
                              className={`absolute z-10 bg-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg text-[10px] sm:text-xs font-semibold text-foreground/80 ${
                                i === 0 ? "top-6 right-6 sm:top-10 sm:right-8" : "bottom-6 left-6 sm:bottom-10 sm:left-8"
                              }`}
                            >
                              {f}
                            </div>
                          ))}
                        </>
                      )}
                    </motion.div>
                  );

                  return (
                    <div
                      key={service.id}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center"
                    >
                      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                        {VisualSide}
                      </div>
                      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                        {TextSide}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Process Section — editorial numbered */}
      <section className="pt-4 pb-20 lg:pb-28 relative bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-black/[0.03] mb-6">
                <Award size={16} className="text-black/70" />
                <span className="text-sm font-bold tracking-[0.25em] uppercase text-black/70">
                  {t("language") === "bn" ? "কেন আমরা" : "Why Us"}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] text-black">
                {t("language") === "bn" ? (
                  <>আপনার জন্য আমরাই <span>সেরা</span></>
                ) : (
                  <>Why We Are <span>Best For You</span></>
                )}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] border border-black/[0.08] rounded-2xl overflow-hidden [&>*:nth-child(n+4)]:md:border-t [&>*:nth-child(n+4)]:md:border-black/[0.08]">
              {[
                { icon: Award, title: t("language") === "bn" ? "প্রিমিয়াম কোয়ালিটি" : "Premium Quality", desc: t("language") === "bn" ? "প্রতিটি ডিজাইন ও কোড হাতে বানানো, ইন্ডাস্ট্রি স্ট্যান্ডার্ড মেনে তৈরি।" : "Every design and line of code is crafted to match global industry standards." },
                { icon: Zap, title: t("language") === "bn" ? "দ্রুত ডেলিভারি" : "Fast Delivery", desc: t("language") === "bn" ? "সময়ের আগেই সঠিক কাজ — আপনার ডেডলাইন আমাদের কাছে সবচেয়ে গুরুত্বপূর্ণ।" : "On-time, every time. Your deadline is our top priority from day one." },
                { icon: Shield, title: t("language") === "bn" ? "১০০% নিরাপত্তা" : "100% Secure", desc: t("language") === "bn" ? "আপনার ডেটা ও প্রজেক্ট সম্পূর্ণ সুরক্ষিত, এন্টারপ্রাইজ-গ্রেড সিকিউরিটি সহ।" : "Your data and projects are fully protected with enterprise-grade security." },
                { icon: Heart, title: t("language") === "bn" ? "২৪/৭ সাপোর্ট" : "24/7 Support", desc: t("language") === "bn" ? "যেকোনো সময় আমাদের টিম আপনার পাশে — কল, চ্যাট বা ইমেইলে।" : "Our team stands by you anytime — over call, chat, or email." },
                { icon: Users, title: t("language") === "bn" ? "অভিজ্ঞ টিম" : "Expert Team", desc: t("language") === "bn" ? "ডিজাইনার, ডেভেলপার ও মার্কেটার — সবাই তাদের ফিল্ডের সেরা।" : "Designers, developers, and marketers — each an expert in their craft." },
                { icon: Star, title: t("language") === "bn" ? "সন্তুষ্ট ক্লায়েন্ট" : "Happy Clients", desc: t("language") === "bn" ? "শত শত ক্লায়েন্টের বিশ্বাস — কারণ আমরা কথা রাখি।" : "Trusted by hundreds of clients — because we keep our promises." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="group relative p-8 lg:p-10 min-h-[240px] hover:bg-black/[0.02] transition-colors"
                >
                  <item.icon size={28} strokeWidth={1.5} className="text-black/80 group-hover:text-primary transition-colors mb-8" />
                  <h4 className="text-xl lg:text-2xl font-display font-medium mb-3 text-black">{item.title}</h4>
                  <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
};

const CtaSection = () => {
  const { data: teamMembers } = useTeamMembers();
  const founder = teamMembers?.find(m => m.name.toLowerCase().includes('sofiullah') || m.role.toLowerCase().includes('founder'));

  return (
    <section className="py-16 lg:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto rounded-[2rem] overflow-hidden p-8 sm:p-12 lg:p-16"
        >
          {/* Background image */}
          <img
            src={ctaBlueWaves.url}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Heading + CTA */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/70 mb-5">
                Let's build something great
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                Ready to start<br />your next project?
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all"
              >
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#2563EB] bg-clip-text text-transparent">
                  Get started
                </span>
              </Link>
            </div>

            {/* Right: Floating booking card */}
            <div className="lg:justify-self-end w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="relative bg-background rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-border/60"
              >
                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground">
                    Available for project
                  </span>
                </div>

                {/* Avatars */}
                <div className="flex items-center gap-3 mb-4 relative">
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-background shadow bg-muted">
                    <img
                      src={founder?.image_url || '/sofiullah-ahammad.jpg'}
                      alt="Founder"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-muted-foreground text-lg font-light">+</span>
                  <div className="relative w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                    You
                    <motion.div
                      aria-hidden
                      className="absolute -top-3 -right-3 pointer-events-none"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0EA5E9] text-white text-xs font-black shadow-[0_4px_12px_-2px_rgba(14,165,233,0.6)]">
                        ?
                      </span>
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-foreground mb-1">
                  Quick 15-minute call
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Pick a time that works for you.
                </p>

                <Link
                  href="/contact"
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#7DD3FC] via-[#60A5FA] to-[#3B82F6] text-white text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(96,165,250,0.6)] hover:shadow-[0_12px_28px_-8px_rgba(59,130,246,0.8)] hover:brightness-110 transition-all"
                >
                  Book a free call
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
