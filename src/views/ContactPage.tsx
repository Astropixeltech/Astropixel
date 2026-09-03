'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowUpRight, 
  Sparkles, 
  Globe, 
  Send, 
  CheckCircle2, 
  Loader2 
} from "lucide-react";
import { toast } from "sonner";

import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFooterContent, useFooterLinks } from "@/hooks/useFooterData";
import { usePageContent } from "@/hooks/usePageContent";
import { getSavedContactInfo, getSavedContactSocials } from "@/components/admin/ContactInfoManagement";

// Custom SVG Icons for popular social platforms
const PinterestIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const BehanceIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7V5h7v2zm-1.815 6.046c-.056-.704-.326-1.26-.81-1.668-.484-.408-1.11-.612-1.878-.612-.767 0-1.408.204-1.923.612-.515.408-.813.974-.895 1.668h5.506zm-5.506 2.012c.078.742.373 1.32.885 1.734.512.414 1.18.621 2.004.621.656 0 1.228-.135 1.716-.405.488-.27.844-.666 1.068-1.188h2.09c-.314.985-.92 1.777-1.817 2.376-.897.599-1.975.898-3.234.898-1.552 0-2.822-.47-3.81-1.41-.988-.94-1.482-2.222-1.482-3.846 0-1.574.475-2.83 1.425-3.768.95-.938 2.18-1.407 3.69-1.407 1.542 0 2.766.45 3.672 1.35.906.9 1.359 2.14 1.359 3.72 0 .16-.013.364-.04.613h-7.755zM6.55 12.33c.67.11 1.206.39 1.608.84.402.45.603 1.05.603 1.8 0 .95-.366 1.705-1.098 2.265-.732.56-1.745.84-3.039.84H0V6h4.41c1.24 0 2.213.266 2.919.798.706.532 1.059 1.258 1.059 2.178 0 .66-.178 1.205-.534 1.635-.356.43-.865.738-1.527.923v.018zM2.43 8.016v2.538h1.692c.606 0 1.058-.112 1.356-.336.298-.224.447-.546.447-.966 0-.414-.144-.733-.432-.957-.288-.224-.745-.336-1.371-.336H2.43zm0 4.968v3.024h1.836c.642 0 1.12-.132 1.434-.396.314-.264.471-.627.471-1.089 0-.468-.154-.836-.462-1.104-.308-.268-.795-.402-1.461-.402H2.43z"/>
  </svg>
);

const DribbbleIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm9.73 11.04c-.38-.07-2.69-.47-5.34-.13.56 1.54 1.15 3.23 1.6 4.7 2.19-.88 3.39-2.85 3.74-4.57zM16.14 17c-.41-1.35-.95-2.92-1.48-4.35-4.4 1.22-8.37 1.22-8.73 1.22-.03.22-.05.44-.05.67 0 3.36 2.3 6.18 5.43 6.9 1.77-1.14 3.73-3.1 4.83-4.44zM4.09 12.63c.27 0 3.36 0 7.39-1.06C10.74 9.87 9.87 8.08 9.3 6.78 6.03 8.1 4.3 10.98 4.09 12.63zm6.65-7.14c.61 1.34 1.48 3.12 2.21 4.81 2.37-.37 4.54-.02 4.96.06C16.89 7.7 14.15 5.86 10.74 5.49z"/>
  </svg>
);

const TikTokIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.36a8.27 8.27 0 0 0 4.89 1.58V6.49a4.86 4.86 0 0 1-1-.2z"/>
  </svg>
);

const DiscordIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const TelegramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
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
  TikTok: TikTokIcon,
  Discord: DiscordIcon,
  Telegram: TelegramIcon,
  Mail,
  Globe,
};

const SERVICES = [
  "Brand Identity",
  "UI/UX Design",
  "Web Development",
  "Motion & Video",
  "Digital Marketing",
  "Other",
];

const BUDGETS = ["< $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

export default function ContactPage() {
  const { t } = useLanguage();
  const { data: footerContents } = useFooterContent();
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

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Brand Identity",
    budget: "$500 – $1,500",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Brand Identity",
        budget: "$500 – $1,500",
        message: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact AstroPixel — Creative Design Agency in Rajshahi, Bangladesh" 
        description="Get in touch with AstroPixel in Rajshahi, Bangladesh for logo design, branding, UI/UX, and web design projects." 
        canonical="https://astropixel.tech/contact" 
      />

      {/* ===== Hero Header ===== */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-slate-950 text-white rounded-b-[36px]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/30 via-purple-600/20 to-cyan-500/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold tracking-wide uppercase text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> {heroBadge}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.02]"
          >
            {heroTitle}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {heroDescription}
          </motion.p>
        </div>
      </section>

      {/* ===== Main Section: Inquiry Form + Bento Info Cards ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ── Left Column: Interactive Project Inquiry Form ── */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-7 bg-card border border-border/60 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-primary/5"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Project Inquiry
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  Send us a message
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  We usually respond within 24 hours on business days.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Thank you for reaching out. A team member from AstroPixel will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Pills Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                      I&apos;m interested in...
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((svc) => {
                        const selected = formData.service === svc;
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: svc })}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                              selected
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                                : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    />
                  </div>

                  {/* Budget Selection Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                      Estimated Budget (USD)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGETS.map((b) => {
                        const selected = formData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2 px-3 rounded-xl text-xs font-medium text-center transition-all ${
                              selected
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm"
                                : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project goals, timeline, and deliverables..."
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Project Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Right Column: Bento Contact Info, Map & Socials ── */}
            <div className="lg:col-span-5 space-y-6">

              {/* Direct Channels (Email & Phone) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${email}`}
                  className="group p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">Email Us</span>
                    <span className="text-sm font-bold text-foreground truncate block mt-0.5">{email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${normalizePhoneForHref(phone)}`}
                  className="group p-5 rounded-2xl bg-card border border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">Call Us</span>
                    <span className="text-sm font-bold text-foreground truncate block mt-0.5">{phone}</span>
                  </div>
                </a>
              </div>

              {/* Office Hours & Address */}
              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Office Studio</h4>
                    <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border/40">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Working Hours</h4>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{hours}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map Studio Card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white border border-border/60 shadow-lg group">
                <div className="p-4 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wide uppercase text-slate-300">{studioSubtitle}</span>
                  </div>
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>Get Directions</span> <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <iframe
                    title="AstroPixel Studio Map"
                    src={mapEmbedUrl}
                    className="w-full h-full border-0 filter opacity-85 hover:opacity-100 transition-opacity"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Social Channels List */}
              <div className="p-6 rounded-2xl bg-card border border-border/60">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" /> Connect with us
                  </h4>
                  <span className="text-[11px] text-muted-foreground font-medium">{socials.length} Platforms</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/30 transition-all group"
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: s.brand }}
                      >
                        <s.icon size={14} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-foreground block truncate">{s.name}</span>
                        <span className="text-[10px] text-muted-foreground block truncate">{s.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
