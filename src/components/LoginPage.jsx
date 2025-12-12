// src/components/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HiEye, 
  HiEyeOff, 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUser, 
  HiOutlinePhone,
  HiOutlineArrowLeft 
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImg from '../assets/forLoginPage.avif';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('eduhub_current_user');
    if (user) {
      navigate('/dashboard/home');
    }
  }, [navigate]);

  // Form field validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email manzilni kiriting';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email manzil noto\'g\'ri formatda';
    }

    if (!formData.password) {
      newErrors.password = 'Parolni kiriting';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    }

    if (!isLoginMode) {
      if (!formData.firstName) newErrors.firstName = 'Ismni kiriting';
      if (!formData.lastName) newErrors.lastName = 'Familyani kiriting';
      
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Telefon raqamni kiriting';
      } else if (!/^\+998\d{9}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
        newErrors.phoneNumber = 'Telefon raqam noto\'g\'ri formatda';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Parolni tasdiqlang';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parollar mos kelmayapti';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (!value.startsWith('998')) {
        value = '998' + value;
      }
      value = '+998 ' + value.slice(3);
      
      // Add spaces for readability
      if (value.length > 7) value = value.slice(0, 7) + ' ' + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + ' ' + value.slice(11);
      if (value.length > 14) value = value.slice(0, 14);
    }
    
    setFormData(prev => ({
      ...prev,
      phoneNumber: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      
      // Show first error as toast
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    try {
      if (isLoginMode) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      toast.error(error.message || 'Xatolik yuz berdi');
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const users = JSON.parse(localStorage.getItem('eduhub_users') || '{"users": []}');
    const user = users.users.find(u => u.email === formData.email);
    
    if (!user) {
      throw new Error('Foydalanuvchi topilmadi');
    }

    // Simple password check
    if (user.password !== btoa(formData.password)) {
      throw new Error('Noto\'g\'ri parol');
    }

    // Save user session
    const userSession = {
      ...user,
      lastLogin: new Date().toISOString(),
      rememberMe
    };
    
    localStorage.setItem('eduhub_current_user', JSON.stringify(userSession));
    
    if (rememberMe) {
      localStorage.setItem('eduhub_remembered_email', formData.email);
    } else {
      localStorage.removeItem('eduhub_remembered_email');
    }

    toast.success('Muvaffaqiyatli kirdingiz!');
    
    setTimeout(() => {
      navigate('/dashboard/home');
    }, 1000);
  };

  const handleRegister = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem('eduhub_users') || '{"users": []}');
    const userExists = existingUsers.users.find(u => u.email === formData.email);
    
    if (userExists) {
      throw new Error('Bu email manzil bilan allaqachon ro\'yxatdan o\'tilgan');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      phoneNumber: formData.phoneNumber,
      password: btoa(formData.password),
      avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff&bold=true`,
      provider: 'email',
      createdAt: new Date().toISOString(),
      isVerified: true,
      role: 'student',
      courses: [],
      progress: 0
    };

    // Save user
    existingUsers.users.push(newUser);
    localStorage.setItem('eduhub_users', JSON.stringify(existingUsers));
    
    // Save as current user
    localStorage.setItem('eduhub_current_user', JSON.stringify(newUser));
    
    toast.success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');

    setTimeout(() => {
      navigate('/dashboard/home');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast.info('Google orqali kirish tez orada qo\'shiladi');
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    clearForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col md:flex-row">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Left Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden lg:block lg:w-1/2"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LoginImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <HiOutlineArrowLeft size={24} />
        </button>
        
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Kelajagingizni <span className="text-blue-300">EduHub</span> bilan quring
            </h1>
            <p className="text-lg md:text-xl text-gray-200 opacity-90">
              9 yillik tajriba, 50,000+ muvaffaqiyatli talaba bilan birga o'rganing
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-purple-400"
                  />
                ))}
              </div>
              <span className="text-gray-200">Bugun 100+ yangi talaba</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Right Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-md">
          {/* Mobile back button */}
          <button
            onClick={() => navigate('/')}
            className="lg:hidden mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <HiOutlineArrowLeft className="mr-2" />
            Bosh sahifaga qaytish
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            {/* Logo and header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edu<span className="text-blue-600">Hub</span>
                </h1>
              </Link>
              <p className="text-gray-600 mt-2">
                {isLoginMode 
                  ? 'Xush kelibsiz! Darslaringizni davom ettiring' 
                  : 'Yangi hisob yarating va o\'rganishni boshlang'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLoginMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <HiOutlineUser className="inline mr-2 text-blue-500" />
                        Ism
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="Ismingiz"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Familya
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="Familyangiz"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiOutlineMail className="inline mr-2 text-blue-500" />
                  Email manzil
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone number (only for register) */}
              <AnimatePresence>
                {!isLoginMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <HiOutlinePhone className="inline mr-2 text-blue-500" />
                      Telefon raqam
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="+998 90 123 45 67"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiOutlineLockClosed className="inline mr-2 text-blue-500" />
                  Parol
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12`}
                    placeholder="Kamida 6 ta belgi"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password (only for register) */}
              <AnimatePresence>
                {!isLoginMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parolni tasdiqlash
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12`}
                        placeholder="Parolni qayta kiriting"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember me and Forgot password (only for login) */}
              {isLoginMode && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Eslab qolish</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info('Parolni tiklash tez orada qo\'shiladi')}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Parolni unutdingizmi?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isLoginMode ? 'Kirilmoqda...' : 'Ro\'yxatdan o\'tilmoqda...'}
                  </>
                ) : (
                  isLoginMode ? 'Tizimga kirish' : "Ro'yxatdan o'tish"
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Yoki</span>
                </div>
              </div>

              {/* Google login */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center"
              >
                <FcGoogle className="w-5 h-5 mr-3" />
                Google orqali davom etish
              </motion.button>

              {/* Toggle mode */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                >
                  {isLoginMode 
                    ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" 
                    : "Allaqachon hisobingiz bormi? Tizimga kirish"
                  }
                </button>
              </div>

              {/* Terms and conditions */}
            <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t">
  <p>
    Tugmani bosish orqali siz{' '}
    <Link to="/terms" className="text-blue-600 hover:underline">Foydalanish shartlari</Link>{' '}
    va{' '}
    <Link to="/privacy" className="text-blue-600 hover:underline">Maxfiylik siyosati</Link>{' '}
    bilan rozilik bildirasiz
  </p>
</div>

            </form>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">50K+</p>
              <p className="text-sm text-gray-600">Talaba</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-gray-600">Muvaffaqiyat</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">200+</p>
              <p className="text-sm text-gray-600">O'qituvchi</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements for mobile */}
      <div className="lg:hidden absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="lg:hidden absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
    </div>
  );
};

export default LoginPage;