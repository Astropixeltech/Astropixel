'use client';

import { useState, useEffect } from "react";
import CustomArrowIcon from "@/components/ui/CustomArrowIcon";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Sun,
  Moon,
  ArrowUpRight,
  Search,
  User,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  Users,
  GraduationCap,
  Mail,
  Phone,
  MoreHorizontal,
  ChevronDown,
  Tag
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFullAsset from "@/assets/astropixel-logo.png.asset.json";
import logoFullPng from "@/assets/logo-full.png";
import learnLogoAssetJson from "@/assets/learn-with-alphazero-logo.png.asset.json";
const learnLogo = learnLogoAssetJson.url;
const logoFull = logoFullPng || logoFullAsset?.url;
const isLearnSubdomain = typeof window !== "undefined" && window.location.hostname.startsWith("learn.");
import SearchModal from "./SearchModal";
import { ShinyButton } from "@/components/ui/shiny-button";

const LEARN_ROUTES = ["/courses", "/instructors", "/learn-about"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const brandLogo = logoFull;
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const COURSES_URL = "https://learn.astropixel.tech";

  const navLinks = [
    { name: t("nav.home"), href: "/", num: "01" },
    { name: t("nav.about"), href: "/about", num: "02" },
    { name: t("nav.services"), href: "/services", num: "03" },
    { name: t("nav.work"), href: "/work", num: "04" },
    { name: t("nav.contact"), href: "/contact", num: "05" },

  ];

  const navLinksWithIcons = [
    { name: t("nav.home"), href: "/", icon: Home },
    { name: t("nav.about"), href: "/about", icon: Info },
    { name: t("nav.services"), href: "/services", icon: Briefcase },
    { name: t("nav.work"), href: "/work", icon: FolderOpen },
    
    
    { name: t("nav.contact"), href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header container — transparent overlay at top (no box/border), original glass box on scroll */}
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "rounded-2xl px-4 sm:px-5 py-2.5 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 bg-white/[0.08] dark:bg-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_10px_30px_-12px_rgba(0,0,0,0.35)]"
                : "bg-transparent border-transparent shadow-none px-2 py-1"
            }`}
            style={{
              WebkitBackdropFilter: isScrolled ? "blur(28px) saturate(160%)" : "none",
              backdropFilter: isScrolled ? "blur(28px) saturate(160%)" : "none",
            }}
          >
            {/* Soft top glass highlight & bottom shadow line (only on scroll) */}
            {isScrolled && (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
                <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/5 to-transparent" />
              </>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center group relative shrink-0 z-10">
              <img
                src={(logoFullPng as any)?.src || logoFullPng}
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

            {/* Desktop Navigation - Pill style (centered) */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 px-1.5 py-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  const linkClasses = "relative px-3.5 py-2 text-sm font-medium transition-all duration-300";
                  const linkInner = (
                    <span className={`relative z-10 font-semibold text-sm transition-colors duration-300 ${
                      isActive
                        ? isWhiteNavText ? "text-cyan-400 font-bold drop-shadow-sm" : "text-violet-600 font-bold"
                        : isWhiteNavText ? "text-white/90 hover:text-cyan-400 drop-shadow-sm" : "text-neutral-900 dark:text-white hover:text-violet-600"
                    }`}>
                      {link.name}
                    </span>
                  );
                  return link.href.startsWith("http") ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>{linkInner}</a>
                  ) : (
                    <Link key={link.href} href={link.href} className={linkClasses}>
                      {linkInner}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right-aligned Controls (desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2">
              <Link
                href="/contact"
                className={`group relative flex items-center justify-center gap-2 px-4 sm:px-4.5 py-2 rounded-lg transition-all duration-300 active:scale-95 shrink-0 shadow-md ${
                  isWhiteNavText
                    ? "bg-white hover:bg-slate-100 text-black border border-white/80"
                    : "bg-slate-900 hover:bg-black text-white border border-slate-800"
                }`}
              >
                <span className="relative z-10 text-xs sm:text-[13px] font-bold tracking-wide whitespace-nowrap">{t("nav.startProject")}</span>
                <CustomArrowIcon className={`w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1 shrink-0 ${isWhiteNavText ? "text-black" : "text-white"}`} />
              </Link>
            </div>

            {/* Mobile: menu toggle button */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <MenuToggle 
                open={isMobileMenuOpen} 
                onOpenChange={setIsMobileMenuOpen} 
                className={isWhiteNavText ? "text-white" : "text-slate-900"} 
              />
            </div>
          </div>
        </div>

        {/* Mobile menu drawer — White Frosted Glassmorphism with Purple Accents */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden container mx-auto px-4 sm:px-6 mt-3 relative z-50"
            >
              <div 
                className="relative rounded-3xl bg-white/85 border border-white/80 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_20px_50px_-10px_rgba(0,0,0,0.18)] overflow-hidden backdrop-blur-3xl backdrop-saturate-180" 
                style={{ WebkitBackdropFilter: "blur(32px) saturate(180%)", backdropFilter: "blur(32px) saturate(180%)" }}
              >
                {/* Top Glass Highlight */}
                <div aria-hidden className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent" />

                {/* Single line stacked list — White Glassmorphism Items */}
                <div className="flex flex-col p-2.5 space-y-1.5 relative z-10">
                  {navLinksWithIcons.map((link) => {
                    const IconComp = link.icon;
                    const isActive = pathname === link.href;

                    const cls = `flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "text-purple-700 font-bold bg-purple-100/70 border border-purple-200/80 shadow-[0_0_15px_rgba(168,85,247,0.18)]"
                        : "text-slate-800 hover:text-slate-900 hover:bg-slate-100/80"
                    }`;

                    const inner = (
                      <>
                        <div className="flex items-center gap-3">
                          <IconComp size={18} className={isActive ? "text-purple-600" : "text-slate-500"} />
                          <span className="tracking-wide">{link.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_8px_#a855f7]" />
                        )}
                      </>
                    );

                    return link.href.startsWith("http") ? (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={handleNavClick} className={cls}>{inner}</a>
                    ) : (
                      <Link key={link.href} href={link.href} onClick={handleNavClick} className={cls}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom CTA Link */}
                <div className="p-3.5 bg-slate-50/80 border-t border-slate-200/70 relative z-10">
                  <Link
                    href="/contact"
                    onClick={handleNavClick}
                    className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(15,23,42,0.25)] hover:bg-slate-800 transition-all active:scale-[0.98]"
                  >
                    <span>{t("nav.startProject")}</span>
                    <ArrowUpRight size={16} className="text-white" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;