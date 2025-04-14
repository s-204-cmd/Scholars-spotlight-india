
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  academicBackground?: string;
  percentage?: number;
  stream?: string;
  age?: number;
  gender?: string;
  shortlistedColleges?: string[];
}

export interface College {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  ranking: number;
  fees: {
    min: number;
    max: number;
  };
  courses: string[];
  facilities: string[];
  imageUrl: string;
  description: string;
  website: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  reviews?: {
    rating: number;
    comment: string;
    user: string;
  }[];
  admissionProcess?: string;
  establishedYear?: number;
}

export interface ApplicationTrack {
  id: string;
  collegeId: string;
  userId: string;
  status: 'Not Applied' | 'In Review' | 'Accepted' | 'Rejected';
  documents: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  deadline: string;
}

export interface ExamInfo {
  id: string;
  name: string;
  date: string;
  registrationDeadline: string;
  score?: number;
  status: 'Registered' | 'Taken' | 'Not Registered';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'deadline' | 'application' | 'exam' | 'general';
  read: boolean;
  createdAt: string;
}

export interface SearchFilters {
  location?: string;
  courses?: string[];
  fees?: {
    min?: number;
    max?: number;
  };
  ranking?: number;
  stream?: string;
}
