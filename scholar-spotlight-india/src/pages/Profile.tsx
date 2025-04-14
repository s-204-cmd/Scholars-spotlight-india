
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    academicBackground: '',
    percentage: 0,
    stream: '',
    age: 0,
    gender: ''
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        academicBackground: user.academicBackground,
        percentage: user.percentage,
        stream: user.stream,
        age: user.age,
        gender: user.gender
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this to a backend
    // For now, we'll just show a toast
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-college-primary">Profile Settings</h1>
        
        <div className="space-y-8">
          {/* Profile Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profilePicture} alt={user?.name} />
                  <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-medium text-xl">{user?.name}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-sm text-gray-500">
                    Account type: <span className="font-medium capitalize">{user?.role}</span>
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium text-lg">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="academicBackground">Academic Background</Label>
                    <Select 
                      value={formData.academicBackground}
                      onValueChange={(value) => handleSelectChange(value, 'academicBackground')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your academic background" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Percentage</Label>
                    <Input
                      id="percentage"
                      name="percentage"
                      type="number"
                      value={formData.percentage || ''}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="stream">Preferred Stream</Label>
                    <Select 
                      value={formData.stream}
                      onValueChange={(value) => handleSelectChange(value, 'stream')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Law">Law</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium text-lg">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age || ''}
                      onChange={handleChange}
                      min="15"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange(value, 'gender')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="btn-primary">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
