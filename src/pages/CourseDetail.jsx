// src/pages/CourseDetails.jsx - Minimal versiya
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, PlayCircle, ShoppingCart, BookOpen } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bu joyda kurs ma'lumotlarini olish logikasi bo'ladi
    setTimeout(() => {
      setCourse({
        id: courseId,
        title: "HTML Darslari",
        description: "HTML asoslaridan professional darajagacha to'liq kurs",
        price: 490000,
        rating: 4.9,
        enrolled: 2847,
        duration: "29 soat",
        instructor: "Sardor Ergashev",
        lessons: 29,
        thumbnail: "https://img.youtube.com/vi/9dUhZq9dkHM/maxresdefault.jpg",
        videos: [
          { id: "1", title: "Kirish darsi", duration: "15:30" },
          { id: "2", title: "HTML asoslari", duration: "20:45" },
        ]
      });
      setLoading(false);
    }, 1000);
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kurs ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Kurs topilmadi</h2>
          <button
            onClick={() => navigate('/all-courses')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Barcha kurslar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        {/* Course header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 fill-current" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-gray-500">({course.enrolled} o'quvchi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-gray-500" />
                  <span>{course.lessons} dars</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {course.price.toLocaleString()} so'm
                </span>
                <button
                  onClick={() => navigate(`/dashboard/checkout/${course.id}`)}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Sotib olish
                </button>
                <button
                  onClick={() => navigate(`/videos/${course.title}`)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <PlayCircle size={20} />
                  Darslarni ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons list */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Darslar ro'yxati
              </h2>
              <div className="space-y-3">
                {course.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                    onClick={() => navigate(`/watch/${video.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{video.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                O'qituvchi
              </h2>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {course.instructor}
                </h3>
                <p className="text-gray-500 mt-2">Frontend dasturchi, 5+ yillik tajriba</p>
                
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate(`/videos/${course.title}`)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                  >
                    Bepas darslarni ko'rish
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/checkout/${course.id}`)}
                    className="w-full py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/20 rounded-lg font-medium"
                  >
                    To'liq kursni sotib olish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;