'use client';

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBgCustom from "@/assets/hero-bg-custom.webp";
const heroBgUrl = (heroBgCustom as any)?.src || heroBgCustom;
import { X, Play, ArrowUpRight, ArrowRight, ExternalLink, Plus, Minus, ArrowDown, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { useWorks, useWorksByCategory, type Work } from "@/hooks/useWorks";
import { usePageHero } from "@/hooks/usePageHero";

const STACKED_CATEGORIES = [
  {
    id: "web",
    num: "01",
    title: "Web Design & Development",
    subtitle: "High-performance web applications, responsive dashboards, and custom headless e-commerce storefronts.",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "graphics",
    num: "02",
    title: "Graphic Design",
    subtitle: "Editorial publication layouts, festival poster art, print typography grid systems, and product packaging.",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  {
    id: "branding",
    num: "03",
    title: "Logo & Branding",
    subtitle: "Complete brand identity systems, minimalist vector logo marks, brand guidelines, and monograms.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
] as const;

function getVideoEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&autoplay=1`;
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
  }
  return null;
}

function getYouTubeThumbnail(url: string | null | undefined): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
}

const findVideoUrl = (w: Work): string | null =>
  getVideoEmbed(w.project_url) ? w.project_url : getVideoEmbed(w.image_url) ? w.image_url : null;

const WorkPage = () => {
  const { data: works, isLoading } = useWorks();
  const { webProjects, graphicsProjects, brandingProjects, photographyProjects, motionProjects } = useWorksByCategory();
  const hero = usePageHero("work");
  const [caseStudyProject, setCaseStudyProject] = useState<Work | null>(null);
  const [activeVideo, setActiveVideo] = useState<Work | null>(null);

  // Preload images to eliminate loading jank/delay
  useEffect(() => {
    if (!works || works.length === 0) return;
    works.forEach((project) => {
      const isVid = project.category === "motion" || project.category.startsWith("video");
      const thumbUrl = isVid
        ? getYouTubeThumbnail(project.project_url) || getYouTubeThumbnail(project.image_url) || project.image_url
        : project.image_url;

      if (thumbUrl) {
        const img = new Image();
        img.src = thumbUrl;
      }
    });
  }, [works]);

  // Handle body overflow & ESC key for modals safely
  useEffect(() => {
    const open = !!caseStudyProject || !!activeVideo;
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCaseStudyProject(null);
        setActiveVideo(null);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudyProject, activeVideo]);

  const handleCardClick = useCallback((w: Work) => {
    if (!w) return;
    const isVid = w.category === "motion" || w.category.startsWith("video");
    if (isVid) {
      const vUrl = findVideoUrl(w);
      if (getVideoEmbed(vUrl)) {
        setActiveVideo(w);
        return;
      }
    }

    setCaseStudyProject(w);
  }, []);

  const scrollToCategory = (catId: string) => {
    const el = document.getElementById(`category-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getCategoryProjects = (catId: string): Work[] => {
    if (catId === "web") return webProjects;
    if (catId === "graphics") return graphicsProjects;
    if (catId === "branding") return brandingProjects;
    if (catId === "photography") return photographyProjects;
    if (catId === "motion") return motionProjects;
    return [];
  };

  const activeCategories = useMemo(() => {
    return STACKED_CATEGORIES.filter((categorySection) => {
      const projects = getCategoryProjects(categorySection.id);
      return projects.length > 0;
    });
  }, [webProjects, graphicsProjects, brandingProjects, photographyProjects, motionProjects]);

  return (
    <>
      <SEO 
        title="Portfolio & Work — AstroPixel Design Agency" 
        description="Explore AstroPixel's work categorized into Web Design & Development, Graphic Design, Logo & Branding, Photography, and Motion / 3D." 
        canonical="https://astropixel.tech/work" 
      />
      
      {/* Hero Section */}
      <section id="site-hero" className="relative overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10 rounded-b-3xl">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black" />
        {/* Background image */}
        <img
          src="/hero-new-bg.png"
          alt="AstroPixel Hero Background"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
          style={{ filter: "blur(48px)" }}
        />
        {/* Grid backdrop */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white mb-3"
            >
              Our <span className="font-serif italic font-normal text-white">Works</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-sm lg:text-base text-white/70 max-w-md mx-auto"
            >
              Explore our portfolio across UI/UX, branding, web development, and digital art.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Quick Navigation Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mr-2 shrink-0 hidden sm:inline-block">Jump to:</span>
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold bg-slate-100/80 hover:bg-[#6D28D9] hover:text-white text-slate-700 transition-all duration-200 shadow-2xs cursor-pointer flex items-center gap-2"
              >
                <span className="font-mono opacity-60">{cat.num}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stacked Portfolio Category Sections */}
      <div className="py-10 lg:py-16" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-9 h-9 border-3 border-[#6D28D9]/30 border-t-[#6D28D9] rounded-full animate-spin" />
              <p className="text-slate-400 text-sm font-medium">Loading creative portfolio sections...</p>
            </div>
          ) : (
            activeCategories.map((categorySection, sectionIdx) => {
              const categoryProjects = getCategoryProjects(categorySection.id);

              return (
                <section
                  key={categorySection.id}
                  id={`category-${categorySection.id}`}
                  className="scroll-mt-28 md:scroll-mt-36"
                >
                  {/* Category Section Header */}
                  <div className="mb-8 md:mb-10 pt-4">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#083344] tracking-tight">
                      {categorySection.title}
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
                      {categorySection.subtitle}
                    </p>
                  </div>

                  {/* Category Project Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {categoryProjects.map((project) => {
                        const isVid = project.category === "motion" || project.category.startsWith("video");
                        const thumb = isVid
                          ? getYouTubeThumbnail(project.project_url) || getYouTubeThumbnail(project.image_url) || project.image_url
                          : project.image_url;

                        return (
                          <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="group cursor-pointer flex flex-col h-full"
                            onClick={() => handleCardClick(project)}
                          >
                            <div className="flex flex-col h-full rounded-[28px] bg-white border border-[#EEF0FF] p-3.5 sm:p-4 shadow-[0_8px_30px_-12px_rgba(76,29,149,0.06)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_-15px_rgba(109,40,217,0.18)] group-hover:border-purple-200">
                              {/* Thumbnail */}
                              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 mb-3.5">
                                {thumb ? (
                                  <img
                                    src={thumb}
                                    alt={`AstroPixel Showcase — ${project.title}`}
                                    width={500}
                                    height={312}
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="sync"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"; }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No preview</div>
                                )}

                                {/* Video Play Overlay */}
                                {isVid && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover:bg-black/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center transition-transform group-hover:scale-110">
                                      <Play size={18} className="text-[#6D28D9] ml-0.5" fill="currentColor" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Faint Dashed Separator */}
                              <div className="border-t border-dashed border-slate-200/60 mb-3" />

                              {/* Card Footer Row — Title + Subtitle on Left, Circular Arrow Button on Right */}
                              <div className="flex items-center justify-between gap-3 px-1 pb-1 mt-auto">
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-display font-semibold text-base sm:text-[17px] text-[#1E1B4B] leading-snug group-hover:text-[#6D28D9] transition-colors truncate">
                                    {project.title}
                                  </h3>
                                  <p className="text-xs text-slate-400 font-medium leading-normal mt-0.5 capitalize truncate">
                                    {project.description || project.category || "Design Showcase"}
                                  </p>
                                </div>

                                {/* Circular Arrow (→) Icon Button */}
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-100/70 border border-purple-200/80 flex items-center justify-center shrink-0 text-purple-700 group-hover:bg-[#6D28D9] group-hover:text-white group-hover:border-[#6D28D9] transition-all duration-300 shadow-2xs">
                                  <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>

                  {/* Section Separator Line */}
                  {sectionIdx < activeCategories.length - 1 && (
                    <div className="my-14 md:my-20 border-t border-dashed border-slate-200/80" />
                  )}
                </section>
              );
            })
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection />

      {/* Behance-Style Full Project Case Study Showcase View (White Theme with Site Hero & Footer) */}
      <AnimatePresence>
        {caseStudyProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#F8FAFC] overflow-y-auto text-slate-900"
          >
            {/* Standard Site Hero Section for Case Study */}
            <section id="site-hero" className="relative overflow-hidden pt-20 pb-12 lg:pt-24 lg:pb-16 rounded-b-3xl">
              {/* Dark base */}
              <div className="absolute inset-0 bg-black" />
              {/* Background image */}
              <img
                src="/hero-new-bg.png"
                alt="AstroPixel Case Study Hero Background"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
                style={{ filter: "blur(48px)" }}
              />
              {/* Grid backdrop */}
              <div className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

              <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                {/* Back Button */}
                <button
                  onClick={() => setCaseStudyProject(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all mb-6 cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back to All Works</span>
                </button>

                <div className="mb-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-purple-200 text-xs font-mono uppercase tracking-widest inline-block">
                    {caseStudyProject.category || "Creative Case Study"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-3">
                  {caseStudyProject.title}
                </h1>
                
                {caseStudyProject.description && (
                  <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
                    {caseStudyProject.description}
                  </p>
                )}
              </div>
            </section>

            {/* White Editorial Content Area */}
            <div className="bg-[#F8FAFC] py-12 sm:py-20 min-h-screen">
              <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Metadata Card (White Theme) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs mb-10 text-xs sm:text-sm">
                  <div>
                    <span className="block text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1">Agency / Studio</span>
                    <span className="font-semibold text-slate-800">AstroPixel Agency</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1">Category</span>
                    <span className="font-semibold text-slate-800 capitalize">{caseStudyProject.category || "Branding"}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1">Year</span>
                    <span className="font-semibold text-slate-800">2026 Edition</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1">Deliverables</span>
                    <span className="font-semibold text-slate-800">Full Design Package</span>
                  </div>
                </div>

                {/* Behance Sequential Stacked Showcase Images (White Theme Cards) */}
                <div className="space-y-8 sm:space-y-12">
                  {/* Image 1 — Main Showcase Cover */}
                  <div className="p-3 sm:p-4 rounded-3xl bg-white border border-slate-200/80 shadow-md">
                    <img
                      src={caseStudyProject.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"}
                      alt={`${caseStudyProject.title} — Main Showcase Cover`}
                      width={1200}
                      height={750}
                      className="w-full h-auto object-cover rounded-2xl sm:rounded-[20px]"
                    />
                  </div>

                  {/* Concept & Strategy Card */}
                  <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Project Concept & Execution</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                      This project presents a complete visual identity and design system created by AstroPixel. Every detail — from typography hierarchy, color palette selection, to 3D mockup presentation — was crafted to build an impactful market presence for the brand.
                    </p>
                    {caseStudyProject.tags && caseStudyProject.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {caseStudyProject.tags.map((tag, idx) => (
                          <span key={idx} className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image 2 — Detail View 1 */}
                  <div className="p-3 sm:p-4 rounded-3xl bg-white border border-slate-200/80 shadow-md">
                    <img
                      src={caseStudyProject.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"}
                      alt={`${caseStudyProject.title} — Detailed Showcase View 1`}
                      width={1200}
                      height={750}
                      className="w-full h-auto object-cover rounded-2xl sm:rounded-[20px] filter contrast-105"
                    />
                  </div>

                  {/* Image 3 — Detail View 2 */}
                  <div className="p-3 sm:p-4 rounded-3xl bg-white border border-slate-200/80 shadow-md">
                    <img
                      src={caseStudyProject.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"}
                      alt={`${caseStudyProject.title} — Detailed Showcase View 2`}
                      width={1200}
                      height={750}
                      className="w-full h-auto object-cover rounded-2xl sm:rounded-[20px]"
                    />
                  </div>
                </div>

                {/* Bottom CTA Card */}
                <div className="mt-16 p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/80 text-center shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Impressed by this project?</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                    We create custom design systems, logos, web apps, and packaging for ambitious brands worldwide.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="/contact"
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                    >
                      Start Your Project
                    </a>
                    <button
                      onClick={() => setCaseStudyProject(null)}
                      className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
                    >
                      Back to All Works
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (() => {
          const embed = getVideoEmbed(findVideoUrl(activeVideo));
          if (!embed) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
              onClick={() => setActiveVideo(null)}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white"
              >
                <X size={22} />
              </button>
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                className="w-full max-w-5xl" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ paddingBottom: "56.25%" }}>
                  <iframe 
                    src={embed} 
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                    title={activeVideo.title} 
                  />
                </div>
                <p className="text-white/90 text-center mt-4 font-display font-semibold text-lg">{activeVideo.title}</p>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
};

const FAQS = [
  { q: "How Much Does A Design Project Cost?", a: "Project pricing depends on scope, complexity, and timeline. We share a clear quote after a short discovery call — no hidden costs, no surprises." },
  { q: "How Long Does A Project Take?", a: "Most projects are completed within a few days to a couple of weeks, depending on the requirements and revisions." },
  { q: "What Design Services Do You Offer?", a: "Brand identity, graphic design, web design & development, UI/UX, video & 3D motion, and photography — all under one roof." },
  { q: "Do You Offer Revisions?", a: "Yes — every package includes multiple rounds of revisions so we can refine the work until it feels exactly right." },
  { q: "How Do We Get Started?", a: "Click Get Started, share a few details about your project, and we'll reach out within 24 hours to plan the next step." },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <section className="px-4 md:px-8 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[28px] md:rounded-[36px] p-8 md:p-14 lg:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(180deg,#ECFEFF 0%,#D5F8FE 42%,#F5FEFF 78%,#FFFFFF 100%)",
            boxShadow: "inset 0 -120px 110px -65px rgba(255,255,255,0.98)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-white/75 to-white pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start mb-10 md:mb-14">
            <div className="relative">
              <h2 className="font-display font-bold text-[#083344] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Frequently<br />Asked Questions
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[#155E75] text-base md:text-[17px] leading-relaxed max-w-md">
                Have questions about our design services? Here are some common queries to help you understand how we work and what you can expect.
              </p>
              <a href="/contact" className="inline-flex w-fit items-center justify-center px-7 py-3 rounded-full text-white font-semibold shadow-[0_10px_30px_-8px_rgba(8,145,178,0.55)] transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#06B6D4 0%,#0891B2 100%)" }}>
                Get Started
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-white shadow-[0_10px_30px_-20px_rgba(8,145,178,0.15)] overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left">
                    <span className="font-display font-semibold text-[#083344] text-base md:text-lg">{item.q}</span>
                    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-[#0891B2] text-white" : "border border-[#A5F3FC] text-[#0891B2]"}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-8 pb-6 text-[#164E63] leading-relaxed">{item.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
