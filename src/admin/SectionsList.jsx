// src/admin/SectionVideos.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Film, Hash } from 'lucide-react';
import videoData, { updateAndSave } from '../data/videos';
import AddVideoForm from './AddVideoForm';

const SectionVideos = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  
  const section = videoData.find(s => s.sectionId === parseInt(sectionId));
  const [videos, setVideos] = useState(section?.videos || []);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!section) {
      alert("Bunday fan topilmadi!");
      navigate('/admin');
    } else {
      setVideos(section.videos);
    }
  }, [section, navigate]);

  const handleDelete = (videoId) => {
    if (!window.confirm('Bu videoni o‘chirmoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi.')) return;

    section.videos = section.videos.filter(v => v.id !== videoId);
    updateAndSave();
    setVideos([...section.videos]);
  };

  const handleVideoAdded = () => {
    setVideos([...section.videos]);
    setShowAddForm(false);
  };

  if (!section) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition mb-6"
          >
            <ArrowLeft size={20} />
            Bosh sahifaga qaytish
          </Link>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <h1 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {section.sectionName}
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              Jami videolar: <span className="font-bold text-indigo-600 text-2xl">{videos.length}</span> ta
            </p>
          </div>
        </div>

        {/* Add Video Toggle Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus size={24} />
            {showAddForm ? 'Formani yopish' : 'Yangi video qo‘shish'}
          </button>
        </div>

        {/* Add Video Form */}
        {showAddForm && (
          <div className="mb-12 animate-in slide-in-from-top-4 duration-500">
            <AddVideoForm
              sectionId={sectionId}
              onSuccess={handleVideoAdded}
            />
          </div>
        )}

        {/* Videos List */}
        <div className="grid gap-6">
          {videos.length === 0 ? (
            <div className="text-center py-20 bg-white/60 backdrop-blur rounded-3xl border-2 border-dashed border-indigo-200">
              <Film size={64} className="mx-auto text-indigo-400 mb-4" />
              <p className="text-2xl font-semibold text-gray-600">Hozircha video yo‘q</p>
              <p className="text-gray-500 mt-2">Yuqoridagi tugma orqali birinchi videoni qo‘shing!</p>
            </div>
          ) : (
            videos.map((video, index) => (
              <div
                key={video.id}
                className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {index + 1}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition">
                          {video.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Film size={18} className="text-indigo-500" />
                          <span>{video.type === 'youtube' ? 'YouTube' : 'Mahalliy video'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Hash size={18} className="text-purple-500" />
                          <code className="bg-gray-100 px-3 py-1 rounded-lg font-mono text-xs">
                            {video.src}
                          </code>
                        </div>
                        {video.exercise && (
                          <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-xs">
                            Amaliy vazifa bor
                          </span>
                        )}
                      </div>

                      {video.exercise && (
                        <div className="mt-5 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                          <p className="font-semibold text-green-800 mb-1">Amaliy vazifa:</p>
                          <p className="text-green-700 leading-relaxed">{video.exercise}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(video.id)}
                      className="ml-6 p-4 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-2xl transition-all duration-300 group-hover:scale-110"
                      title="O‘chirish"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;