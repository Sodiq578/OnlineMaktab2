import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaCertificate, FaMoneyBillAlt, FaDesktop, FaCalendarAlt, FaCog, FaSignOutAlt, FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/dashboard/home');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setActiveItem(path);
    if (window.innerWidth <= 640) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { path: '/dashboard/home', icon: <FaHome />, label: 'Bosh sahifa' },
    { path: '/dashboard/my-courses', icon: <FaBook />, label: 'Mening Kurslarim' },
    { path: '/dashboard/certificates', icon: <FaCertificate />, label: 'Sertifikatlarim' },
    { path: '/dashboard/payments', icon: <FaMoneyBillAlt />, label: "To'lovlar" },
    { path: '/dashboard/events', icon: <FaCalendarAlt />, label: "Ta'lim yangiliklari" },
    { path: '/dashboard/settings', icon: <FaCog />, label: 'Sozlamalar' },
    { path: '/dashboard/messages', icon: <FaEnvelope />, label: 'Xabarlar' },
    { path: '/dashboard/profile', icon: <FaUser />, label: 'Profil' },
    { path: '/dashboard/logout', icon: <FaSignOutAlt />, label: 'Chiqish' },
  ];

  // Ekran o'lchami o'zgarganda sidebar ni yopish
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape tugmasi bilan sidebar ni yopish
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Skrolni bloklash
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="sidebar-container">
      {/* Mobil uchun header qismi */}
      <div className="sidebar-header sm:hidden flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="logo-container w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">E</span>
          </div>
          <h2 className="text-xl font-semibold">EduPlatform</h2>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
          aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobil uchun overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} sm:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobil sidebar */}
      <div className={`mobile-sidebar fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white p-5 shadow-2xl transition-all duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}>
        <div className="flex flex-col h-full">
          {/* Mobil sidebar header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <div className="flex items-center space-x-3">
              <div className="logo-container w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold text-xl">EP</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">EduPlatform</h2>
                <p className="text-sm text-blue-100">O'quvchi paneli</p>
              </div>
            </div>
          </div>

          {/* Mobil menyu */}
          <nav className="flex-1 overflow-y-auto sidebar-scroll">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    onClick={() => handleLinkClick(item.path)}
                    className={`sidebar-item flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${activeItem === item.path ? 'bg-white bg-opacity-20 shadow-lg transform scale-[1.02]' : 'hover:bg-white hover:bg-opacity-10 hover:shadow-md'}`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {activeItem === item.path && (
                      <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobil sidebar footer */}
          <div className="mt-8 pt-6 border-t border-white border-opacity-20">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-10">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Foydalanuvchi</p>
                <p className="text-sm text-blue-100">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar hidden sm:flex flex-col w-72 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white p-6 h-screen shadow-xl sticky top-0">
        {/* Desktop header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="logo-container w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-blue-600 font-bold text-2xl">EP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">EduPlatform</h1>
              <p className="text-sm text-blue-100 opacity-90">O'qish - kelajagingiz kaliti</p>
            </div>
          </div>
        </div>

        {/* Desktop menyu */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  onClick={() => setActiveItem(item.path)}
                  className={`sidebar-item flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${activeItem === item.path ? 'bg-white bg-opacity-20 shadow-lg border-l-4 border-yellow-400' : 'hover:bg-white hover:bg-opacity-10 hover:shadow-md hover:border-l-4 hover:border-blue-300'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {activeItem === item.path && (
                    <div className="ml-auto animate-pulse">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop footer */}
        <div className="mt-auto pt-8 border-t border-white border-opacity-20">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-indigo-600"></div>
            </div>
            <div className="flex-1">
              <p className="font-bold">Azizbek Karimov</p>
              <p className="text-sm text-blue-100">O'qituvchi</p>
            </div>
            <FaCog className="text-xl opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-blue-100 opacity-70">
              © 2024 EduPlatform. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </div>

      {/* Mobil uchun bo'sh joy (header uchun) */}
      <div className="h-16 sm:h-0"></div>
    </div>
  );
};

export default Sidebar;