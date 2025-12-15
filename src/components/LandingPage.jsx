import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// React Icons importlari
import {
  // Arrows
  FaArrowRight,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  
  // Basic
  FaPlus,
  FaMinus,
  FaTimes,
  FaBars,
  FaCheckCircle,
  FaCertificate,
  FaPlay,
  FaSearch,
  FaFilter,
  
  // Social
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
  
  // Education
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserGraduate,
  
  // UI Elements
  FaStar,
  FaAward,
  FaTrophy,
  
  // Communication
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHeadphonesAlt,
  FaCommentDots,
  
  // Users
  FaUser,
  FaUserFriends,
  FaUserCheck,
  
  // Settings
  FaCog,
  FaSignOutAlt,
  
  // Food & Drink
  FaCoffee,
  FaMugHot,
  
  // Text & Quotes
  FaQuoteLeft,
  FaQuoteRight,
  
  // Business
  FaChartLine,
  FaRocket,
  FaBriefcase,
  
  // Files
  FaFileAlt,
  FaFileDownload,
  
  // Tech
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaDesktop,
  
  // News
  FaNewspaper,
  
  // Science
  FaFlask,
  FaMicroscope,
  
  // Math
  FaCalculator,
  
  // Language
  FaLanguage
} from "react-icons/fa";

import { MdScience, MdComputer, MdBusinessCenter, MdSchool } from "react-icons/md";

import backImg from "../assets/HeroBack.jpg";

// CSS styles - yangi rang skhemasi
const styles = `
  /* Global Styles */
  .eduhub-theme {
    --color-primary: #2563EB;
    --color-primary-dark: #1D4ED8;
    --color-primary-light: #3B82F6;
    --color-secondary: #10B981;
    --color-secondary-dark: #059669;
    --color-secondary-light: #34D399;
    --color-accent: #8B5CF6;
    --color-accent-dark: #7C3AED;
    --color-accent-light: #A78BFA;
    --color-warning: #F59E0B;
    --color-warning-dark: #D97706;
    --color-warning-light: #FBBF24;
    --color-success: #10B981;
    --color-success-dark: #059669;
    --color-danger: #EF4444;
    --color-danger-dark: #DC2626;
    --color-dark: #1F2937;
    --color-gray-800: #374151;
    --color-gray-700: #4B5563;
    --color-gray-600: #6B7280;
    --color-gray-500: #9CA3AF;
    --color-gray-400: #D1D5DB;
    --color-gray-300: #E5E7EB;
    --color-gray-200: #F3F4F6;
    --color-gray-100: #F9FAFB;
    --color-white: #FFFFFF;
    --gradient-primary: linear-gradient(135deg, #2563EB 0%, #10B981 100%);
    --gradient-secondary: linear-gradient(135deg, #10B981 0%, #8B5CF6 100%);
    --gradient-accent: linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%);
    --gradient-warning: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-primary: 0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.15);
    --shadow-secondary: 0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.15);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-dark);
  }

  /* Selection Color */
  ::selection {
    background-color: var(--color-primary-light);
    color: var(--color-white);
  }

  /* Global Transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  /* Gradient Text */
  .gradient-text-primary {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-secondary {
    background: var(--gradient-secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Gradient Background */
  .gradient-bg-primary {
    background: var(--gradient-primary);
  }

  .gradient-bg-secondary {
    background: var(--gradient-secondary);
  }

  .gradient-bg-accent {
    background: var(--gradient-accent);
  }

  /* Button Styles */
  .btn-primary {
    background: var(--gradient-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    box-shadow: var(--shadow-primary);
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: var(--gradient-secondary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    box-shadow: var(--shadow-secondary);
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  /* Card Styles */
  .card-hover {
    transition: all 0.3s ease;
    border: 1px solid var(--color-gray-200);
  }

  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary-light);
  }

  /* Section Spacing */
  .section-padding {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  @media (min-width: 768px) {
    .section-padding {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  /* Animation Keyframes */
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }

  /* Swiper Custom Styles */
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--color-primary) !important;
    background: white;
    width: 50px !important;
    height: 50px !important;
    border-radius: 50%;
    box-shadow: var(--shadow-lg);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 20px !important;
    font-weight: bold;
  }

  .swiper-pagination-bullet {
    background: var(--color-gray-400) !important;
  }

  .swiper-pagination-bullet-active {
    background: var(--color-primary) !important;
  }
`;

// Global stylesni qo'shamiz
const StyleTag = () => <style>{styles}</style>;

// User Profile Indicator (navbar'da ko'rinadi)
const UserProfile = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative user-profile-dropdown">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="User profile"
      >
        <img
          src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
          alt={user.fullName || user.name}
          className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop";
          }}
        />
        <span className="hidden lg:inline text-gray-800 font-medium">
          {user.fullName || user.name}
        </span>
        <FaChevronDown className="text-gray-600 transition-transform duration-300" 
          style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} 
        />
      </button>
      
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
              <p className="font-semibold text-gray-900 truncate">{user.fullName || user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email || user.phone}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  Premium talaba
                </span>
              </div>
            </div>
            <div className="py-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/profile';
                }}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Profil</p>
                  <p className="text-xs text-gray-500">Shaxsiy ma'lumotlar</p>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/my-courses';
                }}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-emerald-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <FaGraduationCap className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium">Mening kurslarim</p>
                  <p className="text-xs text-gray-500">Davom etayotgan kurslar</p>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/certificates';
                }}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-purple-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <FaCertificate className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Sertifikatlar</p>
                  <p className="text-xs text-gray-500">Olgan sertifikatlar</p>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/settings';
                }}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <FaCog className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Sozlamalar</p>
                  <p className="text-xs text-gray-500">Hisob sozlamalari</p>
                </div>
              </button>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  <FaSignOutAlt className="text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Chiqish</p>
                  <p className="text-xs text-red-500">Hisobdan chiqish</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Navbar komponenti
