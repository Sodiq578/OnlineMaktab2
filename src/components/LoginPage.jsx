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
  const navigate = useNavigate();

  // Check if user is already registered on component mount
  useEffect(() => {
    const user = localStorage.getItem('registeredUser');
    if (user) {
      navigate('/dashboard/home'); // Redirect to dashboard if already registered
    }
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword && firstName && lastName && phoneNumber) {
      // Save user data to localStorage
      const userData = {
        firstName,
        lastName,
        phoneNumber,
        password,
      };
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      navigate('/dashboard/home'); // Navigate to dashboard
    } else {
      alert("Parollar mos kelmayapti yoki boshqa maydonlar to'ldirilmagan.");
    }
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
      </div>

      {/* Form Section */}
      <div className="form-container w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <form onSubmit={handleRegister} className="w-full md:w-3/4 lg:w-1/2 space-y-4 form-inner-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ro'yxatdan o'tish</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ism</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Familya</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Familyangizni kiriting"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parol</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Parolingizni kiriting"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parolni tasdiqlash</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Parolni qayta kiriting"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Telefon raqamingizni kiriting"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;