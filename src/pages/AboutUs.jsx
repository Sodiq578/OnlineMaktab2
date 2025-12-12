// src/pages/AboutUs.jsx
import React from 'react';
import { Users, Target, Award, Globe } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: "O'quvchilar", value: "10,000+", icon: <Users /> },
    { label: "Kurslar", value: "50+", icon: <Target /> },
    { label: "Sertifikatlar", value: "8,000+", icon: <Award /> },
    { label: "Mamlakatlar", value: "5+", icon: <Globe /> }
  ];

  const team = [
    { name: "Sardor Ergashev", role: "Asoschi & O'qituvchi", desc: "5+ yillik dasturlash tajribasi" },
    { name: "Malika Xudoyberdiyeva", role: "Dizayner", desc: "UI/UX mutaxassisi" },
    { name: "Jamshid Ismoilov", role: "Dasturchi", desc: "Fullstack developer" },
    { name: "Dilnoza Xasanova", role: "Menejer", desc: "Mijozlar bilan ishlash" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Biz haqimizda</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Online ta'lim platformasi sifatida biz har bir o'quvchiga sifatli va arzon ta'lim 
            berishni maqsad qilganmiz.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-indigo-600 dark:text-indigo-400">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Bizning maqsadimiz</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Har bir odamga dunyoning istalgan nuqtasidan sifatli ta'lim olish imkoniyatini 
              yaratish. Texnologiyalar yordamida an'anaviy ta'lim chegaralarini buzish va 
              bilimni demokratiyalashtirish.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Bizning qadriyatlarimiz</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <span>Sifatli va amaliy ta'lim</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <span>Har bir o'quvchiga individual yondashuv</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <span>Doimiy yangilanish va takomillashtirish</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <span>Ijtimoiy mas'uliyat</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">Jamoa a'zolari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Bizning safimizga qo'shiling</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Agar sizda o'qituvchi yoki mutaxassis sifatida qo'shish uchun qimmatli bilimlaringiz 
          bo'lsa, biz bilan bog'laning.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg">
          Hamkorlik uchun ariza
        </button>
      </div>
    </div>
  );
};

export default AboutUs;