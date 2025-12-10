// src/components/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import LoginImg from '../assets/forLoginPage.avif';
import './LoginPage.css';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('registeredUser');
    if (user) {
      navigate('/dashboard/home');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLoginMode) {
      // Login mode
      handleLogin();
    } else {
      // Register mode
      handleRegister();
    }
  };

  const handleLogin = () => {
    // Simple validation
    if (!email || !password) {
      setError('Email va parolni kiriting');
      setLoading(false);
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('eduhub_users') || '{"users": []}');
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      setError('Foydalanuvchi topilmadi. Iltimos, ro\'yxatdan o\'ting');
      setLoading(false);
      return;
    }

    // Check password (simple base64 decode comparison)
    if (user.password !== btoa(password)) {
      setError('Noto\'g\'ri parol');
      setLoading(false);
      return;
    }

    // Save user to current session
    localStorage.setItem('eduhub_current_user', JSON.stringify(user));
    
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/home');
    }, 1000);
  };

  const handleRegister = () => {
    // Validation
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      setError('Barcha maydonlarni to\'ldiring');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Parollar mos kelmayapti');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      setLoading(false);
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('eduhub_users') || '{"users": []}');
    const userExists = existingUsers.users.find(u => u.email === email);
    
    if (userExists) {
      setError('Bu email manzil bilan allaqachon ro\'yxatdan o\'tilgan');
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      firstName,
      lastName,
      phoneNumber,
      password: btoa(password), // Simple encoding
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      provider: 'email',
      createdAt: new Date().toISOString(),
      isVerified: true
    };

    // Save user
    existingUsers.users.push(newUser);
    localStorage.setItem('eduhub_users', JSON.stringify(existingUsers));
    
    // Save as current user
    localStorage.setItem('eduhub_current_user', JSON.stringify(newUser));
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/home');
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Image Section */}
      <div
        className="login-img relative hidden md:block md:w-1/2 h-1/3 md:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImg})` }}
      >
        <button
          className="absolute top-4 left-4 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigate('/');
            }
          }}
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Ta'lim bilan kelajakni quring</h2>
            <p className="text-gray-200">9 yillik tajriba, 50,000+ talaba</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-container w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-1/2 space-y-4 form-inner-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {isLoginMode ? 'Tizimga kirish' : "Ro'yxatdan o'tish"}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isLoginMode 
              ? 'Darslaringizni davom ettirish uchun tizimga kiring' 
              : 'Birinchi darsni boshlash uchun ro\'yxatdan o\'ting'
            }
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!isLoginMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ism</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Ismingizni kiriting"
                  required={!isLoginMode}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Familya</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Familyangizni kiriting"
                  required={!isLoginMode}
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email manzil</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parol</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Parolingizni kiriting"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {!isLoginMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parolni tasdiqlash</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Parolni qayta kiriting"
                  required={!isLoginMode}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
          )}

          {!isLoginMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="+998 90 123 45 67"
                required={!isLoginMode}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLoginMode ? 'Kirilmoqda...' : 'Ro\'yxatdan o\'tilmoqda...'}
              </>
            ) : (
              isLoginMode ? 'Tizimga kirish' : "Ro'yxatdan o'tish"
            )}
          </button>

          <div className="text-center pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLoginMode 
                ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" 
                : "Allaqachon hisobingiz bormi? Tizimga kirish"
              }
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>
              Tugmani bosish orqali siz{' '}
              <a href="#" className="text-blue-600 hover:underline">Foydalanish shartlari</a>{' '}
              va{' '}
              <a href="#" className="text-blue-600 hover:underline">Maxfiylik siyosati</a>{' '}
              bilan rozilik bildirasiz
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
