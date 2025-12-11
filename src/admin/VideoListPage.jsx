// src/pages/VideoListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  ChevronLeft,
  Home,
  Search,
  Filter,
  User,
  Eye
} from 'lucide-react';

const VideoListPage = () => {
  const { subject } = useParams();
  const [section, setSection] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    loadSectionData();
    loadUserProgress();
  }, [subject]);

  const loadSectionData = () => {
    try {
      // Search in both storage locations
      const sections = JSON.parse(localStorage.getItem('sections') || '[]');
      const videoData = JSON.parse(localStorage.getItem('eduhub_videoData') || '[]');
      
      let foundSection = sections.find(s => 
        s.id === subject || 
        s.name.toLowerCase().includes(subject.toLowerCase())
      );
      
      if (!foundSection) {
        foundSection = videoData.find(v => 
          v.sectionId?.toString() === subject ||
          v.sectionName?.toLowerCase().includes(subject.toLowerCase())
        );
        
        if (foundSection) {
          foundSection = {
            ...foundSection,
            id: foundSection.sectionId || foundSection.id,
            name: foundSection.sectionName,
            videos: foundSection.videos || []
          };
        }
      }
      
      if (foundSection) {
        setSection(foundSection);
        setVideos(foundSection.videos || []);
        if (foundSection.videos?.length > 0) {
          setSelectedVideo(foundSection.videos[0]);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xato:', error);
      setLoading(false);
    }
  };

  const loadUserProgress = () => {
    try {
      const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      setUserProgress(progress[subject] || {});
    } catch (error) {
      console.error('Progress yuklashda xato:', error);
    }
  };

  const markAsCompleted = (videoId) => {
    const newProgress = {
      ...userProgress,
      [videoId]: true
    };
    
    setUserProgress(newProgress);
    
    // Save to localStorage
    const allProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    allProgress[subject] = newProgress;
    localStorage.setItem('userProgress', JSON.stringify(allProgress));
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl max-w-lg mx-4">
          <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Fan topilmadi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Siz qidirgan fan mavjud emas yoki o'chirilgan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
            >
              <ChevronLeft className="w-4 h-4 inline mr-2" />
              Bosh sahifaga
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition"
            >
              <Home className="w-4 h-4 inline mr-2" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {videos.length} ta video dars • {section.class || 'Umumiy'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Videolarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {Object.keys(userProgress).length}/{videos.length} bajarildi
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Video Darslar</h2>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                  {videos.length} ta
                </span>
              </div>
              
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedVideo?.id === video.id
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          userProgress[video.id]
                            ? 'bg-green-100 dark:bg-green-900'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {userProgress[video.id] ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium line-clamp-1">
                              {index + 1}. {video.title}
                            </h3>
                            {video.duration && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {video.duration}
                              </span>
                            )}
                          </div>
                          {video.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {video.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
                
                {filteredVideos.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Hech qanday video topilmadi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <motion.div
                key={selectedVideo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Video Player */}
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.src || selectedVideo.id}`}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {selectedVideo.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {selectedVideo.duration}
                          </span>
                        )}
                        {section.name && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {section.name}
                          </span>
                        )}
                      </div>
                    </div>
                    {!userProgress[selectedVideo.id] && (
                      <button
                        onClick={() => markAsCompleted(selectedVideo.id)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Bajarildi
                      </button>
                    )}
                  </div>

                  {selectedVideo.description && (
                    <div className="mb-6">
                      <h3 className="font-bold mb-2">Tavsif</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedVideo.description}
                      </p>
                    </div>
                  )}

                  {selectedVideo.exercise && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5">
                      <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2">
                        ✏️ Vazifa/Mashq
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        {selectedVideo.exercise}
                      </p>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Object.keys(userProgress).length}/{videos.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(Object.keys(userProgress).length / videos.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
                <Play className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
                <h2 className="text-xl font-bold mb-4">Video tanlang</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Ko'rish uchun chap tomondan video tanlang
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoListPage;