'use client';

import { useState, useEffect, useCallback } from "react";
import CustomArrowIcon from "@/components/ui/CustomArrowIcon";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown,
  Globe,
  Code2,
  Smartphone,
  Sparkles,
  Palette,
  Bot,
  Info,
  UsersRound,
  FolderOpen,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Star,
  Home
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFullAsset from "@/assets/astropixel-logo.png.asset.json";
import logoFullPng from "@/assets/logo-full.png";
import SearchModal from "./SearchModal";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const logoFull = logoFullPng || logoFullAsset?.url;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const pathname = usePathname();
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      const heroEl = document.getElementById("site-hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsOverHero(rect.bottom > 60);
      } else {
        setIsOverHero(y < 350);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isWhiteNavText = isOverHero || !isScrolled;

  const serviceItems = [
    {
      title: language === 'bn' ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Development',
      description: language === 'bn' ? 'নেক্সট জেন রিয়্যাক্ট ও নেক্সট জেস অ্যাপস' : 'High-performing Next.js & React web applications',
      href: '/services#web-dev',
      icon: Globe,
    },
    {
      title: language === 'bn' ? 'ইউআই/ইউএক্স ডিজাইন' : 'UI/UX Design',
      description: language === 'bn' ? 'আধুনিক ও ইউজার ফ্রেন্ডলি ডিজিটাল ইন্টারফেস' : 'Modern, intuitive & high-converting interfaces',
      href: '/services#ui-ux',
      icon: Palette,
    },
    {
      title: language === 'bn' ? 'মোবাইল অ্যাপস' : 'Mobile App Development',
      description: language === 'bn' ? 'আইওএস ও অ্যান্ড্রয়েড ক্রস-প্ল্যাটফর্ম অ্যাপস' : 'Cross-platform iOS & Android mobile solutions',
      href: '/services#mobile-app',
      icon: Smartphone,
    },
    {
      title: language === 'bn' ? 'ব্র্যান্ডিং ও ক্রিয়েটিভ' : 'Branding & Creative',
      description: language === 'bn' ? 'ব্র্যান্ড আইডেন্টিটি, লোগো ও ভিজ্যুয়াল ভ্যালু' : 'Brand identity, logos & high-impact visual design',
      href: '/services#branding',
      icon: Sparkles,
    },
    {
      title: language === 'bn' ? 'এআই সলিউশনস' : 'AI Solutions & Chatbots',
      description: language === 'bn' ? 'স্মার্ট এআই এজেন্ট, ওয়ার্কফ্লো ও চ্যাটবট' : 'Custom AI agents, intelligent workflows & chatbots',
      href: '/services#ai-solutions',
      icon: Bot,
    },
    {
      title: language === 'bn' ? 'ক্লাউড ও ডেভঅপস' : 'Cloud & Infrastructure',
      description: language === 'bn' ? 'হাই-স্পিড সার্ভার, ক্লাউড ও স্কেলিং আর্কিটেকচার' : 'Ultra-fast deployment, cloud & server architecture',
      href: '/services#cloud',
      icon: Layers,
    },
  ];

  const companyItems = [
    {
      title: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us',
      description: language === 'bn' ? 'আমাদের লক্ষ্য, ইতিহাস ও ক্রিয়েটিভ ভিশন' : 'Learn about our story, values, and creative team',
      href: '/about',
      icon: Info,
    },
    {
      title: language === 'bn' ? 'টিম মেম্বারস' : 'Our Team',
      description: language === 'bn' ? 'আমাদের এক্সপার্ট ডিজাইনার ও ডেভেলপারবৃন্দ' : 'Meet our talented designers, engineers & leaders',
      href: '/about#team',
      icon: UsersRound,
    },
    {
      title: language === 'bn' ? 'পোর্টফোলিও প্রজেক্টস' : 'Portfolio & Works',
      description: language === 'bn' ? 'আমাদের সফল এজেন্সির ফিচার্ড প্রজেক্টসমূহ' : 'Explore our featured client works & success stories',
      href: '/work',
      icon: FolderOpen,
    },
    {
      title: language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Contact & Support',
      description: language === 'bn' ? 'প্রজেক্ট শুরু করতে আমাদের সাথে কথা বলুন' : 'Get in touch with us to start your next project',
      href: '/contact',
      icon: Mail,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header container */}
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "rounded-2xl px-4 sm:px-5 py-2 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 bg-white/[0.08] dark:bg-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_10px_30px_-12px_rgba(0,0,0,0.35)]"
                : "bg-transparent border-transparent shadow-none px-2 py-1"
            }`}
            style={{
              WebkitBackdropFilter: isScrolled ? "blur(28px) saturate(160%)" : "none",
              backdropFilter: isScrolled ? "blur(28px) saturate(160%)" : "none",
            }}
          >
            {/* Top glass highlight line */}
            {isScrolled && (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
                <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/5 to-transparent" />
              </>
            )}

            {/* Brand Logo */}
            <Link href="/" className="flex items-center group relative shrink-0 z-10">
              <img
                src={(logoFullPng as any)?.src || logoFull}
                alt="AstroPixel Creative Design Agency Logo"
                width={180}
                height={36}
                className={`h-8 sm:h-9 max-w-[180px] sm:max-w-[220px] w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  isWhiteNavText ? "brightness-0 invert" : "brightness-0"
                }`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop Dropdown Navigation Menu */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {/* Home */}
                  <NavigationMenuItem>
                    <Link
                      href="/"
                      className={`px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl hover:bg-white/10 ${
                        pathname === '/'
                          ? isWhiteNavText ? "text-cyan-400 drop-shadow-sm" : "text-violet-600"
                          : isWhiteNavText ? "text-white/90 hover:text-cyan-400" : "text-neutral-900 dark:text-white hover:text-violet-600"
                      }`}
                    >
                      {t("nav.home")}
                    </Link>
                  </NavigationMenuItem>

                  {/* Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-transparent px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl border-none shadow-none hover:bg-white/10 ${
                        pathname.startsWith('/services')
                          ? isWhiteNavText ? "text-cyan-400 drop-shadow-sm" : "text-violet-600"
                          : isWhiteNavText ? "text-white/90 hover:text-cyan-400" : "text-neutral-900 dark:text-white hover:text-violet-600"
                      }`}
                    >
                      {t("nav.services")}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-background/95 backdrop-blur-2xl border border-border/60 shadow-2xl rounded-2xl p-3 w-[560px]">
                      <div className="grid grid-cols-2 gap-2">
                        {serviceItems.map((item, i) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={i}
                              href={item.href}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 text-primary transition-colors shrink-0 mt-0.5">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between px-2 text-xs">
                        <span className="text-muted-foreground">{language === 'bn' ? 'কাস্টম সলিউশন দরকার?' : 'Need a custom digital solution?'}</span>
                        <Link href="/contact" className="font-semibold text-primary hover:underline flex items-center gap-1">
                          {language === 'bn' ? 'ফ্রি পরামর্শ নিন' : 'Get Free Consultation'} →
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Company Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-transparent px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl border-none shadow-none hover:bg-white/10 ${
                        pathname.startsWith('/about')
                          ? isWhiteNavText ? "text-cyan-400 drop-shadow-sm" : "text-violet-600"
                          : isWhiteNavText ? "text-white/90 hover:text-cyan-400" : "text-neutral-900 dark:text-white hover:text-violet-600"
                      }`}
                    >
                      {language === 'bn' ? 'কোম্পানি' : 'Company'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-background/95 backdrop-blur-2xl border border-border/60 shadow-2xl rounded-2xl p-3 w-[440px]">
                      <div className="grid grid-cols-1 gap-1.5">
                        {companyItems.map((item, i) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={i}
                              href={item.href}
                              className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 text-primary transition-colors shrink-0">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-muted-foreground line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Work */}
                  <NavigationMenuItem>
                    <Link
                      href="/work"
                      className={`px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl hover:bg-white/10 ${
                        pathname === '/work'
                          ? isWhiteNavText ? "text-cyan-400 drop-shadow-sm" : "text-violet-600"
                          : isWhiteNavText ? "text-white/90 hover:text-cyan-400" : "text-neutral-900 dark:text-white hover:text-violet-600"
                      }`}
                    >
                      {t("nav.work")}
                    </Link>
                  </NavigationMenuItem>

                  {/* Contact */}
                  <NavigationMenuItem>
                    <Link
                      href="/contact"
                      className={`px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl hover:bg-white/10 ${
                        pathname === '/contact'
                          ? isWhiteNavText ? "text-cyan-400 drop-shadow-sm" : "text-violet-600"
                          : isWhiteNavText ? "text-white/90 hover:text-cyan-400" : "text-neutral-900 dark:text-white hover:text-violet-600"
                      }`}
                    >
                      {t("nav.contact")}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2">
              <Link
                href="/contact"
                className="group relative flex items-center gap-1.5 px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white shadow-[0_5px_18px_-2px_rgba(124,58,237,0.6)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.85)] border border-white/30 hover:border-white/50"
              >
                <div aria-hidden className="absolute top-0 right-0 w-12 h-12 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.45),transparent_70%)] pointer-events-none rounded-tr-xl" />
                <span className="relative z-10 text-xs sm:text-[13px] font-bold text-white tracking-wide">{t("nav.startProject")}</span>
                <CustomArrowIcon className="w-3.5 h-3.5 text-white relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                {isMobileMenuOpen ? <X size={16} className="text-primary" /> : <Menu size={16} className="text-primary" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden container mx-auto px-4 sm:px-6 mt-2"
            >
              <div className="rounded-2xl bg-background/95 backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-2xl overflow-hidden p-3 space-y-2">
                {/* Mobile Links */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/60 transition-colors"
                  >
                    <Home className="w-4 h-4 text-primary" />
                    {t("nav.home")}
                  </Link>

                  {/* Services Collapsible Mobile Section */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Briefcase className="w-4 h-4 text-primary" />
                        {t("nav.services")}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="ml-4 pl-3 border-l border-border/60 my-1 space-y-1">
                        {serviceItems.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={handleNavClick}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/40"
                          >
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Company Collapsible Mobile Section */}
                  <div>
                    <button
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Info className="w-4 h-4 text-primary" />
                        {language === 'bn' ? 'কোম্পানি' : 'Company'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileCompanyOpen && (
                      <div className="ml-4 pl-3 border-l border-border/60 my-1 space-y-1">
                        {companyItems.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={handleNavClick}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/40"
                          >
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Work */}
                  <Link
                    href="/work"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/60 transition-colors"
                  >
                    <FolderOpen className="w-4 h-4 text-primary" />
                    {t("nav.work")}
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/60 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    {t("nav.contact")}
                  </Link>
                </div>

                {/* Mobile CTA */}
                <div className="pt-2 border-t border-border/50">
                  <Link
                    href="/contact"
                    onClick={handleNavClick}
                    className="w-full h-10 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] shadow-md"
                  >
                    {t("nav.startProject")}
                    <CustomArrowIcon className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Navbar;