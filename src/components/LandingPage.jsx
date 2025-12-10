import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaChevronDown, FaChevronUp, FaArrowRight, FaStar, FaQuoteLeft, FaGoogle, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { FaChalkboardTeacher, FaGraduationCap, FaCalendarAlt, FaCoffee, FaMapMarkerAlt, FaTelegram, FaInstagram, FaFacebook, FaTwitter, FaBars, FaTimes } from "react-icons/fa";
import backImg from "../assets/HeroBack.jpg";

// Mock user database (localStorage ga saqlanadi)
const mockUsersDB = {
  users: [],
  googleUsers: [],
  
  init() {
    try {
      const stored = localStorage.getItem('eduhub_users');
      if (stored) {
        const data = JSON.parse(stored);
        this.users = data.users || [];
        this.googleUsers = data.googleUsers || [];
      }
    } catch (error) {
      console.error('Error loading users:', error);
      this.users = [];
      this.googleUsers = [];
    }
  },
  
  save() {
    try {
      localStorage.setItem('eduhub_users', JSON.stringify({
        users: this.users,
        googleUsers: this.googleUsers
      }));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  },
  
  findByEmail(email) {
    return this.users.find(user => user.email === email);
  },
  
  findByPhone(phone) {
    return this.users.find(user => user.phone === phone);
  },
  
  addUser(user) {
    this.users.push(user);
    this.save();
    return user;
  },
  
  addGoogleUser(user) {
    this.googleUsers.push(user);
    this.save();
    return user;
  }
};

// OTP generator
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock SMS sending (faqat console ga chiqaradi)
const mockSendSMS = (phone, otp) => {
  console.log(`📱 SMS sent to ${phone}: Your OTP code is ${otp}`);
  return true;
};

// Registration Modal komponenti
const RegistrationModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const otpRefs = useRef([]);
  const modalRef = useRef();

  // Initialize database
  useEffect(() => {
    mockUsersDB.init();
  }, []);

  // Modal tashqarisiga bosilsa yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // OTP timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setPhone('');
    setEmail('');
    setFullName('');
    setPassword('');
    setConfirmPassword('');
    setOtp(['', '', '', '', '', '']);
    setOtpSent(false);
    setGeneratedOtp('');
    setTimer(0);
    setLoading(false);
    setErrors({});
    setSuccessMessage('');
    setActiveTab('email');
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'email') {
      if (!email) newErrors.email = "Email manzilni kiriting";
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Noto'g'ri email format";
      
      if (!fullName) newErrors.fullName = "Ism familiyangizni kiriting";
      
      if (!password) newErrors.password = "Parolni kiriting";
      else if (password.length < 8) newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
      
      if (password !== confirmPassword) newErrors.confirmPassword = "Parollar mos kelmadi";
    } else {
      if (!phone) newErrors.phone = "Telefon raqamni kiriting";
      else if (!/^998[0-9]{9}$/.test(phone)) newErrors.phone = "Noto'g'ri telefon raqam formati (998XXXXXXXXX)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google orqali ro'yxatdan o'tish (mock)
  const handleGoogleSignUp = () => {
    setLoading(true);
    setErrors({});
    
    setTimeout(() => {
      // Mock Google auth success
      const mockGoogleUser = {
        id: Date.now(),
        email: 'demo@google.com',
        name: 'Google User',
        avatar: `https://ui-avatars.com/api/?name=Google+User&background=random`,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      
      mockUsersDB.addGoogleUser(mockGoogleUser);
      
      setSuccessMessage("Google orqali muvaffaqiyatli ro'yxatdan o'tdingiz!");
      setLoading(false);
      
      setTimeout(() => {
        onSuccess(mockGoogleUser);
        onClose();
      }, 1500);
    }, 1000);
  };

  // Email orqali ro'yxatdan o'tish
  const handleEmailSignUp = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    setTimeout(() => {
      try {
        // Check if user exists
        const existingUser = mockUsersDB.findByEmail(email);
        if (existingUser) {
          setErrors({ email: "Bu email manzil allaqachon ro'yxatdan o'tgan" });
          setLoading(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          email,
          fullName,
          password: btoa(password), // Simple encoding
          phone: '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`,
          provider: 'email',
          createdAt: new Date().toISOString(),
          isVerified: true
        };
        
        mockUsersDB.addUser(newUser);
        
        // Save to localStorage
        localStorage.setItem('eduhub_current_user', JSON.stringify(newUser));
        
        setSuccessMessage("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
        console.log('Yangi foydalanuvchi:', newUser);
        
        setLoading(false);
        
        setTimeout(() => {
          onSuccess(newUser);
          onClose();
        }, 1500);
      } catch (error) {
        console.error('Ro\'yxatdan o\'tishda xato:', error);
        setErrors({ general: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring." });
        setLoading(false);
      }
    }, 1500);
  };

  // Telefon raqam orqali ro'yxatdan o'tish
  const handlePhoneSignUp = (e) => {
    if (e) e.preventDefault();
    
    if (!otpSent) {
      if (!phone) {
        setErrors({ phone: "Telefon raqamni kiriting" });
        return;
      }
      
      if (!/^998[0-9]{9}$/.test(phone)) {
        setErrors({ phone: "Noto'g'ri telefon raqam formati (998XXXXXXXXX)" });
        return;
      }
      
      // Check if phone exists
      const existingUser = mockUsersDB.findByPhone(phone);
      if (existingUser) {
        setErrors({ phone: "Bu telefon raqam allaqachon ro'yxatdan o'tgan" });
        return;
      }
      
      // Generate and send OTP
      const otpCode = generateOTP();
      setGeneratedOtp(otpCode);
      mockSendSMS(phone, otpCode);
      
      setOtpSent(true);
      setTimer(120); // 2 daqiqa
      setErrors({});
      setSuccessMessage(`Tasdiqlash kodi ${phone} raqamiga yuborildi`);
      
      // Clear message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      // Verify OTP
      const enteredOtp = otp.join('');
      if (enteredOtp !== generatedOtp) {
        setErrors({ otp: "Noto'g'ri tasdiqlash kodi" });
        return;
      }
      
      setLoading(true);
      
      setTimeout(() => {
        try {
          // Create new user with phone
          const newUser = {
            id: Date.now(),
            email: '',
            fullName: `User_${phone.slice(-4)}`,
            phone,
            password: '',
            avatar: `https://ui-avatars.com/api/?name=User&background=random`,
            provider: 'phone',
            createdAt: new Date().toISOString(),
            isVerified: true
          };
          
          mockUsersDB.addUser(newUser);
          
          // Save to localStorage
          localStorage.setItem('eduhub_current_user', JSON.stringify(newUser));
          
          setSuccessMessage("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
          console.log('Yangi foydalanuvchi (telefon):', newUser);
          
          setLoading(false);
          
          setTimeout(() => {
            onSuccess(newUser);
            onClose();
          }, 1500);
        } catch (error) {
          console.error('Telefon orqali ro\'yxatdan o\'tishda xato:', error);
          setErrors({ general: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring." });
          setLoading(false);
        }
      }, 1000);
    }
  };

  // OTP inputlari uchun avtomatik o'tish
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrors({...errors, otp: ''});
    
    // Keyingi inputga o'tish
    if (value && index < 5) {
      setTimeout(() => {
        otpRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  // OTP inputlari uchun keydown handler
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setTimeout(() => {
        otpRefs.current[index - 1]?.focus();
      }, 10);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    const otpCode = generateOTP();
    setGeneratedOtp(otpCode);
    mockSendSMS(phone, otpCode);
    setTimer(120);
    setOtp(['', '', '', '', '', '']);
    setErrors({});
    setSuccessMessage("Yangi kod yuborildi!");
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Format phone number
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('998')) {
      return numbers.slice(0, 12);
    }
    return `998${numbers}`.slice(0, 12);
  };

  // Demo test uchun tezkor to'ldirish
  const fillDemoData = () => {
    if (activeTab === 'email') {
      setFullName("Test Foydalanuvchi");
      setEmail("test@example.com");
      setPassword("test12345");
      setConfirmPassword("test12345");
      setErrors({});
    } else {
      setPhone("998901234567");
      setErrors({});
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={modalRef}
              className="bg-white rounded-3xl max-w-md w-full my-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Ro'yxatdan o'tish
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Demo test button */}
                <button
                  onClick={fillDemoData}
                  className="w-full mb-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl text-sm font-medium hover:shadow-md transition-all"
                >
                  🚀 Demo ma'lumotlarni to'ldirish
                </button>

                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FaCheckCircle />
                      <span>{successMessage}</span>
                    </div>
                  </motion.div>
                )}

                {/* Tabs */}
                <div className="flex mb-6 border-b">
                  <button
                    onClick={() => {
                      setActiveTab('email');
                      setErrors({});
                      setSuccessMessage('');
                    }}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === 'email'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Email orqali
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('phone');
                      setErrors({});
                      setSuccessMessage('');
                    }}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === 'phone'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Telefon orqali
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('google');
                      setErrors({});
                      setSuccessMessage('');
                    }}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === 'google'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Google
                  </button>
                </div>

                {/* Google Tab */}
                {activeTab === 'google' && (
                  <div className="space-y-4">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleSignUp}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <FaGoogle className="text-xl" />
                          Google orqali ro'yxatdan o'tish
                        </>
                      )}
                    </motion.button>

                    <div className="text-center">
                      <button
                        onClick={() => setActiveTab('email')}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Email orqali ro'yxatdan o'tish
                      </button>
                    </div>
                  </div>
                )}

                {/* Email Tab */}
                {activeTab === 'email' && (
                  <div>
                    <form onSubmit={handleEmailSignUp} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                          Ism familiya
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setErrors({...errors, fullName: ''});
                            }}
                            placeholder="Ism familiyangiz"
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                              errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                          Email manzil
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors({...errors, email: ''});
                            }}
                            placeholder="example@gmail.com"
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                          Parol
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors({...errors, password: ''});
                            }}
                            placeholder="Kamida 8 ta belgi"
                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                              errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                          Parolni tasdiqlash
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setErrors({...errors, confirmPassword: ''});
                            }}
                            placeholder="Parolni qayta kiriting"
                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {errors.general && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-600 text-sm">{errors.general}</p>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Ro'yxatdan o'tilmoqda...</span>
                          </div>
                        ) : (
                          "Ro'yxatdan o'tish"
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* Phone Tab */}
                {activeTab === 'phone' && (
                  <div>
                    {!otpSent ? (
                      <form onSubmit={handlePhoneSignUp} className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2 text-sm font-medium">
                            Telefon raqam
                          </label>
                          <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value);
                                setPhone(formatted);
                                setErrors({...errors, phone: ''});
                              }}
                              placeholder="998901234567"
                              maxLength="12"
                              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                                errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                              }`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Format: 998901234567
                          </p>
                        </div>

                        {errors.general && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-600 text-sm">{errors.general}</p>
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Kod yuborilmoqda...</span>
                            </div>
                          ) : (
                            "Kod yuborish"
                          )}
                        </motion.button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-3 text-center">
                            <span className="font-medium">{phone}</span> raqamiga yuborilgan 6 xonali kodni kiriting
                          </label>
                          <div className="flex justify-center gap-2 mb-3">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={(ref) => {
                                  if (ref) otpRefs.current[index] = ref;
                                }}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none ${
                                  errors.otp ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                                }`}
                                autoFocus={index === 0}
                              />
                            ))}
                          </div>
                          
                          {errors.otp && (
                            <p className="text-red-500 text-sm text-center">{errors.otp}</p>
                          )}
                          
                          {timer > 0 ? (
                            <p className="text-center text-gray-600 text-sm">
                              Kod {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} dan keyin eskiradi
                            </p>
                          ) : (
                            <p className="text-center text-red-500 text-sm">
                              Kod eskirgan
                            </p>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setOtpSent(false);
                              setOtp(['', '', '', '', '', '']);
                              setErrors({});
                            }}
                            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                          >
                            Ortga
                          </button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePhoneSignUp}
                            disabled={loading || timer === 0}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              </div>
                            ) : (
                              "Tasdiqlash"
                            )}
                          </motion.button>
                        </div>

                        {timer === 0 && (
                          <button
                            onClick={handleResendOtp}
                            className="w-full py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                          >
                            Kodni qayta yuborish
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Demo Info */}
                <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-700 mb-1">
                    🚀 Demo test qilish uchun:
                  </p>
                  <ul className="text-xs text-blue-600 space-y-0.5">
                    <li>• Email: test@example.com</li>
                    <li>• Telefon: 998901234567</li>
                    <li>• OTP: console'dan ko'ring</li>
                    <li>• Parol: test12345</li>
                  </ul>
                </div>

                {/* Terms and Conditions */}
                <p className="text-center text-gray-500 text-xs mt-6">
                  Ro'yxatdan o'tish orqali siz{' '}
                  <button type="button" className="text-blue-600 hover:underline">
                    Foydalanish shartlari
                  </button>{' '}
                  va{' '}
                  <button type="button" className="text-blue-600 hover:underline">
                    Maxfiylik siyosati
                  </button>{' '}
                  bilan rozilik bildirasiz
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// User Profile Indicator (navbar'da ko'rinadi)
const UserProfile = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.fullName || user.name}
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
        <span className="hidden lg:inline text-gray-700 font-medium">
          {user.fullName || user.name}
        </span>
        <FaChevronDown className="text-gray-500" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{user.fullName || user.name}</p>
            <p className="text-sm text-gray-500">{user.email || user.phone}</p>
          </div>
          <div className="py-2">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              Profil
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              Mening kurslarim
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              Sozlamalar
            </button>
          </div>
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            >
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Navbar component'iga registration modalni ochish tugmasini qo'shamiz
const Navbar = ({ onRegisterClick, currentUser, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-2xl shadow-blue-200/30" 
          : "bg-gradient-to-r from-blue-500/10 via-white/80 to-purple-500/10 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
        >
          Edu<span className="text-blue-600">Hub</span>
        </motion.h1>

        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobile && menuOpen ? 1 : isMobile ? 0 : 1,
            y: isMobile && menuOpen ? 0 : isMobile ? -20 : 0,
            height: isMobile && menuOpen ? "auto" : isMobile ? 0 : "auto"
          }}
          transition={{ duration: 0.3 }}
          className={`${
            isMobile
              ? menuOpen
                ? "flex flex-col absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-blue-300/30 border border-blue-100"
                : "hidden"
              : "flex gap-8 items-center"
          }`}
        >
          {[
            { name: "Bosh Sahifa", section: "#home" },
            { name: "Darslar", section: "#darslar" },
            { name: "Narxlar", section: "#narxlar" },
            { name: "Savollar", section: "#savollar" },
            { name: "Aloqa", section: "#aloqa" },
            { name: "Xizmatlar", section: "#xizmatlar" },
          ].map((item, index) => (
            <motion.li 
              key={item.section}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => scrollToSection(item.section)}
                className="relative py-2 px-4 text-gray-700 hover:text-blue-600 font-medium group transition-all duration-300"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <UserProfile user={currentUser} onLogout={onLogout} />
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegisterClick}
                className="hidden lg:block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Ro'yxatdan o'tish
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className={`text-2xl ${
                  scrolled ? "text-blue-600" : "text-white"
                } hover:text-blue-500 focus:outline-none lg:hidden`}
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

// HeroSection component'iga registration modalni ochish tugmasini qo'shamiz
const HeroSection = ({ onRegisterClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id="home" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-white/50 to-purple-500/20" />
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" 
      />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-2xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
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
            className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            9 yillik tajriba bilan biz 50,000+ talabaning hayotini o'zgartirdik. 
            Endi sizning navbatingiz!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegisterClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group"
            >
              Birinchi darsni boshlash
              <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-8"
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
          className="relative mt-12 lg:mt-0"
        >
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <img 
              src={backImg} 
              alt="Online Education" 
              className="relative rounded-2xl shadow-2xl w-full h-auto"
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
          className="text-gray-600 hover:text-blue-600 transition-colors"
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
    <section id="xizmatlar" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nega bizni tanlashadi?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovatsion yondashuv va ishonchli natijalar bilan ta'lim sari birga qadam tashlaymiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                    <div className="text-2xl text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      name: "Malika Nurmatova",
      role: "SAT 1550",
      feedback: "Amerika universitetiga kirishimga yordam berdi. Rahmat!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      name: "Dilmurod Karimov",
      role: "Full Stack Developer",
      feedback: "Dasturlash kursi mening karyeramni butunlay o'zgartirdi.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      name: "Shahnoza Qodirova",
      role: "General English B2",
      feedback: "Ingliz tilini 0 dan o'rgana boshlagandim. Endi chet elliklar bilan bemalol gaplasha olaman.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      name: "Behruz Akramov",
      role: "Frontend Developer",
      feedback: "React darslari juda sodda va tushunarli. 3 oyda ish topdim!",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      name: "Ozoda Muhammadova",
      role: "IELTS 7.5",
      feedback: "Writing bo'yicha kuchli ko'rsatmalar bo'ldi. O'qituvchilar e'tiborli.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Talabalarimiz fikrlari
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            slideShadows: true,
          }}
          autoplay={{ delay: 3000 }}
          className="!pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="!w-96 !h-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-2xl h-full"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
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
  const [selectedCategory, setSelectedCategory] = useState("All");

  const subjects = [
    "Matematika", "Fizika", "Kimyo", "Biologiya", "Dasturlash",
    "Ingliz tili", "Rus tili", "Tarix", "Geografiya", "San'at"
  ];

  const lessons = subjects.map((title, index) => ({
    title,
    imageUrl: `https://images.unsplash.com/photo-${155 + index}?w=800&h=600&fit=crop`,
    category: title,
    students: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1)
  }));

  const filteredLessons = selectedCategory === "All"
    ? lessons
    : lessons.filter((lesson) => lesson.category === selectedCategory);

  return (
    <section id="darslar" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mashhur Kurslar
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            30+ turli fanlar bo'yicha professional kurslar
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Barchasi
          </button>
          {subjects.slice(0, 6).map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedCategory(subject)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === subject
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.slice(0, 6).map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={lesson.imageUrl}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold">{lesson.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap />
                      <span>{lesson.students} talaba</span>
                    </div>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                      Ko'rish
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all">
            Barcha kurslarni ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

// Pricing komponenti
const Pricing = ({ onRegisterClick }) => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const pricingPlans = [
    {
      plan: "Boshlang'ich",
      price: "$29",
      period: "oyiga",
      features: [
        "Barcha kurslarga kirish",
        "Bepul tadbirlar",
        "24/7 chat yordam",
        "Davomatni kuzatish",
        "Haftalik hisobotlar"
      ],
      gradient: "from-gray-100 to-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      plan: "Premium",
      price: "$49",
      period: "oyiga",
      features: [
        "Boshlang'ich xususiyatlari",
        "Shaxsiy o'qituvchi",
        "Individual dastur",
        "VIP qo'llab-quvvatlash",
        "Sertifikatlar",
        "Mentorlik darslari"
      ],
      gradient: "from-blue-500 to-purple-600",
      buttonColor: "bg-white text-blue-600 hover:bg-blue-50",
      popular: true
    },
    {
      plan: "Pro",
      price: "$79",
      period: "oyiga",
      features: [
        "Premium xususiyatlari",
        "Cheksiz konsultatsiyalar",
        "Karyera maslahatlari",
        "Korxona hamkorligi",
        "Xalqaro sertifikat",
        "Shaxsiy murabbiy"
      ],
      gradient: "from-purple-100 to-pink-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
  ];

  return (
    <section id="narxlar" className="py-20 px-6 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              To'g'ri rejani tanlang
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Har bir talaba uchun mos keladigan tariflar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-3xl p-8 shadow-xl transition-all duration-500 ${
                plan.popular 
                  ? "border-2 border-blue-400 scale-105" 
                  : "border border-gray-200"
              } ${hoveredPlan === index ? "shadow-2xl" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                    Eng tanlangan
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.plan}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">1 oy sinov muddati</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onRegisterClick}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/30"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl hover:shadow-blue-500/30"
                }`}
              >
                Boshlash
              </button>
            </motion.div>
          ))}
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
      answer: "Bizning platformamizda interaktiv video darslar, jonli sessiyalar, mashqlar va testlar mavjud. Har bir darsda o'qituvchi bilan bevosita aloqa qilish imkoniyati bor."
    },
    {
      question: "Qanday to'lov usullari mavjud?",
      answer: "Bank kartalari (Visa, Mastercard), PayPal, Click, Payme va boshqa mahalliy to'lov tizimlari orqali to'lov qilishingiz mumkin."
    },
    {
      question: "Kursni qancha vaqtda tamomlashim mumkin?",
      answer: "Kurslar o'zingizning tezligingizga qarab o'rganish imkonini beradi. O'rtacha 3-6 oy ichida kursni tamomlash mumkin."
    },
    {
      question: "Sertifikat berasizmi?",
      answer: "Ha, har bir muvaffaqiyatli tamomlagan kurs uch biz rasmiy sertifikat beramiz, xalqaro tan olingan."
    },
    {
      question: "Qancha vaqt ichida natijani ko'raman?",
      answer: "O'rtacha 1-2 oy ichida sezilarli natijalarni ko'rishingiz mumkin. Bu sizning qanchalik faol ishlashingizga bog'liq."
    },
    {
      question: "Qayta o'rganish imkoniyati bormi?",
      answer: "Ha, barcha video darslar va materiallar kurs davomida va undan keyin ham sizning hisobingizda qoladi."
    }
  ];

  return (
    <section id="savollar" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ko'p beriladigan savollar
            </span>
          </h2>
          <p className="text-xl text-gray-600">
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
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white"
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
                    <div className="p-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="aloqa" className="py-20 px-6 bg-gradient-to-br from-blue-500/10 via-white to-purple-500/10">
      <div className="container mx-auto max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bog'lanish
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Savollaringiz bormi? Biz bilan bog'laning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Xabar yuboring</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Ismingiz</label>
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
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
                <label htmlFor="message" className="block text-gray-700 mb-2">Xabar</label>
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
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                Xabar yuborish
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Biz bilan bog'laning</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telefon</p>
                    <p className="text-lg font-semibold text-gray-800">+998 90 123 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800">info@eduhub.uz</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                    <FaTelegram className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telegram</p>
                    <p className="text-lg font-semibold text-gray-800">@eduhub_support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Ijtimoiy tarmoqlar</h3>
              
              <div className="flex gap-4">
                {[
                  { icon: FaInstagram, color: "from-pink-500 to-purple-600", label: "Instagram" },
                  { icon: FaFacebook, color: "from-blue-600 to-blue-700", label: "Facebook" },
                  { icon: FaTwitter, color: "from-sky-500 to-blue-500", label: "Twitter" },
                  { icon: FaTelegram, color: "from-blue-400 to-cyan-500", label: "Telegram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white hover:shadow-lg transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
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

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white pt-12 pb-8">
      <div className="container mx-auto max-w-screen-xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EduHub
              </span>
            </h3>
            <p className="text-gray-400">
              Innovatsion ta'lim platformasi - kelajakni bugundan quring
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tez havolalar</h4>
            <ul className="space-y-2">
              {["Bosh sahifa", "Kurslar", "Narxlar", "Blog", "Aloqa"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kurslar</h4>
            <ul className="space-y-2">
              {["IELTS", "Matematika", "Dasturlash", "Biznes", "Dizayn"].map((course) => (
                <li key={course}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Yangiliklar</h4>
            <p className="text-gray-400 mb-4">
              Yangi kurslar va aksiyalar haqida birinchi bo'lib bilish uchun obuna bo'ling
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="flex-grow px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg hover:opacity-90 transition-opacity">
                →
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} EduHub. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

// Asosiy HomePage komponenti
const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
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
    }
    
    // Initialize mock database
    try {
      mockUsersDB.init();
      console.log('Database initialized. Total users:', mockUsersDB.users.length);
    } catch (error) {
      console.error('Error initializing database:', error);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterClick = () => {
    console.log('Register button clicked');
    setShowRegistration(true);
  };

  const handleRegistrationSuccess = (user) => {
    console.log('Registration successful:', user);
    setCurrentUser(user);
    setShowRegistration(false);
    
    // Show welcome message
    setTimeout(() => {
      alert(`Xush kelibsiz, ${user.fullName || user.name}!`);
    }, 100);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('eduhub_current_user');
    setCurrentUser(null);
    setTimeout(() => {
      alert("Siz tizimdan chiqdingiz!");
    }, 100);
  };

  // Debug uchun foydalanuvchilarni ko'rish
  const showAllUsers = () => {
    console.log('All users in database:', mockUsersDB.users);
    console.log('All Google users:', mockUsersDB.googleUsers);
    alert(`Jami foydalanuvchilar: ${mockUsersDB.users.length}\nGoogle foydalanuvchilar: ${mockUsersDB.googleUsers.length}`);
  };

  return (
    <div className="relative">
      <Navbar 
        onRegisterClick={handleRegisterClick} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <HeroSection onRegisterClick={handleRegisterClick} />
      <Features />
      <Testimonials />
      <Gallery />
      <Pricing onRegisterClick={handleRegisterClick} />
      <FAQ />
      <Contact />
      <Footer />

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={showRegistration} 
        onClose={() => {
          console.log('Modal closed');
          setShowRegistration(false);
        }}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Debug button (faqat development uchun) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={showAllUsers}
          className="fixed bottom-20 right-8 w-10 h-10 bg-red-500 text-white rounded-full shadow-lg z-40 flex items-center justify-center"
          title="Debug Users"
        >
          🐛
        </button>
      )}

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all z-40"
        >
          <FaChevronUp />
        </motion.button>
      )}
    </div>
  );
};

export default HomePage;