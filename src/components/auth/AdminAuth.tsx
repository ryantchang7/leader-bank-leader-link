
import React from 'react';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  // Simplified approach - no authentication required
  // This removes all Supabase dependencies for admin access
  // Your internal team can implement proper authentication later
  
  console.log('Admin authentication bypassed - internal system integration pending');
  
  // For now, just render the admin interface directly
  // Your team can add internal bank authentication here
  return <>{children}</>;
};

export default AdminAuth;
