import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Eye, 
  Target, 
  MessageSquare, 
  Gem,
  Layout,
  Share2,
  PenTool,
  Monitor,
  ShoppingCart,
  Search,
  Star,
  Quote,
  MessageCircle,
  Zap,
  CheckCircle2,
  ChevronRight,
  Triangle,
  Radio,
  Compass,
  TrendingUp
} from "lucide-react";
import SEO from "@/components/SEO";
import { ContainerTextFlip } from "@/components/ui/modern-animated-multi-words";
import { HeroSection } from "@/components/ui/hero-section-dark";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Sparkles as SparklesFx } from "@/components/ui/sparkles";
import { Link } from "react-router-dom";
import LayoutComponent from "@/components/Layout";
import FinalCTAInquirySection from "@/components/FinalCTAInquirySection";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProjectMarquee from "@/components/ProjectMarquee";
import { AppSwiper } from "@/components/ui/app-swiper";

import { LogoCloud } from "@/components/ui/logo-cloud-2";
import brand1 from "@/assets/brands/b1.png.asset.json";
import brand2 from "@/assets/brands/b2.png.asset.json";
import brand3 from "@/assets/brands/b3.png.asset.json";
import brand4 from "@/assets/brands/b4.png.asset.json";
import clientAlokchitra from "@/assets/clients/alokchitra.png.asset.json";
import clientAura from "@/assets/clients/aura-signature.png.asset.json";
import clientGreenpeak from "@/assets/clients/greenpeak.png.asset.json";
import clientBlackzen from "@/assets/clients/blackzen.png.asset.json";
import clientDarkAura from "@/assets/clients/darkaura.png.asset.json";
import clientAtix from "@/assets/clients/atix.png.asset.json";
import clientSA from "@/assets/clients/sa.png.asset.json";
const SERVICE_IMG = "/services";
const brandingStartio = { url: `${SERVICE_IMG}/branding-startio.webp` };
const brandingPhoneMockup = { url: `${SERVICE_IMG}/branding-phone.webp` };
const webDevDashboard = { url: `${SERVICE_IMG}/web-dev-dashboard.webp` };
const webDevTablet = { url: `${SERVICE_IMG}/web-dev-tablet.webp` };
const uiuxDesktop = { url: `${SERVICE_IMG}/uiux-desktop.webp` };
const uiuxPhone = { url: `${SERVICE_IMG}/uiux-phone.webp` };
const seoMonitor = { url: `${SERVICE_IMG}/seo-monitor.webp` };
const seoTablet = { url: `${SERVICE_IMG}/seo-tablet.webp` };








import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { useHomepageSection, useHomepageSectionItems } from "@/hooks/useHomepageSections";

import { memo, useRef, useState, useEffect, type ReactNode } from "react";
import { useTheme } from "next-themes";
import heroGradientAsset from "@/assets/hero-gradient.png.asset.json";
import customHeroBg from "@/assets/hero-bg-custom.webp";
const designShowcase = customHeroBg;
const designShowcaseLight = customHeroBg;
const resolveLogoUrl = (url: string) => url.startsWith("/") ? `https://astropixel.tech${url}` : url;

