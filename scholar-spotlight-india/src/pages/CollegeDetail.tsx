
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useColleges } from '@/context/CollegeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, GraduationCap, Heart, Globe, Phone, Mail, Building, Calendar, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const CollegeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCollege, shortlistCollege, removeFromShortlist, isCollegeShortlisted } = useColleges();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const college = getCollege(id || '');
  
  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center"
            onClick={() => navigate('/colleges')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-2">College Not Found</h3>
            <p className="text-gray-600 mb-6">
              The college you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/colleges')}>
              Browse Colleges
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleShortlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      if (isCollegeShortlisted(college.id, user.id)) {
        removeFromShortlist(college.id, user.id);
      } else {
        shortlistCollege(college.id, user.id);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center"
          onClick={() => navigate('/colleges')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Colleges
        </Button>
        
        {/* College Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-64 relative">
            <img 
              src={college.imageUrl} 
              alt={college.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold text-white mb-2">{college.name}</h1>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{college.location.city}, {college.location.state}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex space-x-6">
                <div>
                  <div className="text-sm text-gray-500">Established</div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1 text-college-primary" />
                    <span className="font-semibold">{college.establishedYear || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Ranking</div>
                  <div className="flex items-center mt-1">
                    <GraduationCap className="h-4 w-4 mr-1 text-college-primary" />
                    <span className="font-semibold">#{college.ranking} in India</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Annual Fees</div>
                  <div className="flex items-center mt-1">
                    <IndianRupee className="h-4 w-4 mr-1 text-college-primary" />
                    <span className="font-semibold">
                      ₹{formatCurrency(college.fees.min)} - ₹{formatCurrency(college.fees.max)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <Button 
                  onClick={handleShortlist}
                  variant={user && isCollegeShortlisted(college.id, user.id) ? "default" : "outline"}
                  className={`${
                    user && isCollegeShortlisted(college.id, user.id) 
                      ? 'bg-college-secondary hover:bg-college-secondary/90' 
                      : 'border-college-secondary text-college-secondary hover:bg-college-secondary hover:text-white'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${
                    user && isCollegeShortlisted(college.id, user.id) ? 'fill-current' : ''
                  }`} />
                  {user && isCollegeShortlisted(college.id, user.id) ? 'Shortlisted' : 'Add to Shortlist'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* College Details Tabs */}
        <Tabs defaultValue="overview" className="bg-white rounded-lg shadow-sm overflow-hidden">
          <TabsList className="grid w-full grid-cols-4 p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className="rounded-none data-[state=active]:bg-college-primary data-[state=active]:text-white py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="rounded-none data-[state=active]:bg-college-primary data-[state=active]:text-white py-3"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger 
              value="facilities" 
              className="rounded-none data-[state=active]:bg-college-primary data-[state=active]:text-white py-3"
            >
              Facilities
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="rounded-none data-[state=active]:bg-college-primary data-[state=active]:text-white py-3"
            >
              Contact
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6">
            <h2 className="text-2xl font-bold mb-4">About {college.name}</h2>
            <p className="text-gray-700 mb-6">{college.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Ranked #{college.ranking} in India</span>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Offering {college.courses.length} academic programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Established in {college.establishedYear || 'N/A'}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>World-class {college.facilities.join(', ')} facilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Admission Process</h3>
                  {college.admissionProcess ? (
                    <p className="text-gray-700">{college.admissionProcess}</p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        The admission process typically includes the following steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Entrance examination</li>
                        <li>Merit-based selection</li>
                        <li>Document verification</li>
                        <li>Counseling sessions</li>
                        <li>Fee payment</li>
                      </ol>
                      <p className="text-gray-700">
                        For detailed information, please visit the college website or contact the admissions office.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="p-6">
            <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
            <p className="text-gray-700 mb-6">
              {college.name} offers a wide range of academic programs across various disciplines.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.courses.map((course, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-college-primary">{course}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="facilities" className="p-6">
            <h2 className="text-2xl font-bold mb-4">Campus Facilities</h2>
            <p className="text-gray-700 mb-6">
              {college.name} provides state-of-the-art facilities to enhance the learning experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {college.facilities.map((facility, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-college-secondary/20 flex items-center justify-center">
                      <Building className="h-8 w-8 text-college-secondary" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{facility}</h3>
                    <p className="text-gray-600">
                      State-of-the-art {facility.toLowerCase()} facilities available for students.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-6">
              Get in touch with {college.name} for admissions and other inquiries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-college-primary" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-gray-600">{college.contactInfo.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-college-primary" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-gray-600">{college.contactInfo.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-college-primary" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">{college.contactInfo.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-3 text-college-primary" />
                      <div>
                        <div className="font-medium">Website</div>
                        <a 
                          href={college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-college-primary hover:underline"
                        >
                          {college.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Campus Map</h3>
                  <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Interactive map would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollegeDetail;
