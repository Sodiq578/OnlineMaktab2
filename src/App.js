// src/App.js — TO‘LIQ TO‘G‘RILANGAN VERSIYA
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Foydalanuvchi sahifalari
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

// Admin sahifalari
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './admin/AdminDashboard';
import SectionVideos from './admin/SectionsList';
import AddSection from './admin/AddSection';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* ==================== UMUMIY SAHIFALAR ==================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/videos/:subject" element={<VideoListPage />} />

          {/* ==================== FOYDALANUVCHI DASHBOARD ==================== */}
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
          </Route>

          {/* ==================== ADMIN LOGIN (ALTERNATIV) ==================== */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ==================== ASOSIY ADMIN PANEL ==================== */}
          <Route path="/admin/*" element={<AdminPanel />} />
          
          {/* QAYTA YO'NALTIRISHLAR */}
          <Route path="/admin-panel" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-login-old" element={<Navigate to="/admin" replace />} />

          {/* ==================== 404 SAHIFA ==================== */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
                <div className="text-8xl font-bold text-indigo-600 mb-6">404</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Sahifa topilmadi</h1>
                <p className="text-gray-600 mb-8">
                  Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                  >
                    Bosh sahifaga
                  </a>
                  <a 
                    href="/dashboard" 
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition shadow-lg"
                  >
                    Dashboard
                  </a>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                  Agar bu xato deb o'ylasangiz, admin bilan bog'laning
                </p>
              </div>
            </div>
          } />

        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;