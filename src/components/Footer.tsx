import { ArrowUpRight, Facebook, Instagram, MessageCircle, Twitter, Youtube, Github, Globe, Mail, Phone, Linkedin, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logoAsset from "@/assets/astropixel-logo.png.asset.json";
const logo = logoAsset.url;
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

  const socialLinks = footerLinks?.filter(link => link.link_type === 'social') || [];
  const defaultSocialLinks = [
    { name: "Website", url: "https://www.astropixel.tech", icon: "Globe" },
    { name: "Email", url: "mailto:agency.alphazero@gmail.com", icon: "Mail" },
    { name: "Discord", url: "https://discord.gg/uerwPXFf5", icon: "Discord" },
    { name: "YouTube", url: "https://youtube.com", icon: "Youtube" },
    { name: "X (Twitter)", url: "https://x.com/AgencyAlphazero", icon: "Twitter" },
    { name: "Instagram", url: "https://www.instagram.com/alphazero.online", icon: "Instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/alphazeroagency/", icon: "Linkedin" },
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

  const email = getContent('email') || 'agency.alphazero@gmail.com';
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
                alt="Astropixel"
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
              <ul className="space-y-3.5">
                {explore.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-[15px] text-background/75 hover:text-background transition-colors"
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
              <ul className="space-y-3.5">
                {services.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-background/40" />
                    <Link
                      to={item.href}
                      className="text-[15px] text-background/75 hover:text-background transition-colors"
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
              <p className="text-[15px] text-background/75 leading-relaxed mb-5 whitespace-pre-line">
                {address}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 sm:my-12 h-px w-full bg-background/10" />

          {/* Social row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {displaySocialLinks.map((social) => {
              const Icon = ICON_MAP[social.icon] || Globe;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-xl bg-background/5 hover:bg-background/10 border border-background/10 flex items-center justify-center text-background/70 hover:text-background transition-all"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
            <span>© {new Date().getFullYear()} Astropixel — {t("footer.rights") || "All rights reserved."}</span>
            <a
              href="mailto:agency.alphazero@gmail.com"
              className="hover:text-background transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
