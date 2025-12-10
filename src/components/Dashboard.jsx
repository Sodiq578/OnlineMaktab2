// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
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
  FaUsers
} from 'react-icons/fa';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // ✅ Array default qiymati
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('eduhub_current_user') || 
                         localStorage.getItem('registeredUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // ✅ Xavfsiz notifications array yaratish
          setNotifications([
            { id: 1, text: "Yangi dars qo'shildi", time: "10 min oldin", read: false },
            { id: 2, text: "Dars eslatmasi", time: "1 soat oldin", read: true },
          ]);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('eduhub_current_user');
    localStorage.removeItem('registeredUser');
    navigate('/login');
  };

  // ✅ unreadNotificationsCount uchun xavfsiz hisoblash
  const unreadNotificationsCount = notifications ? 
    notifications.filter(n => !n.read).length : 0;

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 
        w-64 bg-white shadow-xl lg:shadow-none transform transition-transform duration-300
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b">
          <Link to="/dashboard/home" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-600">EduHub</h1>
            <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">Dashboard</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName || 'User'}&background=random`} 
              alt={user.firstName || 'Foydalanuvchi'}
              className="w-12 h-12 rounded-full border-2 border-blue-200"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.name || 'Foydalanuvchi'}
              </p>
              <p className="text-sm text-gray-500">{user.email || user.phone}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FaQuestionCircle />
              <span>Yordam</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FaUsers />
              <span>Qo'llab-quvvatlash</span>
            </button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {user.firstName ? `Salom, ${user.firstName}!` : 'Dashboard'}
            </h1>
            <p className="text-gray-500 text-sm">Darslaringizni davom ettiring</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600">
              <FaBell size={20} />
              {/* ✅ Xavfsiz ko'rsatish */}
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <Link to="/dashboard/profile" className="flex items-center gap-3">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName || 'User'}&background=random`} 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-200"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;