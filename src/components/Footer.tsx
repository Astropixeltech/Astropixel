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

          {/* Partner & Review Badges Row (Official Logos) */}
          <div className="mt-12 py-7 border-t border-b border-background/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center justify-center">
            {/* Framer */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-1.5 font-bold text-base tracking-tight text-white group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 text-[#0055FF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                </svg>
                <span className="font-sans font-bold text-base">Framer</span>
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase">Professional Partner</span>
            </div>

            {/* Webflow */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-1.5 font-bold text-base tracking-tight group-hover:scale-105 transition-transform">
                <svg className="w-5 h-3.5 text-[#146EF5]" viewBox="0 0 100 65" fill="currentColor">
                  <path d="M72.2 0L53.9 39.8L44.8 22.9L54.7 4.9C55.7 3.1 55.4 0.9 54.1 0.3C52.8 -0.3 50.8 -0.1 49.8 0.9L22.2 13.4C20.3 14.3 19.1 16.2 19.1 18.3C19.1 20.4 20.3 22.3 22.2 23.2L35.8 29.8L19.9 60.1C18.9 62 19.3 64.2 20.6 64.8C21.9 65.4 23.9 65.2 24.9 64.2L72.2 42.6C74.1 41.7 75.3 39.8 75.3 37.7C75.3 35.6 74.1 33.7 72.2 32.8L58.6 26.2L72.2 0Z"/>
                </svg>
                <span className="font-sans font-bold text-base text-white">Webflow</span>
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase">Professional Partner</span>
            </div>

            {/* Behance */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-1 font-bold text-base tracking-tight text-[#1769FF] group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 text-[#1769FF] fill-current" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.66 1.774-2.88 3-5.226 3-3.791 0-6.5-2.673-6.5-6.5 0-3.722 2.651-6.5 6.5-6.5 3.864 0 6.274 2.809 6.274 6.745 0 .285-.015.655-.044.897h-9.73c.09 1.956 1.547 3.358 3.5 3.358 1.348 0 2.502-.656 2.951-1.745h2.275zm-5.226-7.858c-1.637 0-2.85 1.139-3.087 2.608h6.143c-.104-1.469-1.285-2.608-3.056-2.608zm-11.5 10.858h-7v-14h6.583c2.997 0 4.917 1.482 4.917 3.75 0 1.536-.789 2.766-2.115 3.385 1.71.55 2.615 1.956 2.615 3.784 0 2.493-2.072 3.081-5 3.081zm-3.5-8.5h3.083c1.378 0 2.417-.492 2.417-1.696 0-1.205-.989-1.554-2.417-1.554h-3.083v3.25zm0 2.25v3.5h3.333c1.464 0 2.667-.442 2.667-1.75 0-1.309-1.203-1.75-2.667-1.75h-3.333z"/>
                </svg>
                <span className="font-sans font-bold text-base text-[#1769FF]">Behance</span>
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase">Top Team On Behance</span>
            </div>

            {/* Dribbble */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-1.5 font-bold text-base tracking-tight text-[#EA4C89] group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 text-[#EA4C89] fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.12 11.231c-2.883-.591-5.748-.484-8.498.243-.377-.852-.8-1.704-1.258-2.529 3.535-1.728 6.541-1.957 9.756-1.026.046.331.07.668.07 1.011 0 .802-.13 1.573-.07 2.301zm-1.071-4.896c-2.924-.766-5.656-.511-8.877 1.059-.444-.805-.92-1.597-1.425-2.37 3.398-2.031 6.84-2.183 10.302-1.311z"/>
                </svg>
                <span className="font-serif italic font-bold text-base text-[#EA4C89]">dribbble</span>
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase">Top Team On Dribbble</span>
            </div>

            {/* Clutch */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-0.5 font-bold text-base tracking-tight text-white group-hover:scale-105 transition-transform">
                <span className="font-sans font-bold text-base">Clutch</span>
                <span className="w-2 h-2 rounded-full bg-[#DA291C] inline-block ml-0.5" />
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase flex items-center gap-1">
                <span>Reviewed On</span>
                <span className="flex text-amber-400 text-[10px]">★★★★★</span>
              </span>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
              <div className="flex items-center gap-1.5 font-bold text-base tracking-tight group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="font-sans font-bold text-base text-white">Google</span>
              </div>
              <span className="text-[11px] font-medium text-background/40 tracking-wider uppercase flex items-center gap-1">
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
