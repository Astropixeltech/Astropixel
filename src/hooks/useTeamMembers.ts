import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  whatsapp_url: string | null;
  email: string | null;
  fiverr_url: string | null;
  upwork_url: string | null;
  portfolio_url: string | null;
  threads_url: string | null;
  is_active: boolean;
  order_index: number;
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Sofiullah Ahammad",
    role: "CEO, Co-Founder",
    bio: "Creative founder with 3+ years of experience in graphics design, vibe coding, and freelance photography.",
    image_url: "/sofiullah-ahammad.jpg",
    email: "atik.magicbox@gmail.com",
    facebook_url: "https://www.facebook.com/AtikAhmedPeradox",
    instagram_url: "https://www.instagram.com/atik_ahmed_69/",
    linkedin_url: "https://www.linkedin.com/in/sofiullah-ahammad/",
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 1,
  },
  {
    id: "2",
    name: "Adib Sarkar",
    role: "CO-Founder, Graphic Designer",
    bio: "Award-winning designer specializing in brand identity and visual communication.",
    image_url: "/team/adib.png",
    email: "mdadibsarkar2005@gmail.com",
    facebook_url: "https://www.facebook.com/share/17kdvEbE5h/",
    instagram_url: "https://www.instagram.com/_og_gy?igsh=ZTkydWRrdnk0ZDIw",
    linkedin_url: "https://www.linkedin.com/in/mdadibsarkar",
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 2,
  },
  {
    id: "3",
    name: "Rashadul Islam Naime",
    role: "Digital Marketer, SEO Expert",
    bio: "Expert in Digital Marketing, SEO, and Graphic Design. Elevates brands through innovative strategies and captivating visuals, maximizing each project's potential.",
    image_url: "/team/rashadul.png",
    email: "rashadulnaime@gmail.com",
    facebook_url: "https://www.facebook.com/rashadulnaime",
    instagram_url: "https://www.instagram.com/rashadulnaime/",
    twitter_url: "https://x.com/rashadulnaime",
    fiverr_url: "https://www.fiverr.com/rashadul_naime",
    linkedin_url: null,
    whatsapp_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 3,
  },
  {
    id: "4",
    name: "Md.Shafiul Haque",
    role: "Web Designer, Video Editor, Content Creator, Cinematographer",
    bio: "User experience specialist focused on creating intuitive and delightful interfaces.",
    image_url: "/team/prantik.png",
    email: "myselfshauravofficial@gmail.com",
    facebook_url: "https://www.facebook.com/itzme.shaurav",
    instagram_url: "https://www.instagram.com/myself_shaurav?igsh=eWV3MjhuM29oeXpw",
    linkedin_url: null,
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 4,
  },
  {
    id: "5",
    name: "Abdur Rohim",
    role: "Administrator, Web Developer",
    bio: "Administrator and web developer building high-performance web applications and digital solutions.",
    image_url: "/team/abdur-rohim.png",
    email: "prantiksaha37@gmail.com",
    facebook_url: "https://www.facebook.com/share/175txVkBJq/",
    instagram_url: "https://www.instagram.com/spoide_kid_/?utm_source=qr&igsh=cWZhd21sN292OXdk#",
    linkedin_url: "https://www.linkedin.com/in/prantik-saha-9225a2350/",
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 5,
  },
  {
    id: "6",
    name: "Papia Rahman",
    role: "Graphic Designer",
    bio: "Web designer blending aesthetics, usability, and performance into one smooth experience.",
    image_url: "/team/papiya.jpg",
    email: "ramulas006@gmail.com",
    facebook_url: "https://www.facebook.com/abdur.rohim.819788",
    instagram_url: null,
    linkedin_url: null,
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 6,
  },
  {
    id: "7",
    name: "Md Nayeem Ahmed",
    role: "Digital Marketer, Facebook Marketing Specialist",
    bio: "Digital marketer specializing in data-driven growth and scroll-stopping strategy.",
    image_url: "/team/nayeem.png",
    email: "gat.nayeem@gmail.com",
    facebook_url: "https://www.facebook.com/share/18F2ivcd7p/",
    instagram_url: "https://www.instagram.com/mdnayeem119120?igsh=OWp5MTRhejR2OHdm",
    linkedin_url: null,
    twitter_url: null,
    whatsapp_url: null,
    fiverr_url: null,
    upwork_url: null,
    portfolio_url: null,
    threads_url: null,
    is_active: true,
    order_index: 7,
  },
];

export const getSavedTeamMembers = (): TeamMember[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('astropixel_team_members');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
  }
  return DEFAULT_TEAM_MEMBERS;
};

export function useTeamMembers(scope: 'agency' | 'learn' | 'all' = 'agency') {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('team-members-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_members' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['public-team-members'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['public-team-members', scope],
    queryFn: async () => {
      const fallbackList = getSavedTeamMembers();
      try {
        let q = supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (scope !== 'all') {
          q = q.eq('site_scope', scope);
        }

        const { data, error } = await q;

        if (error || !data || data.length === 0) {
          return fallbackList;
        }

        return data as TeamMember[];
      } catch {
        return fallbackList;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