const Navbar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Active section detection
      const sections = ['home', 'xizmatlar', 'darslar', 'narxlar', 'savollar', 'aloqa'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId.replace('#', ''));
    }
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Asosiy", section: "#home", id: "home", icon: <FaRocket className="mr-2" /> },
    { name: "Xizmatlar", section: "#xizmatlar", id: "xizmatlar", icon: <FaBookOpen className="mr-2" /> },
    { name: "Darslar", section: "#darslar", id: "darslar", icon: <FaChalkboardTeacher className="mr-2" /> },
    { name: "Narxlar", section: "#narxlar", id: "narxlar", icon: <FaChartLine className="mr-2" /> },
    { name: "Savollar", section: "#savollar", id: "savollar", icon: <FaCoffee className="mr-2" /> },
    { name: "Aloqa", section: "#aloqa", id: "aloqa", icon: <FaPhone className="mr-2" /> },
  ];

  return (
    <>
      <StyleTag />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`eduhub-theme fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-6 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-200/30 border-b border-gray-100"
            : "bg-gradient-to-r from-blue-500/5 via-white/90 to-emerald-500/5 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
                H<span className="text-blue-600">e</span>d<span className="text-emerald-600">u</span>
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Professional ta'lim platformasi</p>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isMobile && menuOpen ? 1 : isMobile ? 0 : 1,
              y: isMobile && menuOpen ? 0 : isMobile ? -20 : 0,
              height: isMobile && menuOpen ? "auto" : isMobile ? 0 : "auto",
              display: isMobile && !menuOpen ? "none" : "flex"
            }}
            transition={{ duration: 0.3 }}
            className={`${
              isMobile
                ? menuOpen
                  ? "flex flex-col absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-blue-300/30 border border-blue-100 mt-4"
                  : "hidden"
                : "flex gap-0.5 md:gap-2 items-center"
            }`}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={`relative py-2.5 px-4 md:px-5 font-medium group transition-all duration-300 flex items-center rounded-xl ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 rounded-full ${
                    activeSection === item.id ? "w-3/4" : "w-0 group-hover:w-3/4"
                  }`} />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex items-center gap-2 md:gap-4">
            {currentUser ? (
              <UserProfile user={currentUser} onLogout={onLogout} />
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 gradient-bg-primary text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium"
                >
                  <FaUser className="text-sm" />
                  Kirish
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-white text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium whitespace-nowrap"
                >
                  <FaUserFriends className="text-sm" />
                  Ro'yxatdan o'tish
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`text-2xl focus:outline-none lg:hidden ${
                    scrolled ? "text-blue-600" : "text-gray-700"
                  } hover:text-blue-500`}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

// HeroSection komponenti
const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div id="home" className="eduhub-theme relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-white/30 to-emerald-500/10" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left max-w-2xl"
          data-aos="fade-right"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4"
          >
            <FaRocket className="text-sm" />
            <span className="text-sm font-medium">O'zbekistonning #1 Onlayn Maktabi</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text-primary">
              Kelajakni <br />
            </span>
            <span className="text-gray-900">Hedu bilan Qur</span>
          </motion.h1>
         
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl"
          >
            7 yillik tajriba bilan biz 85,000+ talabaning hayotini o'zgartirdik.
            Endi sizning navbatingiz! Zamonaviy kurslar va tajribali o'qituvchilar bilan.
          </motion.p>
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="group px-6 sm:px-8 py-3.5 sm:py-4 gradient-bg-primary text-white text-base sm:text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaRocket className="text-lg" />
              Bepul darsni boshlash
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('xizmatlar')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-blue-600 border border-blue-600 text-base sm:text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaBookOpen className="text-lg" />
              Barcha kurslarni ko'rish
            </motion.button>
          </motion.div>
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center text-white">
                <FaGraduationCap className="text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">85K+</p>
                <p className="text-gray-600 text-sm">Talaba</p>
              </div>
            </div>
           
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 rounded-lg gradient-bg-secondary flex items-center justify-center text-white">
                <FaChalkboardTeacher className="text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">420+</p>
                <p className="text-gray-600 text-sm">O'qituvchi</p>
              </div>
            </div>
           
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-purple-200 transition-all">
              <div className="w-12 h-12 rounded-lg gradient-bg-accent flex items-center justify-center text-white">
                <FaAward className="text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-gray-600 text-sm">Muvaffaqiyat</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
       
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1 }}
          className="relative mt-12 lg:mt-0 w-full max-w-lg"
          data-aos="fade-left"
        >
          <div className="relative w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl blur-2xl opacity-20" />
            <img
              src={backImg}
              alt="Online Education"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop";
              }}
            />
           
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-2xl border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <FaStar className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Yilning eng yaxshi kursi</p>
                  <p className="text-sm text-gray-600">2024-yil tanlovi</p>
                </div>
              </div>
            </motion.div>
           
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 gradient-bg-primary p-4 rounded-xl shadow-2xl text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <p className="font-bold">24/7</p>
                  <p className="text-sm opacity-90">Qo'llab-quvvatlash</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="absolute bottom-8 right-8 bg-white p-3 rounded-full shadow-lg"
            >
              <div className="w-16 h-16 rounded-full gradient-bg-accent flex items-center justify-center animate-pulse-glow">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
     
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => document.getElementById('xizmatlar')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-gray-600 hover:text-blue-600 transition-colors p-2"
          aria-label="Scroll to features"
        >
          <div className="w-10 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <FaChevronDown className="text-xl animate-bounce" />
          </div>
        </button>
      </motion.div>
    </div>
  );
};

// Ta'lim yo'nalishlari komponenti
const StudyPaths = () => {
  const navigate = useNavigate();
  
  const studyPaths = [
    {
      title: "Maktab o'quvchilari",
      icon: <MdSchool className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      courses: ["6-11 sinf matematika", "Fizika", "Kimyo", "Biologiya", "Ingliz tili"],
      description: "Umumiy o'rta ta'lim fanlari",
      students: "25,000+",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Abituriyentlar",
      icon: <FaUserGraduate className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      courses: ["DTM test tayyorlov", "Matematika", "Ona tili", "Tarix", "Biologiya"],
      description: "Oliy ta'lim muassasalariga kirish",
      students: "15,000+",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Kasb-hunar ta'limi",
      icon: <MdComputer className="text-2xl" />,
      color: "from-emerald-500 to-green-500",
      courses: ["Dasturlash", "Dizayn", "Marketing", "Muhandislik", "Til kurslari"],
      description: "Zamonaviy kasblarni o'rganish",
      students: "32,000+",
      gradient: "bg-gradient-to-r from-emerald-500 to-green-500"
    },
    {
      title: "Xalqaro imtihonlar",
      icon: <FaCertificate className="text-2xl" />,
      color: "from-orange-500 to-red-500",
      courses: ["IELTS", "TOEFL", "SAT", "GMAT", "Professionals"],
      description: "Chet tillari va xalqaro sertifikatlar",
      students: "13,000+",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 mb-4">
            <FaBookOpen className="text-sm" />
            <span className="text-sm font-medium">Ta'lim yo'nalishlari</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-primary">
              Har Bir Talaba Uchun
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Yoshidan qat'iy nazar, har kim uchun mos ta'lim yo'li
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {studyPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full card-hover">
                <div className="flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${path.gradient} flex items-center justify-center mb-6`}>
                    <div className="text-white text-2xl">
                      {path.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {path.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {path.description}
                  </p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Kurslar:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {path.courses.slice(0, 3).map((course, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                        >
                          {course}
                        </span>
                      ))}
                      {path.courses.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                          +{path.courses.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Talabalar:</p>
                        <p className="font-semibold text-gray-900">{path.students}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/courses/category/${path.title.toLowerCase()}`)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                      >
                        Ko'rish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/all-courses')}
            className="px-8 py-3.5 gradient-bg-primary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 mx-auto"
          >
            <FaBookOpen />
            Barcha kurslarni ko'rish
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// O'qituvchilar komponenti
const Instructors = () => {
  const navigate = useNavigate();
  
  const instructors = [
    {
      name: "Dilshod Alimov",
      subject: "Matematika",
      experience: "15 yil",
      students: "5,200+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
      specialization: ["Oliy matematika", "Geometriya", "DTM tayyorlov"],
      degree: "Falsafa doktori (PhD)",
      color: "blue"
    },
    {
      name: "Malika Karimova",
      subject: "Ingliz tili",
      experience: "12 yil",
      students: "3,800+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      specialization: ["IELTS", "Speaking", "Business English"],
      degree: "Magistr darajasi",
      color: "emerald"
    },
    {
      name: "Bekzod To'rayev",
      subject: "Dasturlash",
      experience: "8 yil",
      students: "2,900+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      specialization: ["Python", "JavaScript", "Web Development"],
      degree: "Senior Full Stack Developer",
      color: "purple"
    },
    {
      name: "Zarina Qodirova",
      subject: "Biologiya",
      experience: "10 yil",
      students: "2,100+",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      specialization: ["Genetika", "Anatomiya", "Tibbiyotga tayyorlov"],
      degree: "Tibbiyot fanlari nomzodi",
      color: "pink"
    },
    {
      name: "Sherzod Xudoyberdiyev",
      subject: "Fizika",
      experience: "14 yil",
      students: "3,500+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      specialization: ["Mexanika", "Elektrodinamika", "Kvant fizikasi"],
      degree: "Fizika-matematika fanlari doktori",
      color: "orange"
    },
    {
      name: "Gulnora Usmonova",
      subject: "Kimyo",
      experience: "9 yil",
      students: "1,800+",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
      specialization: ["Organik kimyo", "Analitik kimyo", "Kimyo testlari"],
      degree: "Kimyo fanlari magistri",
      color: "red"
    }
  ];

  return (
    <section className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaChalkboardTeacher className="text-sm" />
            <span className="text-sm font-medium">O'qituvchilar</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-secondary">
              Bizning Mutaxassislar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Yuqori malakali o'qituvchilar va sanoat mutaxassislari
          </p>
        </motion.div>
        
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          className="!pb-16"
        >
          {instructors.map((teacher, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 h-full card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-20" />
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`;
                      }}
                    />
                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-${teacher.color}-500 to-${teacher.color}-600 flex items-center justify-center text-white border-2 border-white`}>
                      <FaGraduationCap />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold">{teacher.subject}</p>
                    <p className="text-gray-500 text-sm mt-1">{teacher.degree}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Tajriba:</span>
                    <span className="font-semibold text-gray-900">{teacher.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Talabalar:</span>
                    <span className="font-semibold text-gray-900">{teacher.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Reyting:</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-amber-400" />
                      <span className="font-semibold text-gray-900">{teacher.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Mutaxassislik:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.specialization.map((spec, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/instructor/${teacher.name.toLowerCase().replace(' ', '-')}`)}
                  className="w-full mt-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  Profilni ko'rish
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/instructors')}
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium flex items-center gap-2 mx-auto"
          >
            <FaChalkboardTeacher />
            Barcha o'qituvchilarni ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

