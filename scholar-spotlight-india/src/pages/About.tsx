
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  const teamMembers = [
    {
      name: 'Dr. Ashish Sharma',
      role: 'Founder & CEO',
      bio: 'Former professor with 15+ years in education consulting',
      image: 'https://ui-avatars.com/api/?name=Ashish+Sharma&background=0C2340&color=fff'
    },
    {
      name: 'Priya Mehta',
      role: 'Education Advisor',
      bio: 'Specialized in academic counseling for undergraduate students',
      image: 'https://ui-avatars.com/api/?name=Priya+Mehta&background=D4AF37&color=fff'
    },
    {
      name: 'Rahul Singh',
      role: 'Technical Lead',
      bio: 'Education technology expert focused on student experience',
      image: 'https://ui-avatars.com/api/?name=Rahul+Singh&background=8E793E&color=fff'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-college-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About College Discovery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering students to make informed decisions about higher education in India.
          </p>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-college-primary">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                College Discovery aims to simplify the college search process for students across India, 
                providing accurate and comprehensive information to help them find institutions that 
                match their academic goals, preferences, and potential.
              </p>
              <p className="text-lg text-gray-700">
                We believe that every student deserves access to quality education information to make 
                life-changing decisions about their future with confidence.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Students discussing education options" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Offer */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-college-primary">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comprehensive College Database</h3>
              <p className="text-gray-600">
                Access detailed information about colleges across India, including courses, fees, rankings, and facilities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get college suggestions based on your academic profile, interests, and career aspirations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-college-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Application Tracking</h3>
              <p className="text-gray-600">
                Organize and track your college applications, deadlines, and admission status in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-college-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-college-accent font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-college-primary">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-8">
            Have questions or feedback? We'd love to hear from you. Reach out to our team for assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/colleges')}
              className="btn-primary"
              size="lg"
            >
              Explore Colleges
            </Button>
            <Button 
              variant="outline" 
              className="border-college-primary text-college-primary hover:bg-college-primary hover:text-white"
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
