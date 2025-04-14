
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useColleges } from '@/context/CollegeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const { colleges } = useColleges();
  
  // Generate statistics
  const totalColleges = colleges.length;
  
  // Count colleges by state
  const collegesByState = colleges.reduce((acc: Record<string, number>, college) => {
    const state = college.location.state;
    if (!acc[state]) {
      acc[state] = 0;
    }
    acc[state]++;
    return acc;
  }, {});
  
  const stateData = Object.entries(collegesByState).map(([state, count]) => ({
    name: state,
    value: count
  }));
  
  // Count colleges by course type
  const courseCategories = [
    'Engineering',
    'Medical',
    'Arts',
    'Commerce',
    'Law',
    'Management'
  ];
  
  const courseData = courseCategories.map(category => {
    const count = colleges.filter(college => 
      college.courses.some(course => course.includes(category))
    ).length;
    
    return {
      name: category,
      count
    };
  });
  
  // Fee ranges
  const feeRanges = [
    { range: '0-50K', min: 0, max: 50000 },
    { range: '50K-1L', min: 50000, max: 100000 },
    { range: '1L-2L', min: 100000, max: 200000 },
    { range: '2L+', min: 200000, max: Infinity }
  ];
  
  const feeData = feeRanges.map(range => {
    const count = colleges.filter(college => 
      college.fees.min >= range.min && college.fees.min < range.max
    ).length;
    
    return {
      name: range.range,
      count
    };
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalColleges}</CardTitle>
            <CardDescription>Total Colleges</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{colleges.filter(c => c.location.city === 'Mumbai').length}</CardTitle>
            <CardDescription>Colleges in Mumbai</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{Math.min(...colleges.map(c => c.ranking))}</CardTitle>
            <CardDescription>Top Ranking</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              ₹{Math.min(...colleges.map(c => c.fees.min)).toLocaleString('en-IN')}
            </CardTitle>
            <CardDescription>Lowest Fees</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Colleges by State</CardTitle>
            <CardDescription>
              Distribution of colleges across states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stateData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {stateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Colleges by Course Type</CardTitle>
            <CardDescription>
              Number of colleges offering each type of course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Fee Distribution</CardTitle>
          <CardDescription>
            Number of colleges in each fee range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0C2340" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
