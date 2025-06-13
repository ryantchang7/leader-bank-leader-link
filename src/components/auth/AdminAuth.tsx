
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminSetup from './AdminSetup';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [hasAdminUsers, setHasAdminUsers] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminUsers = async () => {
      try {
        console.log('Checking if any admin users exist...');
        
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .limit(1);
        
        console.log('Admin users check result:', { data, error, count: data?.length });
        
        if (error) {
          console.error('Error checking admin users:', error);
          setHasAdminUsers(true); // Default to true if we can't check
          return;
        }
        
        const hasUsers = data && data.length > 0;
        setHasAdminUsers(hasUsers);
        console.log('Admin users exist:', hasUsers);
        
      } catch (error: any) {
        console.error('Exception checking admin users:', error);
        setHasAdminUsers(true); // Default to true if we can't check
      }
    };

    checkAdminUsers();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    
    setIsSigningIn(false);
  };

  // Show loading spinner while checking auth and admin users
  if (loading || hasAdminUsers === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin system...</p>
        </div>
      </div>
    );
  }

  // Show admin setup if no admin users exist
  if (hasAdminUsers === false) {
    console.log('No admin users found, showing setup');
    return <AdminSetup />;
  }

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Leader Link Admin Access</CardTitle>
            <p className="text-sm text-gray-600">Sign in to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Contact your system administrator for access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if user is not admin
  if (!isAdmin) {
    console.log('User is not admin, showing access denied');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Setup Admin Access</CardTitle>
            <p className="text-sm text-gray-600">You need admin privileges to access this area</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              It looks like you're signed in but don't have admin access yet.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Refresh Page
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setHasAdminUsers(false)}
                className="w-full"
              >
                Set Up Admin Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminAuth;
