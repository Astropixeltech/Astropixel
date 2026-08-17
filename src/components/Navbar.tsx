import { useState, useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const isLearnContext = isLearnSubdomain || LEARN_ROUTES.some((r) => location.pathname.startsWith(r));
  const brandLogo = isLearnContext ? learnLogo : logoFull;
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
      setIsScrolled(y > 50);
      const heroEl = document.getElementById("site-hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Over hero while its bottom is still below the navbar area (~80px)
        setIsOverHero(rect.bottom > 80);
      } else {
        setIsOverHero(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);


  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isWhiteNavText = isScrolled || isOverHero;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-4 sm:py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header container — transparent overlay at top, original glass box on scroll */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? `rounded-2xl px-4 sm:px-5 py-2.5 backdrop-blur-2xl backdrop-saturate-150 border shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-12px_rgba(0,0,0,0.1)] ${
                    isOverHero
                      ? "bg-white/10 dark:bg-white/[0.05] border-white/20"
                      : "bg-white/40 dark:bg-white/[0.06] border-neutral-200/50"
                  }`
                : "bg-transparent border-transparent shadow-none backdrop-blur-none px-2 py-1"
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
            <Link to="/" className="flex items-center group relative shrink-0 z-10">
              <img
                src={logoFullPng}
                alt="AstroPixel Creative Design Agency Logo"
                width={180}
                height={36}
                className="h-8 sm:h-9 max-w-[180px] sm:max-w-[220px] w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: isOverHero ? "none" : "brightness(0)",
                }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop Navigation - Pill style (centered) */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 px-1.5 py-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;

                  const linkClasses = "relative px-3.5 py-2 text-sm font-medium transition-all duration-300";
                  const linkInner = (
                    <span className={`relative z-10 font-semibold text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-cyan-400 font-bold drop-shadow-sm"
                        : isOverHero
                          ? "text-white/90 hover:text-cyan-400 drop-shadow-sm"
                          : isScrolled
                            ? "text-neutral-900 dark:text-white hover:text-cyan-600"
                            : "text-neutral-900 hover:text-cyan-600"
                    }`}>
                      {link.name}
                    </span>
                  );
                  return link.href.startsWith("http") ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>{linkInner}</a>
                  ) : (
                    <Link key={link.href} to={link.href} className={linkClasses}>
                      {linkInner}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right-aligned Controls (desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2">
              <Link
                to="/contact"
                className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 active:scale-95"
              >
                {/* Satin gradient base */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600" />
                {/* Internal lighting overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/15 opacity-60" />
                {/* Inner highlight edge */}
                <div className="absolute inset-[1px] rounded-full border-t border-white/40 pointer-events-none" />
                {/* Outer bloom on hover */}
                <div className="absolute inset-0 rounded-full shadow-[0_6px_24px_rgba(6,182,212,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 text-sm font-semibold text-white tracking-wide">{t("nav.startProject")}</span>
                <ArrowUpRight size={14} className="relative z-10 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile: login + menu on top bar */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <Link
                to="/student/login"
                className="w-9 h-9 rounded-full bg-secondary/80 dark:bg-secondary/50 border border-border/50 dark:border-border/30 flex items-center justify-center"
              >
                <User size={15} className="text-muted-foreground" />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                {isMobileMenuOpen ? <X size={16} className="text-primary" /> : <Menu size={16} className="text-primary" />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden container mx-auto px-4 sm:px-6 mt-2"
            >
              <div className="rounded-2xl bg-white/[0.08] dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 border border-white/15 dark:border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_-1px_0_0_rgba(0,0,0,0.06)_inset,0_10px_30px_-12px_rgba(0,0,0,0.25)] overflow-hidden" style={{ WebkitBackdropFilter: "blur(28px) saturate(160%)", backdropFilter: "blur(28px) saturate(160%)" }}>
                <div className="grid grid-cols-2 gap-1 p-2">
                  {navLinksWithIcons.map((link) => {
                    const IconComp = link.icon;
                    const isActive = location.pathname === link.href;
                    const baseText = isOverHero ? "text-white/90 hover:bg-white/10" : "text-neutral-800 hover:bg-black/5";
                    const iconTone = isActive
                      ? "text-white"
                      : isOverHero
                        ? "text-white/80"
                        : "text-cyan-600/80";
                    const cls = `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-white font-semibold shadow-[0_6px_20px_-6px_rgba(6,182,212,0.55)]"
                        : baseText
                    }`;
                    const inner = (<><IconComp size={16} className={iconTone} />{link.name}</>);
                    return link.href.startsWith("http") ? (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={handleNavClick} className={cls}>{inner}</a>
                    ) : (
                      <Link key={link.href} to={link.href} onClick={handleNavClick} className={cls}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>
                <div className={`flex items-center justify-between gap-2 p-2 border-t ${isOverHero ? "border-white/15" : "border-black/10"}`}>
                  <Link
                    to="/contact"
                    onClick={handleNavClick}
                    className="relative flex-1 h-10 rounded-xl overflow-hidden font-semibold text-xs flex items-center justify-center gap-1 text-white shadow-[0_6px_20px_-6px_rgba(6,182,212,0.55)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600" />
                    <span className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/15 opacity-60" />
                    <span className="relative z-10 flex items-center gap-1">
                      {t("nav.startProject")}
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ Mobile Bottom Navigation Bar ═══ */}
      {(() => {
        const hiddenRoutes = ['/admin', '/student', '/teacher'];
        const shouldHideBottomBar = hiddenRoutes.some(route => location.pathname.startsWith(route));
        if (shouldHideBottomBar) return null;

        const bottomNavItems = [
          { name: language === "bn" ? "হোম" : "Home", href: "/", icon: Home },
          { name: language === "bn" ? "সম্পর্কে" : "About", href: "/about", icon: Info },
          { name: language === "bn" ? "সেবা" : "Services", href: "/services", icon: Briefcase },
          { name: language === "bn" ? "কাজ" : "Work", href: "/work", icon: FolderOpen },
          { name: language === "bn" ? "যোগাযোগ" : "Contact", href: "/contact", icon: Mail },
        ];

        return (
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            <div className="bg-background/70 dark:bg-card/70 backdrop-blur-3xl border-t border-border/30 dark:border-border/20">
              <div className="grid grid-cols-5 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] px-1">

                {bottomNavItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = location.pathname === item.href;

                  const inner = (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="bottom-nav-active"
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary/20 dark:bg-primary/25 rounded-full blur-md"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                          animate={isActive ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <IconComp
                            size={19}
                            strokeWidth={isActive ? 2.5 : 1.5}
                            className={`transition-colors duration-200 ${isActive ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]" : "text-muted-foreground/70"}`}
                          />
                        </motion.div>
                        <span className={`text-[8.5px] leading-tight mt-0.5 transition-all duration-200 ${
                          isActive ? "font-bold text-primary" : "font-medium text-muted-foreground/60"
                        }`}>
                          {item.name}
                        </span>
                      </div>
                    </>
                  );
                  const cls = "relative flex flex-col items-center gap-0.5 py-1";
                  return item.href.startsWith("http") ? (
                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  ) : (
                    <Link key={item.href} to={item.href} className={cls}>
                      {inner}
                    </Link>
                  );

                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;