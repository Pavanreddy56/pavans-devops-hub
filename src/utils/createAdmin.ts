import { supabase } from '@/integrations/supabase/client';

export async function createAdminUser(username: string, password: string) {
  try {
    const { data, error } = await supabase.functions.invoke('create-admin', {
      body: { username, password }
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error };
  }
}
