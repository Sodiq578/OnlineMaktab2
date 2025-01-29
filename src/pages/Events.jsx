// src/pages/Events.js
import React, { useState } from 'react';

const Events = () => {
  const [newsItems] = useState([
    { id: 1, title: 'Yangi kurslar boshlanishi', description: 'Yangi kurslar 1-fevraldan boshlab boshlanadi. Qatnashish uchun ro\'yxatdan o\'tish zarur.', date: '2025-01-20', moreInfo: 'Kurslar haqida batafsil ma\'lumotni bu yerda topishingiz mumkin.' },
    { id: 2, title: 'Webinar: Onlayn ta\'limning kelajagi', description: '19-fevral kuni onlayn ta\'limni rivojlantirish haqidagi webinar bo\'lib o\'tadi.', date: '2025-01-18', moreInfo: 'Webinarni onlayn tarzda tomosha qilish imkoniyati mavjud.' },
    { id: 3, title: 'Dars jadvali yangilanishi', description: 'Kurslar jadvali yangilandi, yangi darslar va vaqtlar haqida ma\'lumot olish uchun tizimga kiring.', date: '2025-01-15', moreInfo: 'Jadvalga kirish uchun tizimga kirishingiz zarur.' },
    // Qo'shimcha yangiliklar qo'shishingiz mumkin
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Ta'lim yangiliklari</h1>

      <div className="space-y-6">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-sm text-gray-500 mt-2">Chop etilgan: {item.date}</p>
            <p className="text-blue-600 mt-2 cursor-pointer hover:underline" onClick={() => alert(item.moreInfo)}>Batafsil ma'lumot</p>
          </div>
        ))}
      </div>
      
      {/* Yangiliklarni qo'shish (Admin bo'limi uchun) */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yangilik qo'shish</h2>
        <form className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <input type="text" placeholder="Yangilik sarlavhasi" className="w-full mb-4 p-2 rounded-md" />
          <textarea placeholder="Yangilik matni" className="w-full mb-4 p-2 rounded-md" rows="4"></textarea>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Yangilik qo'shish</button>
        </form>
      </div>
    </div>
  );
};

export default Events;
