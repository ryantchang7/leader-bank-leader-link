
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setMessage('');

    try {
      console.log('Adding admin user for email:', email);
      
      // First, try to call the add_admin_user function
      const { data: functionResult, error: functionError } = await supabase.rpc('add_admin_user', {
        user_email: email
      });
      
      console.log('Function result:', { functionResult, functionError });
      
      if (functionError) {
        console.error('Function error:', functionError);
        // If the function fails, try direct insertion
        console.log('Trying direct insertion...');
        
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('No authenticated user found. Please sign in first.');
        }
        
        console.log('Current user:', user);
        
        // Check if user email matches
        if (user.email !== email) {
          throw new Error('Email must match your current account email.');
        }
        
        // Try direct insertion
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert([{ user_id: user.id, role: 'admin' }]);
        
        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
      }
      
      setMessage('Admin access added successfully! Please refresh the page to continue.');
      setEmail('');
      
      // Automatically refresh after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error adding admin user:', error);
      
      if (error.message?.includes('duplicate key')) {
        setMessage('You already have admin access. Please refresh the page.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`Error: ${error.message || 'Failed to add admin access. Please try again.'}`);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Admin Setup Required</CardTitle>
          <p className="text-sm text-gray-600">
            No admin users found. Add yourself as an admin to access the dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div>
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This must match the email you used to sign up
              </p>
            </div>
            {message && (
              <p className={`text-sm ${message.includes('success') || message.includes('already have admin') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Admin...
                </>
              ) : (
                'Add Admin Access'
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Troubleshooting:</h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Make sure you're signed in with the email you want to make admin</li>
              <li>• The email must exactly match your account email</li>
              <li>• If you see "already have admin access", just refresh the page</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
