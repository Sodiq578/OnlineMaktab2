// src/admin/SectionsList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import videoData, { updateAndSave } from '../data/videos'; // updateAndSave import qilindi
import AddVideoForm from './AddVideoForm';

const SectionVideos = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  // sectionId bo‘yicha fan topish
  const section = videoData.find(s => s.sectionId === parseInt(sectionId));

  // Agar fan topilmasa — 404 yoki orqaga qaytarish
  useEffect(() => {
    if (!section) {
      alert("Bunday fan topilmadi!");
      navigate('/admin');
    }
  }, [section, navigate]);

  // Videolarni yangilash uchun state
  const [videos, setVideos] = useState(section?.videos || []);

  // Har safar section o‘zgarsa — videosni yangilash
  useEffect(() => {
    if (section) {
      setVideos(section.videos);
    }
  }, [section]);

  // Video o‘chirish funksiyasi
  const handleDelete = (videoId) => {
    if (window.confirm('Bu videoni haqiqatan ham o‘chirmoqchimisiz?')) {
      // Videoni o‘chirish
      section.videos = section.videos.filter(v => v.id !== videoId);
      
      // localStorage’ga saqlash
      updateAndSave();

      // UI ni yangilash
      setVideos([...section.videos]);

      alert('Video muvaffaqiyatli o‘chirildi!');
    }
  };

  // Agar section topilmasa — hech narsa ko‘rsatmaslik
  if (!section) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Orqaga tugmasi */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold mb-6 transition"
      >
        ← Bosh sahifaga qaytish
      </Link>

      {/* Sarlavha */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {section.sectionName}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Jami videolar: <span className="font-bold text-indigo-600">{section.videos.length} ta</span>
        </p>
      </div>

      {/* Yangi video qo‘shish formasi */}
      <div className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Yangi Video Qo‘shish</h2>
        <AddVideoForm
          sectionId={sectionId}
          onSuccess={() => {
            setVideos([...section.videos]);
            updateAndSave(); // Qo‘shimcha xavfsizlik
          }}
        />
      </div>

      {/* Videolar ro‘yxati */}
      <div className="space-y-6">
        {videos.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <p className="text-xl text-gray-500">Hozircha bu fanda video yo‘q</p>
            <p className="text-gray-400 mt-2">Yuqoridagi formadan birinchi videoni qo‘shing!</p>
          </div>
        ) : (
          videos.map((video, index) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-full text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">Turi:</span> {video.type === 'youtube' ? 'YouTube' : 'Mahalliy'}</p>
                    <p><span className="font-medium">ID/Manba:</span> <code className="bg-gray-100 px-2 py-1 rounded">{video.src}</code></p>
                  </div>

                  {video.exercise && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800">Amaliy vazifa:</p>
                      <p className="text-green-700 mt-1">{video.exercise}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(video.id)}
                  className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition transform hover:scale-105 shadow-md"
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

export default SectionVideos;