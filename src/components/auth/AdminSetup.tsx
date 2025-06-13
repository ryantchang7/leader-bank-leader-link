
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
      console.log('Starting admin setup for email:', email);
      
      // First, get the current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting current user:', userError);
        throw new Error('You must be signed in to add admin access.');
      }
      
      if (!user) {
        throw new Error('No authenticated user found. Please sign in first.');
      }
      
      console.log('Current authenticated user:', user.email);
      
      // Check if the email matches the current user
      if (user.email !== email) {
        throw new Error('Email must match your current signed-in account.');
      }
      
      // Try to insert directly into admin_users table
      console.log('Attempting direct insert into admin_users...');
      const { data: insertData, error: insertError } = await supabase
        .from('admin_users')
        .insert([{ 
          user_id: user.id, 
          role: 'admin' 
        }])
        .select();
      
      console.log('Direct insert result:', { insertData, insertError });
      
      if (insertError) {
        // Check if it's a duplicate key error
        if (insertError.message?.includes('duplicate') || insertError.code === '23505') {
          setMessage('You already have admin access! Refreshing the page...');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          return;
        }
        throw insertError;
      }
      
      if (insertData && insertData.length > 0) {
        setMessage('Admin access added successfully! Refreshing the page...');
        setEmail('');
        
        // Refresh after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to add admin access - no data returned');
      }
      
    } catch (error: any) {
      console.error('Error in admin setup:', error);
      setMessage(`Error: ${error.message || 'Failed to add admin access. Please try again.'}`);
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
            Add yourself as an admin to access the dashboard.
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
                placeholder="Enter your current account email"
                className="mt-1"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Must match the email you're currently signed in with
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
                  Adding Admin Access...
                </>
              ) : (
                'Add Admin Access'
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Steps to get admin access:</h4>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>Make sure you're signed in to your account</li>
              <li>Enter the exact email you used to sign up</li>
              <li>Click "Add Admin Access"</li>
              <li>The page will refresh automatically when done</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
