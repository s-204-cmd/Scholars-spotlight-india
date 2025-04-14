
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CollegeProvider } from "@/context/CollegeContext";

// Layouts
import Layout from "@/components/Layout";
import PublicLayout from "@/components/PublicLayout";

// Public Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Colleges from "@/pages/Colleges";
import CollegeDetail from "@/pages/CollegeDetail";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

// Protected Pages
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import ShortlistedColleges from "@/pages/ShortlistedColleges";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CollegeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/colleges/:id" element={<CollegeDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              
              {/* Protected Routes */}
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/dashboard/shortlisted" element={<ShortlistedColleges />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CollegeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
