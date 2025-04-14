
import React, { useState } from 'react';
import { useColleges } from '@/context/CollegeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, Search } from 'lucide-react';
import EditCollege from './EditCollege';
import { College } from '@/types';

const ManageColleges = () => {
  const { colleges, deleteCollege } = useColleges();
  const [searchQuery, setSearchQuery] = useState('');
  const [collegeToEdit, setCollegeToEdit] = useState<College | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Filter colleges based on search query
  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditClick = (college: College) => {
    setCollegeToEdit(college);
    setIsEditDialogOpen(true);
  };
  
  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setCollegeToEdit(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Manage Colleges</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Ranking</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell className="font-medium">{college.name}</TableCell>
                    <TableCell>{college.location.city}, {college.location.state}</TableCell>
                    <TableCell>#{college.ranking}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {college.courses.slice(0, 2).map((course, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 2 && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            +{college.courses.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(college)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {college.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCollege(college.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    <p className="text-gray-500">No colleges found matching your search</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {isEditDialogOpen && collegeToEdit && (
        <EditCollege 
          college={collegeToEdit} 
          isOpen={isEditDialogOpen} 
          onClose={handleEditClose}
        />
      )}
    </div>
  );
};

export default ManageColleges;
