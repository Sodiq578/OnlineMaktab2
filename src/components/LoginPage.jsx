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
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineShieldCheck,
  HiOutlineRefresh
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    apple: false,
    facebook: false
  });
  const navigate = useNavigate();

  // Demo hisoblar ro'yxati
  const initialDemoAccounts = [
    {
      id: 1,
      email: 'student@eduhub.uz',
      password: 'student123',
      name: 'Talaba Demo',
      role: 'student',
      courses: 5,
      progress: 65,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      email: 'teacher@eduhub.uz',
      password: 'teacher123',
      name: 'O\'qituvchi Demo',
      role: 'teacher',
      courses: 12,
      progress: 92,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      email: 'admin@eduhub.uz',
      password: 'admin123',
      name: 'Admin Demo',
      role: 'admin',
      courses: 25,
      progress: 100,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 4,
      email: 'pro@eduhub.uz',
      password: 'pro123',
      name: 'PRO Demo',
      role: 'premium',
      courses: 15,
      progress: 78,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Foydalanuvchilarni localStorage'dan o'qish
  const getUsersFromStorage = () => {
    const usersData = localStorage.getItem('eduhub_users');
    return usersData ? JSON.parse(usersData).users : [];
  };

  // Foydalanuvchini localStorage'ga saqlash
  const saveUserToStorage = (user) => {
    let usersData = localStorage.getItem('eduhub_users');
    let users = [];
    
    if (usersData) {
      users = JSON.parse(usersData).users;
    }
    
    // Foydalanuvchini qidirish
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex === -1) {
      // Yangi foydalanuvchi
      users.push({
        id: Date.now(),
        email: user.email,
        password: user.password ? btoa(user.password) : null,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber || '+998 90 123 45 67',
        avatar: user.avatar,
        provider: user.provider,
        role: user.role || 'student',
        subscription: user.subscription || 'basic',
        isVerified: user.isVerified || false,
        createdAt: user.createdAt || new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
    } else {
      // Mavjud foydalanuvchini yangilash
      users[existingUserIndex] = {
        ...users[existingUserIndex],
        lastLogin: new Date().toISOString(),
        ...user
      };
    }
    
    localStorage.setItem('eduhub_users', JSON.stringify({ users }));
  };

  // Social login foydalanuvchisini yaratish
  const createSocialUser = (provider, userData) => {
    const userId = Date.now();
    const userEmail = userData.email || `${provider.toLowerCase()}_${userId}@eduhub.uz`;
    
    const socialUser = {
      id: userId,
      email: userEmail,
      password: null, // Parol yo'q
      firstName: userData.firstName || provider,
      lastName: userData.lastName || 'User',
      phoneNumber: userData.phoneNumber || '+998 90 123 45 67',
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${provider}+User&background=3b82f6&color=fff&bold=true`,
      provider: provider.toLowerCase(),
      role: 'student',
      subscription: 'basic',
      isVerified: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    return socialUser;
  };

  // Session yaratish
  const createUserSession = (user) => {
    const userSession = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      provider: user.provider || 'email',
      createdAt: user.createdAt,
      isVerified: user.isVerified || true,
      role: user.role || 'student',
      subscription: user.subscription || 'basic',
      courses: generateDemoCourses(user.role === 'teacher' ? 12 : user.role === 'admin' ? 25 : 5),
      progress: Math.floor(Math.random() * 40) + 60,
      notifications: Math.floor(Math.random() * 10),
      lastLogin: new Date().toISOString(),
      rememberMe,
      token: `${user.provider || 'demo'}_token_${user.id}_${Date.now()}`
    };
    
    localStorage.setItem('eduhub_current_user', JSON.stringify(userSession));
    localStorage.setItem('eduhub_auth_token', userSession.token);
    
    if (rememberMe) {
      localStorage.setItem('eduhub_remembered_email', user.email);
    } else {
      localStorage.removeItem('eduhub_remembered_email');
    }
    
    return userSession;
  };

  // Google login
  const handleGoogleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, google: true }));
    
    try {
      // Google OAuth simulyatsiyasi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Google'dan qaytgan ma'lumotlar (simulyatsiya)
      const googleUserData = {
        email: `google_user_${Date.now()}@gmail.com`,
        firstName: 'Google',
        lastName: 'User',
        avatar: `https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff&bold=true`
      };
      
      // Foydalanuvchini yaratish
      const socialUser = createSocialUser('google', googleUserData);
      
      // LocalStorage'ga saqlash
      saveUserToStorage(socialUser);
      
      // Session yaratish
      const userSession = createUserSession(socialUser);
      
      toast.success(`${userSession.fullName} hisobiga Google orqali kirildi!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Dashboard'ga yo'naltirish
      setTimeout(() => {
        navigate('/dashboard/home');
      }, 1000);
      
    } catch (error) {
      toast.error('Google bilan kirishda xatolik', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  // Apple login
  const handleAppleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, apple: true }));
    
    try {
      // Apple Sign In simulyatsiyasi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Apple'dan qaytgan ma'lumotlar (simulyatsiya)
      const appleUserData = {
        email: `apple_user_${Date.now()}@icloud.com`,
        firstName: 'Apple',
        lastName: 'User',
        avatar: `https://ui-avatars.com/api/?name=Apple+User&background=000000&color=fff&bold=true`
      };
      
      // Foydalanuvchini yaratish
      const socialUser = createSocialUser('apple', appleUserData);
      
      // LocalStorage'ga saqlash
      saveUserToStorage(socialUser);
      
      // Session yaratish
      const userSession = createUserSession(socialUser);
      
      toast.success(`${userSession.fullName} hisobiga Apple ID orqali kirildi!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Dashboard'ga yo'naltirish
      setTimeout(() => {
        navigate('/dashboard/home');
      }, 1000);
      
    } catch (error) {
      toast.error('Apple ID bilan kirishda xatolik', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSocialLoading(prev => ({ ...prev, apple: false }));
    }
  };

  // Facebook login
  const handleFacebookLogin = async () => {
    setSocialLoading(prev => ({ ...prev, facebook: true }));
    
    try {
      // Facebook OAuth simulyatsiyasi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Facebook'dan qaytgan ma'lumotlar (simulyatsiya)
      const facebookUserData = {
        email: `facebook_user_${Date.now()}@facebook.com`,
        firstName: 'Facebook',
        lastName: 'User',
        avatar: `https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff&bold=true`
      };
      
      // Foydalanuvchini yaratish
      const socialUser = createSocialUser('facebook', facebookUserData);
      
      // LocalStorage'ga saqlash
      saveUserToStorage(socialUser);
      
      // Session yaratish
      const userSession = createUserSession(socialUser);
      
      toast.success(`${userSession.fullName} hisobiga Facebook orqali kirildi!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Dashboard'ga yo'naltirish
      setTimeout(() => {
        navigate('/dashboard/home');
      }, 1000);
      
    } catch (error) {
      toast.error('Facebook bilan kirishda xatolik', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSocialLoading(prev => ({ ...prev, facebook: false }));
    }
  };

  // Social login funksiyasi
  const handleSocialLogin = async (provider) => {
    switch(provider.toLowerCase()) {
      case 'google':
        await handleGoogleLogin();
        break;
      case 'apple':
        await handleAppleLogin();
        break;
      case 'facebook':
        await handleFacebookLogin();
        break;
      default:
        toast.info('Bu platforma hozircha mavjud emas', {
          position: "top-center",
          autoClose: 3000,
        });
    }
  };

  // Avvalgi useEffect'lar...
  useEffect(() => {
    setDemoAccounts(initialDemoAccounts);
    setFormData({
      email: initialDemoAccounts[0].email,
      password: initialDemoAccounts[0].password
    });

    // Har 5 sekundda demo hisobni avtomatik almashish
    let rotationInterval;
    if (isAutoRotating) {
      rotationInterval = setInterval(() => {
        setCurrentDemoIndex(prev => (prev + 1) % initialDemoAccounts.length);
      }, 5000);
    }

    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [isAutoRotating]);

  // Demo hisob o'zgarganda formani yangilash
  useEffect(() => {
    if (demoAccounts.length > 0) {
      const currentAccount = demoAccounts[currentDemoIndex];
      setFormData({
        email: currentAccount.email,
        password: currentAccount.password
      });
    }
  }, [currentDemoIndex, demoAccounts]);

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('eduhub_current_user');
    if (user) {
      navigate('/dashboard/home');
    }
  }, [navigate]);

  // Check password strength
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 6) strength += 1;
      if (/[A-Z]/.test(formData.password)) strength += 1;
      if (/[0-9]/.test(formData.password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      
      // Show first error as toast
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      await handleLogin();
    } catch (error) {
      toast.error(error.message || 'Xatolik yuz berdi', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentAccount = demoAccounts[currentDemoIndex];
    
    // Foydalanuvchini localStorage'dan qidirish yoki yangisini yaratish
    let usersData = localStorage.getItem('eduhub_users');
    let existingUser = null;
    
    if (usersData) {
      const users = JSON.parse(usersData).users;
      existingUser = users.find(u => u.email === currentAccount.email);
    }
    
    let userData;
    
    if (existingUser) {
      // Mavjud foydalanuvchi
      userData = existingUser;
      userData.lastLogin = new Date().toISOString();
    } else {
      // Yangi demo foydalanuvchi
      userData = {
        id: currentAccount.id,
        email: currentAccount.email,
        password: btoa(currentAccount.password),
        firstName: currentAccount.name.split(' ')[0],
        lastName: currentAccount.name.split(' ')[1] || '',
        phoneNumber: '+998 90 123 45 67',
        avatar: `https://ui-avatars.com/api/?name=${currentAccount.name}&background=3b82f6&color=fff&bold=true`,
        provider: 'demo',
        role: currentAccount.role,
        subscription: currentAccount.role === 'premium' ? 'pro' : 'basic',
        isVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // LocalStorage'ga saqlash
      if (!usersData) {
        localStorage.setItem('eduhub_users', JSON.stringify({ users: [userData] }));
      } else {
        const users = JSON.parse(usersData).users;
        users.push(userData);
        localStorage.setItem('eduhub_users', JSON.stringify({ users }));
      }
    }
    
    // Session yaratish
    const userSession = createUserSession(userData);
    
    toast.success(`${currentAccount.name} hisobiga kirildi!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    setTimeout(() => {
      navigate('/dashboard/home');
    }, 1000);
  };

  const generateDemoCourses = (count) => {
    const courseTitles = [
      'Web Dasturlash',
      'React JS',
      'Python Dasturlash',
      'Mobile Development',
      'Data Science',
      'UI/UX Design',
      'Cyber Security',
      'Machine Learning',
      'DevOps',
      'Blockchain'
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: courseTitles[i % courseTitles.length],
      progress: Math.min(100, Math.floor(Math.random() * 50) + 50),
      instructor: `O'qituvchi ${i + 1}`,
      category: ['Dasturlash', 'Design', 'Data', 'Security'][i % 4]
    }));
  };

  const handleDemoChange = (direction = 'next') => {
    setIsAutoRotating(false); // Qo'lda o'zgartirganda avtomatik to'xtatish
    
    if (direction === 'next') {
      setCurrentDemoIndex(prev => (prev + 1) % demoAccounts.length);
    } else {
      setCurrentDemoIndex(prev => (prev - 1 + demoAccounts.length) % demoAccounts.length);
    }
    
    toast.info(`Demo hisob o'zgartirildi: ${demoAccounts[currentDemoIndex].name}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
    toast.info(!isAutoRotating ? 'Avtomatik almashish yoqildi' : 'Avtomatik almashish o\'chirildi', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 1: return 'Juda zaif';
      case 2: return 'Zaif';
      case 3: return 'Yaxshi';
      case 4: return 'Kuchli';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: '90%', maxWidth: '400px', margin: '0 auto' }}
      />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Left Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block lg:w-2/5"
        >
          <div className="bg-gradient-to-br from-blue-800/30 to-purple-800/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl h-full">
            <div className="mb-6 sm:mb-8">
              <Link to="/" className="inline-flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <HiOutlineAcademicCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Edu<span className="text-blue-400">Hub</span>
                </span>
              </Link>
            </div>

            {/* Demo Account Rotator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Demo Hisoblar</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleAutoRotate}
                    className={`p-1.5 rounded-lg ${isAutoRotating ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                    title={isAutoRotating ? 'Avtomatik almashish yoqilgan' : 'Avtomatik almashish o\'chirilgan'}
                  >
                    <HiOutlineRefresh className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
                  </button>
                  <span className="text-xs text-gray-400">
                    {isAutoRotating ? 'Avtomatik' : 'Qolda'}
                  </span>
                </div>
              </div>
              
              <motion.div
                key={currentDemoIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-br ${demoAccounts[currentDemoIndex]?.color} rounded-xl p-4 text-white`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <HiOutlineUser className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{demoAccounts[currentDemoIndex]?.name}</h4>
                      <p className="text-xs opacity-90 capitalize">{demoAccounts[currentDemoIndex]?.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-90">Progress</div>
                    <div className="text-lg font-bold">{demoAccounts[currentDemoIndex]?.progress}%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs mb-2">
                  <span>{demoAccounts[currentDemoIndex]?.courses} kurs</span>
                  <span>Email: {demoAccounts[currentDemoIndex]?.email}</span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-1">
                    {demoAccounts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentDemoIndex ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDemoChange('prev')}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => handleDemoChange('next')}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Kelajagingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EduHub</span> bilan quring
            </h1>
            
            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                  <HiOutlineBookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">200+ Kurslar</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Dunyoning eng yaxshi o'qituvchilaridan</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                  <HiOutlineLightBulb className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">98% Muvaffaqiyat</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">50,000+ muvaffaqiyatli talaba</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  ))}
                </div>
                <span className="text-gray-300 text-xs sm:text-sm font-medium">150+ yangi talaba</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-lg sm:text-xl font-bold text-blue-400">50K+</p>
                  <p className="text-xs text-gray-300">Talaba</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-lg sm:text-xl font-bold text-purple-400">200+</p>
                  <p className="text-xs text-gray-300">O'qituvchi</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-lg sm:text-xl font-bold text-green-400">98%</p>
                  <p className="text-xs text-gray-300">Muvaffaqiyat</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-3/5"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            {/* Mobile Demo Account Rotator */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Demo Hisob</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleAutoRotate}
                    className={`p-1 rounded ${isAutoRotating ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                  >
                    <HiOutlineRefresh className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                      <HiOutlineUser className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{demoAccounts[currentDemoIndex]?.name}</h4>
                      <p className="text-xs text-gray-300">{demoAccounts[currentDemoIndex]?.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Progress</div>
                    <div className="text-sm font-bold text-white">{demoAccounts[currentDemoIndex]?.progress}%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {demoAccounts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${index === currentDemoIndex ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleDemoChange('prev')}
                      className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
                    >
                      Oldingi
                    </button>
                    <button
                      onClick={() => handleDemoChange('next')}
                      className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
                    >
                      Keyingi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden mb-4 flex items-center justify-between">
              <Link to="/" className="inline-flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <HiOutlineAcademicCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Edu<span className="text-blue-400">Hub</span>
                </span>
              </Link>
            </div>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">Tizimga kirish</h2>
              <p className="text-gray-300 text-xs sm:text-sm">
                {demoAccounts[currentDemoIndex]?.name} hisobiga kirish uchun "Tizimga kirish" tugmasini bosing
              </p>
            </div>

            <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading.google}
                className={`bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2 sm:p-3 flex items-center justify-center transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {socialLoading.google ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                    <span className="text-white">Google</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('apple')}
                disabled={socialLoading.apple}
                className={`bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2 sm:p-3 flex items-center justify-center transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {socialLoading.apple ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaApple className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 mr-1.5 sm:mr-2" />
                    <span className="text-white">Apple</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('facebook')}
                disabled={socialLoading.facebook}
                className={`bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2 sm:p-3 flex items-center justify-center transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {socialLoading.facebook ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1.5 sm:mr-2" />
                    <span className="text-white">Facebook</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="relative my-3 sm:my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-transparent text-gray-400">yoki demo hisob bilan davom eting</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                  Email manzil
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 pl-10 pr-3 transition-all placeholder:text-gray-400 text-sm cursor-not-allowed"
                    placeholder="Demo email"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded">
                      Demo
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300">
                    Parol
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordCriteria(!showPasswordCriteria)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Parol talablari
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    readOnly
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 pl-10 pr-10 transition-all placeholder:text-gray-400 text-sm cursor-not-allowed"
                    placeholder="Demo parol"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded mr-2">
                      Demo
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-white"
                    >
                      {showPassword ? <HiEyeOff className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showPasswordCriteria && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-2 bg-white/5 rounded-lg border border-white/10"
                    >
                      <p className="text-xs font-medium text-gray-300 mb-1">Demo parollar:</p>
                      <ul className="space-y-1">
                        {demoAccounts.map((account, index) => (
                          <li 
                            key={account.id}
                            className={`text-xs flex justify-between ${index === currentDemoIndex ? 'text-green-400 font-medium' : 'text-gray-400'}`}
                          >
                            <span>{account.name}:</span>
                            <span>{account.email} / {account.password}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border ${rememberMe ? 'bg-blue-500 border-blue-500' : 'border-white/20 bg-white/5'} transition-all flex items-center justify-center`}>
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-300">Meni eslab qol</span>
                </label>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleDemoChange('prev')}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-all text-sm"
                >
                  ← Oldingi demo
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Kirilmoqda...
                    </>
                  ) : (
                    <>
                      {demoAccounts[currentDemoIndex]?.name} hisobiga kirish
                      <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleDemoChange('next')}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-all text-sm"
                >
                  Keyingi demo →
                </motion.button>
              </div>

              <div className="text-center pt-3 border-t border-white/10">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Hisobingiz yo'qmi?{' '}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    Ro'yxatdan o'tish
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="text-center mb-2">
                <p className="text-xs text-gray-400">
                  Avtomatik almashish: {isAutoRotating ? 'YOQILGAN' : 'OʻCHIRILGAN'} • 
                  <button
                    onClick={toggleAutoRotate}
                    className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {isAutoRotating ? 'Oʻchirish' : 'Yoqish'}
                  </button>
                </p>
              </div>
              
              <p className="text-center text-xs text-gray-400">
                Tugmani bosish orqali siz{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">Foydalanish shartlari</Link>{' '}
                va{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">Maxfiylik siyosati</Link>{' '}
                bilan rozilik bildirasiz
              </p>
            </div>
          </div>

          <div className="text-center mt-3">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white inline-flex items-center transition-colors text-xs"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Bosh sahifaga qaytish
            </button>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-30 h-30 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default LoginPage;