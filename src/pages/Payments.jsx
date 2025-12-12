// src/pages/Payments.jsx
import React, { useState, useMemo } from 'react';
import { FaCreditCard, FaCheckCircle, FaClock, FaTimesCircle, FaDownload, FaEye, FaFilter, FaSearch, FaCalendarAlt } from 'react-icons/fa';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, success, pending, failed
  const [dateRange, setDateRange] = useState('all');

  // Demo to'lov ma'lumotlari (real loyihada backenddan keladi)
  const allPayments = [
    { id: 1, course: "React JS to'liq kursi", amount: 990000, date: "2025-11-28", status: "success", method: "Payme", invoice: "INV-2025-001" },
    { id: 2, course: "Node.js + Express Backend", amount: 1200000, date: "2025-11-15", status: "success", method: "Click", invoice: "INV-2025-002" },
    { id: 3, course: "UI/UX Design Masterclass", amount: 850000, date: "2025-10-20", status: "pending", method: "Uzcard", invoice: "INV-2025-003" },
    { id: 4, course: "Python Django Fullstack", amount: 1100000, date: "2025-09-10", status: "failed", method: "Humo", invoice: "INV-2025-004" },
    { id: 5, course: "Flutter Mobile Development", amount: 1350000, date: "2025-12-05", status: "success", method: "Payme", invoice: "INV-2025-005" },
    { id: 6, course: "Data Science va AI", amount: 2500000, date: "2025-08-22", status: "success", method: "Click", invoice: "INV-2025-006" },
  ];

  // Filtrlash va qidiruv
  const filteredPayments = useMemo(() => {
    return allPayments.filter(payment => {
      const matchesSearch = payment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.invoice.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

      // Sana bo'yicha filtr (soddalashtirilgan)
      const now = new Date();
      const paymentDate = new Date(payment.date);
      let matchesDate = true;
      if (dateRange === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        matchesDate = paymentDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        matchesDate = paymentDate >= monthAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateRange]);

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const successCount = filteredPayments.filter(p => p.status === 'success').length;

  const getStatusBadge = (status) => {
    const styles = {
      success: "bg-green-100 text-green-800 border border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      failed: "bg-red-100 text-red-800 border border-red-200"
    };
    const icons = {
      success: <FaCheckCircle className="text-green-600" />,
      pending: <FaClock className="text-yellow-600" />,
      failed: <FaTimesCircle className="text-red-600" />
    };
    const texts = { success: "Muvaffaqiyatli", pending: "Kutishda", failed: "Muvaffaqiyatsiz" };

    return (
      <span className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${styles[status]}`}>
        {icons[status]} {texts[status]}
      </span>
    );
  };

  const handleViewInvoice = (invoice) => {
    alert(`Chek raqami: ${invoice}\nYakunda PDF yuklash ishlaydi!`);
    // Keyinroq jsPDF yoki backend orqali PDF generatsiya qilinadi
  };

  const handleDownloadReceipt = (payment) => {
    alert(`"${payment.course}" uchun chek yuklanmoqda...`);
    // Real loyihada: jsPDF ishlatiladi
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Sarlavha */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              To'lovlar tarixi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Barcha to'lovlaringizni bir joyda kuzatib boring
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalAmount.toLocaleString()} so'm
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Jami to'langan summa
            </p>
          </div>
        </div>

        {/* Statistik kartalar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
            <FaCreditCard size={40} className="mb-3 opacity-90" />
            <p className="text-blue-100 text-sm">Jami to'lovlar</p>
            <p className="text-3xl font-bold">{filteredPayments.length} ta</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl">
            <FaCheckCircle size={40} className="mb-3 opacity-90" />
            <p className="text-green-100 text-sm">Muvaffaqiyatli</p>
            <p className="text-3xl font-bold">{successCount} ta</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-6 rounded-2xl text-white shadow-xl">
            <FaClock size={40} className="mb-3 opacity-90" />
            <p className="text-yellow-100 text-sm">Kutishda</p>
            <p className="text-3xl font-bold">{filteredPayments.filter(p => p.status === 'pending').length} ta</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-2xl text-white shadow-xl">
            <FaTimesCircle size={40} className="mb-3 opacity-90" />
            <p className="text-red-100 text-sm">Muvaffaqiyatsiz</p>
            <p className="text-3xl font-bold">{filteredPayments.filter(p => p.status === 'failed').length} ta</p>
          </div>
        </div>

        {/* Filtrlar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Qidiruv */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Kurs nomi yoki chek raqami bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Status filtri */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Barcha holatlar</option>
              <option value="success">Muvaffaqiyatli</option>
              <option value="pending">Kutishda</option>
              <option value="failed">Muvaffaqiyatsiz</option>
            </select>

            {/* Sana filtri */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              <FaCalendarAlt className="inline" />
              <option value="all">Barcha vaqt</option>
              <option value="week">Oxirgi 7 kun</option>
              <option value="month">Oxirgi 30 kun</option>
            </select>
          </div>
        </div>

        {/* Jadval */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FaFilter className="text-blue-600" />
              To'lovlar ro'yxati
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Kurs</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Chek</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Summa</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sana</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Usul</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Holati</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <FaCreditCard size={64} className="mx-auto mb-4 opacity-30" />
                      <p>Hech qanday to'lov topilmadi</p>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                      <td className="px-6 py-5">
                        <p className="font-medium text-gray-900 dark:text-white">{payment.course}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{payment.invoice}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">
                          {payment.amount.toLocaleString()} so'm
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(payment.date).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`font-semibold ${
                          payment.method === 'Payme' ? 'text-green-600' :
                          payment.method === 'Click' ? 'text-blue-600' :
                          payment.method === 'Uzcard' ? 'text-purple-600' : 'text-orange-600'
                        }`}>
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleViewInvoice(payment.invoice)}
                            className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                            title="Chekni ko'rish"
                          >
                            <FaEye size={20} />
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(payment)}
                            className="text-green-600 hover:text-green-800 transition-transform hover:scale-110"
                            title="PDF yuklash"
                          >
                            <FaDownload size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Qo'shimcha eslatma */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Maslahat</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Barcha cheklar PDF formatida yuklab olinadi. Agar to'lovda muammo bo'lsa, <strong>qo'llab-quvvatlash</strong> xizmatiga murojaat qiling: 
            <a href="/contact" className="underline ml-1">+998 99 123-45-67</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payments;