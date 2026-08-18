import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  order_index: number;
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "UI/UX Design",
    description: "User-friendly and modern interface designs that give your users the best experience.",
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
    description: "Create a unique and strong visual identity for your brand.",
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
    description: "Social media content and product packaging that catches the eye instantly.",
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
    description: "Modern and high-performing websites that ensure your business growth.",
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
    description: "Scalable and powerful cloud-based software solutions.",
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
    description: "Guaranteed delivery of your business to the right target audience.",
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

export function useServices() {
  const queryClient = useQueryClient();

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('services-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        () => {
          // Invalidate and refetch when data changes
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
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
          return DEFAULT_SERVICES;
        }
        return data as Service[];
      } catch {
        return DEFAULT_SERVICES;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
