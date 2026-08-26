'use client';

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight, Sparkles, Globe } from "lucide-react";

import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFooterContent, useFooterLinks } from "@/hooks/useFooterData";
import { usePageContent } from "@/hooks/usePageContent";
import heroBgCustom from "@/assets/hero-bg-custom.webp";
import { getSavedContactInfo, getSavedContactSocials } from "@/components/admin/ContactInfoManagement";

const heroBgUrl = (heroBgCustom as any)?.src || heroBgCustom;

// Custom SVG Icons for all popular social platforms
const PinterestIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const BehanceIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7V5h7v2zm-1.815 6.046c-.056-.704-.326-1.26-.81-1.668-.484-.408-1.11-.612-1.878-.612-.767 0-1.408.204-1.923.612-.515.408-.813.974-.895 1.668h5.506zm-5.506 2.012c.078.742.373 1.32.885 1.734.512.414 1.18.621 2.004.621.656 0 1.228-.135 1.716-.405.488-.27.844-.666 1.068-1.188h2.09c-.314.985-.92 1.777-1.817 2.376-.897.599-1.975.898-3.234.898-1.552 0-2.822-.47-3.81-1.41-.988-.94-1.482-2.222-1.482-3.846 0-1.574.475-2.83 1.425-3.768.95-.938 2.18-1.407 3.69-1.407 1.542 0 2.766.45 3.672 1.35.906.9 1.359 2.14 1.359 3.72 0 .16-.013.364-.04.613h-7.755zM6.55 12.33c.67.11 1.206.39 1.608.84.402.45.603 1.05.603 1.8 0 .95-.366 1.705-1.098 2.265-.732.56-1.745.84-3.039.84H0V6h4.41c1.24 0 2.213.266 2.919.798.706.532 1.059 1.258 1.059 2.178 0 .66-.178 1.205-.534 1.635-.356.43-.865.738-1.527.923v.018zM2.43 8.016v2.538h1.692c.606 0 1.058-.112 1.356-.336.298-.224.447-.546.447-.966 0-.414-.144-.733-.432-.957-.288-.224-.745-.336-1.371-.336H2.43zm0 4.968v3.024h1.836c.642 0 1.12-.132 1.434-.396.314-.264.471-.627.471-1.089 0-.468-.154-.836-.462-1.104-.308-.268-.795-.402-1.461-.402H2.43z"/>
  </svg>
);

const DribbbleIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm9.73 11.04c-.38-.07-2.69-.47-5.34-.13.56 1.54 1.15 3.23 1.6 4.7 2.19-.88 3.39-2.85 3.74-4.57zM16.14 17c-.41-1.35-.95-2.92-1.48-4.35-4.4 1.22-8.37 1.22-8.73 1.22-.03.22-.05.44-.05.67 0 3.36 2.3 6.18 5.43 6.9 1.77-1.14 3.73-3.1 4.83-4.44zM4.09 12.63c.27 0 3.36 0 7.39-1.06C10.74 9.87 9.87 8.08 9.3 6.78 6.03 8.1 4.3 10.98 4.09 12.63zm6.65-7.14c.61 1.34 1.48 3.12 2.21 4.81 2.37-.37 4.54-.02 4.96.06C16.89 7.7 14.15 5.86 10.74 5.49z"/>
  </svg>
);

const RedditIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.363.043-.538A1.758 1.758 0 0 1 4 12.002c0-.968.786-1.754 1.754-1.754.463 0 .88.18 1.187.476 1.185-.845 2.825-1.402 4.636-1.482l.966-4.524 3.467.73z"/>
  </svg>
);

const MediumIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.36a8.27 8.27 0 0 0 4.89 1.58V6.49a4.86 4.86 0 0 1-1-.2z"/>
  </svg>
);

const DiscordIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const TelegramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.752-.168.706-.427.941-.678.964-.547.051-.963-.36-1.493-.707-.83-.544-1.3-8.82-2.11-1.353-.94-.618-1.442-.997-2.353-1.597-1.052-.693-.37-1.074.23-1.698.157-.163 2.882-2.64 2.935-2.868.007-.028.013-.137-.052-.195-.065-.058-.161-.038-.23-.023-.098.022-1.66 1.056-4.686 3.102-.443.305-.844.454-1.203.446-.396-.008-1.157-.223-1.722-.407-.693-.225-1.244-.344-1.196-.726.025-.199.301-.403.827-.613 3.242-1.411 5.406-2.342 6.492-2.794 3.098-1.29 3.743-1.514 4.161-1.522.092-.002.298.02.433.13.114.093.146.218.161.306.015.088.03.287.015.443z"/>
  </svg>
);