// Features komponenti
const Features = () => {
  const features = [
    {
      title: "Shaxsiy O'qituvchi",
      text: "Har bir talaba uchun individual yondashuv va yordamchi o'qituvchi",
      icon: <FaChalkboardTeacher />,
      gradient: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      title: "Zamonaviy Test Markazi",
      text: "Haqiqiy IELTS, SAT va boshqa imtihonlarni simulyatsiya qilish",
      icon: <FaCheckCircle />,
      gradient: "from-emerald-500 to-emerald-600",
      delay: 100
    },
    {
      title: "Tajribali Mentorlar",
      text: "Sanoat mutaxassislari va yuqori natijali o'qituvchilar",
      icon: <FaGraduationCap />,
      gradient: "from-purple-500 to-purple-600",
      delay: 200
    },
    {
      title: "Bepul Master-klasslar",
      text: "Muntazam seminarlar, vebinarlar va ijodiy darslar",
      icon: <FaCalendarAlt />,
      gradient: "from-orange-500 to-orange-600",
      delay: 300
    },
    {
      title: "Hamkorlik Zonalari",
      text: "Zamonaviy o'quv maydonlari va networking imkoniyatlari",
      icon: <FaCoffee />,
      gradient: "from-amber-500 to-amber-600",
      delay: 400
    },
    {
      title: "Individual Dastur",
      text: "Shaxsiy ehtiyojlarga moslashtirilgan o'quv reja",
      icon: <FaStar />,
      gradient: "from-pink-500 to-pink-600",
      delay: 500
    }
  ];

  return (
    <section id="xizmatlar" className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaBookOpen className="text-sm" />
            <span className="text-sm font-medium">Nega bizni tanlashadi?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-primary">
              Ajoyib Xizmatlar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Innovatsion yondashuv va ishonchli natijalar bilan ta'lim sari birga qadam tashlaymiz
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
              data-aos="fade-up"
              data-aos-delay={feature.delay}
            >
              <div className="relative h-full bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
               
                <div className="relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                    <div className="text-xl md:text-2xl text-white">
                      {feature.icon}
                    </div>
                  </div>
                 
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                 
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.text}
                  </p>
                 
                  <button className="flex items-center text-blue-600 font-semibold group-hover:text-emerald-600 transition-colors">
                    Batafsil
                    <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// O'quv jarayoni komponenti
const LearningProcess = () => {
  const steps = [
    {
      step: "01",
      title: "Ro'yxatdan o'tish",
      description: "Bepul hisob oching va sinov darsiga qatnashing",
      icon: <FaUser />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Test sinovlari",
      description: "Bilim darajangizni aniqlang va shaxsiy dastur tuzing",
      icon: <FaFileAlt />,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "03",
      title: "O'qish",
      description: "Video darslar, jonli sessiyalar va mashqlar orqali o'rganing",
      icon: <FaBookOpen />,
      color: "from-emerald-500 to-green-500"
    },
    {
      step: "04",
      title: "Amaliyot",
      description: "Real loyihalar va testlar bilan bilimingizni mustahkamlang",
      icon: <FaCheckCircle />,
      color: "from-orange-500 to-red-500"
    },
    {
      step: "05",
      title: "Nazorat",
      description: "Muntazam progress monitoring va o'qituvchi bilan konsultatsiyalar",
      icon: <FaChartLine />,
      color: "from-indigo-500 to-blue-500"
    },
    {
      step: "06",
      title: "Sertifikat",
      description: "Muvaffaqiyatli tamomlaganingizda xalqaro sertifikat oling",
      icon: <FaCertificate />,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
   <section className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/30">
  <div className="container mx-auto max-w-screen-xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
      data-aos="fade-up"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
        <FaRocket className="text-sm" />
        <span className="text-sm font-medium">Ta'lim Jarayoni</span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        <span className="gradient-text-primary">
          Biz Bilan O'rganish Qanday?
        </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        6 qadamda samarali va qulay ta'lim oling
      </p>
    </motion.div>
    
    <div className="relative">
      {/* Orqa fondagi gradient chiziq (faqat desktop'da) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-emerald-200 to-purple-200 transform -translate-y-1/2 z-0 rounded-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Yo'nalish o'qchasi (faqat desktop'da) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 right-0 w-10 h-10 transform translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-full h-full">
                  <div className="    " />
                
                    
                </div>
              </div>
            )}
            
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 card-hover group">
              {/* Yuqoridagi raqam belgisi */}
              <div className="absolute -top-4 left-6 md:left-8">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.step}
                </div>
              </div>
              
              <div className="pt-10 md:pt-12">
                {/* Icon qismi */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                  <div className="text-white text-2xl md:text-3xl">
                    {step.icon}
                  </div>
                </div>
                
                {/* Sarlavha */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                
                {/* Tavsif */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Pastki ko'rsatkich */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                    <span className="text-sm text-gray-500">Qadam {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-gray-400 text-sm" />
                    <span className="text-sm text-gray-500">
                      {index === 0 && "5 daqiqa"}
                      {index === 1 && "30 daqiqa"}
                      {index === 2 && "Istalgan vaqt"}
                      {index === 3 && "Amaliyot"}
                      {index === 4 && "Muntazam"}
                      {index === 5 && "Final"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Pastki gradient effekti */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 md:mt-16 text-center"
      data-aos="fade-up"
    >
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl px-6 py-4 border border-blue-100">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
          <FaPlay className="text-white text-lg" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-gray-900">Video ko'rib ko'ring</p>
          <p className="text-sm text-gray-600">Ta'lim jarayonini 2 daqiqada ko'ring</p>
        </div>
        <button className="ml-4 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Ko'rish
        </button>
      </div>
    </motion.div>
  </div>
</section>
  );
};

// Testimonials komponenti
const Testimonials = () => {
  const testimonials = [
    {
      name: "Azizbek Islomov",
      role: "IELTS 8.5",
      feedback: "6 oy ichida 5.5 dan 8.5 ga ko'tardim. O'qituvchilar juda sifatli!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-blue-500 to-blue-600",
      result: "Harvard universitetiga qabul"
    },
    {
      name: "Malika Nurmatova",
      role: "SAT 1550",
      feedback: "Amerika universitetiga kirishimga yordam berdi. Rahmat!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-emerald-500 to-emerald-600",
      result: "Stanford universiteti talabasi"
    },
    {
      name: "Dilmurod Karimov",
      role: "Full Stack Developer",
      feedback: "Dasturlash kursi mening karyeramni butunlay o'zgartirdi.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-purple-500 to-purple-600",
      result: "Google kompaniyasida ish"
    },
    {
      name: "Shahnoza Qodirova",
      role: "General English B2",
      feedback: "Ingliz tilini 0 dan o'rgana boshlagandim. Endi chet elliklar bilan bemalol gaplasha olaman.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-pink-500 to-pink-600",
      result: "Xalqaro kompaniyada ish"
    },
    {
      name: "Behruz Akramov",
      role: "Frontend Developer",
      feedback: "React darslari juda sodda va tushunarli. 3 oyda ish topdim!",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-orange-500 to-orange-600",
      result: "Startap kompaniyasi asoschisi"
    },
    {
      name: "Ozoda Muhammadova",
      role: "IELTS 7.5",
      feedback: "Writing bo'yicha kuchli ko'rsatmalar bo'ldi. O'qituvchilar e'tiborli.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      gradient: "from-cyan-500 to-cyan-600",
      result: "Buyuk Britaniyada magistratura"
    }
  ];

  return (
    <section className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 mb-4">
            <FaQuoteLeft className="text-sm" />
            <span className="text-sm font-medium">Talabalar fikrlari</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-secondary">
              Biz Haqimizda Fikrlar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            85,000+ talaba bilan birga ishlash tajribamiz
          </p>
        </motion.div>
        
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          navigation={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ 
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          className="!pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="!w-full md:!w-96">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl h-full mx-4 border border-gray-100 card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-20`} />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`;
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
               
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 fill-current" />
                  ))}
                </div>
               
                <div className="relative mb-4">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-200 text-3xl" />
                  <p className="text-gray-600 leading-relaxed pl-6">
                    "{testimonial.feedback}"
                  </p>
                  <FaQuoteRight className="absolute -bottom-2 -right-2 text-blue-200 text-3xl" />
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FaAward className="text-emerald-500" />
                    <span className="text-sm text-gray-700 font-medium">{testimonial.result}</span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Gallery komponenti
const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  
  const categories = [
    "Barchasi", "Matematika", "Fizika", "Kimyo", "Biologiya", 
    "Dasturlash", "Ingliz tili", "IELTS", "DTM tayyorlov"
  ];
  
  const lessons = [
    {
      id: 1,
      title: "IELTS Complete Course",
      category: "IELTS",
      students: 2450,
      rating: 4.9,
      price: "490 000",
      duration: "12 hafta",
      instructor: "Malika Karimova",
      level: "Barcha darajalar",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Matematika 6-11 sinf",
      category: "Matematika",
      students: 3850,
      rating: 4.8,
      price: "290 000",
      duration: "9 oy",
      instructor: "Dilshod Alimov",
      level: "Maktab",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Python dasturlash",
      category: "Dasturlash",
      students: 3200,
      rating: 4.9,
      price: "590 000",
      duration: "16 hafta",
      instructor: "Bekzod To'rayev",
      level: "Boshlang'ich",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "DTM test tayyorlov",
      category: "DTM tayyorlov",
      students: 4100,
      rating: 4.7,
      price: "390 000",
      duration: "6 oy",
      instructor: "Sherzod Xudoyberdiyev",
      level: "Abituriyent",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Biznes Ingliz tili",
      category: "Ingliz tili",
      students: 1850,
      rating: 4.8,
      price: "450 000",
      duration: "10 hafta",
      instructor: "Malika Karimova",
      level: "Intermediate+",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Full Stack Development",
      category: "Dasturlash",
      students: 2750,
      rating: 4.9,
      price: "690 000",
      duration: "24 hafta",
      instructor: "Bekzod To'rayev",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
    },
    {
      id: 7,
      title: "Kimyo 7-11 sinf",
      category: "Kimyo",
      students: 2150,
      rating: 4.7,
      price: "310 000",
      duration: "8 oy",
      instructor: "Gulnora Usmonova",
      level: "Maktab",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      title: "Biologiya va Anatomiya",
      category: "Biologiya",
      students: 1950,
      rating: 4.6,
      price: "330 000",
      duration: "9 oy",
      instructor: "Zarina Qodirova",
      level: "DTM tayyorlov",
      image: "https://images.unsplash.com/photo-1530026405186-1d7d6a343b0c?w=800&h=600&fit=crop"
    },
    {
      id: 9,
      title: "Fizika 7-11 sinf",
      category: "Fizika",
      students: 2650,
      rating: 4.8,
      price: "320 000",
      duration: "8 oy",
      instructor: "Sherzod Xudoyberdiyev",
      level: "Maktab",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=600&fit=crop"
    }
  ];
  
  const filteredLessons = selectedCategory === "Barchasi"
    ? lessons.slice(0, 6)
    : lessons.filter((lesson) => lesson.category === selectedCategory).slice(0, 6);

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section id="darslar" className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaChalkboardTeacher className="text-sm" />
            <span className="text-sm font-medium">O'quv kurslari</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-primary">
              Mashhur Kurslar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            30+ turli fanlar bo'yicha professional kurslar
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-wrap gap-2 md:gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all ${
                selectedCategory === category
                  ? "gradient-bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full card-hover">
                <div className="relative h-56 md:h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-${150 + index}?w=800&h=600&fit=crop`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                 
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                      <FaStar className="text-amber-500" />
                      <span className="font-bold">{lesson.rating}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {lesson.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {lesson.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 bg-white">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                    <div className="flex items-center gap-3 text-gray-600 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <FaChalkboardTeacher className="text-blue-500" />
                        <span>{lesson.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaGraduationCap className="text-emerald-500" />
                        <span>{lesson.students.toLocaleString()} talaba</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <FaClock className="text-purple-500" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{lesson.price} so'm</p>
                      <p className="text-sm text-gray-500">oyiga</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewCourse(lesson.id)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                      >
                        <FaBookOpen className="text-sm" />
                        Ko'rish
                      </button>
                      <button
                        onClick={() => navigate(`/dashboard/checkout/${lesson.id}`)}
                        className="px-4 py-2 gradient-bg-primary text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm leading-normal whitespace-nowrap"
                      >
                        Sotib olish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/all-courses')}
            className="px-8 py-3.5 gradient-bg-primary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 mx-auto"
          >
            <FaBookOpen />
            Barcha kurslarni ko'rish
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Pricing komponenti
const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  
  const pricingPlans = [
    {
      plan: "Boshlang'ich",
      monthlyPrice: "290 000 so'm",
      yearlyPrice: "2 900 000 so'm",
      period: "oyiga",
      features: [
        "Barcha kurslarga kirish",
        "Bepul tadbirlar",
        "24/7 chat yordam",
        "Davomatni kuzatish",
        "Haftalik hisobotlar",
        "Asosiy sertifikatlar"
      ],
      buttonColor: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
      popular: false,
      icon: <FaBookOpen />,
      color: "gray",
      discount: ""
    },
    {
      plan: "Premium",
      monthlyPrice: "490 000 so'm",
      yearlyPrice: "4 900 000 so'm",
      period: "oyiga",
      features: [
        "Boshlang'ich xususiyatlari",
        "Shaxsiy o'qituvchi",
        "Individual dastur",
        "VIP qo'llab-quvvatlash",
        "Barcha sertifikatlar",
        "Mentorlik darslari",
        "Karyera maslahatlari"
      ],
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      popular: true,
      icon: <FaStar />,
      color: "blue",
      discount: "Eng ko'p tanlangan"
    },
    {
      plan: "Pro",
      monthlyPrice: "790 000 so'm",
      yearlyPrice: "7 900 000 so'm",
      period: "oyiga",
      features: [
        "Premium xususiyatlari",
        "Cheksiz konsultatsiyalar",
        "Karyera maslahatlari",
        "Korxona hamkorligi",
        "Xalqaro sertifikat",
        "Shaxsiy murabbiy",
        "Ish joylashuv yordami",
        "Ekskluziv tadbirlar"
      ],
      buttonColor: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      popular: false,
      icon: <FaRocket />,
      color: "purple",
      discount: "2 oy bepul"
    },
  ];

  const handleSelectPlan = (planName) => {
    navigate('/dashboard/checkout', { state: { plan: planName, isYearly } });
  };

  return (
    <section id="narxlar" className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaChartLine className="text-sm" />
            <span className="text-sm font-medium">Narxlar</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-secondary">
              To'g'ri Tarifni Tanlang
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Har bir talaba uchun moslashtirilgan tarif rejalari
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="bg-white p-1.5 rounded-xl inline-flex items-center shadow-lg border border-gray-200">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                !isYearly
                  ? "gradient-bg-primary text-white shadow"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Oylik
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isYearly
                  ? "gradient-bg-primary text-white shadow"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Yillik
            </button>
          </div>
          {isYearly && (
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              💰 Yillik to'lovda 2 oy bepul!
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.plan}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`relative ${
                plan.popular
                  ? "transform scale-105 md:scale-110 z-10"
                  : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    {plan.discount}
                  </span>
                </div>
              )}
              
              <div className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden border-2 ${
                plan.popular
                  ? "border-blue-500"
                  : "border-gray-200"
              } card-hover`}>
                <div className={`p-6 md:p-8 ${
                  plan.popular ? "pt-12" : ""
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${plan.color}-100 to-${plan.color}-200 flex items-center justify-center`}>
                      <div className={`text-${plan.color}-600 text-xl`}>
                        {plan.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.plan}</h3>
                      <p className="text-gray-600">Eng maqbul variant</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </div>
                    <p className="text-gray-600">
                      {plan.period} {isYearly && "(yillik to'lov)"}
                    </p>
                    {plan.discount && !plan.popular && (
                      <p className="text-emerald-600 text-sm font-medium mt-2">
                        {plan.discount}
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full bg-${plan.color}-100 flex items-center justify-center mr-3 flex-shrink-0`}>
                          <FaCheckCircle className={`text-${plan.color}-600 text-sm`} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPlan(plan.plan)}
                    className={`w-full py-3.5 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${plan.buttonColor}`}
                  >
                    {plan.popular ? "Boshlash" : "Tanlash"}
                  </motion.button>
                </div>
                
                {plan.popular && (
                  <div className="gradient-bg-primary text-white p-4 text-center">
                    <p className="font-medium">🔥 500+ talaba tanlovi</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Barcha tarif rejalari 14 kunlik bepul sinov muddatini o'z ichiga oladi
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            Batafsil ma'lumot
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

// FAQ komponenti
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqItems = [
    {
      question: "Onlayn darslar qanday o'tkaziladi?",
      answer: "Bizning platformamizda interaktiv video darslar, jonli sessiyalar, mashqlar va testlar mavjud. Har bir darsda o'qituvchi bilan bevosita aloqa qilish imkoniyati bor. Darslar video formatda, ularni istalgan vaqtda ko'rishingiz mumkin.",
      icon: <FaChalkboardTeacher />
    },
    {
      question: "Qanday to'lov usullari mavjud?",
      answer: "Bank kartalari (Visa, Mastercard, Humo, Uzcard), PayPal, Click, Payme, Uzum bank va boshqa mahalliy to'lov tizimlari orqali to'lov qilishingiz mumkin. Hammasi xavfsiz va shifrlangan.",
      icon: <FaCheckCircle />
    },
    {
      question: "Kursni qancha vaqtda tamomlashim mumkin?",
      answer: "Kurslar o'zingizning tezligingizga qarab o'rganish imkonini beradi. O'rtacha 3-6 oy ichida kursni tamomlash mumkin. Har bir kursda belgilangan muddat bor, lekin siz uni o'z vaxtingizda o'tishingiz mumkin.",
      icon: <FaClock />
    },
    {
      question: "Sertifikat berasizmi?",
      answer: "Ha, har bir muvaffaqiyatli tamomlagan kurs uchun biz rasmiy sertifikat beramiz, xalqaro tan olingan. Sertifikatlarni raqamli va bosma formatda olishingiz mumkin.",
      icon: <FaCertificate />
    },
    {
      question: "Qancha vaqt ichida natijani ko'raman?",
      answer: "O'rtacha 1-2 oy ichida sezilarli natijalarni ko'rishingiz mumkin. Bu sizning qanchalik faol ishlashingizga bog'liq. Har bir talaba uchun individual progress monitoring tizimi mavjud.",
      icon: <FaChartLine />
    },
    {
      question: "Qayta o'rganish imkoniyati bormi?",
      answer: "Ha, barcha video darslar va materiallar kurs davomida va undan keyin ham sizning hisobingizda qoladi. Siz istalgan vaqtda materiallarni qayta ko'rishingiz mumkin.",
      icon: <FaBookOpen />
    },
    {
      question: "Mobil ilova mavjudmi?",
      answer: "Ha, bizning platformamizning iOS va Android uchun mobil ilovasi mavjud. Ilovani AppStore va Google Play'dan yuklab olishingiz mumkin.",
      icon: <FaMobileAlt />
    },
    {
      question: "Texnik qo'llab-quvvatlash qanday?",
      answer: "Biz 24/7 texnik qo'llab-quvvatlash xizmatiga egamiz. Telegram, telefon va elektron pochta orqali istalgan vaqtda yordam so'rashingiz mumkin.",
      icon: <FaHeadphonesAlt />
    }
  ];

  return (
    <section id="savollar" className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaCoffee className="text-sm" />
            <span className="text-sm font-medium">Ko'p beriladigan savollar</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-primary">
              Savollaringizga Javoblar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Sizning barcha savollaringizga javob beramiz
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 md:p-6 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors group"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                >
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </motion.div>
              </button>
             
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 pt-0">
                      <div className="pl-14">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Savolingizga javob topolmadingizmi?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('aloqa')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 gradient-bg-primary text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <FaPhone />
            Biz bilan bog'laning
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Statistikalar komponenti
const Statistics = () => {
  const stats = [
    {
      value: "85,000+",
      label: "Muvaffaqiyatli Talabalar",
      icon: <FaUserGraduate />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      value: "420+",
      label: "Professional O'qituvchilar",
      icon: <FaChalkboardTeacher />,
      color: "from-emerald-500 to-green-500"
    },
    {
      value: "150+",
      label: "Kurslar va Darslar",
      icon: <FaBookOpen />,
      color: "from-purple-500 to-pink-500"
    },
    {
      value: "98%",
      label: "Muvaffaqiyat Darajasi",
      icon: <FaTrophy />,
      color: "from-amber-500 to-orange-500"
    },
    {
      value: "24/7",
      label: "Qo'llab-quvvatlash",
      icon: <FaHeadphonesAlt />,
      color: "from-red-500 to-pink-500"
    },
    {
      value: "10,000+",
      label: "Berilgan Sertifikatlar",
      icon: <FaCertificate />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-700">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
            <FaChartLine className="text-sm" />
            <span className="text-sm font-medium">Bizning Natijalarimiz</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Raqamlar Gapirsin
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            7 yil ichida erishgan yutuqlarimiz
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center hover:bg-white/15 transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3 md:mb-4`}>
                <div className="text-white text-xl md:text-2xl">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg">
              🚀 2024-yil uchun 5000+ yangi talaba
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact komponenti
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitStatus({
        type: 'success',
        message: "Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz."
      });
      
      // Reset form
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
      });
      
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: "Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Telefon",
      details: "+998 90 123 45 67",
      description: "Ish vaqtida qo'ng'iroq qiling",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: "info@hedu.uz",
      description: "24 soat ichida javob beramiz",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: FaTelegram,
      title: "Telegram",
      details: "@hedu_support",
      description: "Tezkor yordam",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Manzil",
      details: "Toshkent sh., Yunusobod",
      description: "Ofisga tashrif buyuring",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="aloqa" className="eduhub-theme section-padding px-4 md:px-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 mb-4">
            <FaPhone className="text-sm" />
            <span className="text-sm font-medium">Bog'lanish</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-secondary">
              Bog'laning
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Savollaringiz bormi? Biz bilan bog'laning
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Xabar yuboring</h3>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Ismingiz *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50/50"
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50/50"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Telefon raqam</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50/50"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Mavzu</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50/50"
                >
                  <option value="">Mavzuni tanlang</option>
                  <option value="course">Kurs haqida</option>
                  <option value="payment">To'lov haqida</option>
                  <option value="technical">Texnik yordam</option>
                  <option value="partnership">Hamkorlik</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Xabar *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50/50 resize-none"
                  placeholder="Xabaringizni yozing..."
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 gradient-bg-primary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yuborilmoqda...
                  </span>
                ) : 'Xabar yuborish'}
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
            data-aos="fade-left"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Biz bilan bog'laning</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center mb-3`}>
                      <info.icon className="text-white text-xl" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-900 font-medium">{info.details}</p>
                    <p className="text-gray-600 text-sm mt-1">{info.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ijtimoiy tarmoqlar</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: FaInstagram, color: "from-pink-500 to-rose-600", label: "Instagram", url: "https://instagram.com/hedu" },
                  { icon: FaFacebook, color: "from-blue-600 to-blue-700", label: "Facebook", url: "https://facebook.com/hedu" },
                  { icon: FaTwitter, color: "from-sky-500 to-blue-500", label: "Twitter", url: "https://twitter.com/hedu" },
                  { icon: FaLinkedin, color: "from-blue-700 to-blue-800", label: "LinkedIn", url: "https://linkedin.com/company/hedu" },
                  { icon: FaTelegram, color: "from-cyan-500 to-blue-500", label: "Telegram", url: "https://t.me/hedu" },
                  { icon: FaYoutube, color: "from-red-500 to-red-600", label: "YouTube", url: "https://youtube.com/hedu" },
                  { icon: FaTiktok, color: "from-gray-900 to-gray-700", label: "TikTok", url: "https://tiktok.com/@hedu" },
                  { icon: FaWhatsapp, color: "from-green-500 to-green-600", label: "WhatsApp", url: "https://wa.me/998901234567" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-24 rounded-xl bg-gradient-to-r ${social.color} flex flex-col items-center justify-center text-white hover:shadow-lg transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-2xl mb-2" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ish vaqti</h3>
              <div className="space-y-3">
                {[
                  { day: "Dushanba - Juma", time: "9:00 - 18:00" },
                  { day: "Shanba", time: "10:00 - 16:00" },
                  { day: "Yakshanba", time: "Dam olish kuni" }
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-gray-700">{schedule.day}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer komponenti
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  const quickLinks = [
    { name: "Bosh sahifa", href: "/", icon: <FaRocket /> },
    { name: "Kurslar", href: "/dashboard/all-courses", icon: <FaBookOpen /> },
    { name: "Narxlar", href: "#narxlar", icon: <FaChartLine /> },
    { name: "Blog", href: "/blog", icon: <FaNewspaper /> },
    { name: "Aloqa", href: "#aloqa", icon: <FaPhone /> },
  ];
  
  const courses = [
    { name: "IELTS", href: "/videos/ielts" },
    { name: "Matematika", href: "/videos/matematika" },
    { name: "Dasturlash", href: "/videos/dasturlash" },
    { name: "Biznes", href: "/videos/biznes" },
    { name: "Dizayn", href: "/videos/dizayn" },
  ];
  
  const legal = [
    { name: "Maxfiylik siyosati", href: "/privacy" },
    { name: "Foydalanish shartlari", href: "/terms" },
    { name: "Kafolat", href: "/guarantee" },
    { name: "Qaytarish siyosati", href: "/refund" },
  ];

  const socialLinks = [
    { icon: FaInstagram, url: "https://instagram.com/hedu" },
    { icon: FaFacebook, url: "https://facebook.com/hedu" },
    { icon: FaTwitter, url: "https://twitter.com/hedu" },
    { icon: FaLinkedin, url: "https://linkedin.com/company/hedu" },
    { icon: FaTelegram, url: "https://t.me/hedu" },
    { icon: FaYoutube, url: "https://youtube.com/hedu" }
  ];

  return (
    <footer className="eduhub-theme bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    H<span className="text-blue-400">e</span>d<span className="text-emerald-400">u</span>
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Professional ta'lim platformasi</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Innovatsion ta'lim platformasi - kelajakni bugundan quring. 
              7 yillik tajriba, 85,000+ muvaffaqiyatli talaba.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors hover:scale-110"
                  aria-label={`Social media ${index}`}
                >
                  <social.icon className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Tez havolalar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.href.startsWith('/')) {
                        navigate(link.href);
                      } else {
                        document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 hover:translate-x-1"
                  >
                    {link.icon && <span className="text-blue-400">{link.icon}</span>}
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kurslar</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <button
                    onClick={() => navigate(course.href)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1"
                  >
                    {course.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Huquqiy</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.href)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} Hedu. Barcha huquqlar himoyalangan.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Toshkent sh., Yunusobod tumani
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/privacy')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Maxfiylik
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Shartlar
              </button>
              <button
                onClick={() => navigate('/help')}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Yordam
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Asosiy HomePage komponenti
const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Initialize AOS with better settings
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Load user from localStorage
    try {
      const savedUser = localStorage.getItem('hedu_current_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        console.log('Loaded user from localStorage:', parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('hedu_current_user');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      AOS.refresh();
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('hedu_current_user');
    localStorage.removeItem('hedu_token');
    setCurrentUser(null);
    
    // Show notification
    alert("Siz tizimdan chiqdingiz!");
    
    // Reload page after logout
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };
  
  return (
    <div className="eduhub-theme relative min-h-screen">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <HeroSection />
      <StudyPaths />
      <Features />
      <Instructors />
      <LearningProcess />
      <Testimonials />
      <Gallery />
      <Pricing />
      <FAQ />
      <Statistics />
      <Contact />
      <Footer />
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-8 w-14 h-14 gradient-bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all z-40 hover:scale-110"
            aria-label="Scroll to top"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/998901234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all z-40 hover:scale-110"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>
    </div>
  );
};

export default HomePage;