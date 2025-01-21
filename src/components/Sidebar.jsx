import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaCertificate, FaMoneyBillAlt, FaDesktop, FaCalendarAlt, FaCog, FaSignOutAlt, FaEnvelope, FaUser, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebarni ochish va yopish uchun holat

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Sidebar holatini teskari o'zgartirish
  };

  return (
    <div className="relative">
      {/* Burger menu button */}
      <div className="sidebar-box sm:hidden flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white absolute left-0 top-0 rounded-md shadow-lg">
        {/* Yashirish h2 */}
        <h2 className="text-2xl font-semibold hidden">Asosiy Menyu</h2>
        <FaBars onClick={toggleSidebar} className="text-3xl cursor-pointer" />
      </div>

      {/* Mobile Sidebar (hidden on larger screens) */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isOpen ? 'block' : 'hidden'} sm:hidden`} onClick={toggleSidebar}></div>
      <div className={`fixed top-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-64 p-6 sm:hidden transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg rounded-md`}>
        <ul className="space-y-6">
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaHome />
            <Link to="/dashboard/home">Bosh sahifa</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaBook />
            <Link to="/dashboard/my-courses">Mening Kurslarim</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCertificate />
            <Link to="/dashboard/certificates">Sertifikatlarim</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaMoneyBillAlt />
            <Link to="/dashboard/payments">To'lovlar</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaDesktop />
            <Link to="/dashboard/devices">Qurilmalar</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCalendarAlt />
            <Link to="/dashboard/events">Tadbirlar</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCog />
            <Link to="/dashboard/settings">Sozlamalar</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaEnvelope />
            <Link to="/dashboard/messages">Xabarlar</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaUser />
            <Link to="/dashboard/profile">Profil</Link>
          </li>
          <li className="hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaSignOutAlt />
            <Link to="/dashboard/logout">Chiqish</Link>
          </li>
        </ul>
      </div>

      {/* Desktop Sidebar (visible on larger screens) */}
      <div className="hidden sm:block w-64 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 h-screen overflow-y-auto shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-8 text-center">Asosiy Menyu</h2>
        <ul>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaHome />
            <Link to="/dashboard/home">Bosh sahifa</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaBook />
            <Link to="/dashboard/my-courses">Mening Kurslarim</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCertificate />
            <Link to="/dashboard/certificates">Sertifikatlarim</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaMoneyBillAlt />
            <Link to="/dashboard/payments">To'lovlar</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaDesktop />
            <Link to="/dashboard/devices">Qurilmalar</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCalendarAlt />
            <Link to="/dashboard/events">Tadbirlar</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaCog />
            <Link to="/dashboard/settings">Sozlamalar</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaEnvelope />
            <Link to="/dashboard/messages">Xabarlar</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaUser />
            <Link to="/dashboard/profile">Profil</Link>
          </li>
          <li className="mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
            <FaSignOutAlt />
            <Link to="/dashboard/logout">Chiqish</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
