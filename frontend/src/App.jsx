import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Inquiry from "./pages/Inquiry";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const location = useLocation();

  // Hide navbar & footer on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* Blog Pages */}
        <Route path="/blogs" element={<BlogList />} />
    
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <ProtectedRoute>
              <Inquiry />
            </ProtectedRoute>
          }
        />
     
      </Routes>

      {!isAdminPage && <WhatsAppButton />}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
