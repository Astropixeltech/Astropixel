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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? "top-3 sm:top-4 px-3 sm:px-4 md:px-6" : "top-0 px-0"
        }`}
      >
        <div className="w-full">
          {/* Header container — completely transparent overlay at top, floating pill on scroll */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${
              isScrolled
                ? "max-w-5xl mx-auto rounded-full px-5 py-2.5 bg-neutral-950/85 dark:bg-neutral-950/90 border border-white/15 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150 text-white"
                : "max-w-7xl mx-auto px-6 sm:px-8 py-5 sm:py-6 bg-transparent border-transparent shadow-none backdrop-blur-none rounded-none"
            }`}
            style={{
              WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(150%)" : "none",
              backdropFilter: isScrolled ? "blur(20px) saturate(150%)" : "none",
            }}
          >
            {/* Soft top highlight for floating pill */}
            {isScrolled && (
              <div aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
            )}

            {/* Logo */}
            <Link to="/" className="flex items-center group relative shrink-0 z-10">
              <img
                src={logoFullPng}
                alt="AstroPixel"
                className="h-8 sm:h-9 max-w-[180px] sm:max-w-[220px] w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: isWhiteNavText ? "none" : "brightness(0)",
                }}
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation - Pill style (centered) */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 px-1.5 py-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;

                  const linkClasses = "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full";
                  const linkInner = (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-sm"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                      <span className={`relative z-10 font-semibold text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-400 font-bold"
                          : isWhiteNavText
                            ? "text-white/90 hover:text-white drop-shadow-sm"
                            : "text-neutral-900 hover:text-cyan-600"
                      }`}>
                        {link.name}
                      </span>
                    </>
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
            <div className="hidden lg:flex items-center gap-1.5">






              {/* CTA Button — Liquid Glass */}
              <Link
                to="/contact"
                className="ml-1 group relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 active:scale-95"
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

            {/* Mobile menu button */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
                  isWhiteNavText
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-neutral-900/10 border-neutral-900/20 text-neutral-900 hover:bg-neutral-900/20"
                }`}
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
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
              className="lg:hidden max-w-md mx-auto px-4 mt-2"
            >
              <div className="rounded-2xl bg-neutral-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden p-3">
                <div className="grid grid-cols-1 gap-1">
                  {navLinksWithIcons.map((link) => {
                    const IconComp = link.icon;
                    const isActive = location.pathname === link.href;
                    const cls = `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`;
                    const inner = (<><IconComp size={18} className={isActive ? "text-white" : "text-cyan-400"} />{link.name}</>);
                    return link.href.startsWith("http") ? (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={handleNavClick} className={cls}>{inner}</a>
                    ) : (
                      <Link key={link.href} to={link.href} onClick={handleNavClick} className={cls}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to="/contact"
                    onClick={handleNavClick}
                    className="relative w-full h-11 rounded-xl overflow-hidden font-semibold text-xs flex items-center justify-center gap-1.5 text-white shadow-lg"
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600" />
                    <span className="relative z-10 flex items-center gap-1.5 text-sm font-semibold">
                      {t("nav.startProject")}
                      <ArrowUpRight size={15} />
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