// src/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import videoData, { updateAndSave } from '../data/videos';

const AdminDashboard = () => {
  const handleDelete = (sectionId) => {
    if (window.confirm('Bu fanni butunlay o‘chirmoqchimisiz?')) {
      const index = videoData.findIndex(s => s.sectionId === sectionId);
      if (index !== -1) {
        videoData.splice(index, 1);
        updateAndSave();
        window.location.reload();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold">Admin Panel</h2>
          <p className="text-xl text-gray-600">Jami fanlar: {videoData.length}</p>
        </div>
        <Link to="/admin/add-section" className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700">
          + Yangi Fan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoData.map(section => (
          <div key={section.sectionId} className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{section.sectionName}</h3>
            <p className="text-gray-600 mb-6">Videolar: {section.videos.length} ta</p>
            
            <div className="flex gap-3">
              <Link to={`/admin/section/${section.sectionId}/videos`} className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg font-bold hover:bg-indigo-700">
                Videolar
              </Link>
              <button onClick={() => handleDelete(section.sectionId)} className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;