// Tilted device mockup card (browser / phone / image)
const MockupCard = ({
  color,
  Icon,
  variant,
  tilt,
  delay = 0,
  image,
  priority = false,
}: {
  color: string;
  Icon: any;
  variant: "browser" | "phone" | "image";
  tilt: number;
  delay?: number;
  image?: string;
  priority?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full aspect-[5/7] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
      style={{
        background: `radial-gradient(120% 100% at 30% 20%, ${color}ee 0%, ${color}aa 45%, ${color}55 100%)`,
      }}
    >
      {variant !== "image" && (
        <>
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 3px, transparent 3px 12px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />
        </>
      )}

      {variant === "image" && image ? (
        <img
          src={image}
          alt=""
          loading="eager"
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ rotate: tilt }}
        >
          {variant === "browser" ? (
            <div className="w-[16rem] md:w-[18rem] aspect-[16/11] rounded-xl bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 h-6 bg-gray-100 border-b border-gray-200">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <div
                className="w-full h-[calc(100%-1.5rem)] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${color}22, ${color}55)` }}
              >
                <Icon size={64} strokeWidth={1.4} className="drop-shadow-xl" style={{ color }} />
              </div>
            </div>
          ) : (
            <div className="w-[7.5rem] md:w-[9rem] aspect-[9/19] rounded-[2rem] bg-neutral-900 shadow-2xl overflow-hidden ring-2 ring-black/40 relative">
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full bg-black z-10" />
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: `linear-gradient(160deg, ${color}44, ${color}88)` }}
              >
                <Icon size={44} strokeWidth={1.6} className="drop-shadow-xl text-white" />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

const MemoMockupCard = memo(MockupCard);


// Pair of tilted mockups (browser + phone) that reports itself active when centered
const ServicePair = ({
  index,
  color,
  Icon,
  primaryImage,
  secondaryImage,
  priority = false,
}: {
  index: number;
  color: string;
  Icon: any;
  primaryImage?: string;
  secondaryImage?: string;
  priority?: boolean;
}) => {
  return (
    <div data-service-index={index} className="lg:min-h-[600px] flex items-center">
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-start">
        <div className="-mt-4 md:-mt-8">
          <MemoMockupCard
            color={color}
            Icon={Icon}
            variant={primaryImage ? "image" : "browser"}
            image={primaryImage}
            priority={priority}
            tilt={-3}
          />
        </div>
        <div className="mt-8 md:mt-16">
          <MemoMockupCard
            color={color}
            Icon={Icon}
            variant={secondaryImage ? "image" : "phone"}
            image={secondaryImage}
            priority={priority}
            tilt={4}
            delay={0.15}
          />
        </div>
      </div>

    </div>
  );
};

const MemoServicePair = memo(
  ServicePair,
  (prev, next) =>
    prev.index === next.index &&
    prev.color === next.color &&
    prev.Icon === next.Icon &&
    prev.primaryImage === next.primaryImage &&
    prev.secondaryImage === next.secondaryImage &&
    prev.priority === next.priority
);





const Index = () => {
  const { t, language } = useLanguage();
  const { getContent } = usePageContent('home');
  const { section: brandsSection } = useHomepageSection('trusted_brands', 'agency', 'home');
  const { data: brandItems } = useHomepageSectionItems(brandsSection?.id);
  const { section: sisterSection } = useHomepageSection('sister_brands', 'agency', 'home');
  const { data: sisterItems } = useHomepageSectionItems(sisterSection?.id);


  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const c = (key: string, translationKey: string) => {
    const dbContent = getContent(key);
    return dbContent || t(translationKey);
  };


  const whyChooseUs = [
    { icon: Palette, title: c("why.clean", "home.why.clean"), description: c("why.cleanDesc", "home.why.cleanDesc") },
    { icon: Eye, title: c("why.brand", "home.why.brand"), description: c("why.brandDesc", "home.why.brandDesc") },
    { icon: Target, title: c("why.detail", "home.why.detail"), description: c("why.detailDesc", "home.why.detailDesc") },
    { icon: MessageSquare, title: c("why.client", "home.why.client"), description: c("why.clientDesc", "home.why.clientDesc") },
    { icon: Gem, title: c("why.zero", "home.why.zero"), description: c("why.zeroDesc", "home.why.zeroDesc") },
  ];

  const services = [
    {
      icon: Palette,
      label: language === "bn" ? "ইউআই/ইউএক্স" : "UI/UX",
      title: language === "bn" ? "ইউআই/ইউএক্স ডিজাইন" : "UI/UX Design",
      description: language === "bn" ? "ইউজার ফ্রেন্ডলি এবং মডার্ন ইন্টারফেস ডিজাইন যা আপনার ইউজারদের দেবে সেরা অভিজ্ঞতা।" : "User-friendly and modern interface designs that give your users the best experience.",
      meta: [
        { k: language === "bn" ? "স্কোপ" : "Scope", v: language === "bn" ? "মোবাইল ও ওয়েব" : "Mobile & Web" },
        { k: language === "bn" ? "সময়" : "Timeline", v: language === "bn" ? "১–২ সপ্তাহ" : "1–2 Weeks" },
      ],
      bg: "#dbeafe", text: "#0c1e3d", stripe: "#3b82f6",
      primaryImage: uiuxDesktop.url,
      secondaryImage: uiuxPhone.url,
    },

    {
      icon: PenTool,
      label: language === "bn" ? "ব্র্যান্ডিং" : "Branding",
      title: language === "bn" ? "লোগো ডিজাইন ও ব্র্যান্ডিং" : "Logo Design & Branding",
      description: language === "bn" ? "আপনার ব্র্যান্ডের জন্য একটি ইউনিক এবং শক্তিশালী ভিজ্যুয়াল আইডেন্টিটি তৈরি করুন।" : "Create a unique and strong visual identity for your brand.",
      meta: [
        { k: language === "bn" ? "ডেলিভারি" : "Delivery", v: language === "bn" ? "৭ দিন" : "7 Days" },
        { k: language === "bn" ? "ফরম্যাট" : "Format", v: "Vector + Guidelines" },
      ],
      bg: "#cffafe", text: "#083344", stripe: "#06b6d4",
      primaryImage: brandingStartio.url,
      secondaryImage: brandingPhoneMockup.url,
    },

    {
      icon: Share2,
      label: language === "bn" ? "প্যাকেজিং" : "Packaging",
      title: language === "bn" ? "সোশ্যাল মিডিয়া ও প্যাকেজিং ডিজাইন" : "Social Media & Packaging Design",
      description: language === "bn" ? "সোশ্যাল মিডিয়া কন্টেন্ট এবং প্রোডাক্ট প্যাকেজিং যা ক্রেতার নজর কাড়বে মুহূর্তেই।" : "Social media content and product packaging that catches the eye instantly.",
      meta: [
        { k: language === "bn" ? "টার্গেট" : "Target", v: "Print & Digital" },
        { k: language === "bn" ? "ফোকাস" : "Focus", v: "Engagement" },
      ],
      bg: "#e0f2fe", text: "#0c1e3d", stripe: "#0ea5e9",
      primaryImage: uiuxPhone.url,
      secondaryImage: brandingPhoneMockup.url,
    },

    {
      icon: Monitor,
      label: language === "bn" ? "ডেভেলপমেন্ট" : "Development",
      title: language === "bn" ? "ওয়েব ডেভেলপমেন্ট" : "Web Development",
      description: language === "bn" ? "মডার্ন ও হাই-পারফর্মিং ওয়েবসাইট যা আপনার বিজনেসের গ্রোথ নিশ্চিত করবে।" : "Modern and high-performing websites that ensure your business growth.",
      meta: [
        { k: language === "bn" ? "স্ট্যাক" : "Stack", v: "React / Next.js" },
        { k: language === "bn" ? "পারফরম্যান্স" : "Performance", v: "99+" },
      ],
      bg: "#ccfbf1", text: "#042f2e", stripe: "#14b8a6",
      primaryImage: webDevDashboard.url,
      secondaryImage: webDevTablet.url,
    },

    {
      icon: Zap,
      label: "SaaS",
      title: language === "bn" ? "SaaS ডেভেলপমেন্ট" : "SaaS Development",
      description: language === "bn" ? "স্কেলেবল এবং শক্তিশালী ক্লাউড-বেজড সফটওয়্যার সলিউশন।" : "Scalable and powerful cloud-based software solutions.",
      meta: [
        { k: language === "bn" ? "স্কেলিং" : "Scaling", v: "Enterprise" },
        { k: language === "bn" ? "সিকিউরিটি" : "Security", v: "High" },
      ],
      bg: "#fef3c7", text: "#92400e", stripe: "#f59e0b",
      primaryImage: webDevDashboard.url,
      secondaryImage: webDevTablet.url,
    },

    {
      icon: TrendingUp,
      label: language === "bn" ? "মার্কেটিং" : "Marketing",
      title: language === "bn" ? "ডিজিটাল মার্কেটিং" : "Digital Marketing",
      description: language === "bn" ? "আপনার বিজনেসকে সঠিক টার্গেট অডিয়েন্সের কাছে পৌঁছে দেওয়ার গ্যারান্টি।" : "Guaranteed delivery of your business to the right target audience.",
      meta: [
        { k: language === "bn" ? "চ্যানেল" : "Channels", v: "Social + Search" },
        { k: language === "bn" ? "আরওআই" : "ROI", v: "High" },
      ],
      bg: "#fce7f3", text: "#9d174d", stripe: "#ec4899",
      primaryImage: seoMonitor.url,
      secondaryImage: seoTablet.url,
    },
  ];
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    services.forEach((service) => {
      [service.primaryImage, service.secondaryImage].forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;

        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = src;
          document.head.appendChild(link);
        }
      });
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveService = () => {
      frame = 0;
      const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-service-index]"));
      if (!rows.length) return;

      const viewportTarget = window.innerHeight * 0.48;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - viewportTarget);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(row.dataset.serviceIndex || 0);
        }
      });

      setActiveService((current) => (current === closestIndex ? current : closestIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveService);
    };

    updateActiveService();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [services.length]);

  const stats = [
    { value: "50+", label: c("stats.projects_label", "home.stats.projects") || "Projects" },
    { value: "30+", label: c("stats.clients_label", "home.stats.clients") || "Clients" },
    { value: "3+", label: c("stats.years_label", "home.stats.years") || "Years" },
    { value: "100%", label: c("stats.satisfaction_label", "home.stats.satisfaction") || "Satisfaction" },
  ];

  const aiDesignTools = [
    {
      src: 'https://svgl.app/library/figma.svg',
      alt: 'Figma',
      gradient: { from: '#C4C2FF', via: '#9896FF', to: '#5B4DCC' },
    },
    {
      src: 'https://svgl.app/library/openai.svg',
      alt: 'ChatGPT & OpenAI',
      gradient: { from: '#67F0D1', via: '#10A37F', to: '#0B654E' },
    },
    {
      src: 'https://cdn.brandfetch.io/domain/github.com/fallback/lettermark/theme/dark/h/400/w/400/icon?c=1bfwsmEH20zzEfSNTed',
      alt: 'GitHub',
      gradient: { from: '#6E7681', via: '#24292F', to: '#0D1117' },
    },
    {
      src: 'https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/6a5810149e88d3358ac95b41_Frame%202147238893.avif',
      alt: 'Claude AI',
      gradient: { from: '#FFD79E', via: '#D97757', to: '#8B3E2B' },
    },
    {
      src: 'https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/6a58a6a2cb044ee3817c8f32_Frame%202147238892.png',
      alt: 'Miro',
      gradient: { from: '#FDE047', via: '#FFD000', to: '#CA8A04' },
    },
    {
      src: 'https://svgl.app/library/adobe.svg',
      alt: 'Adobe Firefly',
      gradient: { from: '#FF6666', via: '#FF0000', to: '#990000' },
    },
    {
      src: 'https://cdn.brandfetch.io/domain/lovable.dev',
      alt: 'Lovable',
      gradient: { from: '#FF80BF', via: '#FF1493', to: '#C71585' },
    },
    {
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%2310B981"/><circle cx="50" cy="50" r="20" stroke="white" stroke-width="7"/><path d="M50 18v12M50 70v12M18 50h12M70 50h12" stroke="white" stroke-width="7" stroke-linecap="round"/></svg>',
      alt: 'Antigravity',
      gradient: { from: '#A7F3D0', via: '#10B981', to: '#047857' },
    },
    {
      src: 'https://svgl.app/library/supabase.svg',
      alt: 'Supabase',
      gradient: { from: '#6EE7B7', via: '#3ECF8E', to: '#059669' },
    },
    {
      src: 'https://svgl.app/library/n8n.svg',
      alt: 'n8n',
      gradient: { from: '#FCA5A5', via: '#FF6D5A', to: '#DC2626' },
    },
    {
      src: 'https://svgl.app/library/vercel.svg',
      alt: 'Vercel',
      gradient: { from: '#E2E8F0', via: '#64748B', to: '#0F172A' },
    },
    {
      src: 'https://svgl.app/library/midjourney.svg',
      alt: 'Midjourney',
      gradient: { from: '#668CFF', via: '#0049FF', to: '#003199' },
    },
    {
      src: 'https://svgl.app/library/framer.svg',
      alt: 'Framer',
      gradient: { from: '#FF66A1', via: '#0055FF', to: '#000000' },
    },
    {
      src: 'https://svgl.app/library/shopify.svg',
      alt: 'Shopify',
      gradient: { from: '#D9FF5A', via: '#95BF47', to: '#5E8E3E' },
    },
    {
      src: 'https://svgl.app/library/lottielab.svg',
      alt: 'Lottie Animations',
      gradient: { from: '#FFE766', via: '#FFCE00', to: '#B38F00' },
    },
    {
      src: 'https://svgl.app/library/google-cloud.svg',
      alt: 'Google Cloud',
      gradient: { from: '#8AA7FF', via: '#4285F4', to: '#1A73E8' },
    },
  ];

  const testimonials = [
    { name: c("testimonial1.name", "home.testimonial1.name"), role: c("testimonial1.role", "home.testimonial1.role"), content: c("testimonial1.content", "home.testimonial1.content"), rating: 5 },
    { name: c("testimonial2.name", "home.testimonial2.name"), role: c("testimonial2.role", "home.testimonial2.role"), content: c("testimonial2.content", "home.testimonial2.content"), rating: 5 },
    { name: c("testimonial3.name", "home.testimonial3.name"), role: c("testimonial3.role", "home.testimonial3.role"), content: c("testimonial3.content", "home.testimonial3.content"), rating: 5 },
  ];

  const clientLogos = ["TechStart", "GreenLeaf", "Bloom Co", "NextGen", "Spark Digital", "CloudNine"];

  return (
    <LayoutComponent>
      <SEO 
        title="AstroPixel — Creative Design Agency in Rajshahi, Bangladesh" 
        description="AstroPixel is a creative design agency in Rajshahi, Bangladesh, founded by Sofiullah Ahammad. Logo design, branding, UI/UX, web design & social media graphics. From zero to impact." 
        canonical="https://astropixel.tech/" 
      />
      {/* ══════════ HERO — Retro Grid Dark ══════════ */}
      <section id="site-hero" ref={heroRef} className="relative z-[2] -mt-[88px]">
        <HeroSection
          title={c("badge", "home.badge")}
          subtitle={{
            regular: "We Create Brands Beyond the Ordinary.\n",
            gradient: "Powered by Design, Technology & Innovation",
          }}
          description="Pixels That Move Brands Forward."
          ctaText={c("cta1", "home.cta1")}
          ctaHref="/contact"
          bottomImage={{ light: designShowcaseLight, dark: designShowcase }}
          className="w-full pb-0"
        >
          <ProjectMarquee />
        </HeroSection>
      </section>
      <section className="pt-8 pb-6 lg:pt-12 lg:pb-8 bg-background relative z-[15] rounded-t-xl md:rounded-t-2xl -mt-2 sm:-mt-3">
        <div className="container mx-auto px-6">
          {(() => {
            const defaultLogos: { src: string; alt: string; scale?: number }[] = [
              { src: resolveLogoUrl(clientAlokchitra.url), alt: "Alokchitra", scale: 1.0 },
              { src: resolveLogoUrl(clientAura.url), alt: "Aura Signature", scale: 3.8 },
              { src: resolveLogoUrl(clientGreenpeak.url), alt: "GreenPeak", scale: 2.6 },
              { src: resolveLogoUrl(clientBlackzen.url), alt: "BlackZen", scale: 3.2 },
              { src: resolveLogoUrl(clientDarkAura.url), alt: "Dark Aura", scale: 3.2 },
              { src: resolveLogoUrl(clientAtix.url), alt: "Atix", scale: 1.0 },
              { src: resolveLogoUrl(clientSA.url), alt: "SA", scale: 1.35 },
              { src: "https://res.cloudinary.com/de348sqlb/image/upload/v1784827651/alphazero-assets/brands/unavailable-attire.png", alt: "Unavailable Attire", scale: 1.05 },
              { src: "https://res.cloudinary.com/dzuex7n2u/image/upload/v1779254926/amin-one/banners/p5rstcffeky3xd7arakc.png", alt: "Amin One", scale: 0.9 },
              { src: "https://astropixel.tech/__l5e/assets-v1/0edf2ae9-ec96-4989-a03b-9449fbf1aaf6/brand-2.png", alt: "Static Vibes", scale: 1.35 },
              { src: "https://maarifulquranacademy.com/wp-content/uploads/2025/09/final-logo-2048x401.png", alt: "Maariful Quran Academy", scale: 0.95 },
            ];

            const activeItems = (brandItems ?? []).filter((it) => it.is_active && it.image_url);
            const logos: { src: string; alt: string; scale?: number }[] = activeItems.length
              ? activeItems.map((it) => ({ src: it.image_url as string, alt: it.title || "Brand" }))
              : defaultLogos;

            const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

            const LogoItem = ({ logo }: { logo: { src: string; alt: string; scale?: number } }) => (
              <div className="group flex items-center justify-center h-12 sm:h-14 lg:h-16 w-[160px] sm:w-[200px] lg:w-[240px] px-4 sm:px-6 shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  style={{ transform: `scale(${logo.scale ?? 1})` }}
                  className="max-h-12 lg:max-h-14 w-auto object-contain brightness-0 opacity-40 group-hover:opacity-100 transition-all duration-300 ease-out"
                />
              </div>
            );

            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Centered headline */}
                <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-[-0.02em] text-foreground leading-[1.2]">
                    Trusted by <span className="font-serif italic font-normal text-primary">26+</span> brands
                  </h2>
                </div>

                <div className="relative w-full overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background via-background/40 to-transparent pointer-events-none" />
                  
                  <div className="flex w-max animate-marquee-brand py-4">
                    {marqueeLogos.map((logo, i) => (
                      <LogoItem key={`${logo.alt}-${i}`} logo={logo} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* ══════════ SERVICES — BENTO GRID ══════════ */}
      <section className="pb-16 lg:pb-24 pt-4 lg:pt-8 relative bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 lg:mb-28"
          >
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold mb-4">
              {c("whatWeDo", "home.whatWeDo")} <span className="font-serif italic font-normal gradient-text">{c("do", "home.do")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">
              We craft designs, websites & brand visuals that stand out.
            </p>
          </motion.div>





          {/* MOBILE — single column: one service per row */}
          <div className="lg:hidden max-w-2xl mx-auto grid grid-cols-1 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-base sm:text-lg font-display font-bold leading-[1.15] tracking-tight text-foreground mb-1.5">
                    {s.title}
                  </h3>
                  <div className="relative h-[2px] w-full max-w-[100px] mb-1.5 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 blur-[2px] opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500" />
                  </div>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 font-semibold text-[11px] group mb-5"
                  >
                    <span className="relative bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                      {t("common.learnMore") || "See More"}
                    </span>
                    <ArrowRight size={12} className="text-cyan-300 group-hover:translate-x-1 transition-transform duration-500 ease-out" />
                  </Link>
                  <MemoServicePair
                    index={i}
                    color={s.stripe}
                    Icon={Icon}
                    primaryImage={(s as any).primaryImage}
                    secondaryImage={(s as any).secondaryImage}
                    priority={i === 0}
                  />
                </motion.div>
              );
            })}
          </div>


          {/* DESKTOP — Sticky text left, scrolling image pairs right */}
          <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-12 gap-16 relative">
            {/* LEFT — sticky text swaps with active service */}
            <div className="col-span-4 sticky top-32 h-[calc(100vh-8rem)] flex flex-col justify-center">
              <div className="relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  {services.map((s, i) =>
                    activeService === i ? (
                      <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3 className="text-3xl md:text-4xl lg:text-[2.1rem] xl:text-[2.5rem] font-display font-bold mb-5 leading-[1.1] tracking-tight text-foreground max-w-full">
                          {s.title}
                        </h3>
                        <div className="relative h-[2px] w-full max-w-md mb-6 overflow-hidden rounded-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 blur-[2px] opacity-80" />
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500" />
                        </div>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md">
                          {s.description}
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-2 font-semibold text-sm group text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          <span className="relative bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                            {t("common.learnMore") || "See More"}
                            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 origin-left" />
                          </span>
                          <ArrowRight size={16} className="text-cyan-300 group-hover:translate-x-1 transition-transform duration-500 ease-out" />
                        </Link>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — scrolling image pairs */}
            <div className="col-span-8 flex flex-col gap-24">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <MemoServicePair
                    key={s.title}
                    index={i}
                    color={s.stripe}
                    Icon={Icon}
                    primaryImage={(s as any).primaryImage}
                    secondaryImage={(s as any).secondaryImage}
                    priority={i === 0}
                  />
                );
              })}
            </div>
          </div>




        </div>
      </section>

      {/* Start of White Background Content */}
      <div className="relative z-10 bg-white rounded-t-[40px] md:rounded-t-[80px]">

        {/* ══════════ AI-POWERED DESIGN MARQUEE ══════════ */}
        <section className="py-10 lg:py-16 relative">
          <div className="container mx-auto px-6">
            <MarqueeLogoScroller
              title="Smarter Design, Supercharged by AI"
              description="From wireframes to launch, we blend AI tools with strategy to deliver faster, sharper, and data-led design results."
              logos={aiDesignTools}
              speed="normal"
            />
          </div>
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section className="py-12 lg:py-16 relative">

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/[0.06] mb-6">
              <MessageSquare size={14} className="text-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">{c("testimonials", "home.testimonials")}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold">
              {c("whatClientsSay", "home.whatClientsSay")} <span className="font-serif italic font-normal gradient-text">{c("say", "home.say")}</span>
            </h2>
          </motion.div>

          <div className="relative max-w-7xl mx-auto overflow-hidden testimonials-marquee">
            <div className="flex w-max gap-5 testimonials-track">
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={`${testimonial.name}-${idx}`} className="shrink-0 w-[320px] sm:w-[360px]">
                  <div className="group relative p-7 rounded-2xl glass-card overflow-hidden h-full">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Quote size={28} className="text-primary/15 mb-5" />
                    <p className="text-foreground mb-6 leading-relaxed text-sm">{testimonial.content}</p>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={13} className="text-[hsl(45,100%,50%)] fill-[hsl(45,100%,50%)]" />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ══════════ FINAL CTA + INQUIRY SECTION ══════════ */}
      <FinalCTAInquirySection />
    </LayoutComponent>
  );
};


