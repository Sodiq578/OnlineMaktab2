// src/pages/Payments.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Payments = () => {
  const { purchaseCourse } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.state?.section; // HomePage dan kelgan kurs

  const handlePayment = () => {
    if (section) {
      purchaseCourse(section); // Kursni sotib olinganlar ro‘yxatiga qo‘shish
      const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/videos/${slug}`); // Kurs sahifasiga o‘tish
    } else {
      alert('Kurs tanlanmadi!');
    }
  };

  return (
    <div className="payments-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">To‘lov Sahifasi</h1>
      {section ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{section.sectionName}</h2>
          <p className="text-gray-600 mb-4">Ushbu kursni sotib olish uchun to‘lov qiling.</p>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            To‘lov qilish (Masalan: $10)
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600">Iltimos, kursni tanlang.</p>
      )}
    </div>
  );
};

export default Payments;