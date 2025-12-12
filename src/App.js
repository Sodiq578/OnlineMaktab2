// src/App.jsx - Final to'g'rilangan versiya
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// FOYDALANUVCHI SAHIFALARI
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import MyCourses from './pages/MyCourses';
import AllCourses from './pages/AllCourses';
import Certificates from './pages/Certificates';
import Payments from './pages/Payments';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import VideoListPage from './pages/VideoListPage';
import VideoPlayer from './components/VideoPlayer';

// ADMIN SAHIFALARI
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './admin/AdminDashboard';
import AllSections from './admin/AllSections';
import AddSection from './admin/AddSection';
import AddVideoForm from './admin/AddVideoForm';
import SectionVideos from './admin/SectionVideos';

// YANGI SAHIFALAR
import CourseDetails from './pages/CourseDetails';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* ======================= UMUMIY VA OCHIQ SAHIFALAR ======================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/videos/:subject" element={<VideoListPage />} />
          <Route path="/watch/:videoId" element={<VideoPlayer />} />
          
          {/* Kurs tafsilotlari sahifasi */}
          <Route path="/course/:courseId" element={<CourseDetails />} />
          
          {/* Yordam va ma'lumot sahifalari */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* ======================= FOYDALANUVCHI DASHBOARD ======================= */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="payments" element={<Payments />} />
            <Route path="events" element={<Events />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
            <Route path="checkout/:courseId" element={<CheckoutPage />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
          </Route>

          {/* ======================= ADMIN PANEL ======================= */}
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AllSections />} />
            <Route path="sections" element={<AllSections />} />
            <Route path="add-course" element={<AddSection />} />
            <Route path="add-section" element={<AddSection />} />
            <Route path="add-video" element={<AddVideoForm />} />
            <Route path="section/:sectionId" element={<SectionVideos />} />
            <Route path="section/:sectionId/videos" element={<SectionVideos />} />
          </Route>

          {/* Eski linklarni yangi yo'llarga yo'naltirish */}
          <Route path="/admin-panel" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-login" element={<Navigate to="/admin" replace />} />

          {/* ======================= 404 SAHIFA ======================= */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                  <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Sahifa topilmadi</p>
                  <a href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
                    Bosh sahifaga
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;