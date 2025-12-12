import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// React Icons importlari - duplicate larni olib tashladim
import {
  // Arrows
  FaArrowRight,
  FaChevronUp,
  FaChevronDown,
  
  // Basic
  FaPlus,
  FaMinus,
  FaTimes,
  FaBars,
  FaCheckCircle,
  
  // Social
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  
  // Education
  FaGraduationCap,
  FaChalkboardTeacher,
  
  // UI Elements
  FaStar,
  
  // Communication
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  
  // Users
  FaUser,
  
  // Settings
  FaCog,
  FaSignOutAlt,
  
  // Food & Drink
  FaCoffee,
  
  // Text & Quotes
  FaQuoteLeft
} from "react-icons/fa";

import backImg from "../assets/HeroBack.jpg";

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
        <span className="hidden lg:inline text-gray-700 font-medium">
          {user.fullName || user.name}
        </span>
        <FaChevronDown className="text-gray-500 transition-transform duration-300" 
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
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800 truncate">{user.fullName || user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email || user.phone}</p>
            </div>
            <div className="py-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/profile';
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaUser className="text-blue-500" />
                Profil
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/my-courses';
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaGraduationCap className="text-green-500" />
                Mening kurslarim
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  window.location.href = '/dashboard/settings';
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaCog className="text-purple-500" />
                Sozlamalar
              </button>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt className="text-red-500" />
                Chiqish
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
    { name: "Bosh Sahifa", section: "#home", id: "home" },
    { name: "Xizmatlar", section: "#xizmatlar", id: "xizmatlar" },
    { name: "Darslar", section: "#darslar", id: "darslar" },
    { name: "Narxlar", section: "#narxlar", id: "narxlar" },
    { name: "Savollar", section: "#savollar", id: "savollar" },
    { name: "Aloqa", section: "#aloqa", id: "aloqa" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-2xl shadow-blue-200/30"
          : "bg-gradient-to-r from-blue-500/10 via-white/80 to-purple-500/10 backdrop-blur-sm"
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
          className="cursor-pointer"
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edu<span className="text-blue-600">Hub</span>
          </h1>
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
              : "flex gap-4 md:gap-8 items-center"
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
                className={`relative py-2 px-3 md:px-4 font-medium group transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                  activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-3 md:gap-4">
          {currentUser ? (
            <UserProfile user={currentUser} onLogout={onLogout} />
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="hidden lg:block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium"
              >
                Kirish
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="hidden lg:block px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 font-medium"
              >
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
    <div id="home" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-white/50 to-purple-500/20" />
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left max-w-2xl"
          data-aos="fade-right"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ta'lim bilan <br />
            </span>
            <span className="text-gray-800">Kelajakni quring</span>
          </motion.h1>
         
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl"
          >
            9 yillik tajriba bilan biz 50,000+ talabaning hayotini o'zgartirdik.
            Endi sizning navbatingiz! Eng yaxshi ustozlar bilan zamonaviy kurslar.
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
              onClick={() => navigate('/login')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group"
            >
              Birinchi darsni boshlash
              <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('xizmatlar')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 border border-blue-600 text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Xizmatlarni ko'rish
            </motion.button>
          </motion.div>
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">50K+</p>
                <p className="text-gray-600">Talaba</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white">
                <FaChalkboardTeacher className="text-2xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">200+</p>
                <p className="text-gray-600">O'qituvchi</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white">
                <FaCheckCircle className="text-2xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">98%</p>
                <p className="text-gray-600">Muvaffaqiyat</p>
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
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <img
              src={backImg}
              alt="Online Education"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop";
              }}
            />
           
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaStar className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Eng yaxshi kurs</p>
                  <p className="text-sm text-gray-600">2024-yil</p>
                </div>
              </div>
            </motion.div>
           
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-2xl text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaCalendarAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-bold">24/7</p>
                  <p className="text-sm opacity-90">Qo'llab-quvvatlash</p>
                </div>
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
          <FaChevronDown className="text-2xl" />
        </button>
      </motion.div>
    </div>
  );
};

// Features komponenti
const Features = () => {
  const features = [
    {
      title: "Bepul ikkinchi o'qituvchi",
      text: "Har bir talaba uchun yordamchi o'qituvchi",
      icon: <FaChalkboardTeacher />,
      color: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      title: "Test markazi",
      text: "Haqiqiy IELTS imtihonlari",
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-500",
      delay: 100
    },
    {
      title: "Tajribali ustozlar",
      text: "IELTS 9.0 natijali mutaxassislar",
      icon: <FaGraduationCap />,
      color: "from-purple-500 to-pink-500",
      delay: 200
    },
    {
      title: "Bepul tadbirlar",
      text: "Muntazam seminarlar va vebinarlar",
      icon: <FaCalendarAlt />,
      color: "from-orange-500 to-red-500",
      delay: 300
    },
    {
      title: "Hamkorlik zonalari",
      text: "Zamonaviy o'quv maydonlari",
      icon: <FaCoffee />,
      color: "from-yellow-500 to-amber-500",
      delay: 400
    },
    {
      title: "Shaxsiy dastur",
      text: "Individual o'quv reja",
      icon: <FaStar />,
      color: "from-indigo-500 to-blue-500",
      delay: 500
    }
  ];

  return (
    <section id="xizmatlar" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nega bizni tanlashadi?
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
              <div className="relative h-full bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
               
                <div className="relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                    <div className="text-xl md:text-2xl text-white">
                      {feature.icon}
                    </div>
                  </div>
                 
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                 
                  <p className="text-gray-600 mb-6">
                    {feature.text}
                  </p>
                 
                  <button className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
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

// Testimonials komponenti
const Testimonials = () => {
  const testimonials = [
    {
      name: "Azizbek Islomov",
      role: "IELTS 8.5",
      feedback: "6 oy ichida 5.5 dan 8.5 ga ko'tardim. O'qituvchilar juda sifatli!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Malika Nurmatova",
      role: "SAT 1550",
      feedback: "Amerika universitetiga kirishimga yordam berdi. Rahmat!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Dilmurod Karimov",
      role: "Full Stack Developer",
      feedback: "Dasturlash kursi mening karyeramni butunlay o'zgartirdi.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Shahnoza Qodirova",
      role: "General English B2",
      feedback: "Ingliz tilini 0 dan o'rgana boshlagandim. Endi chet elliklar bilan bemalol gaplasha olaman.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Behruz Akramov",
      role: "Frontend Developer",
      feedback: "React darslari juda sodda va tushunarli. 3 oyda ish topdim!",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Ozoda Muhammadova",
      role: "IELTS 7.5",
      feedback: "Writing bo'yicha kuchli ko'rsatmalar bo'ldi. O'qituvchilar e'tiborli.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Talabalarimiz fikrlari
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            50,000+ talaba bilan birga ishlash tajribamiz
          </p>
        </motion.div>
        
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
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
                className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl h-full mx-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`;
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
               
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
               
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-200 text-3xl" />
                  <p className="text-gray-600 italic relative z-10 pl-6">
                    "{testimonial.feedback}"
                  </p>
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const subjects = [
    "Matematika", "Fizika", "Kimyo", "Biologiya", "Dasturlash",
    "Ingliz tili", "Rus tili", "Tarix", "Geografiya", "San'at"
  ];
  
  const lessons = subjects.map((title, index) => ({
    id: index + 1,
    title,
    imageUrl: `https://images.unsplash.com/photo-${155 + index}?w=800&h=600&fit=crop`,
    category: title,
    students: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
    price: ["$29", "$49", "$79"][index % 3],
    duration: `${Math.floor(Math.random() * 12) + 1} hafta`
  }));
  
  const filteredLessons = selectedCategory === "All"
    ? lessons
    : lessons.filter((lesson) => lesson.category === selectedCategory);

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section id="darslar" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mashhur Kurslar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            30+ turli fanlar bo'yicha professional kurslar
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-wrap gap-2 md:gap-3 justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            Barchasi
          </motion.button>
          {subjects.slice(0, 6).map((subject) => (
            <motion.button
              key={subject}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(subject)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all ${
                selectedCategory === subject
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {subject}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredLessons.slice(0, 6).map((lesson, index) => (
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
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={lesson.imageUrl}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-${150 + index}?w=800&h=600&fit=crop`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                 
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold">{lesson.rating}</span>
                    </div>
                  </div>
                  
                  {selectedCategory !== "All" && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {lesson.category}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <div className="mb-2 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{lesson.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <FaGraduationCap className="text-blue-200" />
                        <span>{lesson.students} talaba</span>
                        <span className="mx-2">•</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{lesson.price}</p>
                      <p className="text-sm text-blue-200">oyiga</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleViewCourse(lesson.id)}
                      className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      Ko'rish
                      <FaArrowRight className="text-sm" />
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/checkout/${lesson.id}`)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      Sotib olish
                    </button>
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
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all"
          >
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
        "Haftalik hisobotlar"
      ],
      buttonColor: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
      popular: false
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
        "Sertifikatlar",
        "Mentorlik darslari"
      ],
      buttonColor: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
      popular: true
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
        "Shaxsiy murabbiy"
      ],
      buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      popular: false
    },
  ];

  const handleSelectPlan = (planName) => {
    navigate('/dashboard/checkout', { state: { plan: planName, isYearly } });
  };

  return (
    <section id="narxlar" className="py-20 px-4 md:px-6 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Narxlar
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Har bir talaba uchun moslashtirilgan tarif rejalari
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-2xl inline-flex items-center shadow-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                !isYearly
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Oylik
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                isYearly
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Yillik (2 oy bepul)
            </button>
          </div>
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
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Eng tanlangan
                  </span>
                </div>
              )}
              
              <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden ${
                plan.popular
                  ? "border-2 border-blue-500"
                  : ""
              }`}>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {plan.plan}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </div>
                    <p className="text-gray-600">
                      {plan.period} {isYearly && "(yillik)"}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPlan(plan.plan)}
                    className={`w-full py-4 text-white font-semibold rounded-2xl transition-all ${plan.buttonColor}`}
                  >
                    {plan.popular ? "Boshlash" : "Tanlash"}
                  </motion.button>
                </div>
                
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center">
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
            className="text-blue-600 hover:text-purple-600 font-semibold flex items-center justify-center gap-2"
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
      answer: "Bizning platformamizda interaktiv video darslar, jonli sessiyalar, mashqlar va testlar mavjud. Har bir darsda o'qituvchi bilan bevosita aloqa qilish imkoniyati bor. Darslar video formatda, ularni istalgan vaqtda ko'rishingiz mumkin."
    },
    {
      question: "Qanday to'lov usullari mavjud?",
      answer: "Bank kartalari (Visa, Mastercard, Humo, Uzcard), PayPal, Click, Payme, Uzum bank va boshqa mahalliy to'lov tizimlari orqali to'lov qilishingiz mumkin. Hammasi xavfsiz va shifrlangan."
    },
    {
      question: "Kursni qancha vaqtda tamomlashim mumkin?",
      answer: "Kurslar o'zingizning tezligingizga qarab o'rganish imkonini beradi. O'rtacha 3-6 oy ichida kursni tamomlash mumkin. Har bir kursda belgilangan muddat bor, lekin siz uni o'z vaxtingizda o'tishingiz mumkin."
    },
    {
      question: "Sertifikat berasizmi?",
      answer: "Ha, har bir muvaffaqiyatli tamomlagan kurs uchun biz rasmiy sertifikat beramiz, xalqaro tan olingan. Sertifikatlarni raqamli va bosma formatda olishingiz mumkin."
    },
    {
      question: "Qancha vaqt ichida natijani ko'raman?",
      answer: "O'rtacha 1-2 oy ichida sezilarli natijalarni ko'rishingiz mumkin. Bu sizning qanchalik faol ishlashingizga bog'liq. Har bir talaba uchun individual progress monitoring tizimi mavjud."
    },
    {
      question: "Qayta o'rganish imkoniyati bormi?",
      answer: "Ha, barcha video darslar va materiallar kurs davomida va undan keyin ham sizning hisobingizda qoladi. Siz istalgan vaqtda materiallarni qayta ko'rishingiz mumkin."
    },
    {
      question: "Mobil ilova mavjudmi?",
      answer: "Ha, bizning platformamizning iOS va Android uchun mobil ilovasi mavjud. Ilovani AppStore va Google Play'dan yuklab olishingiz mumkin."
    },
    {
      question: "Texnik qo'llab-quvvatlash qanday?",
      answer: "Biz 24/7 texnik qo'llab-quvvatlash xizmatiga egamiz. Telegram, telefon va elektron pochta orqali istalgan vaqtda yordam so'rashingiz mumkin."
    }
  ];

  return (
    <section id="savollar" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ko'p beriladigan savollar
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors group"
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform"
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
                    <div className="p-4 md:p-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
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
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
          >
            Biz bilan bog'laning
          </motion.button>
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

  return (
    <section id="aloqa" className="py-20 px-4 md:px-6 bg-gradient-to-br from-blue-500/10 via-white to-purple-500/10">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bog'lanish
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
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Xabar yuboring</h3>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Ismingiz *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Telefon raqam</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Mavzu</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                >
                  <option value="">Mavzuni tanlang</option>
                  <option value="course">Kurs haqida</option>
                  <option value="payment">To'lov haqida</option>
                  <option value="technical">Texnik yordam</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Xabar *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  placeholder="Xabaringizni yozing..."
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all ${
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
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Biz bilan bog'laning</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telefon</p>
                    <a href="tel:+998901234567" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      +998 90 123 45 67
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <a href="mailto:info@eduhub.uz" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      info@eduhub.uz
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <FaTelegram className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telegram</p>
                    <a href="https://t.me/eduhub_support" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      @eduhub_support
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Manzil</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Toshkent sh., Yunusobod tumani
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Ijtimoiy tarmoqlar</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: FaInstagram, color: "from-pink-500 to-purple-600", label: "Instagram", url: "https://instagram.com/eduhub" },
                  { icon: FaFacebook, color: "from-blue-600 to-blue-700", label: "Facebook", url: "https://facebook.com/eduhub" },
                  { icon: FaTwitter, color: "from-sky-500 to-blue-500", label: "Twitter", url: "https://twitter.com/eduhub" },
                  { icon: FaTelegram, color: "from-blue-400 to-cyan-500", label: "Telegram", url: "https://t.me/eduhub" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-24 rounded-2xl bg-gradient-to-r ${social.color} flex flex-col items-center justify-center text-white hover:shadow-lg transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-2xl mb-2" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ish vaqti</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dushanba - Juma</span>
                  <span className="font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shanba</span>
                  <span className="font-semibold">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yakshanba</span>
                  <span className="font-semibold">Dam olish kuni</span>
                </div>
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
    { name: "Bosh sahifa", href: "/" },
    { name: "Kurslar", href: "/dashboard/all-courses" },
    { name: "Narxlar", href: "#narxlar" },
    { name: "Blog", href: "/blog" },
    { name: "Aloqa", href: "#aloqa" },
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

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white pt-12 pb-8">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EduHub
              </span>
            </h3>
            <p className="text-gray-400 mb-6">
              Innovatsion ta'lim platformasi - kelajakni bugundan quring. 
              9 yillik tajriba, 50,000+ muvaffaqiyatli talaba.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter, FaTelegram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={`Social media ${index}`}
                >
                  <Icon className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tez havolalar</h4>
            <ul className="space-y-2">
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kurslar</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <button
                    onClick={() => navigate(course.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {course.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Huquqiy</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.href)}
                    className="text-gray-400 hover:text-white transition-colors"
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
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} EduHub. Barcha huquqlar himoyalangan.
            </p>
            
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
      offset: 100
    });
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Load user from localStorage
    try {
      const savedUser = localStorage.getItem('eduhub_current_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        console.log('Loaded user from localStorage:', parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('eduhub_current_user');
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
    localStorage.removeItem('eduhub_current_user');
    localStorage.removeItem('eduhub_token');
    setCurrentUser(null);
    
    // Show notification
    alert("Siz tizimdan chiqdingiz!");
    
    // Reload page after logout
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };
  
  return (
    <div className="relative">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <HeroSection />
      <Features />
      <Testimonials />
      <Gallery />
      <Pricing />
      <FAQ />
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
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all z-40"
            aria-label="Scroll to top"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;