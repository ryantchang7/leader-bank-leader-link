
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
        await checkAdminStatus(session.user);
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
          await checkAdminStatus(session.user);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User) => {
    try {
      console.log('Checking admin status for user:', user.email);
      
      // Check if user has @leaderbank.com email
      if (user.email && user.email.endsWith('@leaderbank.com')) {
        console.log('User has leaderbank.com email, granting admin access');
        setIsAdmin(true);
        return;
      }
      
      // Fall back to checking admin_users table
      console.log('Checking admin_users table...');
      const { data: directData, error: directError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
      
      console.log('Direct admin check result:', { directData, directError });
      
      if (directError) {
        console.error('Error checking admin status:', directError);
        setIsAdmin(false);
        return;
      }
      
      const isUserAdmin = directData && directData.length > 0;
      console.log('User is admin via table:', isUserAdmin);
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
