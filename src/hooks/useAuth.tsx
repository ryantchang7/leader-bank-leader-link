
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkAdminStatus(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId);
      
      // First try the RPC function
      const { data: rpcData, error: rpcError } = await supabase.rpc('is_admin', {
        user_id: userId
      });
      
      console.log('RPC admin check result:', { rpcData, rpcError });
      
      if (!rpcError && rpcData !== null) {
        setIsAdmin(!!rpcData);
        return;
      }
      
      // If RPC fails, try direct query
      console.log('RPC failed, trying direct query...');
      const { data: directData, error: directError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      
      console.log('Direct admin check result:', { directData, directError });
      
      if (directError) {
        console.error('Error checking admin status:', directError);
        setIsAdmin(false);
        return;
      }
      
      const isUserAdmin = directData && directData.length > 0;
      console.log('User is admin:', isUserAdmin);
      setIsAdmin(isUserAdmin);
      
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const addAdminUser = async (email: string) => {
    try {
      console.log('Adding admin user:', email);
      
      const { error } = await supabase.rpc('add_admin_user', {
        user_email: email
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error adding admin user:', error);
      return { error };
    }
  };

  return {
    user,
    isAdmin,
    loading,
    signIn,
    signOut,
    addAdminUser,
  };
};
