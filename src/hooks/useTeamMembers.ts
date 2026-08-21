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
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/instructors/sofiullah-learn.png",
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
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/adib-sarkar-v2.png",
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
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team/rashadul-islam-naime.png",
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
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/shafiul-haque-v2.png",
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
    name: "Prantik Saha",
    role: "Graphic Designer, Microsoft Office Expert, IT Support Specialist",
    bio: "Skilled graphics designer and IT support specialist with expertise in Microsoft Office solutions.",
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/prantik-saha-v2.png",
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
    name: "Papiya Rahman",
    role: "Graphic Designer",
    bio: "Web designer blending aesthetics, usability, and performance into one smooth experience. Focused on building websites that look premium and work flawlessly.",
    image_url: "https://astropixel.tech/__l5e/assets-v1/0a204790-d31e-409a-91d9-234fb273511a/papiya.png",
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
    bio: "Digital marketer specializing in data-driven growth and scroll-stopping strategy. Turning insights into smart campaigns that attract, engage, and convert — making brands impossible to ignore.",
    image_url: "https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/instructors/nayeem-learn.png",
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

export function useTeamMembers(scope: 'agency' | 'learn' | 'all' = 'agency') {
  const queryClient = useQueryClient();

  // Set up realtime subscription
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
          return DEFAULT_TEAM_MEMBERS;
        }
        return data as TeamMember[];
      } catch {
        return DEFAULT_TEAM_MEMBERS;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

