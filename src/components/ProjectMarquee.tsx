import { useEffect, useMemo, useRef, useState } from "react";
import { useWorks, type Work } from "@/hooks/useWorks";

type Item = { id: string; image_url: string; title: string };

function isGraphics(w: Work) {
  const c = w.category;
  return c === "design" || c === "graphics" || c.startsWith("graphics_");
}

const extras: Item[] = [
  { id: "ex-badam", image_url: "/marquee/badam.jpg", title: "Badam Poster" },
  { id: "ex-coconut", image_url: "/marquee/coconuct.jpg", title: "Coconut Oil" },
  { id: "ex-noodles", image_url: "/marquee/creativity-to-create.png", title: "Mr Noodles" },
  { id: "ex-ghee", image_url: "/marquee/GHEE.jpg", title: "Ghee" },
  { id: "ex-khejur", image_url: "/marquee/khejur.jpg", title: "Khejuri" },
  { id: "ex-moringa", image_url: "/marquee/moringa-poster.jpg", title: "Moringa Powder" },
  { id: "ex-sorisa", image_url: "/marquee/sorisa.jpg", title: "Sorisha Oil" },
  { id: "ex-chatgpt", image_url: "/marquee/ChatGPT_Image_Jul_10_2026_11_09_35_PM-2.png", title: "Creative Designs" },
  { id: "ex-digital", image_url: "/marquee/download_8.jpg", title: "Digital Marketing" },
  { id: "ex-pizza1", image_url: "/marquee/pp01.jpg", title: "Pizza Hut - Last Slice" },
  { id: "ex-pizza2", image_url: "/marquee/pp02.jpg", title: "Pizza Hut - Hot Fresh" },
  { id: "ex-rome", image_url: "/marquee/My_new_design_Rome____.jpg", title: "Rome" },
  { id: "ex-poster-trend", image_url: "/marquee/POSTER_DESIGN_INSPIRETION_trend_2026.jpg", title: "Poster Design Trend 2026" },
];

// Instantly preload images in browser memory upfront when module evaluates
if (typeof window !== "undefined") {
  extras.forEach((item) => {
    if (item.image_url && item.image_url !== "/placeholder.svg") {
      const img = new Image();
      img.src = item.image_url;
    }
  });
}

const Card = ({ item }: { item: Item }) => {
  return (
    <div className="group relative shrink-0 h-full w-auto rounded-lg overflow-hidden mx-1 md:mx-1.5 [transform:translateZ(0)] [backface-visibility:hidden]">
      <img
        src={item.image_url || "/placeholder.svg"}
        alt={`AstroPixel Portfolio Project — ${item.title}`}
        width={360}
        height={240}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        referrerPolicy="no-referrer"
        draggable={false}
        className="block h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none [transform:translateZ(0)]"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
      />
    </div>
  );
};


export default function ProjectMarquee() {
  const { data: works } = useWorks();
  const sectionRef = useRef<HTMLElement>(null);

  const items = useMemo<Item[]>(() => {
    const g = (works || []).filter(isGraphics).map((w) => ({
      id: String(w.id),
      image_url: w.image_url || "/placeholder.svg",
      title: w.title,
    }));
    const merged = [...g, ...extras];
    const hash = (s: string) => {
      let h = 2166136261;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0) / 4294967295;
    };
    const seeded = merged
      .map((it) => ({ it, k: hash(it.id) }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.it);
    return seeded.length ? seeded : extras;
  }, [works]);

  // Preload any dynamic DB works images as soon as items list updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      items.forEach((item) => {
        if (item.image_url && item.image_url !== "/placeholder.svg") {
          const img = new Image();
          img.src = item.image_url;
        }
      });
    }
  }, [items]);

  const row1: Item[] = [];
  const row2: Item[] = [];
  items.forEach((it, i) => (i % 2 === 0 ? row1 : row2).push(it));

  const buildTrack = (row: Item[]) => {
    const repeatCount = Math.max(3, Math.ceil(18 / Math.max(row.length, 1)));
    const half = Array.from({ length: repeatCount }, () => row).flat();
    return [...half, ...half];
  };

  const track1 = buildTrack(row1);
  const track2 = buildTrack(row2);

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative pt-0 pb-0 md:pb-1 overflow-hidden bg-transparent z-20 w-full px-0">
      <div className="relative h-[180px] sm:h-[200px] md:h-[180px] project-marquee-row">
        <div className="flex h-full w-max project-marquee-track project-marquee-track-left">
          {track1.map((p, i) => <Card key={`r1-${p.id}-${i}`} item={p} />)}
        </div>
      </div>

      <div className="relative h-[180px] sm:h-[200px] md:h-[180px] mt-1.5 md:mt-2 project-marquee-row">
        <div className="flex h-full w-max project-marquee-track project-marquee-track-right">
          {track2.map((p, i) => <Card key={`r2-${p.id}-${i}`} item={p} />)}
        </div>
      </div>
    </section>
  );
}
