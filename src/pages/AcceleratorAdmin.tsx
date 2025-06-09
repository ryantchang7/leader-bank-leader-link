
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AdminAuth from '@/components/auth/AdminAuth';
import { Database, Users, TrendingUp, BarChart3, Home, ArrowLeft } from 'lucide-react';

const AcceleratorAdmin = () => {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Main Platform
                </Link>
                <div className="h-4 border-l border-gray-300"></div>
                <h1 className="text-3xl font-bold text-gray-900">Accelerator Admin Dashboard</h1>
              </div>
              <Button 
                onClick={() => localStorage.removeItem('leaderlink-admin-auth')} 
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </div>
            
            {/* Admin Navigation */}
            <div className="bg-white border border-gray-200 rounded-lg p-1 inline-flex">
              <Link 
                to="/admin/investors"
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                Investor Admin
              </Link>
              <Link 
                to="/admin/accelerators"
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
              >
                Accelerator Admin
              </Link>
              <Link 
                to="/"
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Main Platform
              </Link>
            </div>
            
            <p className="text-gray-600 mt-2">Manage accelerator programs and startup applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Programs</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Accelerator Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Accelerator management interface will be built here as needed...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuth>
  );
};

export default AcceleratorAdmin;
