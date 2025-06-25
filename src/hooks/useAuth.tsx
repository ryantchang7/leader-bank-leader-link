import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll disable admin authentication entirely
    // This removes the dependency on Supabase auth
    console.log('Admin authentication disabled - no Supabase dependency');
    setUser(null);
    setIsAdmin(false);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Placeholder for internal bank authentication system
    console.log('Internal bank authentication not implemented yet');
    return { error: 'Authentication system not configured' };
  };

  const signOut = async () => {
    setUser(null);
    setIsAdmin(false);
    return { error: null };
  };

  const addAdminUser = async (email: string) => {
    // Placeholder for internal user management
    console.log('Internal user management not implemented yet');
    return { error: 'User management system not configured' };
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
