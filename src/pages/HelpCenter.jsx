// src/pages/HelpCenter.jsx
import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, Book, Video, CreditCard, Settings } from 'lucide-react';

const HelpCenter = () => {
  const faqs = [
    {
      question: "Kursni qanday sotib olishim mumkin?",
      answer: "Kursni sotib olish uchun kurs sahifasiga o'ting va 'Sotib olish' tugmasini bosing. Keyin to'lov usulini tanlang va to'lovni amalga oshiring."
    },
    {
      question: "To'lovni qaytarib olishim mumkinmi?",
      answer: "Ha, kursni sotib olganingizdan keyin 30 kun ichida har qanday sababga ko'ra to'lovni qaytarib olishingiz mumkin."
    },
    {
      question: "Videolar qancha vaqt saqlanadi?",
      answer: "Sotib olgan kurslaringizga cheksiz vaqt davomida kirishingiz mumkin. Videolar doimiy ravishda mavjud bo'ladi."
    },
    {
      question: "Qanday sertifikat olishim mumkin?",
      answer: "Kursni muvaffaqiyatli tugatganingizdan so'ng, 'Sertifikatlar' bo'limida sertifikatingizni yuklab olishingiz mumkin."
    }
  ];

  const contactMethods = [
    { icon: <Phone />, title: "Telefon", info: "+998 90 123 45 67", action: "Qo'ng'iroq qilish" },
    { icon: <Mail />, title: "Email", info: "support@onlaynmaktab.uz", action: "Email yuborish" },
    { icon: <MessageSquare />, title: "Telegram", info: "@onlaynmaktab_support", action: "Yozish" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Yordam markazi</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Tez yordam oling yoki biz bilan bog'laning</p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Book />, title: "Kurslar haqida", color: "from-blue-500 to-blue-600" },
            { icon: <Video />, title: "Video muammolar", color: "from-purple-500 to-purple-600" },
            { icon: <CreditCard />, title: "To'lov masalalari", color: "from-green-500 to-green-600" },
            { icon: <Settings />, title: "Sozlamalar", color: "from-orange-500 to-orange-600" }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Ko'proq ma'lumot olish uchun bosing</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Ko'p so'raladigan savollar</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Biz bilan bog'laning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                <p className="mb-4 text-indigo-100">{method.info}</p>
                <button className="w-full py-2 bg-white text-indigo-600 hover:bg-gray-100 font-medium rounded-lg transition">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;