import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Work {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  tags?: string[];
}

export const PORTFOLIO_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Design & Development" },
  { id: "graphics", label: "Graphic Design" },
  { id: "branding", label: "Logo & Branding" },
  { id: "photography", label: "Photography" },
  { id: "motion", label: "Motion / 3D" },
] as const;

export type CategoryId = typeof PORTFOLIO_CATEGORIES[number]["id"];

export const DEFAULT_PORTFOLIO_PROJECTS: Work[] = [
  // 1. Web Design & Development (web)
  {
    id: "web-1",
    title: "NexGen SaaS Dashboard & Analytics",
    description: "Full-stack web application featuring real-time data metrics, dark-mode design system, and micro-interactions.",
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "UI/UX"],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://astropixel.tech",
    is_featured: true,
    is_published: true,
    order_index: 1,
  },
  {
    id: "web-2",
    title: "Luxe Atelier E-Commerce Storefront",
    description: "Headless luxury fashion store with high-conversion checkout flow, dynamic filters, and fluid page transitions.",
    category: "web",
    tags: ["Next.js", "Shopify API", "Framer Motion", "Tailwind"],
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://astropixel.tech",
    is_featured: true,
    is_published: true,
    order_index: 2,
  },
  {
    id: "web-3",
    title: "Aura AI Mobile Web Platform",
    description: "Progressive web app built for generative AI prompt management, cloud gallery storage, and fast rendering.",
    category: "web",
    tags: ["React", "Tailwind", "REST API", "PWA"],
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://astropixel.tech",
    is_featured: false,
    is_published: true,
    order_index: 3,
  },

  // 2. Graphic Design (graphics)
  {
    id: "graphics-1",
    title: "Vanguard Editorial Magazine",
    description: "Custom print editorial magazine layout, typography grid hierarchy, and contemporary culture spread design.",
    category: "graphics",
    tags: ["InDesign", "Photoshop", "Typography", "Editorial"],
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 4,
  },
  {
    id: "graphics-2",
    title: "Starlight Festival Vector Poster Art",
    description: "Vibrant event poster design with custom vector illustration, glowing gradient meshes, and print typography.",
    category: "graphics",
    tags: ["Illustrator", "Vector Art", "Print Design", "Posters"],
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 5,
  },
  {
    id: "graphics-3",
    title: "Solstice Packaging & Label Hierarchy",
    description: "Eco-conscious organic skincare packaging design featuring tactile foil stamping and custom iconography.",
    category: "graphics",
    tags: ["Packaging", "Print", "Branding", "Illustrator"],
    image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: false,
    is_published: true,
    order_index: 6,
  },

  // 3. Logo & Branding (branding)
  {
    id: "branding-1",
    title: "Kintsugi Capital Identity System",
    description: "Complete visual identity rebrand including logo design, brand guidelines, corporate stationery, and digital assets.",
    category: "branding",
    tags: ["Brand Strategy", "Logo Design", "Guidelines", "Identity"],
    image_url: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 7,
  },
  {
    id: "branding-2",
    title: "Orbital Coffee Monogram & Packaging",
    description: "Boutique coffee roastery logo mark, monogram typography, coffee bag packaging, and store signage.",
    category: "branding",
    tags: ["Logo Mark", "Monogram", "Brand Guidelines", "Merch"],
    image_url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 8,
  },
  {
    id: "branding-3",
    title: "Apex Robotics Corporate Emblem",
    description: "Futuristic corporate logo design, heraldic geometric symbol, and digital brand asset kit for AI venture.",
    category: "branding",
    tags: ["Vector Logo", "Corporate Identity", "Typography"],
    image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: false,
    is_published: true,
    order_index: 9,
  },

  // 4. Photography (photography)
  {
    id: "photo-1",
    title: "Urban Horizon Architectural Photography",
    description: "High-contrast architectural photography series capturing geometric glass reflections, city lights, and shadows.",
    category: "photography",
    tags: ["Architecture", "Urban", "Lightroom", "Composition"],
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 10,
  },
  {
    id: "photo-2",
    title: "Nordic Wilderness Landscape Series",
    description: "Fine art nature photography documenting misty mountain ridges, serene Scandinavian lakes, and pine forests.",
    category: "photography",
    tags: ["Landscape", "Nature", "Fine Art", "Color Grading"],
    image_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: true,
    is_published: true,
    order_index: 11,
  },
  {
    id: "photo-3",
    title: "Studio Fashion & Editorial Portraiture",
    description: "Studio lighting and high-fashion editorial portrait photography with moody contrast and refined color grading.",
    category: "photography",
    tags: ["Portrait", "Fashion", "Studio Lighting", "Retouching"],
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    project_url: null,
    is_featured: false,
    is_published: true,
    order_index: 12,
  },

  // 5. Motion / 3D (motion)
  {
    id: "motion-1",
    title: "Cybernetic Glass Abstract 3D Renders",
    description: "Photorealistic 3D glass, procedural liquid chrome, and particle animations rendered in Cinema4D and Octane.",
    category: "motion",
    tags: ["3D Render", "Blender", "Octane", "Abstract Art"],
    image_url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    is_featured: true,
    is_published: true,
    order_index: 13,
  },
  {
    id: "motion-2",
    title: "Quantum Product Teaser Motion Graphics",
    description: "Dynamic product reveal commercial featuring kinetic typography, sound design, and 3D camera sweeps.",
    category: "motion",
    tags: ["After Effects", "Motion Graphics", "3D Camera", "VFX"],
    image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    is_featured: true,
    is_published: true,
    order_index: 14,
  },
  {
    id: "motion-3",
    title: "Holographic Interface Motion Commercial",
    description: "3D futuristic HUD interface design and motion graphics reel produced for an international tech summit.",
    category: "motion",
    tags: ["HUD Design", "Framer Motion", "3D Reel", "Commercial"],
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    project_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    is_featured: false,
    is_published: true,
    order_index: 15,
  },
];

