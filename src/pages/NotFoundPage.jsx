import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaArrowLeft, 
  FaSearch, 
  FaCompass, 
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSignInAlt,
  FaLock,
  FaExclamationTriangle
} from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Agar yo'l kurs yoki darslarga o'xshasa, login modalini ko'rsatish
    const path = location.pathname.toLowerCase();
    if (path.includes('course') || path.includes('lesson') || 
        path.includes('dars') || path.includes('video') ||
        path.includes('dashboard')) {
      setShowLoginModal(true);
    }
  }, [location]);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/all-courses?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Bu yerda real login logikasi bo'ladi
    console.log('Login attempt:', loginForm);
    // Muvaffaqiyatli login bo'lsa, avvalgi sahifaga qaytish
    navigate('/dashboard/my-courses');
  };

  const publicLinks = [
    {
      title: "Boshlang'ich kurslar",
      icon: <FaBookOpen className="text-blue-500" />,
      links: [
        { name: "IELTS boshlang'ich", path: "/course/beginner-ielts" },
        { name: "Matematika asoslari", path: "/course/basic-math" },
        { name: "Python dasturlash", path: "/course/python-intro" }
      ]
    },
    {
      title: "Bepul resurslar",
      icon: <FaChalkboardTeacher className="text-emerald-500" />,
      links: [
        { name: "Video darslar", path: "/videos/free" },
        { name: "Testlar", path: "/tests/free" },
        { name: "Maqolalar", path: "/blog" }
      ]
    },
    {
      title: "Ma'lumot",
      icon: <FaUserGraduate className="text-purple-500" />,
      links: [
        { name: "Narxlar", path: "/#pricing" },
        { name: "O'qituvchilar", path: "/instructors" },
        { name: "Aloqa", path: "/contact" }
      ]
    }
  ];

  return (
    <>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
                <FaLock className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Kirish talab qilinadi</h3>
                <p className="text-gray-600">Darslarga kirish uchun tizimga kiring</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800">Diqqat!</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Kurslar va darslarga kirish uchun hisobingizga kiring yoki ro'yxatdan o'ting.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email yoki telefon</label>
                <input
                  type="text"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Parol</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaSignInAlt />
                  Kirish
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Bekor qilish
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-3">Hisobingiz yo'qmi?</p>
              <button
                onClick={() => navigate('/register')}
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        {/* Header */}
        <header className="py-4 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold">Hedu Academy</span>
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                Kirish
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Error Section */}
              <div className="mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center">
                    <FaCompass className="text-5xl text-blue-600" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-2 tracking-tight">
                    404
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                    Sahifa topilmadi
                  </div>
                  <p className="text-gray-600 max-w-lg mx-auto">
                    Siz qidirayotgan sahifa mavjud emas yoki kirish huquqingiz yo'q.
                    Darslarga kirish uchun tizimga kiring.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FaHome />
                    Bosh sahifa
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLoginModal(true)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FaSignInAlt />
                    Darslarga kirish
                  </motion.button>
                </div>
              </div>

              {/* Search Section */}
              <div className="mb-12">
                <p className="text-gray-600 mb-3 text-sm font-medium">
                  Kurs yoki dars qidirish
                </p>
                <div className="max-w-xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Masalan: IELTS, Matematika, Python..."
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(searchQuery);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </div>

              {/* Public Resources */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-4 h-0.5 bg-blue-500"></div>
                  <span className="text-gray-600 font-medium">Bepul resurslar</span>
                  <div className="w-4 h-0.5 bg-blue-500"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {publicLinks.map((section, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                          {section.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800">{section.title}</h3>
                      </div>
                      <div className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <button
                            key={linkIndex}
                            onClick={() => navigate(link.path)}
                            className="w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            {link.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Ta'limni Hedu bilan boshlang
                </h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  85,000+ talaba biz bilan muvaffaqiyatga erishdi. 
                  Endi sizning navbatingiz!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/register')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Bepul ro'yxatdan o'tish
                  </button>
                  <button
                    onClick={() => navigate('/#pricing')}
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Narxlar bilan tanishish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Hedu Academy. Barcha huquqlar himoyalangan.</p>
              <div className="mt-3 flex justify-center gap-6">
                <button onClick={() => navigate('/privacy')} className="hover:text-blue-600">
                  Maxfiylik
                </button>
                <button onClick={() => navigate('/terms')} className="hover:text-blue-600">
                  Foydalanish shartlari
                </button>
                <button onClick={() => navigate('/contact')} className="hover:text-blue-600">
                  Aloqa
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NotFoundPage;