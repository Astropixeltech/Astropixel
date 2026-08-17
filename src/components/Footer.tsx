import { ArrowUpRight, Facebook, Instagram, MessageCircle, Twitter, Youtube, Github, Globe, Mail, Phone, Linkedin, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logoFullPng from "@/assets/logo-full.png";
import logoAsset from "@/assets/astropixel-logo.png.asset.json";
const logo = logoFullPng || logoAsset.url;
import { useLanguage } from "@/contexts/LanguageContext";
import { useFooterLinks, useFooterContent } from "@/hooks/useFooterData";

const DiscordIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

type IconComponent = LucideIcon | typeof DiscordIcon;

const ICON_MAP: Record<string, IconComponent> = {
  Facebook, Instagram, MessageCircle, Twitter, Youtube, Github, Globe, Mail, Phone, Linkedin,
  Discord: DiscordIcon,
};

const Footer = () => {
  const { t } = useLanguage();
  const { data: footerLinks } = useFooterLinks();
  const { data: footerContents } = useFooterContent();

  const getContent = (key: string) => {
    const content = footerContents?.find(c => c.content_key === key);
    return content?.content_en ?? null;
  };

  const getIcon = (name: string) => ICON_MAP[name] || Globe;

  const socialLinks = footerLinks?.filter(link => link.link_type === 'social') || [];
  const defaultSocialLinks = [
    { name: "Website", url: "https://www.astropixel.tech", icon: "Globe" },
    { name: "Email", url: "mailto:hello@astropixel.tech", icon: "Mail" },
    { name: "Discord", url: "https://discord.gg/uerwPXFf5", icon: "Discord" },
    { name: "YouTube", url: "https://youtube.com", icon: "Youtube" },
    { name: "X (Twitter)", url: "https://x.com/astropixel_tech", icon: "Twitter" },
    { name: "Instagram", url: "https://www.instagram.com/astropixel.tech", icon: "Instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/astropixel-tech/", icon: "Linkedin" },
    { name: "Facebook", url: "https://www.facebook.com/share/1Zm7yMhPtk/", icon: "Facebook" },
    { name: "WhatsApp", url: "https://wa.me/8801846484200", icon: "MessageCircle" },
  ];
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  const explore = [
    { name: t("nav.home") || "Home", href: "/" },
    { name: t("nav.about") || "About", href: "/about" },
    { name: t("nav.work") || "Work", href: "/work" },
    { name: t("nav.contact") || "Contact", href: "/contact" },
  ];

  const services = [
    { name: "UI/UX Design", href: "/services" },
    { name: "Web Development", href: "/services" },
    { name: "Branding", href: "/services" },
    { name: "Digital Marketing", href: "/services" },
  ];

  const rawEmail = getContent('email');
  const email = (!rawEmail || rawEmail.includes('alphazero') || rawEmail.includes('contact@')) ? 'hello@astropixel.tech' : rawEmail;
  const address = getContent('address') || 'Rajshahi, Bangladesh';
  const description = getContent('description') || 'Astropixel is a creative studio blending strategy, design and technology to craft standout digital experiences.';

  return (
    <footer className="relative bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Top grid: Brand | Explore | Services | Office */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:pr-6">
              <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="AstroPixel Creative Design Agency Logo"
                width={180}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto"
              />
              </Link>
              <p className="text-sm leading-relaxed text-background/60 max-w-xs">
                {description}
              </p>
            </div>

            {/* Explore */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-background">
                  Explore
                </h4>
              </div>
              <ul className="space-y-3 text-sm">
                {explore.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-background">
                  Services
                </h4>
              </div>
              <ul className="space-y-3 text-sm">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-background">
                  Office
                </h4>
              </div>
              <div className="space-y-3 text-sm text-background/70">
                <p>{address}</p>
                <a
                  href={`mailto:${email}`}
                  className="block hover:text-background transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="mt-14 pt-8 border-t border-background/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs tracking-wider uppercase text-background/40 font-medium">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              {displaySocialLinks.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-10 h-10 rounded-full border border-background/15 flex items-center justify-center text-background/70 hover:text-background hover:border-background/40 hover:scale-105 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Partner & Review Badges Row (as shown in reference design) */}
          <div className="mt-12 py-7 border-t border-b border-background/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center justify-center">
            {/* Framer */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="flex items-center gap-1.5 font-bold text-base tracking-tight text-white group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 text-[#0055FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>
                <span>Framer</span>
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider">Professional Partner</span>
            </div>

            {/* Webflow */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="flex items-center gap-1.5 font-bold text-base tracking-tight text-[#146EF5] group-hover:scale-105 transition-transform">
                <svg className="w-4 h-3.5" viewBox="0 0 100 60" fill="currentColor"><path d="M72 0L54 40L45 23L55 5C56 3 55 1 54 0C52 -1 50 -1 48 0L22 13C20 14 19 16 19 18C19 20 20 22 22 23L36 30L20 60C19 62 19 64 21 65C22 66 24 67 26 66L72 43C74 42 75 40 75 38C75 36 74 34 72 33L59 27L72 0Z"/></svg>
                <span className="text-white">Webflow</span>
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider">Professional Partner</span>
            </div>

            {/* Behance */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="font-bold text-lg tracking-tight text-[#0057FF] group-hover:scale-105 transition-transform">
                Bēhance
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider">Top Team On Behance</span>
            </div>

            {/* Dribbble */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="font-bold text-lg tracking-tight text-[#EA4C89] font-serif italic group-hover:scale-105 transition-transform">
                dribbble
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider">Top Team On Dribbble</span>
            </div>

            {/* Clutch */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="font-bold text-base tracking-tight text-white group-hover:scale-105 transition-transform flex items-center gap-0.5">
                Clutch<span className="text-[#DA291C]">•</span>
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider flex items-center gap-1">
                <span>Reviewed On</span>
                <span className="flex text-amber-400 text-[10px]">★★★★★</span>
              </span>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
              <span className="font-bold text-base tracking-tight flex items-center justify-center gap-0.5 group-hover:scale-105 transition-transform">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              <span className="text-[11px] font-medium text-background/40 tracking-wider flex items-center gap-1">
                <span>Reviewed On</span>
                <span className="flex text-amber-400 text-[10px]">★★★★★</span>
              </span>
            </div>
          </div>

          {/* Bottom Copyright Bar matching reference image */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-background/60">
            <Link to="/terms" className="hover:text-background transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-center">
              © {new Date().getFullYear()}, AstroPixel Agency, All Rights Reserved.
            </span>
            <Link to="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
