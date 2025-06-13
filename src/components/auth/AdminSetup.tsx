
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminSetup: React.FC = () => {
  const { addAdminUser } = useAuth();
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setMessage('');

    const result = await addAdminUser(email);
    
    if (result.success) {
      setMessage('Admin user added successfully! Please refresh the page.');
      setEmail('');
    } else {
      setMessage('Error adding admin user. Please try again.');
    }
    
    setIsAdding(false);
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
                This should match the email you used to sign up
              </p>
            </div>
            {message && (
              <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
