import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebarni faqat dashboardda ko'rsatish */}
      <Sidebar />

      {/* Asosiy kontent */}
      <div className="flex-1 p-6 sm:p-12 bg-gray-100 rounded-lg shadow-md flex flex-col overflow-hidden  max-h-[99vh]">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Onlayn Maktab Boshqaruv Paneli</h1>

        {/* Outlet joylashuvi */}
        <div>
  {/* Outlet uchun alohida scroll */}
  <div className="bg-white rounded-lg shadow-md flex-1 overflow-hidden">
    <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)', paddingBottom: '60px' }}>
      <Outlet />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
