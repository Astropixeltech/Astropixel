import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  site_scope: string;
  email: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  whatsapp_url: string | null;
  fiverr_url: string | null;
  upwork_url: string | null;
  portfolio_url: string | null;
  threads_url: string | null;
  created_at?: string;
  updated_at?: string;
}

// Keep DEFAULT_TEAM_MEMBERS as fallback for SSR / offline
export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  { id: "1", name: "Sofiullah Ahammad", role: "CEO, Co-Founder", bio: "Creative founder with 3+ years of experience in graphics design, vibe coding, and freelance photography.", image_url: "/sofiullah-ahammad.jpg", email: "atik.magicbox@gmail.com", facebook_url: "https://www.facebook.com/AtikAhmedPeradox", instagram_url: "https://www.instagram.com/atik_ahmed_69/", linkedin_url: "https://www.linkedin.com/in/sofiullah-ahammad/", twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 1, site_scope: "agency" },
  { id: "2", name: "Adib Sarkar", role: "CO-Founder, Graphic Designer", bio: "Award-winning designer specializing in brand identity and visual communication.", image_url: "/team/adib.png", email: "mdadibsarkar2005@gmail.com", facebook_url: "https://www.facebook.com/share/17kdvEbE5h/", instagram_url: "https://www.instagram.com/_og_gy", linkedin_url: "https://www.linkedin.com/in/mdadibsarkar", twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 2, site_scope: "agency" },
  { id: "3", name: "Rashadul Islam Naime", role: "Digital Marketer, SEO Expert", bio: "Expert in Digital Marketing, SEO, and Graphic Design.", image_url: "/team/rashadul.png", email: "rashadulnaime@gmail.com", facebook_url: "https://www.facebook.com/rashadulnaime", instagram_url: "https://www.instagram.com/rashadulnaime/", twitter_url: "https://x.com/rashadulnaime", fiverr_url: "https://www.fiverr.com/rashadul_naime", linkedin_url: null, whatsapp_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 3, site_scope: "agency" },
  { id: "4", name: "Md.Shafiul Haque", role: "Web Designer, Video Editor, Content Creator, Cinematographer", bio: "User experience specialist focused on creating intuitive and delightful interfaces.", image_url: "/team/prantik.png", email: "myselfshauravofficial@gmail.com", facebook_url: "https://www.facebook.com/itzme.shaurav", instagram_url: "https://www.instagram.com/myself_shaurav", linkedin_url: null, twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 4, site_scope: "agency" },
  { id: "5", name: "Abdur Rohim", role: "Administrator, Web Developer", bio: "Administrator and web developer building high-performance web applications.", image_url: "/team/abdur-rohim.png", email: "prantiksaha37@gmail.com", facebook_url: "https://www.facebook.com/share/175txVkBJq/", instagram_url: "https://www.instagram.com/spoide_kid_/", linkedin_url: "https://www.linkedin.com/in/prantik-saha-9225a2350/", twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 5, site_scope: "agency" },
  { id: "6", name: "Papia Rahman", role: "Graphic Designer", bio: "Web designer blending aesthetics, usability, and performance.", image_url: "/team/papiya.jpg", email: "ramulas006@gmail.com", facebook_url: "https://www.facebook.com/abdur.rohim.819788", instagram_url: null, linkedin_url: null, twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 6, site_scope: "agency" },
  { id: "7", name: "Md Nayeem Ahmed", role: "Digital Marketer, Facebook Marketing Specialist", bio: "Digital marketer specializing in data-driven growth and scroll-stopping strategy.", image_url: "/team/nayeem.png", email: "gat.nayeem@gmail.com", facebook_url: "https://www.facebook.com/share/18F2ivcd7p/", instagram_url: "https://www.instagram.com/mdnayeem119120", linkedin_url: null, twitter_url: null, whatsapp_url: null, fiverr_url: null, upwork_url: null, portfolio_url: null, threads_url: null, is_active: true, order_index: 7, site_scope: "agency" },
];

// Legacy helper - kept for backward compat, no longer uses localStorage
export const getSavedTeamMembers = (): TeamMember[] => DEFAULT_TEAM_MEMBERS;

export function useTeamMembers(scope: 'agency' | 'learn' | 'all' = 'agency') {
  return useQuery({
    queryKey: ['team-members', scope],
    queryFn: async (): Promise<TeamMember[]> => {
      try {
        const res = await fetch('/api/team');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const members: TeamMember[] = (data.members || []).filter(
          (m: TeamMember) => m.is_active && (scope === 'all' || m.site_scope === scope || m.site_scope === 'agency')
        );
        return members.length > 0 ? members : DEFAULT_TEAM_MEMBERS;
      } catch {
        return DEFAULT_TEAM_MEMBERS;
      }
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
