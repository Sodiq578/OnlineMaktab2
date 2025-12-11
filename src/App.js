// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserProvider } from './context/UserContext';

// ==== FOYDALANUVCHI SAHIFALARI ====
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

// ==== ADMIN PANEL ====
import AdminPanel from './pages/AdminPanel';

// ==== YANGI ADMIN KOMPONENTLARI ====
import AdminDashboard from './admin/AdminDashboard';
import AllSections from './admin/AllSections';
import SectionVideos from './admin/SectionsList';
import AddSection from './admin/AddSection';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* ======================= UMUMIY ======================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/videos/:subject" element={<VideoListPage />} />

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
          </Route>

          {/* ======================= ADMIN PANEL ======================= */}
          {/* Barcha admin yo'llari /admin ostida ishlaydi */}
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="all-sections" element={<AllSections />} />
            <Route path="add-section" element={<AddSection />} />
            <Route path="section/:sectionId/videos" element={<SectionVideos />} />
          </Route>

          {/* Eski linklarni yangi admin panelga yo'naltirish */}
          <Route path="/admin-panel" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-login" element={<Navigate to="/admin" replace />} />

          {/* ======================= 404 SAHIFA ======================= */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl max-w-lg mx-4">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-9xl font-black text-indigo-600 dark:text-indigo-400 mb-6"
                  >
                    404
                  </motion.div>

                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    Oops! Sahifa topilmadi
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                    Siz izlagan sahifa mavjud emas yoki o'chirilgan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/"
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
                    >
                      Bosh sahifaga
                    </Link>
                    <Link
                      to="/dashboard"
                      className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin"
                      className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
                    >
                      Admin Panel
                    </Link>
                  </div>

                  <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    Muammo davom etsa{' '}
                    <span className="text-indigo-600">support@onlaynmaktab.uz</span>{' '}
                    ga yozing
                  </p>
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