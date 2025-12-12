// src/admin/SectionVideos.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Edit, Trash2, ArrowLeft, Plus, Eye } from 'lucide-react';
import { getVideoData, deleteVideo } from '../data/videos';

const SectionVideos = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSectionVideos();
  }, [sectionId]);

  const loadSectionVideos = () => {
    setLoading(true);
    try {
      const sections = getVideoData();
      const foundSection = sections.find(s => s.sectionId === parseInt(sectionId));
      
      if (foundSection) {
        setSection(foundSection);
        console.log(`✅ ${foundSection.sectionName} kursi yuklandi:`, foundSection.videos.length, 'ta video');
      } else {
        console.log(`❌ ${sectionId} ID li kurs topilmadi`);
        setSection(null);
      }
    } catch (error) {
      console.error('Kursni yuklashda xato:', error);
    }
    setLoading(false);
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm('Bu videoni o\'chirishni tasdiqlaysizmi?')) {
      const success = deleteVideo(sectionId, videoId);
      if (success) {
        alert('Video o\'chirildi!');
        loadSectionVideos(); // Ro'yxatni yangilash
      } else {
        alert('Video o\'chirishda xatolik!');
      }
    }
  };

  const handleWatchVideo = (video) => {
    if (video.type === 'youtube') {
      window.open(`https://youtube.com/watch?v=${video.src}`, '_blank');
    } else {
      window.open(video.src, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Videolar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kurs topilmadi</h2>
          <button
            onClick={() => navigate('/admin/courses')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Kurslar ro'yxatiga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/courses')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Orqaga
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{section.sectionName}</h1>
              <p className="text-gray-600">{section.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/admin/add-video?sectionId=${sectionId}`)}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center gap-2"
            >
              <Plus size={20} />
              Yangi video qo'shish
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{section.videoCount}</div>
            <div className="text-blue-600">Jami videolar</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
            <div className="text-3xl font-bold text-green-700">{section.enrolled.toLocaleString()}</div>
            <div className="text-green-600">O'quvchilar</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700">{section.rating}</div>
            <div className="text-yellow-600">Reyting</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <div className="text-3xl font-bold text-purple-700">{section.price.toLocaleString()}</div>
            <div className="text-purple-600">so'm</div>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Kurs videolari ({section.videos.length})</h2>
        </div>

        {section.videos.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Hali videolar yo'q</h3>
            <p className="text-gray-600 mb-8">Biror video qo'shing yoki kurs ma'lumotlarini yangilang</p>
            <button
              onClick={() => navigate(`/admin/add-video?sectionId=${sectionId}`)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Birinchi video qo'shish
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {section.videos.map((video, index) => (
              <div key={video.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=Video';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center">
                            <Play className="text-white" size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                            #{index + 1}
                          </span>
                          <span className={`px-3 py-1 ${video.type === 'youtube' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'} text-sm font-medium rounded-full`}>
                            {video.type === 'youtube' ? 'YouTube' : 'Local'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{video.title}</h3>
                        
                        {video.description && (
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{video.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>ID: <code className="bg-gray-100 px-2 py-1 rounded">{video.id.substring(0, 15)}...</code></span>
                          <span>Manba: <code className="bg-gray-100 px-2 py-1 rounded">{video.src.substring(0, 20)}...</code></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleWatchVideo(video)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                      title="Ko'rish"
                    >
                      <Eye size={16} />
                      Ko'rish
                    </button>
                    
                    <button
                      onClick={() => navigate(`/watch/${video.id}`)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                      title="Play"
                    >
                      <Play size={16} />
                      O'ynatish
                    </button>
                    
                    <button
                      onClick={() => alert('Tahrirlash tez orada qo\'shiladi')}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2"
                      title="Tahrirlash"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                      title="O'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {video.exercise && (
                  <div className="mt-4 ml-20 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h4 className="font-medium text-yellow-800 mb-1">Amaliy vazifa:</h4>
                    <p className="text-yellow-700 text-sm">{video.exercise}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Jami <span className="font-bold text-gray-800">{section.videos.length}</span> ta video
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/add-video')}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg flex items-center gap-2"
              >
                <Plus size={18} />
                Yangi video
              </button>
              <button
                onClick={loadSectionVideos}
                className="px-6 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg"
              >
                Yangilash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export/Import buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => {
            const data = JSON.stringify(section.videos, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${section.sectionName}-videos.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl"
        >
          Videolarni eksport qilish
        </button>
        
        <button
          onClick={() => {
            const data = localStorage.getItem('eduhub_videoData');
            console.log("LocalStorage ma'lumotlari:", JSON.parse(data));
            alert('Ma\'lumotlar konsolda ko\'rsatildi (F12)');
          }}
          className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl"
        >
          Ma'lumotlarni tekshirish
        </button>
      </div>
    </div>
  );
};

export default SectionVideos;