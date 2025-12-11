// src/admin/SectionsList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const SectionVideos = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  useEffect(() => {
    fetchSectionData();
  }, [sectionId]);

  const fetchSectionData = () => {
    setTimeout(() => {
      const sections = JSON.parse(localStorage.getItem('sections') || '[]');
      const currentSection = sections.find(s => s.id === sectionId);
      
      if (currentSection) {
        setSection(currentSection);
        setVideos(currentSection.videos || []);
      }
      setLoading(false);
    }, 600);
  };

  const handleDeleteVideo = (videoId) => {
    const sections = JSON.parse(localStorage.getItem('sections') || '[]');
    const updatedSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: s.videos.filter(v => v.id !== videoId)
        };
      }
      return s;
    });
    
    localStorage.setItem('sections', JSON.stringify(updatedSections));
    setVideos(videos.filter(v => v.id !== videoId));
    setShowDeleteModal(false);
  };

  const toggleVideoVisibility = (videoId) => {
    const updatedVideos = videos.map(video => {
      if (video.id === videoId) {
        return { ...video, published: !video.published };
      }
      return video;
    });

    const sections = JSON.parse(localStorage.getItem('sections') || '[]');
    const updatedSections = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, videos: updatedVideos };
      }
      return s;
    });

    localStorage.setItem('sections', JSON.stringify(updatedSections));
    setVideos(updatedVideos);
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Fan topilmadi</h2>
        <Link to="/admin" className="text-indigo-600 hover:underline">
          Dashboardga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">{section.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {section.class} - sinf • {videos.length} ta video dars
          </p>
        </div>
        <Link
          to={`/admin/section/${sectionId}/add-video`}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Yangi Video Qo'shish
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Videolarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <Video className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? 'Hech qanday video topilmadi' : 'Hali videolar qo\'shilmagan'}
          </p>
          {!searchTerm && (
            <Link
              to={`/admin/section/${sectionId}/add-video`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" />
              Birinchi Video Qo'shish
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Video Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleVideoVisibility(video.id)}
                    className={`p-2 rounded-full ${video.published ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                  >
                    {video.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg line-clamp-1">{video.title}</h3>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                    {video.duration} daqiqa
                  </span>
                  <span className="text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                  <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => {
                      setVideoToDelete(video.id);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    O'chirish
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Videoni o'chirish</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bu videoni o'chirishni istaysizmi? Bu amalni bekor qilib bo'lmaydi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => handleDeleteVideo(videoToDelete)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                O'chirish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SectionVideos;