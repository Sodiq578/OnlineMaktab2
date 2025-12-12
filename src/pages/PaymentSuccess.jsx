// src/pages/PaymentSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, Home, Download } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8">
      <div className="max-w-md mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">To'lov muvaffaqiyatli!</h1>
            <p className="text-green-100 mt-2">Kursga kirish huquqini qo'lga kiritdingiz</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">490,000</div>
              <div className="text-gray-500 dark:text-gray-400">so'm to'lov amalga oshirildi</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Kurs nomi:</span>
                <span className="font-medium text-gray-800 dark:text-white">HTML Darslari</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Tranzaksiya ID:</span>
                <span className="font-mono text-gray-800 dark:text-white">TXN-{Date.now()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Sana:</span>
                <span className="font-medium text-gray-800 dark:text-white">{new Date().toLocaleDateString('uz-UZ')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate('/dashboard/my-courses')}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3"
              >
                <BookOpen size={20} />
                Kursni boshlash
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-xl flex items-center justify-center gap-3 transition"
              >
                <Home size={20} />
                Dashboardga qaytish
              </button>
              <button
                onClick={() => alert('Chek yuklanmoqda...')}
                className="w-full py-4 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-xl flex items-center justify-center gap-3 transition"
              >
                <Download size={20} />
                To'lov chekini yuklab olish
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Har qanday savol uchun{' '}
                <a href="mailto:support@onlaynmaktab.uz" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  support@onlaynmaktab.uz
                </a>{' '}
                ga yozing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;