// src/pages/CourseDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, PlayCircle, ShoppingCart, BookOpen, CheckCircle, Award, Lock, CheckCircle2 } from 'lucide-react';
import videoData from '../data/videos';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    const foundCourse = videoData.find(s => s.sectionId === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Faqat birinchi video aktiv bo'ladi
      if (foundCourse.videos.length > 0) {
        setActiveVideoId(foundCourse.videos[0].id);
      }
      
      // LocalStorage'dan ko'rgan videolarni yuklash
      const savedWatched = JSON.parse(localStorage.getItem(`watched_${courseId}`)) || [];
      setWatchedVideos(savedWatched);
    }
    setLoading(false);
  }, [courseId]);

  const handleVideoClick = (videoId, isFree) => {
    if (!isFree && !activeVideoId) return; // Faqat aktiv video ochiladi
    
    // Agar video bepul bo'lsa yoki aktiv bo'lsa
    if (isFree || videoId === activeVideoId) {
      // Video ko'rilganlar ro'yxatiga qo'shish
      if (!watchedVideos.includes(videoId)) {
        const newWatched = [...watchedVideos, videoId];
        setWatchedVideos(newWatched);
        localStorage.setItem(`watched_${courseId}`, JSON.stringify(newWatched));
      }
      
      // Video sahifasiga o'tish
      navigate(`/watch/${videoId}`);
      
      // Keyingi videoni aktiv qilish
      if (videoId === activeVideoId && course) {
        const currentIndex = course.videos.findIndex(v => v.id === videoId);
        if (currentIndex < course.videos.length - 1) {
          setActiveVideoId(course.videos[currentIndex + 1].id);
        }
      }
    }
  };

  const isVideoAccessible = (videoId, index) => {
    // Bepul videolar har doim ochiq
    if (course.videos[index].isFree) return true;
    
    // Birinchi video har doim aktiv
    if (index === 0) return true;
    
    // Oldingi video ko'rilgan bo'lsa
    const prevVideo = course.videos[index - 1];
    if (watchedVideos.includes(prevVideo.id) || prevVideo.isFree) {
      return true;
    }
    
    // Agar video aktiv bo'lsa
    return videoId === activeVideoId;
  };

  const getVideoStatus = (videoId, index) => {
    if (watchedVideos.includes(videoId)) {
      return 'watched';
    } else if (isVideoAccessible(videoId, index)) {
      return 'active';
    } else {
      return 'locked';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} soat ${mins} daqiqa` : `${mins} daqiqa`;
  };

  const calculateProgress = () => {
    if (!course) return 0;
    return Math.round((watchedVideos.length / course.videos.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Kurs ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Kurs topilmadi</h2>
          <button
            onClick={() => navigate('/all-courses')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Barcha kurslarga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.sectionName}</h1>
              <p className="text-xl text-indigo-100 mb-6">{course.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-200">Kurs progressi:</span>
                  <span className="font-bold">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-indigo-400 bg-opacity-30 rounded-full h-3">
                  <div 
                    className="bg-emerald-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-indigo-200">({course.enrolled.toLocaleString()} o'quvchi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-indigo-200" />
                  <span>{formatDuration(course.totalDuration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-indigo-200" />
                  <span>{course.videoCount} dars</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleVideoClick(course.videos[0].id, true)}
                  className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <PlayCircle size={20} />
                  Bepas darslarni ko'rish
                </button>
                <button
                  onClick={() => navigate(`/dashboard/checkout/${course.sectionId}`)}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Kursni sotib olish - {course.price.toLocaleString()} so'm
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.sectionName}
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x250?text=Course+Image';
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">{course.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">so'm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Kursda nimalarni o'rganasiz?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.videos.slice(0, 8).map((video, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{video.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Kurs dasturi</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {watchedVideos.length}/{course.videos.length} dars ko'rilgan
                </div>
              </div>
              
              <div className="space-y-3">
                {course.videos.map((video, index) => {
                  const status = getVideoStatus(video.id, index);
                  const isAccessible = isVideoAccessible(video.id, index);
                  
                  return (
                    <div
                      key={video.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        status === 'watched'
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                          : status === 'active'
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-500 dark:border-indigo-500'
                          : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      } ${
                        isAccessible ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-70'
                      }`}
                      onClick={() => handleVideoClick(video.id, video.isFree)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0
                          ${status === 'watched' 
                            ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400'
                            : status === 'active'
                            ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                          }
                        `}>
                          {status === 'watched' ? (
                            <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
                          ) : status === 'locked' ? (
                            <Lock size={20} />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              status === 'watched'
                                ? 'text-emerald-800 dark:text-emerald-300'
                                : status === 'active'
                                ? 'text-indigo-800 dark:text-indigo-300'
                                : 'text-gray-800 dark:text-white'
                            }`}>
                              {video.title}
                            </h3>
                            {video.isFree && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                                Bepul
                              </span>
                            )}
                          </div>
                          {video.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {video.description.length > 60 ? video.description.substring(0, 60) + '...' : video.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {video.duration} min
                        </span>
                        {status === 'locked' && (
                          <Lock className="text-gray-400" size={18} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Kurs progressi</h3>
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray={`${calculateProgress()}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      {calculateProgress()}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ko'rilgan darslar:</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {watchedVideos.length}/{course.videos.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Aktiv dars:</span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {course.videos.findIndex(v => v.id === activeVideoId) + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Kurs tafsilotlari</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Daraja:</span>
                  <span className="font-medium text-gray-800 dark:text-white capitalize">{course.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Darslar soni:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{course.videoCount} ta</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Umumiy davomiylik:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatDuration(course.totalDuration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Kategoriya:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{course.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">O'quvchilar:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{course.enrolled.toLocaleString()} ta</span>
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Sertifikat oling</h3>
              <p className="mb-4 text-green-100">Kursni muvaffaqiyatli tugatganingizdan so'ng rasmiy sertifikat oling</p>
              <button className="w-full py-3 bg-white text-green-600 hover:bg-gray-100 font-bold rounded-xl">
                Sertifikat haqida batafsil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
