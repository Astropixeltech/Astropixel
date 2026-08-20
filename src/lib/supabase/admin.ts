import { supabase } from '@/integrations/supabase/client';

export function createAdminClient() {
  return supabase;
}
