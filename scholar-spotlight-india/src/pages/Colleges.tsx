
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColleges } from '@/context/CollegeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, MapPin, GraduationCap, IndianRupee } from 'lucide-react';
import { College, SearchFilters } from '@/types';
import { formatCurrency } from '@/utils/formatters';

const Colleges = () => {
  const { filteredColleges, searchFilters, updateSearchFilters, shortlistCollege, removeFromShortlist, isCollegeShortlisted } = useColleges();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [locationInput, setLocationInput] = useState(searchFilters.location || '');
  const [streamInput, setStreamInput] = useState(searchFilters.stream || '');
  const [feesRange, setFeesRange] = useState<[number, number]>([0, 300000]);
  const [rankingLimit, setRankingLimit] = useState<number>(20);

  // Apply filters when inputs change
  useEffect(() => {
    const debounce = setTimeout(() => {
      const newFilters: SearchFilters = {
        ...searchFilters,
        location: locationInput || undefined,
        stream: streamInput || undefined,
        fees: {
          min: feesRange[0],
          max: feesRange[1]
        },
        ranking: rankingLimit
      };
      updateSearchFilters(newFilters);
    }, 300);

    return () => clearTimeout(debounce);
  }, [locationInput, streamInput, feesRange, rankingLimit]);

  const handleShortlist = (collegeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      if (isCollegeShortlisted(collegeId, user.id)) {
        removeFromShortlist(collegeId, user.id);
      } else {
        shortlistCollege(collegeId, user.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-college-primary">Explore Colleges</h1>
        
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Accordion type="single" collapsible defaultValue="filters">
            <AccordionItem value="filters">
              <AccordionTrigger>
                <h2 className="text-xl font-semibold">Search & Filters</h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      placeholder="City or State"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stream
                    </label>
                    <Input
                      placeholder="e.g. Engineering, Medical"
                      value={streamInput}
                      onChange={(e) => setStreamInput(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fees Range (₹)
                    </label>
                    <div className="pt-4">
                      <Slider
                        defaultValue={[0, 300000]}
                        max={500000}
                        step={10000}
                        value={feesRange}
                        onValueChange={(value) => setFeesRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>₹{formatCurrency(feesRange[0])}</span>
                        <span>₹{formatCurrency(feesRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Ranking
                    </label>
                    <Select
                      value={rankingLimit.toString()}
                      onValueChange={(value) => setRankingLimit(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Max Ranking" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Top 5</SelectItem>
                        <SelectItem value="10">Top 10</SelectItem>
                        <SelectItem value="20">Top 20</SelectItem>
                        <SelectItem value="50">Top 50</SelectItem>
                        <SelectItem value="100">Top 100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setLocationInput('');
                      setStreamInput('');
                      setFeesRange([0, 300000]);
                      setRankingLimit(20);
                      updateSearchFilters({});
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredColleges.length} College{filteredColleges.length !== 1 ? 's' : ''} Found
            </h2>
          </div>
          
          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <Card 
                  key={college.id} 
                  className="college-card cursor-pointer animate-fade-in"
                  onClick={() => navigate(`/colleges/${college.id}`)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={college.imageUrl} 
                      alt={college.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{college.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => handleShortlist(college.id, e)}
                        className={`rounded-full ${
                          user && isCollegeShortlisted(college.id, user.id) 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${
                          user && isCollegeShortlisted(college.id, user.id) ? 'fill-current' : ''
                        }`} />
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No colleges found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search filters to find more colleges.
              </p>
              <Button 
                onClick={() => {
                  setLocationInput('Mumbai');
                  setStreamInput('');
                  setFeesRange([0, 300000]);
                  setRankingLimit(20);
                  updateSearchFilters({ location: 'Mumbai' });
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Colleges;
