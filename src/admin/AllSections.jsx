// src/admin/AllSections.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  PlusCircle,
  ArrowLeft,
  MoreVertical,
  FileVideo,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

const AllSections = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [filterClass, setFilterClass] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  useEffect(() => {
    filterAndSortSections();
  }, [sections, searchTerm, filterStatus, filterClass, sortBy]);

  const loadSections = () => {
    try {
      // Ikki manbadan ma'lumotlarni olish
      const sectionsData = JSON.parse(localStorage.getItem('sections') || '[]');
      const videoData = JSON.parse(localStorage.getItem('eduhub_videoData') || '[]');
      
      // Birlashtirilgan ma'lumotlar
      const allSections = [...sectionsData];
      
      // videoData'dan qo'shish
      videoData.forEach(item => {
        if (!allSections.some(s => s.id === (item.sectionId?.toString() || item.id))) {
          allSections.push({
            id: item.sectionId?.toString() || item.id || Date.now().toString(),
            name: item.sectionName || item.name || 'Noma\'lum',
            class: item.class || 'Umumiy',
            videos: item.videos || [],
            createdAt: item.createdAt || new Date().toISOString(),
            published: item.published !== false,
            description: item.description || '',
            thumbnail: item.thumbnail,
            category: item.category || 'general',
            price: item.price || 0,
            rating: item.rating || 4.5,
            enrolled: item.enrolled || 0,
            videoCount: item.videos?.length || 0,
            totalDuration: item.totalDuration || 0
          });
        }
      });

      setSections(allSections);
      setLoading(false);
    } catch (error) {
      console.error('Fanlarni yuklashda xato:', error);
      setLoading(false);
    }
  };

  const filterAndSortSections = () => {
    let filtered = [...sections];

    // Qidirish bo'yicha filter
    if (searchTerm) {
      filtered = filtered.filter(section =>
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.description && section.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        section.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status bo'yicha filter
    if (filterStatus === 'active') {
      filtered = filtered.filter(section => section.published !== false);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter(section => section.published === false);
    }

    // Sinf bo'yicha filter
    if (filterClass !== 'all') {
      filtered = filtered.filter(section => section.class === filterClass);
    }

    // Sortlash
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'videos_asc':
          return (a.videos?.length || 0) - (b.videos?.length || 0);
        case 'videos_desc':
          return (b.videos?.length || 0) - (a.videos?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredSections(filtered);
  };

  const handleDeleteSection = () => {
    try {
      // sections localStorage'dan o'chirish
      let sectionsData = JSON.parse(localStorage.getItem('sections') || '[]');
      sectionsData = sectionsData.filter(s => s.id !== sectionToDelete);
      localStorage.setItem('sections', JSON.stringify(sectionsData));
      
      // videoData localStorage'dan o'chirish
      let videoData = JSON.parse(localStorage.getItem('eduhub_videoData') || '[]');
      videoData = videoData.filter(v => v.sectionId?.toString() !== sectionToDelete && v.id !== sectionToDelete);
      localStorage.setItem('eduhub_videoData', JSON.stringify(videoData));
      
      // User progresslarni tozalash
      const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      delete userProgress[sectionToDelete];
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      
      loadSections();
      setShowDeleteModal(false);
      setSectionToDelete(null);
      
      alert('Fan muvaffaqiyatli o\'chirildi!');
    } catch (error) {
      console.error('Fan o\'chirishda xato:', error);
      alert('Fan o\'chirishda xato yuz berdi!');
    }
  };

  const toggleSectionVisibility = (sectionId) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, published: !section.published };
      }
      return section;
    });

    // sections localStorage'ni yangilash
    let sectionsData = JSON.parse(localStorage.getItem('sections') || '[]');
    const sectionIndex = sectionsData.findIndex(s => s.id === sectionId);
    
    if (sectionIndex !== -1) {
      sectionsData[sectionIndex].published = !sectionsData[sectionIndex].published;
      localStorage.setItem('sections', JSON.stringify(sectionsData));
    } else {
      // videoData localStorage'ni yangilash
      let videoData = JSON.parse(localStorage.getItem('eduhub_videoData') || '[]');
      const videoDataIndex = videoData.findIndex(v => 
        v.sectionId?.toString() === sectionId || v.id === sectionId
      );
      
      if (videoDataIndex !== -1) {
        videoData[videoDataIndex].published = !videoData[videoDataIndex].published;
        localStorage.setItem('eduhub_videoData', JSON.stringify(videoData));
      }
    }

    setSections(updatedSections);
  };

  const exportSectionsCSV = () => {
    try {
      const csvRows = [];
      
      // CSV header
      const headers = ['ID', 'Nomi', 'Sinf', 'Videolar Soni', 'Holati', 'Yaratilgan sana', 'Tavsif'];
      csvRows.push(headers.join(','));
      
      // Data rows
      sections.forEach(section => {
        const row = [
          section.id,
          `"${section.name}"`,
          section.class,
          section.videos?.length || 0,
          section.published !== false ? 'Aktiv' : 'Nashr etilmagan',
          new Date(section.createdAt).toLocaleDateString(),
          `"${(section.description || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
      });
      
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fanlar-ro'yxati-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setShowExportModal(false);
      alert('CSV fayl muvaffaqiyatli yuklab olindi!');
    } catch (error) {
      console.error('CSV eksport qilishda xato:', error);
      alert('CSV eksport qilishda xato yuz berdi!');
    }
  };

  const getUniqueClasses = () => {
    const classes = sections.map(s => s.class).filter(Boolean);
    return ['all', ...new Set(classes)];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Fanlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Barcha Fanlar</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {sections.length} ta fan • {sections.reduce((acc, s) => acc + (s.videos?.length || 0), 0)} ta video
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV Export
          </button>
          <button
            onClick={loadSections}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Yangilash
          </button>
          <Link
            to="/admin/add-section"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center gap-2 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Yangi Fan
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Fanlarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-600 transition"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Barcha holatlar</option>
              <option value="active">Faqat aktiv</option>
              <option value="inactive">Faqat yashirin</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Barcha sinflar</option>
              {getUniqueClasses()
                .filter(c => c !== 'all')
                .map(className => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Saralash:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'newest', label: 'Yangi' },
              { value: 'oldest', label: 'Eski' },
              { value: 'name_asc', label: 'A-Z' },
              { value: 'name_desc', label: 'Z-A' },
              { value: 'videos_desc', label: 'Ko\'p videolar' },
              { value: 'videos_asc', label: 'Kam videolar' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  sortBy === option.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      {filteredSections.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FileVideo className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Fanlar topilmadi</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterStatus !== 'all' || filterClass !== 'all'
              ? 'Qidiruv bo\'yicha hech narsa topilmadi'
              : 'Hali fanlar qo\'shilmagan'}
          </p>
          <div className="flex gap-3 justify-center">
            {(searchTerm || filterStatus !== 'all' || filterClass !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterClass('all');
                }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Filterni tozalash
              </button>
            )}
            <Link
              to="/admin/add-section"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
            >
              <PlusCircle className="w-5 h-5 inline mr-2" />
              Yangi Fan Qo'shish
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Section Header */}
              <div 
                className="h-32 relative bg-gradient-to-r from-indigo-500 to-purple-600"
                style={section.color ? { background: section.color } : {}}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-4xl">{section.icon || '📚'}</div>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleSectionVisibility(section.id)}
                    className={`p-2 rounded-full ${section.published !== false ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white transition`}
                    title={section.published !== false ? 'Yashirish' : 'Ko\'rsatish'}
                  >
                    {section.published !== false ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{section.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {section.class}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileVideo className="w-4 h-4" />
                        {section.videos?.length || 0} video
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {section.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {section.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm mb-6">
                  <div className="flex items-center gap-2">
                    {section.createdAt && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(section.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    section.published !== false
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {section.published !== false ? 'Aktiv' : 'Yashirin'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/admin/section/${section.id}/videos`}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition text-center text-sm"
                  >
                    Videolar
                  </Link>
                  <button
                    onClick={() => {
                      // Tahrirlash - oddiy prompt orqali
                      const newName = prompt('Yangi nom:', section.name);
                      if (newName && newName.trim()) {
                        const updatedSections = sections.map(s =>
                          s.id === section.id ? { ...s, name: newName } : s
                        );
                        
                        // localStorage'ni yangilash
                        let sectionsData = JSON.parse(localStorage.getItem('sections') || '[]');
                        const sectionIndex = sectionsData.findIndex(s => s.id === section.id);
                        
                        if (sectionIndex !== -1) {
                          sectionsData[sectionIndex].name = newName;
                          localStorage.setItem('sections', JSON.stringify(sectionsData));
                        } else {
                          let videoData = JSON.parse(localStorage.getItem('eduhub_videoData') || '[]');
                          const videoDataIndex = videoData.findIndex(v => 
                            v.sectionId?.toString() === section.id || v.id === section.id
                          );
                          
                          if (videoDataIndex !== -1) {
                            videoData[videoDataIndex].sectionName = newName;
                            localStorage.setItem('eduhub_videoData', JSON.stringify(videoData));
                          }
                        }
                        
                        setSections(updatedSections);
                      }
                    }}
                    className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center"
                    title="Tahrirlash"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSectionToDelete(section.id);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center justify-center"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {sections.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Jami fanlar</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {sections.filter(s => s.published !== false).length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aktiv fanlar</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {sections.reduce((acc, s) => acc + (s.videos?.length || 0), 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Jami videolar</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {getUniqueClasses().length - 1}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sinf turlari</p>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fan o'chirish</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bu fanni o'chirishni istaysizmi?<br />
                Barcha videolari ham o'chiriladi!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSectionToDelete(null);
                }}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDeleteSection}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                O'chirish
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">CSV Export</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fanlar ro'yxatini CSV formatida yuklab olishni istaysizmi?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={exportSectionsCSV}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Yuklab Olish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AllSections;