const TrustedByExperts = () => {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const sparkleColor = isDark ? "#ffffff" : "#8350e8";

  return (
    <div className="relative isolate z-10 -mt-6 min-h-[700px] overflow-hidden bg-[#050505] md:-mt-12 md:min-h-[760px]">
      <SparklesFx
        density={900}
        speed={0.45}
        size={1.35}
        opacity={0.85}
        color={sparkleColor}
        className="absolute inset-0 h-full w-full"
        options={{
          particles: {
            move: { enable: true, direction: "none", speed: { min: 0.04, max: 0.45 }, straight: false },
            number: { value: 900 },
            opacity: { value: { min: 0.08, max: 0.75 }, animation: { enable: true, speed: 2.6, sync: false } },
            size: { value: { min: 0.35, max: 1.35 } },
          },
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.78) 16%, rgba(5,5,5,0.05) 46%, #050505 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-[165px] mx-auto h-[300px] max-w-[1180px]"
        style={{
          background:
            "radial-gradient(ellipse 52% 62% at 50% 46%, rgba(131,80,232,0.46) 0%, rgba(131,80,232,0.2) 38%, rgba(5,5,5,0) 74%)",
        }}
      />

      <div className="relative z-20 mx-auto max-w-5xl px-6 pt-20 text-center md:pt-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-medium leading-[1.25] text-[#cfd6ff] md:text-[28px]"
        >
          <span className="block">Trusted by <span className="font-serif italic font-normal text-white">experts.</span></span>
          <span className="block text-[#f5f3ff]">Used by <span className="font-serif italic font-normal text-white">leaders.</span></span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
        className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-12"
        >
          <Retool />
          <Vercel />
          <Remote />
          <Arc />
          <Raycast />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[330px] h-[315px] overflow-hidden md:top-[345px] md:h-[340px]">
        <div
          className="absolute left-1/2 top-[20px] aspect-[4/1] w-[1900px] max-w-[220vw] -translate-x-1/2 rounded-[50%] md:w-[2050px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(22,22,26,0.98) 0%, rgba(11,11,13,0.98) 58%, rgba(5,5,5,1) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 -22px 80px rgba(131,80,232,0.55), 0 -2px 18px rgba(255,255,255,0.14), inset 0 26px 70px rgba(255,255,255,0.02)",
          }}
        />
      </div>
    </div>
  );
};

