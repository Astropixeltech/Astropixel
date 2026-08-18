import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFooterContent, useFooterLinks } from "@/hooks/useFooterData";
import { usePageContent } from "@/hooks/usePageContent";
import servicesHeroBg from "@/assets/services-hero-bg-5.jpg.asset.json";

const PinterestIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const ContactPage = () => {
  const { t } = useLanguage();
  const { data: footerContents } = useFooterContent();
  const { data: footerLinks } = useFooterLinks();
  const { getContent: getPageContent } = usePageContent("contact");

  const getFooterContent = (key: string) => footerContents?.find((i) => i.content_key === key)?.content_en ?? null;
  const normalizePhoneForHref = (v: string) => v.replace(/[^\d+]/g, "");
  const normalizePhoneForWhatsApp = (v: string) => v.replace(/\D/g, "");
  const getPreferred = (pk: string, fk: string, fb: string) => getPageContent(pk) || getFooterContent(fk) || fb;

  const phone = getPreferred("info.phone", "phone", "+880 1344-497808");
  const rawEmail = getPreferred("info.email", "email", "hello@astropixel.tech").trim();
  const email = (!rawEmail || rawEmail.includes("alphazero") || rawEmail.includes("contact@")) ? "hello@astropixel.tech" : rawEmail;
  const address = getPreferred("info.address", "address", "Hi-Tech Park, Rajshahi, Bangladesh");
  const whatsappValue = getPageContent("info.whatsapp")?.trim();
  const whatsappLink = "https://wa.me/8801344497808";

  const socials = [
    { name: "Facebook", handle: "@astropixel.tech", url: "https://www.facebook.com/astropixel.tech", icon: Facebook, brand: "#1877F2" },
    { name: "WhatsApp", handle: "+880 1344-497808", url: "https://wa.me/8801344497808", icon: MessageCircle, brand: "#25D366" },
    { name: "Instagram", handle: "@astropixel.tech", url: "https://www.instagram.com/astropixel.tech/", icon: Instagram, brand: "#E4405F" },
    { name: "LinkedIn", handle: "AstroPixel Agency", url: "https://www.linkedin.com/company/astropixel/", icon: Linkedin, brand: "#0A66C2" },
    { name: "YouTube", handle: "@Astropixel_tech", url: "https://www.youtube.com/@Astropixel_tech", icon: Youtube, brand: "#FF0000" },
    { name: "Pinterest", handle: "@astropixel_tech", url: "https://www.pinterest.com/astropixel_tech/", icon: PinterestIcon, brand: "#E60023" },
  ];

  const contactCards = [
    { icon: Phone, label: "Call us", value: phone, href: `tel:${normalizePhoneForHref(phone)}`,
      bg: "#DCF2E4", ink: "#0F5132", iconBg: "#B8E6C8" },
    { icon: Mail, label: "Email us", value: email, href: `mailto:${email}`,
      bg: "#FCE4D6", ink: "#8A3A12", iconBg: "#F8C7A8" },
    { icon: MapPin, label: "Location", value: address,
      bg: "#F3E1F4", ink: "#5B2166", iconBg: "#E5C3E8" },
    { icon: Clock, label: "Working hours", value: "Sat – Thu · 10:00 AM – 8:00 PM",
      bg: "#DCEBFF", ink: "#0B3D91", iconBg: "#B8D4FA" },
  ];

  return (
    <Layout>
      <SEO 
        title="Contact AstroPixel — Creative Design Agency in Rajshahi, Bangladesh" 
        description="Get in touch with AstroPixel in Rajshahi, Bangladesh for logo design, branding, UI/UX, and web design projects." 
        canonical="https://astropixel.tech/contact" 
      />
      {/* ===== Editorial Hero ===== */}
      <section id="site-hero" className="relative overflow-hidden -mt-20 pt-32 pb-20 lg:pt-40 lg:pb-28 rounded-b-[2.5rem]">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black" />
        {/* Services hero background image */}
        <img
          src={servicesHeroBg.url}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
          style={{ filter: "blur(16px)" }}
        />
        {/* Grid backdrop */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-sm text-xs font-semibold tracking-wide uppercase text-white mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Available for new projects
              </div>
              <h1 className="text-[15vw] sm:text-[11vw] lg:text-[9rem] font-display font-bold leading-[0.9] tracking-[-0.03em] text-white">
                Let's <span className="font-serif italic font-normal text-white">talk.</span>
              </h1>
              <p className="mt-6 text-base lg:text-xl text-white/80 max-w-xl leading-relaxed">
                Tell us about your idea. Whether it's a rebrand, a launch, or a full digital product — we reply within 24 hours.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="lg:col-span-4 flex flex-col gap-3">
              <a href={`mailto:${email}`}
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-black text-white hover:bg-neutral-800 transition-colors">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Prefer email</div>
                  <div className="font-semibold text-lg">{email}</div>
                </div>
                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-black/10 hover:border-primary/40 hover:shadow-lg transition-all">
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Chat instantly</div>
                  <div className="font-semibold text-lg text-black">WhatsApp us</div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-primary group-hover:rotate-45 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Info Bento Grid ===== */}
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

      {/* ===== Follow Us + Map-style block ===== */}
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
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 6 platforms · active daily
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

              <div className="relative h-full rounded-[2rem] overflow-hidden bg-black text-white flex flex-col min-h-[420px]">
                {/* Header */}
                <div className="relative p-8 lg:p-10 pb-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Our studio</div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold leading-tight mb-3">
                    Come say hi<br />in Rajshahi.
                  </h3>

                  <p className="text-white/60 leading-relaxed text-sm max-w-sm">{address}</p>
                </div>

                {/* Live map */}
                <div className="relative flex-1 min-h-[220px] mx-6 lg:mx-8 rounded-2xl overflow-hidden border border-white/10 group">
                  <iframe
                    title="Astropixel Studio location"
                    src="https://www.google.com/maps?q=Hi-Tech+Park+Rajshahi+Bangladesh&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ border: 0 }}
                  />
                  
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" /> Live map
                  </div>
                </div>

                {/* Footer */}
                <div className="relative flex items-center justify-between gap-4 p-6 lg:p-8 pt-6">
                  <a href="https://share.google/K4AuEFEeRfy3AQCVj"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 font-semibold">
                    <MapPin size={14} /> Open in Maps
                  </a>
                  <a href={`mailto:${email}`}
                    className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white font-bold text-sm shadow-[0_6px_22px_-2px_rgba(124,58,237,0.6)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.85)] border border-white/30 hover:border-white/50 transition-all overflow-hidden">
                    <div aria-hidden className="absolute top-0 right-0 w-14 h-14 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.45),transparent_70%)] pointer-events-none rounded-tr-xl" />
                    <span className="relative z-10">Say hello</span> <ArrowUpRight size={16} className="relative z-10 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
