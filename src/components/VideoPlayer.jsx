// src/components/VideoPlayer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, Home } from 'lucide-react';
import videoData from '../data/videos';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findVideo = () => {
      // Barcha kurslardagi videolarni izlash
      for (const section of videoData) {
        const video = section.videos.find(v => v.id === videoId);
        if (video) {
          setCurrentVideo({
            ...video,
            sectionName: section.sectionName,
            sectionId: section.sectionId
          });
          
          // Bog'liq videolarni olish (o'sha kursdagi boshqa videolar)
          const related = section.videos
            .filter(v => v.id !== videoId)
            .slice(0, 10);
          setRelatedVideos(related);
          break;
        }
      }
      setLoading(false);
    };

    findVideo();
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Video yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Video topilmadi</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={20} />
              Orqaga
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                {currentVideo.sectionName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentVideo.title}
              </p>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Home size={20} />
              Bosh sahifa
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              {currentVideo.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.src}`}
                  title={currentVideo.title}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={currentVideo.src}
                  controls
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                >
                  Sizning brauzeringiz video elementini qo'llab-quvvatlamaydi.
                </video>
              )}
            </div>

            {/* Video info */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {currentVideo.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
                      {currentVideo.sectionName}
                    </span>
                  </div>
                </div>
              </div>

              {currentVideo.description && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Tavsif:</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentVideo.description}
                  </p>
                </div>
              )}

              {currentVideo.exercise && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Amaliy vazifa:</h3>
                  <p className="text-yellow-700 dark:text-yellow-400">
                    {currentVideo.exercise}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related videos */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Play size={20} />
                Darslar ro'yxati
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {relatedVideos.length > 0 ? (
                  relatedVideos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => navigate(`/watch/${video.id}`)}
                      className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <img
                            src={video.thumbnail || `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x45?text=Video';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Play size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 dark:text-white text-sm line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                            {video.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Dars {index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Boshqa videolar mavjud emas
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate(`/videos/${currentVideo.sectionName}`)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition"
              >
                Barcha darslarni ko'rish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;