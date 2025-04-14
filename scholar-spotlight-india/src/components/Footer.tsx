
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-college-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold">
              College<span className="text-college-secondary">Discovery</span>
            </Link>
            <p className="mt-2 text-sm">
              Discover the perfect college for your future. Search, explore, and find your path to success.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-college-secondary transition-colors">Home</Link></li>
              <li><Link to="/colleges" className="hover:text-college-secondary transition-colors">Browse Colleges</Link></li>
              <li><Link to="/about" className="hover:text-college-secondary transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-college-secondary transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-college-secondary transition-colors">Admission Guide</a></li>
              <li><a href="#" className="hover:text-college-secondary transition-colors">Scholarships</a></li>
              <li><a href="#" className="hover:text-college-secondary transition-colors">Entrance Exams</a></li>
              <li><a href="#" className="hover:text-college-secondary transition-colors">Career Counseling</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@collegediscovery.in</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: 123 Education Street, Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} College Discovery India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
