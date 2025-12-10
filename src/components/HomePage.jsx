// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlayCircle,
  FaBook,
  FaClock,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCalendarAlt
} from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageScore: 0,
    streakDays: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('eduhub_current_user') || 
                          localStorage.getItem('registeredUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Mock statistikalar
          setStats({
            totalCourses: 5,
            completedCourses: 2,
            totalHours: 48,
            averageScore: 87,
            streakDays: 7
          });

          // Mock kurslar
          setRecentCourses([
            { id: 1, title: "React Native Asoslari", progress: 65, lastAccessed: "Bugun, 14:30" },
            { id: 2, title: "IELTS Writing", progress: 40, lastAccessed: "Kecha, 10:15" },
            { id: 3, title: "Data Structures", progress: 85, lastAccessed: "2 kun oldin" }
          ]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleStartFirstLesson = () => {
    if (recentCourses.length > 0) {
      navigate(`/dashboard/course/${recentCourses[0].id}`);
    } else {
      navigate('/dashboard/all-courses');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Xush kelibsiz, {user?.firstName || user?.name || "Foydalanuvchi"}! 👋
            </h1>
            <p className="text-blue-100">
              Bugun nima o'rganamiz? Darslaringizni davom ettiring yoki yangi kursni boshlang
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartFirstLesson}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <FaPlayCircle className="text-xl" />
            Darsni Boshlash
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Jami Kurslar</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-blue-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">O'tilgan Soatlar</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalHours}h</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-green-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">O'rtacha Ball</p>
              <p className="text-3xl font-bold text-gray-800">{stats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Ketma-ket kunlar</p>
              <p className="text-3xl font-bold text-gray-800">{stats.streakDays}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaTrophy className="text-yellow-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Courses */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Oxirgi Kurslar</h2>
          <button 
            onClick={() => navigate('/dashboard/my-courses')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            Barchasini ko'rish <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/dashboard/course/${course.id}`)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaBook className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.lastAccessed}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;