const LogoMark = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex h-7 items-center justify-center text-[#f3efff] opacity-95 transition-opacity hover:opacity-100">
    {children}
  </span>
);

const Retool = () => (
  <LogoMark>
    <span className="mr-2 inline-flex flex-col gap-[3px]">
      <span className="block h-[3px] w-[16px] rounded-full bg-current" />
      <span className="block h-[3px] w-[11px] rounded-full bg-current" />
      <span className="block h-[3px] w-[16px] rounded-full bg-current" />
    </span>
    <span className="font-display text-[18px] font-bold leading-none">Retool</span>
  </LogoMark>
);

const Vercel = () => (
  <LogoMark>
    <Triangle size={20} className="mr-1.5 fill-current stroke-current" />
    <span className="font-display text-[18px] font-bold leading-none">Vercel</span>
  </LogoMark>
);

const Remote = () => (
  <LogoMark>
    <Radio size={20} className="mr-1.5 stroke-[3]" />
    <span className="font-display text-[18px] font-bold leading-none">remote</span>
  </LogoMark>
);

const Arc = () => (
  <LogoMark>
    <Compass size={22} className="mr-1.5 stroke-[1.8]" />
    <span className="font-display text-[15px] font-medium uppercase leading-none tracking-[0.22em]">Arc</span>
  </LogoMark>
);

const Raycast = () => (
  <LogoMark>
    <Zap size={20} className="mr-1.5 fill-current stroke-current" />
    <span className="font-display text-[16px] font-bold leading-none">Raycast</span>
  </LogoMark>
);

export default Index;