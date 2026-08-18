import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutHeroBg from "@/assets/about-hero-blue-orb.jpg.asset.json";
import { X, Play, ArrowUpRight, Plus, Minus } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { useWorks, type Work } from "@/hooks/useWorks";
import { usePageHero } from "@/hooks/usePageHero";

/* ─── Category helpers ─── */
const isGraphics = (w: Work) => {
  if (!w || !w.category) return false;
  const c = w.category;
  return c === "design" || c === "graphics" || c.startsWith("graphics_");
};

const isWeb = (w: Work) => {
  if (!w || !w.category) return false;
  const c = w.category;
  return c === "web" || c.startsWith("web_");
};

const isVideo = (w: Work) => {
  if (!w || !w.category) return false;
  const c = w.category;
  return c === "video" || c.startsWith("video_");
};

const categoryLabel = (w: Work) => {
  if (isVideo(w)) return "Video & Motion";
  if (isWeb(w)) return "Web Design";
  return "Graphic Design";
};

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

type FilterKey = "all" | "graphics" | "web" | "video";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "graphics", label: "Graphic Design" },
  { key: "web", label: "Web Design" },
  { key: "video", label: "Video & Motion" },
];

const WorkPage = () => {
  const { data: works, isLoading } = useWorks();
  const hero = usePageHero("work");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; description?: string | null } | null>(null);
  const [activeVideo, setActiveVideo] = useState<Work | null>(null);

  // Preload images to eliminate loading jank/delay on tab switch
  useEffect(() => {
    if (!works || works.length === 0) return;
    works.forEach((project) => {
      const vid = isVideo(project);
      const thumbUrl = vid
        ? getYouTubeThumbnail(project.project_url) || getYouTubeThumbnail(project.image_url) || project.image_url
        : project.image_url;

      if (thumbUrl) {
        const img = new Image();
        img.src = thumbUrl;
      }
    });
  }, [works]);

  const filtered = useMemo(() => {
    if (!works) return [];
    if (filter === "all") return works;
    if (filter === "graphics") return works.filter(isGraphics);
    if (filter === "web") return works.filter(isWeb);
    return works.filter(isVideo);
  }, [works, filter]);

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
    if (isVideo(w)) {
      const vUrl = findVideoUrl(w);
      if (getVideoEmbed(vUrl)) setActiveVideo(w);
      else if (w.project_url) window.open(w.project_url, "_blank");
      return;
    }
    if (isWeb(w) && w.project_url) {
      window.open(w.project_url, "_blank");
      return;
    }
    if (w.image_url && !getVideoEmbed(w.image_url)) {
      setLightboxImage({ url: w.image_url, title: w.title || "Project Showcase", description: w.description });
    }
  }, []);

  return (
    <Layout flushTop>
      <SEO 
        title="Portfolio — AstroPixel Design Work" 
        description="Browse AstroPixel's design portfolio featuring logo design, brand identity, UI/UX projects, web development, and social media graphics." 
        canonical="https://astropixel.tech/work" 
      />
      
      {/* Hero — About style */}
      <section id="site-hero" className="relative overflow-hidden pt-32 pb-14 lg:pt-36 lg:pb-18 rounded-b-[2.5rem]">
        {/* Background image */}
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
              {hero("hero.description", "Discover our finest graphic designs, web projects, and video productions — all crafted with precision and passion.")}
            </motion.p>
          </div>
        </div>
      </section>



      {/* Grid */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F5F6FF 100%)" }}>
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#6D28D9]/30 border-t-[#6D28D9] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-[#164E63]">No projects in this category yet.</div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => {
                  const vid = isVideo(project);
                  const thumb = vid
                    ? getYouTubeThumbnail(project.project_url) || getYouTubeThumbnail(project.image_url) || project.image_url
                    : project.image_url;

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group cursor-pointer"
                      onClick={() => handleCardClick(project)}
                    >
                      <div className="rounded-[28px] bg-white border border-[#EEF0FF] shadow-[0_10px_40px_-20px_rgba(76,29,149,0.12)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-20px_rgba(76,29,149,0.22)]">
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden mx-3 mt-3 rounded-2xl" style={{ background: "linear-gradient(180deg, #F4F5FC 0%, #E9EBF7 100%)" }}>
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={`AstroPixel Showcase Project — ${project.title}`}
                              width={400}
                              height={300}
                              loading="eager"
                              fetchPriority="high"
                              decoding="sync"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#B5B3C9] text-sm">No preview</div>
                          )}
                          {vid && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-14 h-14 rounded-full bg-white/95 shadow-xl flex items-center justify-center transition-transform group-hover:scale-110">
                                <Play size={22} className="text-[#0891B2] ml-0.5" fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Divider dashes */}
                        <div className="mx-6 mt-5 border-t border-dashed border-[#A5F3FC]" />

                        {/* Bottom label row */}
                        <div className="flex items-center justify-between gap-4 px-6 py-5">
                          <div className="min-w-0">
                            <h3 className="font-display font-semibold text-[17px] text-[#083344] leading-snug truncate">
                              {project.title}
                            </h3>
                            <p className="text-[13px] text-[#7A778F] mt-1 truncate">
                              {categoryLabel(project)}
                            </p>
                          </div>
                          <span className="flex-shrink-0 w-11 h-11 rounded-full border border-[#A5F3FC] flex items-center justify-center text-[#0891B2] group-hover:bg-[#0891B2] group-hover:text-white group-hover:border-[#6D28D9] transition-colors duration-300">
                            <ArrowUpRight size={18} />
                          </span>
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

      {/* FAQ */}
      <FaqSection />

      {/* Image lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X size={22} className="text-white" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url} 
                alt={`AstroPixel Project Showcase Lightbox — ${lightboxImage.title}`}
                width={800} 
                height={600} 
                loading="eager" 
                decoding="sync"
                className="max-w-full max-h-[75vh] object-contain rounded-xl cursor-default shadow-2xl" 
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
              />
              <div className="mt-6 text-center max-w-lg">
                <p className="text-white/90 text-lg font-display font-semibold">{lightboxImage.title}</p>
                {lightboxImage.description && (
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{lightboxImage.description}</p>
                )}
                <p className="text-white/40 text-xs mt-3">Designed by AstroPixel Agency</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && (() => {
          const embed = getVideoEmbed(findVideoUrl(activeVideo));
          if (!embed) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setActiveVideo(null)}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X size={22} className="text-white" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                  <iframe 
                    src={embed} 
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                    title={activeVideo.title} 
                  />
                </div>
                <p className="text-white/80 text-center mt-4 font-display font-semibold">{activeVideo.title}</p>
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
  { q: "What Design Services Do You Offer?", a: "Brand identity, graphic design, web design & development, UI/UX, video & motion, and SEO / content marketing — all under one roof." },
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
          {/* Header */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start mb-10 md:mb-14">
            <div className="relative">
              <h2 className="font-display font-bold text-[#083344] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Frequently<br />Asked Question
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

          {/* Accordion */}
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
