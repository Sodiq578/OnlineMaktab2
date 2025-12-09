// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminDashboard from '../admin/AdminDashboard';
import SectionVideos from '../admin/SectionsList';
import AddSection from '../admin/AddSection';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login funksiyasi
  const handleLogin = () => {
    const password = prompt('Admin parolini kiriting:');
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Noto‘g‘ri parol!');
    }
  };

  // Logout funksiyasi
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminLoggedIn');
  };

  // Komponent yuklanganda authentication tekshirish
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  // Agar autentifikatsiya o'tmagan bo'lsa, login formasi
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Tizimga kirish uchun parolni kiriting</p>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg mb-6"
          >
            Kirish
          </button>
          
          <div className="space-y-4 text-sm text-gray-500">
            <p>
              Demo parol: <code className="bg-gray-100 px-3 py-1 rounded font-mono">admin123</code>
            </p>
            <p className="text-xs">
              Eslatma: Bu demo tizim. Haqiqiy ishlatishda parolni o'zgartiring!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin paneli interfeysi
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-2xl shadow-lg">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="text-3xl">👨‍🏫</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Online Maktab Admin Paneli</h1>
                <p className="text-gray-600 text-sm md:text-base">Barcha fanlar va videolarni boshqaring</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/admin"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition text-center"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/add-section"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition text-center"
            >
              + Yangi Fan
            </Link>
            <Link
              to="/"
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition text-center"
            >
              Saytga qaytish
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition"
            >
              Chiqish
            </button>
          </div>
        </div>

        {/* Asosiy kontent */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 min-h-[70vh]">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="add-section" element={<AddSection />} />
            <Route path="section/:sectionId/videos" element={<SectionVideos />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© Online Maktab Admin Paneli • {new Date().getFullYear()}</p>
            <div className="flex gap-6">
              <span className="text-green-600">● Online</span>
              <span>Admin: System Administrator</span>
              <span>Versiya: 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;