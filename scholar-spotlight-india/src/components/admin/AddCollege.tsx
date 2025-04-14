
import React, { useState } from 'react';
import { useColleges } from '@/context/CollegeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { College } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const AddCollege = () => {
  const { addCollege } = useColleges();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    ranking: '',
    feesMin: '',
    feesMax: '',
    courses: '',
    facilities: '',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    establishedYear: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.city || !formData.state) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newCollege: Omit<College, 'id'> = {
      name: formData.name,
      location: {
        city: formData.city,
        state: formData.state,
      },
      ranking: Number(formData.ranking) || 99,
      fees: {
        min: Number(formData.feesMin) || 10000,
        max: Number(formData.feesMax) || 50000,
      },
      courses: formData.courses ? formData.courses.split(',').map(item => item.trim()) : ['General'],
      facilities: formData.facilities ? formData.facilities.split(',').map(item => item.trim()) : ['Library', 'Cafeteria'],
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80',
      description: formData.description || `${formData.name} is a college located in ${formData.city}, ${formData.state}.`,
      website: formData.website || 'https://example.com',
      contactInfo: {
        phone: formData.phone || '+91-9876543210',
        email: formData.email || 'info@example.com',
        address: formData.address || `${formData.city}, ${formData.state}`,
      },
      establishedYear: formData.establishedYear ? Number(formData.establishedYear) : undefined,
    };
    
    addCollege(newCollege);
    
    // Reset form
    setFormData({
      name: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      ranking: '',
      feesMin: '',
      feesMax: '',
      courses: '',
      facilities: '',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80',
      description: '',
      website: '',
      phone: '',
      email: '',
      address: '',
      establishedYear: '',
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Add New College</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">College Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                  <Input 
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ranking">Ranking</Label>
                  <Input 
                    id="ranking"
                    name="ranking"
                    type="number"
                    value={formData.ranking}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input 
                    id="establishedYear"
                    name="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feesMin">Minimum Fees (₹)</Label>
                  <Input 
                    id="feesMin"
                    name="feesMin"
                    type="number"
                    value={formData.feesMin}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="feesMax">Maximum Fees (₹)</Label>
                  <Input 
                    id="feesMax"
                    name="feesMax"
                    type="number"
                    value={formData.feesMax}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="courses">Courses (comma separated)</Label>
                <Input 
                  id="courses"
                  name="courses"
                  value={formData.courses}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science, Electrical Engineering"
                />
              </div>
              
              <div>
                <Label htmlFor="facilities">Facilities (comma separated)</Label>
                <Input 
                  id="facilities"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  placeholder="e.g. Library, Sports Complex"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. https://www.collegename.edu"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91-9876543210"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. info@college.edu"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="btn-primary">
              Add College
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCollege;
