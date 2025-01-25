// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Sessiya yoki tokenni tozalash
    localStorage.removeItem('authToken'); // Tokenni yoki foydalanuvchi ma'lumotini o'chirish
    sessionStorage.clear();

    // LandingPage (yoki Login sahifasi)ga yo'naltirish
    navigate('/');
  }, [navigate]);

  return null; // Bu sahifa hech narsa ko'rsatmaydi, faqat yo'naltirish amalga oshiradi
};

export default Logout;
