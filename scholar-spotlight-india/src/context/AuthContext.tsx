
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('collegeAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication with localStorage
    // In a real app, you would make an API call here
    setLoading(true);
    
    // For demo purposes, we'll have some hardcoded users
    const adminUser: User = {
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      profilePicture: 'https://ui-avatars.com/api/?name=Admin+User&background=0C2340&color=fff'
    };
    
    const regularUser: User = {
      id: 'user1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'user',
      profilePicture: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8E793E&color=fff',
      academicBackground: 'Science',
      percentage: 85,
      stream: 'Engineering',
      age: 18,
      gender: 'Female',
      shortlistedColleges: []
    };

    // Check credentials (in a real app, you would verify against a backend)
    let foundUser = null;
    if (email === 'admin@example.com' && password === 'admin123') {
      foundUser = adminUser;
    } else if (email === 'priya@example.com' && password === 'user123') {
      foundUser = regularUser;
    } else {
      throw new Error('Invalid credentials');
    }

    setUser(foundUser);
    localStorage.setItem('collegeAppUser', JSON.stringify(foundUser));
    setLoading(false);
  };

  const signup = async (userData: Partial<User>, password: string) => {
    // Simulate user registration with localStorage
    setLoading(true);
    
    // Create a new user
    const newUser: User = {
      id: 'user' + Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: 'user',
      profilePicture: `https://ui-avatars.com/api/?name=${userData.name?.replace(' ', '+')}&background=8E793E&color=fff`,
      academicBackground: userData.academicBackground,
      percentage: userData.percentage,
      stream: userData.stream,
      age: userData.age,
      gender: userData.gender,
      shortlistedColleges: []
    };

    setUser(newUser);
    localStorage.setItem('collegeAppUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('collegeAppUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
