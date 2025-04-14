
import React, { useState } from 'react';
import { useColleges } from '@/context/CollegeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { College } from '@/types';

interface EditCollegeProps {
  college: College;
  isOpen: boolean;
  onClose: () => void;
}

const EditCollege = ({ college, isOpen, onClose }: EditCollegeProps) => {
  const { updateCollege } = useColleges();
  const [formData, setFormData] = useState({
    name: college.name,
    city: college.location.city,
    state: college.location.state,
    ranking: college.ranking,
    feesMin: college.fees.min,
    feesMax: college.fees.max,
    courses: college.courses.join(', '),
    facilities: college.facilities.join(', '),
    imageUrl: college.imageUrl,
    description: college.description,
    website: college.website,
    phone: college.contactInfo.phone,
    email: college.contactInfo.email,
    address: college.contactInfo.address,
    establishedYear: college.establishedYear || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    const updatedCollege: Partial<College> = {
      name: formData.name,
      location: {
        city: formData.city,
        state: formData.state,
      },
      ranking: Number(formData.ranking),
      fees: {
        min: Number(formData.feesMin),
        max: Number(formData.feesMax),
      },
      courses: formData.courses.split(',').map(item => item.trim()),
      facilities: formData.facilities.split(',').map(item => item.trim()),
      imageUrl: formData.imageUrl,
      description: formData.description,
      website: formData.website,
      contactInfo: {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      },
      establishedYear: formData.establishedYear ? Number(formData.establishedYear) : undefined,
    };
    
    updateCollege(college.id, updatedCollege);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
          <DialogDescription>
            Update the information for {college.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">College Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
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
              />
            </div>
            
            <div>
              <Label htmlFor="facilities">Facilities (comma separated)</Label>
              <Input 
                id="facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
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
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="btn-primary">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollege;
