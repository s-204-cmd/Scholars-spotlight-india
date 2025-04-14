
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useColleges } from '@/context/CollegeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Trophy, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { colleges } = useColleges();
  const navigate = useNavigate();
  
  // Get shortlisted colleges
  const shortlistedColleges = colleges.filter(
    college => user?.shortlistedColleges?.includes(college.id)
  );
  
  // Mock data for dashboard
  const upcomingDeadlines = [
    { id: 1, title: 'JEE Main Registration', date: '2025-05-15' },
    { id: 2, title: 'NEET Application', date: '2025-06-01' },
    { id: 3, title: 'College Application Deadline', date: '2025-06-30' }
  ];
  
  const recentActivity = [
    { id: 1, action: 'Viewed', college: 'IIT Mumbai', time: '2 hours ago' },
    { id: 2, action: 'Shortlisted', college: 'Delhi University', time: '1 day ago' },
    { id: 3, action: 'Application Updated', college: 'St. Xavier\'s College', time: '3 days ago' }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-college-primary to-college-dark text-white rounded-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
                <p className="mt-2 text-white/80">
                  Track your college applications, shortlists, and get personalized recommendations.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  onClick={() => navigate('/colleges')} 
                  className="bg-white text-college-primary hover:bg-gray-100"
                >
                  Explore Colleges
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-college-secondary/30 mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{shortlistedColleges.length}</div>
                    <div className="text-white/80">Shortlisted Colleges</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-college-secondary/30 mr-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
                    <div className="text-white/80">Upcoming Deadlines</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-college-secondary/30 mr-4">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-white/80">Profile Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shortlisted Colleges */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Shortlisted Colleges</CardTitle>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={() => navigate('/dashboard/shortlisted')}
                  >
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Your favorite colleges saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {shortlistedColleges.length > 0 ? (
                  <div className="space-y-4">
                    {shortlistedColleges.slice(0, 3).map(college => (
                      <div 
                        key={college.id} 
                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => navigate(`/colleges/${college.id}`)}
                      >
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={college.imageUrl} 
                            alt={college.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-college-primary">{college.name}</h3>
                          <div className="text-sm text-gray-500">
                            {college.location.city}, {college.location.state}
                          </div>
                        </div>
                        <Badge className="bg-college-secondary">Rank #{college.ranking}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="text-lg font-medium mb-1">No colleges shortlisted yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start exploring and save colleges you're interested in.
                    </p>
                    <Button 
                      onClick={() => navigate('/colleges')}
                      variant="outline"
                    >
                      Browse Colleges
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* College Recommendations */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  Based on your academic profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colleges.slice(0, 4).map(college => (
                    <div 
                      key={college.id} 
                      className="border rounded-md overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/colleges/${college.id}`)}
                    >
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={college.imageUrl} 
                          alt={college.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{college.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-gray-500">
                            {college.location.city}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {college.courses[0]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Overview */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={user?.profilePicture} 
                      alt={user?.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user?.name}</h3>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Academic Background</span>
                    <span className="font-medium">{user?.academicBackground || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stream</span>
                    <span className="font-medium">{user?.stream || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Percentage</span>
                    <span className="font-medium">{user?.percentage || 'Not specified'}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={() => navigate('/dashboard/profile')}
                    variant="outline" 
                    className="w-full"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Deadlines */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingDeadlines.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingDeadlines.map(deadline => (
                      <div key={deadline.id} className="flex items-start space-x-4">
                        <div className="p-2 rounded-md bg-orange-100">
                          <Calendar className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{deadline.title}</h3>
                          <p className="text-gray-500 text-sm">
                            Due on {formatDate(deadline.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No upcoming deadlines</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className="p-2 rounded-md bg-blue-100">
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {activity.action} <span className="text-college-primary">{activity.college}</span>
                          </div>
                          <div className="text-gray-500 text-sm">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
