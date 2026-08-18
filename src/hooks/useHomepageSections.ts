import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

export interface HomepageSection {
  id: string;
  site_scope: string;
  page_key: string;
  section_key: string;
  section_type: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  highlight: string | null;
  image_url: string | null;
  image_url_2: string | null;
  button_label: string | null;
  button_url: string | null;
  order_index: number;
  is_active: boolean;
}

export interface HomepageSectionItem {
  id: string;
  section_id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  image_url_2: string | null;
  url: string | null;
  order_index: number;
  is_active: boolean;
}

export const useHomepageSections = (
  scopeOverride?: string,
  pageKey: string = "home"
) => {
  const queryClient = useQueryClient();
  const scope = scopeOverride ?? "agency";

  useEffect(() => {
    const channel = supabase
      .channel(`hp-sec-${scope}-${pageKey}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'homepage_sections' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['homepage-sections', scope, pageKey] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, scope, pageKey]);

  return useQuery({
    queryKey: ['homepage-sections', scope, pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .eq('site_scope', scope)
        .eq('page_key', pageKey)
        .order('order_index');

      if (error) throw error;
      return (data || []) as HomepageSection[];
    },
  });
};

export const useHomepageSection = (
  sectionKey: string,
  scopeOverride?: string,
  pageKey: string = "home"
) => {
  const { data: sections, isLoading } = useHomepageSections(scopeOverride, pageKey);
  const section = sections?.find((s) => s.section_key === sectionKey);
  return { section, isLoading };
};

export const useHomepageSectionItems = (sectionId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!sectionId) return;
    const channel = supabase
      .channel(`hp-items-${sectionId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'homepage_section_items' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['homepage-section-items', sectionId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, sectionId]);

  return useQuery({
    queryKey: ['homepage-section-items', sectionId],
    queryFn: async () => {
      if (!sectionId) return [];
      const { data, error } = await supabase
        .from('homepage_section_items')
        .select('*')
        .eq('section_id', sectionId)
        .order('order_index');

      if (error) throw error;
      return (data || []) as HomepageSectionItem[];
    },
    enabled: !!sectionId,
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section: Partial<HomepageSection> & { id: string }) => {
      const { data, error } = await supabase
        .from('homepage_sections')
        .update(section)
        .eq('id', section.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-sections'] });
      toast.success('Section saved');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update section');
    },
  });
};

export const useCreateSectionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<HomepageSectionItem, 'id'>) => {
      const { data, error } = await supabase
        .from('homepage_section_items')
        .insert([item])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['homepage-section-items', variables.section_id] });
      toast.success('Item added');
    },
  });
};

export const useUpdateSectionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<HomepageSectionItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('homepage_section_items')
        .update(item)
        .eq('id', item.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['homepage-section-items', data.section_id] });
      }
      toast.success('Item saved');
    },
  });
};

export const useDeleteSectionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('homepage_section_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-section-items'] });
      toast.success('Item deleted');
    },
  });
};
