// src/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videoData, updateAndSave } from '../data/videos';

const AdminDashboard = () => {
  const [sections, setSections] = useState(videoData);

  // Fanni o'chirish funksiyasi
  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Bu fanni va uning barcha videolarini o‘chirmoqchimisiz?')) {
      const index = videoData.findIndex(s => s.sectionId === sectionId);
      if (index !== -1) {
        videoData.splice(index, 1);
        updateAndSave();
        setSections([...videoData]);
        alert('Fan muvaffaqiyatli o‘chirildi!');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Fanlar ro‘yxati</h2>
          <p className="text-lg text-gray-600 mt-2">
            Jami: <span className="font-bold text-indigo-600">{sections.length} ta fan</span>
          </p>
        </div>
        
        <Link
          to="/admin/add-section"
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition shadow-lg flex items-center gap-3"
        >
          <span>+</span> Yangi fan qo‘shish
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <p className="text-2xl text-gray-500">Hozircha fanlar mavjud emas</p>
            <p className="text-gray-400 mt-2">Yangi fan qo‘shish uchun yuqoridagi tugmani bosing</p>
          </div>
        ) : (
          sections.map((section) => (
            <div 
              key={section.sectionId} 
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{section.sectionName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                      ID: {section.sectionId}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-1">
                  Videolar soni: <span className="font-bold text-indigo-600">{section.videos.length} ta</span>
                </p>
                {section.videos.length > 0 ? (
                  <p className="text-sm text-gray-500">
                    Oxirgi video: <span className="font-medium">{section.videos[section.videos.length - 1]?.title}</span>
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to={`/admin/section/${section.sectionId}/videos`}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-lg font-bold text-center hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
                >
                  Videolar
                </Link>
                
                <button
                  onClick={() => {
                    const newName = prompt('Yangi fan nomi:', section.sectionName);
                    if (newName && newName.trim()) {
                      section.sectionName = newName.trim();
                      updateAndSave();
                      setSections([...videoData]);
                      alert('Fan nomi yangilandi!');
                    }
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition shadow-md"
                >
                  Tahrirlash
                </button>
                
                <button
                  onClick={() => handleDeleteSection(section.sectionId)}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-3 rounded-lg font-bold hover:from-red-700 hover:to-pink-700 transition shadow-md"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;