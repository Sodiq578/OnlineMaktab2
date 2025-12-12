// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock, LogOut, Home, PlusCircle, LayoutDashboard, BookOpen,
  User, Settings, Moon, Sun, Shield, GraduationCap, Video
} from 'lucide-react';

// Barcha kerakli komponentlar
import AdminDashboard from '../admin/AdminDashboard';
import AddSection from '../admin/AddSection';
import SectionsList from '../admin/SectionsList';
import AddVideoForm from '../admin/AddVideoForm';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedDark = localStorage.getItem('oquvmarkaz_dark') === 'true';
    setDarkMode(savedDark);
    if (savedDark) document.documentElement.classList.add('dark');

    const logged = localStorage.getItem('oquvmarkaz_admin') === 'true';
    setIsAuthenticated(logged);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('oquvmarkaz_dark', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const valid = ['admin2025', 'oquvmarkaz', 'center123'];
    if (valid.includes(password)) {
      setIsAuthenticated(true);
      localStorage.setItem('oquvmarkaz_admin', 'true');
      setPassword('');
    } else {
      alert('Parol noto‘g‘ri! Demo parol: admin2025');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Chiqishni tasdiqlaysizmi?')) {
      setIsAuthenticated(false);
      localStorage.removeItem('oquvmarkaz_admin');
    }
  };

  // LOGIN sahifasi
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md p-10 rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
        >
          <div className="text-center mb-8">
            <GraduationCap className="w-24 h-24 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Online O‘quv Markaz</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-indigo-500 transition text-gray-900 dark:text-white"
                required
              />
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition">
              Kirish
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Demo parol: <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded font-mono font-bold">admin2025</code></p>
          </div>

          <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>
    );
  }

  // ASOSIY PANEL
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* NAVBAR */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-3xl shadow-2xl p-6 mb-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <GraduationCap className="w-10 h-10 text-indigo-600" />
                Online O‘quv Markaz
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Professional ta'lim platformasi • Admin panel
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/admin" className={`px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 ${location.pathname === '/admin' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link to="/admin/courses" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Kurslar
              </Link>
              <Link to="/admin/add-course" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition flex items-center gap-2 shadow-lg">
                <PlusCircle className="w-5 h-5" /> Yangi Kurs
              </Link>
              <Link to="/admin/add-video" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition flex items-center gap-2 shadow-lg">
                <Video className="w-5 h-5" /> Video Qo'shish
              </Link>
              <Link to="/" className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition flex items-center gap-2">
                <Home className="w-5 h-5" /> Saytga qaytish
              </Link>
              <button onClick={handleLogout} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition flex items-center gap-2">
                <LogOut className="w-5 h-5" /> Chiqish
              </button>
              <button onClick={toggleDarkMode} className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ROUTES */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
        >
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="add-course" element={<AddSection />} />
            <Route path="add-video" element={<AddVideoForm />} />
            <Route path="courses" element={<SectionsList />} />
            <Route path="section/:sectionId/videos" element={<SectionsList />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </motion.div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">© 2025 Online O‘quv Markaz • Barcha huquqlar himoyalangan</p>
          <p className="text-xs mt-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Tizim faol • Versiya 3.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;