import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaCertificate, FaMoneyBillAlt, FaDesktop, FaCalendarAlt, FaCog, FaSignOutAlt, FaEnvelope, FaUser, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 640) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="sidebar-box sm:hidden flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white absolute left-0 top-0 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold hidden">Asosiy Menyu</h2>
        <FaBars onClick={toggleSidebar} className="text-3xl cursor-pointer" />
      </div>

      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isOpen ? 'block' : 'hidden'} sm:hidden`} onClick={toggleSidebar}></div>
      <div className={`fixed top-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-64 p-6 sm:hidden transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg rounded-md`}>
        <ul className="space-y-6">
          <Link to="/dashboard/home" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaHome />
              <span>Bosh sahifa</span>
            </li>
          </Link>
          <Link to="/dashboard/my-courses" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaBook />
              <span>Mening Kurslarim</span>
            </li>
          </Link>
          <Link to="/dashboard/certificates" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCertificate />
              <span>Sertifikatlarim</span>
            </li>
          </Link>
          <Link to="/dashboard/payments" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaMoneyBillAlt />
              <span>To'lovlar</span>
            </li>
          </Link>
         
          <Link to="/dashboard/events" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCalendarAlt />
              <span>Ta'lim yangiliklari</span>
            </li>
          </Link>
          <Link to="/dashboard/settings" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCog />
              <span>Sozlamalar</span>
            </li>
          </Link>
          <Link to="/dashboard/messages" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaEnvelope />
              <span>Xabarlar</span>
            </li>
          </Link>
          <Link to="/dashboard/profile" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaUser />
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/dashboard/logout" onClick={handleLinkClick}>
            <li className="sidebar-mobile-title hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaSignOutAlt />
              <span>Chiqish</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block w-64 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 h-screen overflow-y-auto shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-8 text-center">Asosiy Menyu</h2>
        <ul>
          <Link to="/dashboard/home">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaHome />
              <span>Bosh sahifa</span>
            </li>
          </Link>
          <Link to="/dashboard/my-courses">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaBook />
              <span>Mening Kurslarim</span>
            </li>
          </Link>
          <Link to="/dashboard/certificates">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCertificate />
              <span>Sertifikatlarim</span>
            </li>
          </Link>
          <Link to="/dashboard/payments">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaMoneyBillAlt />
              <span>To'lovlar</span>
            </li>
          </Link>
       
          <Link to="/dashboard/events">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCalendarAlt />
              <span>Ta'lim yangiliklari</span>
            </li>
          </Link>
          <Link to="/dashboard/settings">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaCog />
              <span>Sozlamalar</span>
            </li>
          </Link>
          <Link to="/dashboard/messages">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaEnvelope />
              <span>Xabarlar</span>
            </li>
          </Link>
          <Link to="/dashboard/profile">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaUser />
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/dashboard/logout">
            <li className="sidebar-mobile-title mb-6 hover:bg-blue-400 hover:text-white flex items-center space-x-4 p-3 rounded-md transition duration-200">
              <FaSignOutAlt />
              <span>Chiqish</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
