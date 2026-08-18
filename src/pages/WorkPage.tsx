import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutHeroBg from "@/assets/about-hero-blue-orb.jpg.asset.json";
import { X, Play, ArrowUpRight, Plus, Minus, Tag, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { useWorks, PORTFOLIO_CATEGORIES, type Work } from "@/hooks/useWorks";
import { usePageHero } from "@/hooks/usePageHero";

const categoryBadgeStyle: Record<string, { label: string; color: string }> = {
  web: { label: "Web Design & Dev", color: "bg-purple-100 text-purple-700 border-purple-200" },
  graphics: { label: "Graphic Design", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  design: { label: "Graphic Design", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  branding: { label: "Logo & Branding", color: "bg-amber-100 text-amber-800 border-amber-200" },
  photography: { label: "Photography", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  motion: { label: "Motion / 3D", color: "bg-blue-100 text-blue-700 border-blue-200" },
  video: { label: "Motion / 3D", color: "bg-blue-100 text-blue-700 border-blue-200" },
};

function getCategoryMeta(cat: string) {
  if (cat.startsWith("web")) return categoryBadgeStyle.web;
  if (cat.startsWith("graphics") || cat === "design") return categoryBadgeStyle.graphics;
  if (cat.startsWith("branding")) return categoryBadgeStyle.branding;
  if (cat.startsWith("photography")) return categoryBadgeStyle.photography;
  if (cat.startsWith("motion") || cat.startsWith("video")) return categoryBadgeStyle.motion;
  return { label: "Creative Project", color: "bg-slate-100 text-slate-700 border-slate-200" };
}

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
  const hero = usePageHero("work");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; description?: string | null; tags?: string[] } | null>(null);
  const [activeVideo, setActiveVideo] = useState<Work | null>(null);

  // Preload images to eliminate loading jank/delay on tab switch
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

  const filteredProjects = useMemo(() => {
    if (!works) return [];
    if (selectedCategory === "all") return works;

    return works.filter((w) => {
      const cat = w.category.toLowerCase();
      if (selectedCategory === "web") return cat === "web" || cat.startsWith("web_");
      if (selectedCategory === "graphics") return cat === "graphics" || cat === "design" || cat.startsWith("graphics_");
      if (selectedCategory === "branding") return cat === "branding" || cat.startsWith("branding_");
      if (selectedCategory === "photography") return cat === "photography" || cat.startsWith("photography_");
      if (selectedCategory === "motion") return cat === "motion" || cat === "video" || cat.startsWith("video_");
      return cat === selectedCategory;
    });
  }, [works, selectedCategory]);

  // Handle body overflow & ESC key for modals safely
  useEffect(() => {
    const open = !!lightboxImage || !!activeVideo;
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
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
  }, [lightboxImage, activeVideo]);

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

    if ((w.category === "web" || w.category.startsWith("web_")) && w.project_url) {
      window.open(w.project_url, "_blank");
      return;
    }

    if (w.image_url && !getVideoEmbed(w.image_url)) {
      setLightboxImage({
        url: w.image_url,
        title: w.title || "Project Showcase",
        description: w.description,
        tags: w.tags,
      });
    } else if (w.project_url) {
      window.open(w.project_url, "_blank");
    }
  }, []);

  return (
    <Layout flushTop>
      <SEO 
        title="Portfolio & Projects — AstroPixel Creative Agency" 
        description="Explore AstroPixel's creative portfolio across Web Design & Development, Graphic Design, Logo & Branding, Photography, and Motion / 3D." 
        canonical="https://astropixel.tech/work" 
      />
      
      {/* Hero Section */}
      <section id="site-hero" className="relative overflow-hidden pt-32 pb-14 lg:pt-36 lg:pb-18 rounded-b-[2.5rem]">
        <img
          src={aboutHeroBg.url}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ filter: "blur(4px)", transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.05] text-white mb-6"
            >
              {(() => {
                const raw = hero("hero.title", "Our Creative |Works & Projects|");
                const parts = raw.split("|");
                if (parts.length >= 3) {
                  return (
                    <>
                      <span>{parts[0]}</span>
                      <span className="font-serif italic font-normal gradient-text">{parts[1]}</span>
                      <span>{parts.slice(2).join("|")}</span>
                    </>
                  );
                }
                return raw;
              })()}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base lg:text-lg text-white/60 max-w-2xl mx-auto"
            >
              {hero("hero.description", "Discover our finest Web Applications, Graphic Art, Brand Identity Systems, Photography, and 3D Motion Graphics.")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Navigation System */}
      <section className="relative pt-10 lg:pt-14 z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 bg-white/90 backdrop-blur-md rounded-2xl md:rounded-full border border-[#EEF0FF] shadow-[0_15px_45px_-15px_rgba(109,40,217,0.12)]">
              {PORTFOLIO_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative flex-1 shrink-0 min-w-fit px-4 lg:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive
                        ? "text-white shadow-[0_8px_25px_-6px_rgba(124,58,237,0.5)]"
                        : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#9333EA] z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? "bg-[#C7F358]" : "bg-slate-300"
                        }`}
                      />
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-12 lg:py-18" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-9 h-9 border-3 border-[#6D28D9]/30 border-t-[#6D28D9] rounded-full animate-spin" />
              <p className="text-slate-400 text-sm font-medium">Loading portfolio projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 text-slate-500 max-w-md mx-auto">
              <p className="text-lg font-semibold text-slate-700">No projects found in this category</p>
              <p className="text-sm text-slate-400 mt-1">Check back soon for new case studies and showcases.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => {
                  const isVid = project.category === "motion" || project.category.startsWith("video");
                  const thumb = isVid
                    ? getYouTubeThumbnail(project.project_url) || getYouTubeThumbnail(project.image_url) || project.image_url
                    : project.image_url;

                  const meta = getCategoryMeta(project.category);

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group cursor-pointer flex flex-col h-full"
                      onClick={() => handleCardClick(project)}
                    >
                      <div className="flex flex-col h-full rounded-[24px] bg-white border border-[#EEF0FF] shadow-[0_10px_35px_-18px_rgba(76,29,149,0.1)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_50px_-20px_rgba(109,40,217,0.22)] group-hover:border-purple-200">
                        {/* Project Thumbnail */}
                        <div className="relative aspect-[16/10] overflow-hidden mx-3 mt-3 rounded-xl bg-slate-100">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={`AstroPixel Portfolio Project — ${project.title}`}
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

                          {/* Top-left category badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md shadow-sm ${meta.color}`}>
                              {meta.label}
                            </span>
                          </div>

                          {/* Video Play Overlay */}
                          {isVid && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover:bg-black/10 transition-colors">
                              <div className="w-13 h-13 rounded-full bg-white/95 shadow-xl flex items-center justify-center transition-transform group-hover:scale-110">
                                <Play size={20} className="text-[#6D28D9] ml-0.5" fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Content Body */}
                        <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
                          <div>
                            {/* Project Title */}
                            <h3 className="font-display font-semibold text-[18px] text-[#083344] leading-snug group-hover:text-[#6D28D9] transition-colors line-clamp-1">
                              {project.title}
                            </h3>

                            {/* Short Description */}
                            {project.description && (
                              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2 line-clamp-2">
                                {project.description}
                              </p>
                            )}
                          </div>

                          {/* Bottom Tags & View Project Action Button */}
                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                            {/* Tags pill badges */}
                            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                              {project.tags && project.tags.length > 0 ? (
                                project.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium truncate"
                                  >
                                    {tag}
                                  </span>
                                ))
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium">
                                  Portfolio
                                </span>
                              )}
                            </div>

                            {/* View Project / Case Study Button */}
                            <button
                              type="button"
                              className="shrink-0 flex items-center gap-1 text-xs font-bold text-[#6D28D9] group-hover:text-[#9333EA] transition-colors py-1 px-2 rounded-lg group-hover:bg-purple-50"
                            >
                              <span>View</span>
                              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white"
            >
              <X size={22} />
            </button>
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="flex flex-col items-center max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url} 
                alt={`AstroPixel Showcase — ${lightboxImage.title}`}
                width={900} 
                height={600} 
                loading="eager" 
                decoding="sync"
                className="max-w-full max-h-[70vh] object-contain rounded-2xl cursor-default shadow-2xl border border-white/10" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"; }}
              />
              <div className="mt-5 text-center max-w-xl">
                <p className="text-white text-xl font-display font-bold">{lightboxImage.title}</p>
                {lightboxImage.description && (
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{lightboxImage.description}</p>
                )}
                {lightboxImage.tags && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                    {lightboxImage.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
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
    </Layout>
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
