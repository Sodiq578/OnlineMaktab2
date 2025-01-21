import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaCertificate, FaMoneyBillAlt, FaDesktop, FaCalendarAlt, FaCog, FaSignOutAlt, FaEnvelope, FaUser, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebarni ochish va yopish uchun holat

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Sidebar holatini teskari o'zgartirish
  };

  return (
    <div className="relative">
      {/* Burger menu button */}
      <div className="sidebar-box sm:hidden flex items-center justify-between p-4 bg-blue-500 text-white absolute left-0 top-0">
        {/* Yashirish h2 */}
        <h2 className="text-2xl font-semibold hidden">Asosiy Menyu</h2>
        <FaBars onClick={toggleSidebar} className="text-3xl cursor-pointer" />
      </div>

      {/* Sidebar (mobile) */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isOpen ? 'block' : 'hidden'} sm:hidden`} onClick={toggleSidebar}></div>
      <div className={`fixed top-0 left-0 bg-blue-500 text-white w-64 p-6 sm:hidden transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <ul className="space-y-6">
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaHome />
            <Link to="/dashboard/home">Bosh sahifa</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaBook />
            <Link to="/dashboard/my-courses">Mening Kurslarim</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaCertificate />
            <Link to="/dashboard/certificates">Sertifikatlarim</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaMoneyBillAlt />
            <Link to="/dashboard/payments">To'lovlar</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaDesktop />
            <Link to="/dashboard/devices">Qurilmalar</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaCalendarAlt />
            <Link to="/dashboard/events">Tadbirlar</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaCog />
            <Link to="/dashboard/settings">Sozlamalar</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaEnvelope />
            <Link to="/dashboard/messages">Xabarlar</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaUser />
            <Link to="/dashboard/profile">Profil</Link>
          </li>
          <li className="hover:text-blue-300 flex items-center space-x-4">
            <FaSignOutAlt />
            <Link to="/dashboard/logout">Chiqish</Link>
          </li>
        </ul>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block w-64 bg-blue-500 text-white p-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">Asosiy Menyu</h2>
        <ul>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaHome />
            <Link to="/dashboard/home">Bosh sahifa</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaBook />
            <Link to="/dashboard/my-courses">Mening Kurslarim</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaCertificate />
            <Link to="/dashboard/certificates">Sertifikatlarim</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaMoneyBillAlt />
            <Link to="/dashboard/payments">To'lovlar</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaDesktop />
            <Link to="/dashboard/devices">Qurilmalar</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaCalendarAlt />
            <Link to="/dashboard/events">Tadbirlar</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaCog />
            <Link to="/dashboard/settings">Sozlamalar</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaEnvelope />
            <Link to="/dashboard/messages">Xabarlar</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaUser />
            <Link to="/dashboard/profile">Profil</Link>
          </li>
          <li className="mb-6 hover:text-blue-300 flex items-center space-x-4">
            <FaSignOutAlt />
            <Link to="/dashboard/logout">Chiqish</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
