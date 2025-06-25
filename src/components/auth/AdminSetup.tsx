
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from 'lucide-react';

const AdminSetup: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Internal Authentication Required</CardTitle>
          <p className="text-sm text-gray-600">
            This application has been configured for internal bank systems.
          </p>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">For IT Department:</h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Replace this component with internal bank authentication</li>
              <li>Integrate with existing user management system</li>
              <li>Configure role-based access controls</li>
              <li>Update API endpoints to match bank infrastructure</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> All third-party dependencies (Supabase, Resend) have been removed. 
              The application is ready for integration with your internal bank systems.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
