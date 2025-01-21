import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebarni faqat dashboardda ko'rsatish */}
      <Sidebar />
      
      {/* Asosiy kontent */}
      <div className="dashboard-box flex-1 p-6 sm:p-12 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">Sizning asosiy boshqaruv panelingiz. Bu yerda barcha muhim ma'lumotlarni ko'rishingiz mumkin.</p>

        {/* Sidebar orqali o'zgaruvchi sahifalar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
