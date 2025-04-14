
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ManageColleges from '@/components/admin/ManageColleges';
import AddCollege from '@/components/admin/AddCollege';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-2">Access Denied</h3>
            <p className="text-gray-600 mb-6">
              You don't have permission to access the admin panel.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-college-primary">Admin Dashboard</h1>
        
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="colleges">Manage Colleges</TabsTrigger>
            <TabsTrigger value="add">Add College</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="colleges">
            <ManageColleges />
          </TabsContent>
          
          <TabsContent value="add">
            <AddCollege />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
