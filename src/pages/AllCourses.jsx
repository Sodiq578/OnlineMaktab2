// src/pages/AllCourses.jsx (Optimized version)
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import videoData from '../data/videos';
import { 
  FaPlay, FaLock, FaStar, FaUsers, FaClock, FaSearch,
  FaFire, FaTrophy, FaRocket, FaFilter, FaChevronRight,
  FaSpinner, FaTags, FaSortAmountDown, FaChartLine
} from 'react-icons/fa';

const AllCourses = () => {
  const navigate = useNavigate();
  const { purchasedCourses = [] } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(false);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set(['all']);
    videoData.forEach(course => {
      course.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    setLoading(true);
    const filtered = videoData.filter(course => {
      const matchesSearch = 
        course.sectionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = selectedTag === 'all' || course.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return (a.price || 0) - (b.price || 0);
        case 'price-high': return (b.price || 0) - (a.price || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return (b.createdAt || 0) - (a.createdAt || 0);
        case 'videos': return (b.videoCount || 0) - (a.videoCount || 0);
        default: return (b.enrolled || 0) - (a.enrolled || 0); // popular
      }
    });

    setTimeout(() => setLoading(false), 300);
    return filtered;
  }, [searchTerm, selectedTag, sortBy]);

  const isPurchased = (sectionId) => 
    purchasedCourses?.some(p => p.sectionId === sectionId);

  const getTagColor = (tag) => {
    const colors = {
      'React': 'from-purple-500 to-pink-500',
      'JavaScript': 'from-yellow-400 to-orange-500',
      'Node.js': 'from-green-500 to-emerald-600',
      'UI/UX': 'from-pink-500 to-rose-500',
      'HTML': 'from-orange-500 to-red-500',
      'CSS': 'from-blue-500 to-cyan-500',
      'Python': 'from-blue-400 to-indigo-500',
      'all': 'from-blue-500 to-purple-600'
    };
    return colors[tag] || 'from-gray-500 to-gray-600';
  };

  const getStats = useMemo(() => {
    const totalCourses = videoData.length;
    const totalStudents = videoData.reduce((sum, c) => sum + (c.enrolled || 0), 0);
    const totalVideos = videoData.reduce((sum, c) => sum + (c.videoCount || 0), 0);
    const avgRating = (videoData.reduce((sum, c) => sum + (c.rating || 0), 0) / totalCourses).toFixed(1);
    
    return { totalCourses, totalStudents, totalVideos, avgRating };
  }, []);

  const sortOptions = [
    { id: 'popular', name: 'Ommabop', icon: <FaFire /> },
    { id: 'rating', name: 'Yuqori Reyting', icon: <FaStar /> },
    { id: 'newest', name: 'Yangi', icon: <FaRocket /> },
    { id: 'price-low', name: 'Arzondan', icon: <FaSortAmountDown /> },
    { id: 'price-high', name: 'Qimmatdan', icon: <FaChartLine /> },
    { id: 'videos', name: "Ko'p Videolar", icon: <FaClock /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Barcha Kurslar
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {getStats.totalCourses}+ kurs, {getStats.totalVideos}+ video, {getStats.totalStudents.toLocaleString()}+ o'quvchi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaTrophy />, label: 'Eng yaxshi kurslar', value: '50+', color: 'from-yellow-500 to-amber-600' },
            { icon: <FaUsers />, label: "O'quvchilar", value: `${getStats.totalStudents.toLocaleString()}+`, color: 'from-blue-500 to-cyan-600' },
            { icon: <FaStar />, label: 'Ortacha reyting', value: getStats.avgRating, color: 'from-purple-500 to-pink-600' },
            { icon: <FaRocket />, label: 'Yangilangan', value: 'Har oy', color: 'from-green-500 to-emerald-600' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl`}>
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Kurs, mavzu yoki texnologiya bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Tags Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allTags.slice(0, 10).map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'Barcha teglar' : tag}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <FaTags className="text-gray-400 mt-1" />
            {allTags.slice(1, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                  selectedTag === tag
                    ? `bg-gradient-to-r ${getTagColor(tag)} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Kurslar yuklanmoqda...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <FaSearch className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              Hech qanday kurs topilmadi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              "{searchTerm}" so'zi bo'yicha kurslar topilmadi
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('all');
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Barcha kurslarni ko'rish
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => {
                const purchased = isPurchased(course.sectionId);
                
                return (
                  <div
                    key={course.sectionId}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => {
                      if (purchased) {
                        navigate(`/videos/${course.sectionId}`);
                      } else {
                        navigate('/dashboard/payments', { state: { section: course } });
                      }
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={course.thumbnail || `https://picsum.photos/seed/${course.sectionId}/600/400`}
                        alt={course.sectionName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {purchased ? (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <FaPlay /> Sotib olingan
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                            {course.price?.toLocaleString() || 'Bepul'} so'm
                          </span>
                        )}
                        
                        {course.rating >= 4.8 && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 animate-pulse">
                            <FaFire /> TREND
                          </span>
                        )}
                      </div>

                      {/* Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                          {purchased ? (
                            <FaPlay className="text-2xl text-green-600 ml-1" />
                          ) : (
                            <FaLock className="text-2xl text-gray-700" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                        {course.sectionName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" /> {course.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUsers /> {course.enrolled}+
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock /> {course.videoCount} dars
                        </span>
                      </div>

                      {/* Tags */}
                      {course.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 text-xs font-medium text-white rounded bg-gradient-to-r ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Button */}
                      <button
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          purchased
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        } hover:shadow-lg hover:scale-105`}
                      >
                        {purchased ? 'Davom etish' : 'Kursni ko\'rish'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All */}
            <div className="text-center">
              <button
                onClick={() => navigate('/dashboard/all-courses')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 mx-auto"
              >
                Ko'proq kurslarni ko'rish ({filteredCourses.length})
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCourses;