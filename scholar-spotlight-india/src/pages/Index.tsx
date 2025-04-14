
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useColleges } from '@/context/CollegeContext';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const [searchLocation, setSearchLocation] = useState('Mumbai');
  const { updateSearchFilters } = useColleges();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    updateSearchFilters({ location: searchLocation });
    navigate('/colleges');
  };

  const featuredColleges = [
    {
      name: "IIT Bombay",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80",
      description: "Premier engineering and technology university"
    },
    {
      name: "Delhi University",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "Top-ranked university for arts and humanities"
    },
    {
      name: "AIIMS Delhi",
      image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      description: "India's leading medical institution"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-college-primary to-college-dark text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Find Your Perfect College in India
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover and compare colleges across India to make an informed decision about your future education.
          </p>
          
          {isAuthenticated && (
            <div className="mb-8 p-4 bg-white/10 rounded-lg inline-block">
              <p className="text-lg">
                Welcome back, <span className="font-bold">{user?.name}</span>!
              </p>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="secondary"
                className="mt-2 btn-secondary"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Enter a city or state"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full sm:w-96 bg-white text-gray-800"
            />
            <Button onClick={handleSearch} className="btn-secondary">
              Search Colleges
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Colleges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredColleges.map((college, index) => (
              <div 
                key={index} 
                className="college-card overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={college.image} 
                    alt={college.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-college-primary">{college.name}</h3>
                  <p className="text-gray-600 mb-4">{college.description}</p>
                  <Button 
                    onClick={() => {
                      navigate('/colleges');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Choose College Discovery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Search</h3>
              <p className="text-gray-600">
                Find and filter colleges based on location, courses, fees, and more.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Information</h3>
              <p className="text-gray-600">
                Access reliable and updated details about colleges and courses.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get college suggestions based on your academic profile and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-college-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream college?</h2>
          <p className="text-xl mb-8">
            Create an account to save colleges, track applications, and get personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="btn-secondary"
                  size="lg"
                >
                  Sign Up Now
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-college-accent"
                  size="lg"
                >
                  Login
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => navigate('/colleges')}
                className="btn-secondary"
                size="lg"
              >
                Browse Colleges
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
