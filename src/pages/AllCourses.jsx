// src/pages/AllCourses.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import videoData from '../data/videos';
import { 
  FaPlay, 
  FaLock, 
  FaStar, 
  FaUsers, 
  FaClock, 
  FaSearch,
  FaFire,
  FaTrophy,
  FaRocket
} from 'react-icons/fa';

const AllCourses = () => {
  const navigate = useNavigate();
  const { purchasedCourses = [] } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Barcha taglarni olish
  const allTags = useMemo(() => {
    const tags = new Set();
    tags.add('all');
    videoData.forEach(course => {
      course.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filtrlash
  const filteredCourses = useMemo(() => {
    return videoData.filter(course => {
      const matchesSearch = course.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = selectedTag === 'all' || course.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const isPurchased = (sectionId) => purchasedCourses.some(p => p.sectionId === sectionId);

  const getTagColor = (tag) => {
    const colors = {
      'React': 'from-purple-500 to-pink-500',
      'JavaScript': 'from-yellow-400 to-orange-500',
      'Node.js': 'from-green-500 to-emerald-600',
      'UI/UX': 'from-pink-500 to-rose-500',
      'all': 'from-blue-500 to-cyan-500'
    };
    return colors[tag] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-10 px-4">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Barcha Kurslar
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          100+ dan ortiq premium kurslar — React, Node.js, UI/UX, Python va boshqalar. O‘zingizga mosini tanlang!
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
              <input
                type="text"
                placeholder="Kurs, mavzu yoki texnologiya bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 text-lg rounded-2xl bg-gray-100/70 dark:bg-gray-700/70 focus:outline-none focus:ring-4 focus:ring-purple-400/30 transition-all"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`
                    px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-110
                    ${selectedTag === tag 
                      ? `bg-gradient-to-r ${getTagColor(tag)} shadow-2xl` 
                      : 'bg-gray-400 hover:bg-gray-500'
                    }
                  `}
                >
                  {tag === 'all' ? 'Barchasi' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: <FaTrophy />, label: 'Eng yaxshi kurslar', value: '50+' },
          { icon: <FaUsers />, label: 'O‘quvchilar', value: '25,000+' },
          { icon: <FaStar />, label: 'O‘rtacha reyting', value: '4.9' },
          { icon: <FaRocket />, label: 'Yangilangan', value: 'Har oy' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 text-center shadow-xl border border-white/20">
            <div className="text-4xl mb-3 text-purple-600">{stat.icon}</div>
            <p className="text-3xl font-black text-gray-800 dark:text-white">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => {
            const purchased = isPurchased(course.sectionId);
            
            return (
              <div
                key={course.sectionId}
                onClick={() => {
                  if (purchased) {
                    navigate(`/videos/${course.sectionId}`);
                  } else {
                    navigate('/dashboard/payments', { state: { section: course } });
                  }
                }}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-4 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnail || `https://picsum.photos/seed/${course.sectionId}/600/400`}
                    alt={course.sectionName}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    {purchased ? (
                      <span className="px-4 py-2 rounded-full bg-green-500 text-white font-bold text-sm shadow-lg flex items-center gap-2">
                        <FaPlay /> Sotib olingan
                      </span>
                    ) : (
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-2xl">
                        {course.price.toLocaleString()} so'm
                      </span>
                    )}
                  </div>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      {purchased ? <FaPlay className="text-3xl text-green-600 ml-2" /> : <FaLock className="text-3xl text-gray-700" />}
                    </div>
                  </div>

                  {/* Hot Badge */}
                  {course.rating >= 4.8 && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center gap-1 animate-pulse">
                        <FaFire /> TREND
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {course.sectionName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 inline" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers className="inline" /> {course.enrolled}+
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="inline" /> {course.videoCount} dars
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTagColor(tag)} shadow-md`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">Sad</div>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              "{searchTerm}" bo‘yicha hech nima topilmadi
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;