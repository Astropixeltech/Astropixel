import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

import brandIdentityImage from "@/assets/brand-identity-showcase.jpg.asset.json";
import productUIImage from "@/assets/product-ui-showcase.jpg.asset.json";
import webDevImage from "@/assets/web-dev-showcase.jpg.asset.json";
import seoMarketingImage from "@/assets/seo-marketing-showcase.png.asset.json";

export interface Service {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string | null;
  image_url?: string | null;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  order_index: number;
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "UI/UX Design",
    subtitle: "Product Design & Prototyping",
    description: "User-friendly and modern interface designs that give your users the best experience.",
    image_url: productUIImage.url,
    icon: "Palette",
    features: [
      "Mobile & Web Application Design",
      "Interactive Prototyping & Wireframing",
      "User Research & Usability Testing",
      "Design Systems & Component Libraries",
    ],
    is_active: true,
    order_index: 1,
  },
  {
    id: "serv-2",
    title: "Logo Design & Branding",
    subtitle: "Brand Identity & Guidelines",
    description: "Create a unique and strong visual identity for your brand.",
    image_url: brandIdentityImage.url,
    icon: "PenTool",
    features: [
      "Vector Logo Marks & Icons",
      "Complete Brand Identity Guidelines",
      "Typography & Color Palettes",
      "Brand Monograms & Identity Assets",
    ],
    is_active: true,
    order_index: 2,
  },
  {
    id: "serv-3",
    title: "Social Media & Packaging Design",
    subtitle: "Visual Content & Packaging",
    description: "Social media content and product packaging that catches the eye instantly.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    icon: "Share2",
    features: [
      "Print & Digital Product Packaging",
      "Social Media Marketing Banners",
      "Ad Campaign Visuals & Post Art",
      "Brand Merchandise & Collateral",
    ],
    is_active: true,
    order_index: 3,
  },
  {
    id: "serv-4",
    title: "Web Development",
    subtitle: "High-Performance Web Apps",
    description: "Modern and high-performing websites that ensure your business growth.",
    image_url: webDevImage.url,
    icon: "Monitor",
    features: [
      "Custom React & Next.js Web Apps",
      "Headless E-Commerce Storefronts",
      "High-Speed Performance Optimization (99+)",
      "Fully Responsive Cross-Device Layouts",
    ],
    is_active: true,
    order_index: 4,
  },
  {
    id: "serv-5",
    title: "SaaS Development",
    subtitle: "Cloud Software & Multi-Tenant Architectures",
    description: "Scalable and powerful cloud-based software solutions.",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    icon: "Zap",
    features: [
      "Enterprise Cloud Software Systems",
      "Multi-Tenant Architecture",
      "Secure API Integration & Gateways",
      "Automated Subscription Workflows",
    ],
    is_active: true,
    order_index: 5,
  },
  {
    id: "serv-6",
    title: "Digital Marketing",
    subtitle: "SEO, Ads & Growth Funnels",
    description: "Guaranteed delivery of your business to the right target audience.",
    image_url: seoMarketingImage.url,
    icon: "TrendingUp",
    features: [
      "Social & Search Engine Ad Campaigns",
      "SEO & Organic Traffic Growth",
      "Targeted Audience Marketing Funnels",
      "High-ROI Lead Generation",
    ],
    is_active: true,
    order_index: 6,
  },
];

export const getSavedServices = (): Service[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('astropixel_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
  }
  return DEFAULT_SERVICES;
};

export function useServices() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('services-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['public-services'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['public-services'],
    queryFn: async () => {
      const fallbackList = getSavedServices();
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
          return fallbackList;
        }
        return data as Service[];
      } catch {
        return fallbackList;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
