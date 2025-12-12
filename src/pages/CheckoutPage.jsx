// src/pages/CheckoutPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CreditCard, Smartphone, Wallet } from 'lucide-react';

const CheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handlePayment = (method) => {
    alert(`${method} orqali to'lov amalga oshirildi!`);
    navigate('/dashboard/payment-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Orqaga
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold">Kursni sotib olish</h1>
            <p className="text-indigo-200 mt-2">To'lovni amalga oshiring va kursga kirishni boshlang</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Buyurtma</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400">Kurs nomi:</span>
                    <span className="font-medium text-gray-800 dark:text-white">HTML Darslari</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400">Narxi:</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">490,000 so'm</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-300">Kafolat</h3>
                      <p className="text-sm text-green-700 dark:text-green-400">30 kun ichida pulingizni qaytarib olishingiz mumkin</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">To'lov usuli</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => handlePayment('Karta orqali')}
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-600 dark:text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium text-gray-800 dark:text-white">Bank kartasi</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Visa, MasterCard, Humo</div>
                      </div>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium">Tanlash</div>
                  </button>

                  <button
                    onClick={() => handlePayment('Click orqali')}
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 rounded-xl flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-green-600 dark:text-green-400" />
                      <div className="text-left">
                        <div className="font-medium text-gray-800 dark:text-white">Click</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Click ilovasi orqali to'lash</div>
                      </div>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-medium">Tanlash</div>
                  </button>

                  <button
                    onClick={() => handlePayment('Payme orqali')}
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="text-blue-600 dark:text-blue-400" />
                      <div className="text-left">
                        <div className="font-medium text-gray-800 dark:text-white">Payme</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Payme ilovasi orqali to'lash</div>
                      </div>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-medium">Tanlash</div>
                  </button>
                </div>

                <button
                  onClick={() => navigate('/dashboard/payment-success')}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition"
                >
                  To'lovni amalga oshirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;