
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useColleges } from '@/context/CollegeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, GraduationCap, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const ShortlistedColleges = () => {
  const { user } = useAuth();
  const { colleges, removeFromShortlist } = useColleges();
  const navigate = useNavigate();
  
  // Get shortlisted colleges
  const shortlistedColleges = colleges.filter(
    college => user?.shortlistedColleges?.includes(college.id)
  );
  
  const handleRemoveShortlist = (collegeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      removeFromShortlist(collegeId, user.id);
    }
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-college-primary">Shortlisted Colleges</h1>
        
        {shortlistedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedColleges.map((college) => (
              <Card 
                key={college.id} 
                className="college-card cursor-pointer animate-fade-in"
                onClick={() => navigate(`/colleges/${college.id}`)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={college.imageUrl} 
                    alt={college.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{college.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => handleRemoveShortlist(college.id, e)}
                      className="rounded-full text-red-500 hover:text-red-600"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{college.location.city}, {college.location.state}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        +{college.courses.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1 text-college-primary" />
                      <span>Rank {college.ranking}</span>
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1 text-college-primary" />
                      <span>₹{formatCurrency(college.fees.min)} - ₹{formatCurrency(college.fees.max)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-college-primary text-college-primary hover:bg-college-primary hover:text-white"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No colleges shortlisted yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring and save colleges you're interested in.
            </p>
            <Button 
              onClick={() => navigate('/colleges')}
              className="btn-primary"
            >
              Browse Colleges
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedColleges;