export const getSavedWorks = (): Work[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('astropixel_works');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
  }
  return DEFAULT_PORTFOLIO_PROJECTS;
};

export function useWorks() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('works-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'works' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['public-works'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['public-works'],
    queryFn: async () => {
      const fallbackList = getSavedWorks();
      try {
        const { data, error } = await supabase
          .from('works')
          .select('*')
          .eq('is_published', true)
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
          return fallbackList;
        }

        const merged = (data as any[]).map((item: any) => {
          const matchedDefault = DEFAULT_PORTFOLIO_PROJECTS.find((d: any) => d.id === item.id || d.title.toLowerCase() === item.title.toLowerCase());
          return {
            ...item,
            tags: (item as any).tags || matchedDefault?.tags || getCategoryTags(item.category),
          };
        });

        return merged as Work[];
      } catch {
        return fallbackList;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

function getCategoryTags(cat: string): string[] {
  if (cat === "web" || cat.startsWith("web_")) return ["React", "TypeScript", "UI/UX"];
  if (cat === "graphics" || cat.startsWith("graphics_")) return ["Illustrator", "Photoshop", "Print"];
  if (cat === "branding" || cat.startsWith("branding_")) return ["Brand Strategy", "Logo Mark", "Identity"];
  if (cat === "photography" || cat.startsWith("photography_")) return ["Architecture", "Lightroom", "Fine Art"];
  if (cat === "motion" || cat.startsWith("video")) return ["3D Render", "Blender", "After Effects"];
  return ["Creative", "Design"];
}

export function useWorksByCategory() {
  const { data: works, isLoading, error } = useWorks();

  const allProjects = works || DEFAULT_PORTFOLIO_PROJECTS;

  const webProjects = allProjects.filter(w => w.category === 'web' || w.category.startsWith('web_'));
  const graphicsProjects = allProjects.filter(w => w.category === 'graphics' || w.category === 'design' || w.category.startsWith('graphics_'));
  const brandingProjects = allProjects.filter(w => w.category === 'branding' || w.category.startsWith('branding_'));
  const photographyProjects = allProjects.filter(w => w.category === 'photography' || w.category.startsWith('photography_'));
  const motionProjects = allProjects.filter(w => w.category === 'motion' || w.category === 'video' || w.category.startsWith('video_'));

  return {
    allProjects,
    webProjects,
    graphicsProjects,
    brandingProjects,
    photographyProjects,
    motionProjects,
    isLoading,
    error,
  };
}
