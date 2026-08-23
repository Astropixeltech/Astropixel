'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Info, Briefcase, FolderOpen, Mail, Menu, X } from "lucide-react";
import { MenuBar, MenuItem } from "@/components/ui/glow-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFullPng from "@/assets/logo-full.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: t("nav.home") || "Home",
      href: "/",
      gradient:
        "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(37,99,235,0.08) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: Info,
      label: t("nav.about") || "About",
      href: "/about",
      gradient:
        "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(147,51,234,0.08) 50%, rgba(126,34,206,0) 100%)",
      iconColor: "text-purple-500",
    },
    {
      icon: Briefcase,
      label: t("nav.services") || "Services",
      href: "/services",
      gradient:
        "radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(8,145,178,0.08) 50%, rgba(14,116,144,0) 100%)",
      iconColor: "text-cyan-500",
    },
    {
      icon: FolderOpen,
      label: t("nav.work") || "Work",
      href: "/work",
      gradient:
        "radial-gradient(circle, rgba(34,197,94,0.2) 0%, rgba(22,163,74,0.08) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: Mail,
      label: t("nav.contact") || "Contact",
      href: "/contact",
      gradient:
        "radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(234,88,12,0.08) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
    },
  ];

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeItem = menuItems.find(
    (item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href))
  )?.label || t("nav.home") || "Home";

  const handleItemClick = (label: string, href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  const isWhiteNavText = isOverHero || !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0 z-10">
          <img
            src={(logoFullPng as any)?.src || logoFullPng}
            alt="AstroPixel Creative Agency Logo"
            className={`h-8 sm:h-9 max-w-[170px] sm:max-w-[200px] w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
              isWhiteNavText ? "brightness-0 invert" : "brightness-0"
            }`}
          />
        </Link>

        {/* Desktop 3D Glow Menu Bar */}
        <div className="hidden lg:block">
          <MenuBar
            items={menuItems}
            activeItem={activeItem}
            onItemClick={handleItemClick}
            className="shadow-2xl border-white/20 dark:border-white/10"
          />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-2xl bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Bar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden container mx-auto px-4 mt-2">
          <div className="p-3 rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl space-y-2">
            <MenuBar
              items={menuItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              className="w-full flex justify-center"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
export { Navbar as Header };