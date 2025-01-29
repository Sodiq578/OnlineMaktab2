// src/pages/Payments.js
import React, { useState } from 'react';

const Payments = () => {
  // To'lov holatini saqlash uchun holat (state)
  const [hasPaid, setHasPaid] = useState(false); // Yoki localStorage yoki API orqali holatni olish mumkin

  // To'lovni amalga oshirish funksiyasi
  const handlePayment = () => {
    setHasPaid(true); // To'lov qilindi, holatni yangilash
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">To'lovlar</h1>
      
      {hasPaid ? (
        <p className="text-lg text-green-600">Siz to'lovni muvaffaqiyatli amalga oshirdingiz!</p>
      ) : (
        <div>
          <p className="text-lg text-red-600">Siz hali to'lov qilmagan ekansiz.</p>
          <button
            onClick={handlePayment}
            className="mt-4 py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            To'lov qilish
          </button>
        </div>
      )}
    </div>
  );
};

export default Payments;
