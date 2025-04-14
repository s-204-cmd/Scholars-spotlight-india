
import React, { createContext, useContext, useState, useEffect } from 'react';
import { College, SearchFilters } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CollegeContextType {
  colleges: College[];
  loading: boolean;
  filteredColleges: College[];
  searchFilters: SearchFilters;
  updateSearchFilters: (filters: SearchFilters) => void;
  addCollege: (college: Omit<College, 'id'>) => void;
  updateCollege: (id: string, college: Partial<College>) => void;
  deleteCollege: (id: string) => void;
  getCollege: (id: string) => College | undefined;
  shortlistCollege: (collegeId: string, userId: string) => void;
  removeFromShortlist: (collegeId: string, userId: string) => void;
  isCollegeShortlisted: (collegeId: string, userId: string) => boolean;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const useColleges = () => {
  const context = useContext(CollegeContext);
  if (context === undefined) {
    throw new Error('useColleges must be used within a CollegeProvider');
  }
  return context;
};

// Initial college data
const initialColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Mumbai',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    ranking: 1,
    fees: {
      min: 200000,
      max: 300000
    },
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    facilities: ['Library', 'Sports Complex', 'Laboratories', 'Hostels'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80',
    description: 'IIT Mumbai is one of the premier engineering institutions in India, known for its excellence in technical education and research.',
    website: 'https://www.iitb.ac.in',
    contactInfo: {
      phone: '+91-22-25722545',
      email: 'info@iitb.ac.in',
      address: 'IIT Bombay, Powai, Mumbai, Maharashtra 400076'
    },
    establishedYear: 1958
  },
  {
    id: '2',
    name: 'Delhi University',
    location: {
      city: 'Delhi',
      state: 'Delhi'
    },
    ranking: 2,
    fees: {
      min: 10000,
      max: 50000
    },
    courses: ['Arts', 'Science', 'Commerce'],
    facilities: ['Library', 'Auditorium', 'Sports Ground', 'Cafeteria'],
    imageUrl: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Delhi University is a premier university in India, established in 1922. It offers various undergraduate and postgraduate programs.',
    website: 'http://www.du.ac.in',
    contactInfo: {
      phone: '+91-11-27667853',
      email: 'info@du.ac.in',
      address: 'University of Delhi, Delhi 110007'
    },
    establishedYear: 1922
  },
  {
    id: '3',
    name: 'St. Xavier\'s College',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    ranking: 5,
    fees: {
      min: 30000,
      max: 80000
    },
    courses: ['Arts', 'Science', 'Mass Media'],
    facilities: ['Library', 'Auditorium', 'Gymnasium', 'Computer Labs'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'St. Xavier\'s College is one of the oldest colleges in Mumbai, offering a wide range of undergraduate and postgraduate programs.',
    website: 'https://xaviers.edu',
    contactInfo: {
      phone: '+91-22-22620661',
      email: 'info@xaviers.edu',
      address: '5, Mahapalika Marg, Mumbai, Maharashtra 400001'
    },
    establishedYear: 1869
  },
  {
    id: '4',
    name: 'National Institute of Technology Surathkal',
    location: {
      city: 'Mangalore',
      state: 'Karnataka'
    },
    ranking: 10,
    fees: {
      min: 100000,
      max: 150000
    },
    courses: ['Computer Science', 'Electronics', 'Civil Engineering'],
    facilities: ['Library', 'Sports Complex', 'Hostels', 'Research Centers'],
    imageUrl: 'https://images.unsplash.com/photo-1592303406503-53c0c8238029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    description: 'NIT Surathkal is one of the top technical institutes in India, offering technical education in various disciplines.',
    website: 'https://www.nitk.ac.in',
    contactInfo: {
      phone: '+91-824-2474000',
      email: 'info@nitk.ac.in',
      address: 'NH 66, Surathkal, Mangalore, Karnataka 575025'
    },
    establishedYear: 1960
  },
  {
    id: '5',
    name: 'Lady Shri Ram College',
    location: {
      city: 'Delhi',
      state: 'Delhi'
    },
    ranking: 8,
    fees: {
      min: 20000,
      max: 60000
    },
    courses: ['Arts', 'Commerce', 'Social Sciences'],
    facilities: ['Library', 'Auditorium', 'Sports Ground', 'Labs'],
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Lady Shri Ram College is a premier women\'s college offering undergraduate programs in humanities, social sciences, and commerce.',
    website: 'https://lsr.edu.in',
    contactInfo: {
      phone: '+91-11-26434459',
      email: 'info@lsr.edu.in',
      address: 'Lajpat Nagar IV, New Delhi, Delhi 110024'
    },
    establishedYear: 1956
  }
];

export const CollegeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: 'Mumbai'
  });
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load colleges from localStorage or use initial data
    const savedColleges = localStorage.getItem('collegeAppColleges');
    if (savedColleges) {
      setColleges(JSON.parse(savedColleges));
    } else {
      setColleges(initialColleges);
      localStorage.setItem('collegeAppColleges', JSON.stringify(initialColleges));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters to colleges
    let filtered = [...colleges];
    
    if (searchFilters.location) {
      filtered = filtered.filter(
        college => 
          college.location.city.toLowerCase().includes(searchFilters.location?.toLowerCase() || '') ||
          college.location.state.toLowerCase().includes(searchFilters.location?.toLowerCase() || '')
      );
    }
    
    if (searchFilters.courses && searchFilters.courses.length > 0) {
      filtered = filtered.filter(college => 
        college.courses.some(course => 
          searchFilters.courses?.includes(course)
        )
      );
    }
    
    if (searchFilters.fees) {
      if (searchFilters.fees.min !== undefined) {
        filtered = filtered.filter(college => college.fees.min >= (searchFilters.fees?.min || 0));
      }
      if (searchFilters.fees.max !== undefined) {
        filtered = filtered.filter(college => college.fees.max <= (searchFilters.fees?.max || Infinity));
      }
    }
    
    if (searchFilters.ranking) {
      filtered = filtered.filter(college => college.ranking <= searchFilters.ranking!);
    }
    
    if (searchFilters.stream) {
      filtered = filtered.filter(college => 
        college.courses.some(course => 
          course.toLowerCase().includes(searchFilters.stream?.toLowerCase() || '')
        )
      );
    }
    
    setFilteredColleges(filtered);
  }, [colleges, searchFilters]);

  const updateSearchFilters = (filters: SearchFilters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const addCollege = (college: Omit<College, 'id'>) => {
    const newCollege: College = {
      ...college,
      id: Date.now().toString(),
    };
    
    const updatedColleges = [...colleges, newCollege];
    setColleges(updatedColleges);
    localStorage.setItem('collegeAppColleges', JSON.stringify(updatedColleges));
    
    toast({
      title: "College Added",
      description: `${newCollege.name} has been added successfully.`,
    });
  };

  const updateCollege = (id: string, college: Partial<College>) => {
    const updatedColleges = colleges.map(c => 
      c.id === id ? { ...c, ...college } : c
    );
    
    setColleges(updatedColleges);
    localStorage.setItem('collegeAppColleges', JSON.stringify(updatedColleges));
    
    toast({
      title: "College Updated",
      description: "College information has been updated successfully.",
    });
  };

  const deleteCollege = (id: string) => {
    const updatedColleges = colleges.filter(c => c.id !== id);
    setColleges(updatedColleges);
    localStorage.setItem('collegeAppColleges', JSON.stringify(updatedColleges));
    
    toast({
      title: "College Removed",
      description: "College has been removed successfully.",
    });
  };

  const getCollege = (id: string) => {
    return colleges.find(c => c.id === id);
  };

  const shortlistCollege = (collegeId: string, userId: string) => {
    // Get the current user from localStorage
    const savedUser = localStorage.getItem('collegeAppUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (!user.shortlistedColleges) {
        user.shortlistedColleges = [];
      }
      
      if (!user.shortlistedColleges.includes(collegeId)) {
        user.shortlistedColleges.push(collegeId);
        localStorage.setItem('collegeAppUser', JSON.stringify(user));
        
        toast({
          title: "College Shortlisted",
          description: "College has been added to your shortlist.",
        });
      }
    }
  };

  const removeFromShortlist = (collegeId: string, userId: string) => {
    // Get the current user from localStorage
    const savedUser = localStorage.getItem('collegeAppUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.shortlistedColleges) {
        user.shortlistedColleges = user.shortlistedColleges.filter(
          (id: string) => id !== collegeId
        );
        localStorage.setItem('collegeAppUser', JSON.stringify(user));
        
        toast({
          title: "College Removed",
          description: "College has been removed from your shortlist.",
        });
      }
    }
  };

  const isCollegeShortlisted = (collegeId: string, userId: string): boolean => {
    // Get the current user from localStorage
    const savedUser = localStorage.getItem('collegeAppUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.shortlistedColleges?.includes(collegeId) || false;
    }
    return false;
  };

  return (
    <CollegeContext.Provider value={{ 
      colleges,
      loading,
      filteredColleges,
      searchFilters,
      updateSearchFilters,
      addCollege,
      updateCollege,
      deleteCollege,
      getCollege,
      shortlistCollege,
      removeFromShortlist,
      isCollegeShortlisted
    }}>
      {children}
    </CollegeContext.Provider>
  );
};