const socialIconMap: Record<string, any> = {
  Facebook,
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Pinterest: PinterestIcon,
  Behance: BehanceIcon,
  Dribbble: DribbbleIcon,
  Reddit: RedditIcon,
  Medium: MediumIcon,
  TikTok: TikTokIcon,
  Discord: DiscordIcon,
  Telegram: TelegramIcon,
  Mail,
  Globe,
};

const ContactPage = () => {
  const { t } = useLanguage();
  const { data: footerContents } = useFooterContent();
  const { data: footerLinks } = useFooterLinks();
  const { getContent: getPageContent } = usePageContent("contact");

  const savedInfo = getSavedContactInfo();
  const savedSocials = getSavedContactSocials();

  const getFooterContent = (key: string) => footerContents?.find((i) => i.content_key === key)?.content_en ?? null;
  const normalizePhoneForHref = (v: string) => v.replace(/[^\d+]/g, "");
  const getPreferred = (pk: string, fk: string, fb: string) => savedInfo[pk] || getPageContent(pk) || getFooterContent(fk) || fb;

  const phone = getPreferred("info.phone", "phone", "+880 1344-497808");
  const rawEmail = getPreferred("info.email", "email", "hello@astropixel.tech").trim();
  const email = (!rawEmail || rawEmail.includes("alphazero") || rawEmail.includes("contact@")) ? "hello@astropixel.tech" : rawEmail;
  const address = getPreferred("info.address", "address", "Hi-Tech Park, Rajshahi, Bangladesh");
  const hours = getPreferred("info.hours", "hours", "Sat – Thu · 10:00 AM – 8:00 PM");

  const heroBadge = savedInfo["hero.subtitle"] || "Available for new projects";
  const heroTitle = savedInfo["hero.title"] || "Let's talk.";
  const heroDescription = savedInfo["hero.description"] || "Tell us about your idea. Whether it's a rebrand, a launch, or a full digital product — we reply within 24 hours.";

  const mapEmbedUrl = savedInfo["info.map_embed"] || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.364448554907!2d88.5833!3d24.3733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa400000001%3A0x6b44781775e52d6a!2sSheikh%20Kamal%20IT%20Incubator%20%26%20Training%20Centre%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd";
  const mapDirectionsUrl = savedInfo["info.map_directions"] || "https://maps.google.com/?q=Sheikh+Kamal+IT+Incubator+Rajshahi";
  const studioTitle = savedInfo["info.studio_title"] || "Come say hi in Rajshahi.";
  const studioSubtitle = savedInfo["info.studio_subtitle"] || "Our studio";

  const socials = savedSocials.map((s) => ({
    name: s.name,
    handle: s.handle,
    url: s.url,
    icon: socialIconMap[s.icon] || Globe,
    brand: s.brand || "#1877F2",
  }));

  const contactCards = [
    { icon: Phone, label: "Call us", value: phone, href: `tel:${normalizePhoneForHref(phone)}`,
      bg: "#DCF2E4", ink: "#0F5132", iconBg: "#B8E6C8" },
    { icon: Mail, label: "Email us", value: email, href: `mailto:${email}`,
      bg: "#FCE4D6", ink: "#8A3A12", iconBg: "#F8C7A8" },
    { icon: MapPin, label: "Location", value: address,
      bg: "#F3E1F4", ink: "#5B2166", iconBg: "#E5C3E8" },
    { icon: Clock, label: "Working hours", value: hours,
      bg: "#DCEBFF", ink: "#0B3D91", iconBg: "#B8D4FA" },
  ];

  return (
    <>
      <SEO 
        title="Contact AstroPixel — Creative Design Agency in Rajshahi, Bangladesh" 
        description="Get in touch with AstroPixel in Rajshahi, Bangladesh for logo design, branding, UI/UX, and web design projects." 
        canonical="https://astropixel.tech/contact" 
      />
      {/* ===== Editorial Hero ===== */}
      <section id="site-hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 rounded-b-3xl">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black" />
        {/* Background image */}
        <img
          src="/hero-new-bg.png"
          alt="AstroPixel Contact Hero Background"
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
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-sm text-xs font-semibold tracking-wide uppercase text-white mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {heroBadge}
              </div>
              <h1 className="text-[15vw] sm:text-[11vw] lg:text-[9rem] font-display font-bold leading-[0.9] tracking-[-0.03em] text-white">
                {heroTitle}
              </h1>
              <p className="mt-6 text-base lg:text-xl text-white/80 max-w-xl leading-relaxed">
                {heroDescription}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="lg:col-span-4 flex flex-col gap-3">
              <a href={`mailto:${email}`}
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-black text-white hover:bg-neutral-800 transition-colors">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Direct Email</div>
                  <div className="font-semibold text-sm sm:text-base">{email}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </a>

              <a href={`tel:${normalizePhoneForHref(phone)}`}
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-black text-white hover:bg-neutral-800 transition-colors">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Direct Call</div>
                  <div className="font-semibold text-sm sm:text-base">{phone}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Contact Info Bento Grid ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left column — heading */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Get in touch</div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold leading-[1.05] tracking-tight text-black mb-5">
                  Every <span className="font-serif italic font-normal">great project</span><br />starts with a <span className="font-serif italic font-normal text-primary">hello.</span>
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  Pick the channel that suits you best — our team is spread across time zones so someone is always around.
                </p>
              </div>
            </motion.div>

            {/* Right — bento cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {contactCards.map((c, i) => {
                const Wrapper: any = c.href ? "a" : "div";
                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Wrapper
                      {...(c.href ? { href: c.href } : {})}
                      style={{ backgroundColor: c.bg, color: c.ink }}
                      className="group relative block h-full p-6 rounded-3xl border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative">
                        <div className="flex items-start justify-between mb-8">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: c.iconBg, color: c.ink }}>
                            <c.icon className="w-5 h-5" />
                          </div>
                          {c.href && <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all" style={{ color: c.ink }} />}
                        </div>

                        <div className="text-xs uppercase tracking-wider mb-2 opacity-70">{c.label}</div>
                        <div className="text-lg font-semibold leading-snug">{c.value}</div>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Follow Us + Social Channels Grid ===== */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Follow Us — premium card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-7 h-full">
              <div className="relative h-full rounded-[2rem] overflow-hidden bg-white border border-black/10">
                <div className="relative h-full p-8 lg:p-10 flex flex-col">

                  <div className="relative flex items-end justify-between flex-wrap gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold mb-4">
                        <Sparkles size={13} /> Follow us
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-display font-bold tracking-tight text-black">
                        Around the web
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {socials.length} platforms · active daily
                    </span>
                  </div>

                  <div className="relative grid sm:grid-cols-2 gap-3">
                    {socials.map((s, i) => (
                      <motion.a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        style={{ ["--brand" as any]: s.brand, backgroundColor: `${s.brand}12` }}
                        className="group relative flex items-center gap-3 p-4 rounded-2xl border border-[color:var(--brand)]/15 overflow-hidden hover:border-[color:var(--brand)]/50 hover:shadow-[0_10px_30px_-10px_var(--brand)] transition-all"
                      >
                        <span className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${s.brand}15`, color: s.brand }}>
                          <s.icon size={18} />
                        </span>
                        <div className="relative min-w-0 flex-1">
                          <div className="text-sm font-bold text-black leading-tight truncate">{s.name}</div>
                          <div className="text-[11px] text-neutral-500 truncate">{s.handle}</div>
                        </div>
                        <ArrowUpRight className="relative w-4 h-4 shrink-0 text-neutral-400 group-hover:text-[color:var(--brand)] group-hover:rotate-45 transition-all" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Studio card with live map */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="lg:col-span-5 h-full">

              <div className="relative h-full rounded-[2rem] overflow-hidden bg-slate-950 text-white border border-white/15 flex flex-col min-h-[440px] shadow-2xl shadow-black/40 group">
                {/* Glowing Ambient Mesh Backdrop */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/20 via-primary/10 to-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Header Section */}
                <div className="relative p-8 lg:p-10 pb-6 z-10">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] font-semibold uppercase tracking-widest text-cyan-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      {studioSubtitle}
                    </div>
                    <Sparkles className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-display font-bold leading-tight tracking-tight text-white mb-3">
                    {studioTitle.includes("Rajshahi") ? (
                      <>
                        Come say hi<br /><span className="font-serif italic font-normal bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">in Rajshahi.</span>
                      </>
                    ) : (
                      studioTitle
                    )}
                  </h3>

                  <div className="inline-flex items-start gap-2.5 mt-2 p-3 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-xs text-white/80 leading-relaxed">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </div>
                </div>

                {/* Interactive Map Embed */}
                <div className="relative flex-1 min-h-[220px] w-full bg-slate-900 border-t border-white/10 overflow-hidden">
                  <iframe
                    title="Office Location Map"
                    src={mapEmbedUrl}
                    className="w-full h-full border-0 filter opacity-85 hover:opacity-100 contrast-[1.05] transition-all duration-500"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  
                  {/* Glassmorphic floating directions CTA */}
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold shadow-2xl border border-white/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:scale-105 group/btn"
                  >
                    <MapPin className="w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
