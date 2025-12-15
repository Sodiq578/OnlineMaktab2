// src/components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaVideo,
  FaCertificate,
  FaCreditCard,
  FaCalendarAlt,
  FaCog,
  FaCommentAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaQuestionCircle,
  FaUsers,
  FaSearch,
  FaExpand,
  FaCompress,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      try {
        const saved = localStorage.getItem('eduhub_current_user') || localStorage.getItem('registeredUser');
        if (saved) {
          const parsed = JSON.parse(saved);
          setUser(parsed);

          // Demo notifications
          setNotifications([
            { id: 1, text: "Yangi 'React Advanced' kursi ochildi!", time: "5 daqiqa oldin", read: false, type: 'course' },
            { id: 2, text: "Sizga yangi xabar keldi", time: "1 soat oldin", read: false, type: 'message' },
            { id: 3, text: "To'lov muvaffaqiyatli amalga oshirildi", time: "2 soat oldin", read: true, type: 'payment' },
            { id: 4, text: "Sertifikatingiz tayyor!", time: "1 kun oldin", read: true, type: 'certificate' },
          ]);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { icon: <FaHome />, label: 'Bosh sahifa', path: '/dashboard/home' },
    { icon: <FaBook />, label: 'Mening kurslarim', path: '/dashboard/my-courses' },
    { icon: <FaVideo />, label: 'Barcha kurslar', path: '/dashboard/all-courses' },
    { icon: <FaCertificate />, label: 'Sertifikatlar', path: '/dashboard/certificates' },
    { icon: <FaCreditCard />, label: "To'lovlar", path: '/dashboard/payments' },
    { icon: <FaCalendarAlt />, label: 'Tadbirlar', path: '/dashboard/events' },
    { icon: <FaCommentAlt />, label: 'Xabarlar', path: '/dashboard/messages' },
    { icon: <FaUserCircle />, label: 'Profil', path: '/dashboard/profile' },
    { icon: <FaCog />, label: 'Sozlamalar', path: '/dashboard/settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`flex h-screen overflow-hidden bg-gray-50 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : ''}`}>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-xl shadow-2xl hover:bg-blue-700 transition-all duration-200"
      >
        {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white dark:bg-gray-800 shadow-2xl lg:shadow-xl transform transition-all duration-500 ease-in-out
          flex flex-col overflow-hidden
        `}
      >
        <div className="p-6 border-b dark:border-gray-700">
          <Link to="/dashboard/home" className="flex items-center gap-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SDK
            </div>
            <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-blue-700 dark:text-blue-300">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="p-5 border-b dark:border-gray-700">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName || 'User'}&background=random&color=fff`}
              alt="Avatar"
              className="w-14 h-14 rounded-full ring-4 ring-blue-200 dark:ring-blue-700"
            />
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-lg">
                {user.firstName} {user.lastName || ''}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || user.phone}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                    ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t dark:border-gray-700">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <FaQuestionCircle className="text-xl" />
              <span>Yordam markazi</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <FaUsers className="text-xl" />
              <span>Qo'llab-quvvatlash</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all transform hover:scale-105"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden md:block">
              Salom, {user.firstName || 'Foydalanuvchi'}!
            </h1>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
              
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurs, dars yoki mavzuni qidiring..."
                className="w-full pl-12 pr-5 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-lg">Bildirishnomalar</h3>
                    <p className="text-sm text-gray-500">{unreadCount} ta o'qilmagan</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-8 text-center text-gray-500">Hozircha bildirishnoma yo'q</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-b dark:border-gray-700 last:border-0 ${
                            !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-medium text-gray-800 dark:text-white">{notif.text}</p>
                            {!notif.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t dark:border-gray-700">
                    <button className="w-full text-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      Barchasini ko'rish
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}&background=random`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-blue-400"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-5 border-b dark:border-gray-700">
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/dashboard/profile" className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">Profilni tahrirlash</Link>
                  <Link to="/dashboard/settings" className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">Sozlamalar</Link>
                  <hr className="my-2 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-30 animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;