// src/admin/SectionsList.jsx - Agar mavjud bo'lsa
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { getVideoData, deleteSection } from '../data/videos';

const SectionsList = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = () => {
    try {
      const data = getVideoData();
      setSections(data);
    } catch (error) {
      console.error('Kurslarni yuklashda xato:', error);
    }
    setLoading(false);
  };

  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Bu kursni o\'chirishni tasdiqlaysizmi?')) {
      const success = deleteSection(sectionId);
      if (success) {
        alert('Kurs o\'chirildi!');
        loadSections();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kurslar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Barcha kurslar ({sections.length})</h1>
        <button
          onClick={() => navigate('/admin/add-course')}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          Yangi kurs qo'shish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(section => (
          <div key={section.sectionId} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={section.thumbnail}
                alt={section.sectionName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.sectionName}</h3>
                  <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                  {section.videoCount} video
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Narx: {section.price.toLocaleString()} so'm</span>
                <span>Reyting: {section.rating} ⭐</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/section/${section.sectionId}`)}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Videolar
                </button>
                <button
                  onClick={() => navigate(`/videos/${section.sectionName}`)}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Ko'rish
                </button>
                <button
                  onClick={() => handleDeleteSection(section.sectionId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsList;