// pages/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPlay,
  FaClock,
  FaBook,
  FaFileAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaDownload,
  FaStar,
  FaUsers,
  FaChartLine,
  FaQuestionCircle,
  FaCommentAlt,
  FaVideo,
  FaListOl
} from 'react-icons/fa';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showMaterials, setShowMaterials] = useState(false);

  useEffect(() => {
    // Mock course data
    const mockCourses = {
      1: {
        id: 1,
        title: "React Native Asoslari",
        description: "Mobil ilovalarni React Native yordamida yaratishni o'rganing",
        instructor: "John Doe",
        instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        rating: 4.8,
        totalStudents: 1500,
        duration: "24 soat",
        progress: 65,
        category: "Dasturlash",
        level: "Boshlang'ich",
        lastAccessed: "Bugun, 14:30",
        lessons: [
          {
            id: 1,
            title: "React Native kirish",
            duration: "45 min",
            type: "video",
            completed: true,
            description: "React Native nima va qanday ishlaydi"
          },
          {
            id: 2,
            title: "Komponentlar va JSX",
            duration: "60 min",
            type: "video",
            completed: true,
            description: "Komponentlar bilan ishlash asoslari"
          },
          {
            id: 3,
            title: "State va Props",
            duration: "75 min",
            type: "video",
            completed: true,
            description: "State boshqaruvi va props o'tkazish"
          },
          {
            id: 4,
            title: "Navigatsiya",
            duration: "90 min",
            type: "video",
            completed: false,
            description: "React Navigation kutubxonasi"
          },
          {
            id: 5,
            title: "API bilan ishlash",
            duration: "80 min",
            type: "video",
            completed: false,
            description: "Fetch API va Axios"
          },
          {
            id: 6,
            title: "Final loyiha",
            duration: "120 min",
            type: "project",
            completed: false,
            description: "To'liq mobil ilova yaratish"
          }
        ],
        materials: [
          { id: 1, name: "React Native qo'llanma.pdf", type: "pdf", size: "2.4 MB" },
          { id: 2, name: "Dastur kodi.zip", type: "archive", size: "15 MB" },
          { id: 3, name: "Dizayn fayllari.fig", type: "design", size: "8.2 MB" }
        ]
      },
      2: {
        id: 2,
        title: "IELTS Writing",
        description: "IELTS imtihonida yuqori ball olish uchun yozish ko'nikmalari",
        instructor: "Sarah Johnson",
        instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
        rating: 4.9,
        totalStudents: 3200,
        duration: "36 soat",
        progress: 40,
        category: "Ingliz tili",
        level: "O'rta",
        lastAccessed: "Kecha, 10:15",
        lessons: [
          {
            id: 1,
            title: "Task 1 - Graph Description",
            duration: "60 min",
            type: "video",
            completed: true,
            description: "Grafiklar va diagrammalarni tasvirlash"
          },
          {
            id: 2,
            title: "Task 2 - Essay Structure",
            duration: "75 min",
            type: "video",
            completed: true,
            description: "Essays tuzilishi va formatlari"
          },
          {
            id: 3,
            title: "Vocabulary Building",
            duration: "90 min",
            type: "video",
            completed: false,
            description: "Yuqori ball uchun lug'at"
          }
        ],
        materials: [
          { id: 1, name: "IELTS Writing Samples.pdf", type: "pdf", size: "3.1 MB" },
          { id: 2, name: "Vocabulary List.pdf", type: "pdf", size: "1.8 MB" }
        ]
      },
      3: {
        id: 3,
        title: "Data Structures",
        description: "Ma'lumotlar tuzilmalari va algoritmlar",
        instructor: "Michael Chen",
        instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        rating: 4.7,
        totalStudents: 2800,
        duration: "48 soat",
        progress: 85,
        category: "Kompyuter fanlari",
        level: "Qiyin",
        lastAccessed: "2 kun oldin",
        lessons: [
          {
            id: 1,
            title: "Massivlar va Ro'yxatlar",
            duration: "90 min",
            type: "video",
            completed: true,
            description: "Asosiy ma'lumotlar tuzilmalari"
          },
          {
            id: 2,
            title: "Daraxtlar va Grafika",
            duration: "120 min",
            type: "video",
            completed: true,
            description: "Murakkab tuzilmalar"
          },
          {
            id: 3,
            title: "Algoritmlar tahlili",
            duration: "150 min",
            type: "video",
            completed: true,
            description: "O(log n), O(n) va boshqalar"
          }
        ],
        materials: [
          { id: 1, name: "Algorithms Book.pdf", type: "pdf", size: "5.6 MB" },
          { id: 2, name: "Practice Problems.pdf", type: "pdf", size: "2.3 MB" },
          { id: 3, name: "Code Examples.zip", type: "archive", size: "12 MB" }
        ]
      }
    };

    // Simulate API call
    setTimeout(() => {
      const selectedCourse = mockCourses[id] || mockCourses[1];
      setCourse(selectedCourse);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleLessonClick = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    // Here you would typically load the lesson content
  };

  const handleCompleteLesson = (lessonId) => {
    // Update lesson completion status
    const updatedLessons = course.lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: true };
      }
      return lesson;
    });
    
    setCourse({
      ...course,
      lessons: updatedLessons,
      progress: Math.min(100, course.progress + (100 / course.lessons.length))
    });
  };

  const handleDownloadMaterial = (material) => {
    alert(`${material.name} yuklab olinmoqda...`);
    // Actual download logic would go here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Kurs yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kurs topilmadi</h2>
          <button
            onClick={() => navigate('/dashboard/home')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/dashboard/home')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <FaArrowLeft />
            Ortga
          </button>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-white/90 mb-6 max-w-3xl">{course.description}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-white/80">O'qituvchi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-300" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>{course.totalStudents.toLocaleString()} talaba</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[300px]">
              <h3 className="text-xl font-bold mb-4">Kurs Progressi</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Umumiy progress</span>
                  <span className="font-bold">{Math.round(course.progress)}%</span>
                </div>
                <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={() => handleLessonClick(currentLesson)}
                className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl mb-3 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlay />
                Davom ettirish
              </button>
              
              <button
                onClick={() => setShowMaterials(!showMaterials)}
                className="w-full py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                Materiallar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lessons List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Darslar Ro'yxati</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaListOl />
                  <span>{course.lessons.length} ta dars</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      currentLesson === index
                        ? 'border-blue-500 bg-blue-50'
                        : lesson.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleLessonClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {lesson.completed ? <FaCheckCircle /> : <FaBook />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaClock className="text-xs" />
                              {lesson.duration}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaVideo className="text-xs" />
                              {lesson.type === 'video' ? 'Video' : 'Loyiha'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                            Yakunlangan
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteLesson(lesson.id);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-blue-700"
                          >
                            Yakunlash
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Lesson Content */}
            {course.lessons[currentLesson] && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {course.lessons[currentLesson].title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-500" />
                    <span className="text-gray-600">{course.lessons[currentLesson].duration}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  {/* Video Player Placeholder */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden mb-6">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaPlay className="text-white text-3xl" />
                        </div>
                        <p className="text-white/80">Video pleer - {course.lessons[currentLesson].title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold mb-4">Dars tafsilotlari</h4>
                    <p className="text-gray-600 mb-4">
                      {course.lessons[currentLesson].description}
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaQuestionCircle className="text-blue-500" />
                        Ushbu darsda o'rganasiz:
                      </h5>
                      <ul className="space-y-2">
                        {[
                          "Asosiy tushunchalar",
                          "Amaliy misollar",
                          "Eng yaxshi amaliyotlar",
                          "Test topshirig'lari"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500 text-sm" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => currentLesson > 0 && handleLessonClick(currentLesson - 1)}
                    disabled={currentLesson === 0}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                      currentLesson === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaArrowLeft />
                    Oldingi dars
                  </button>
                  
                  <button
                    onClick={() => handleCompleteLesson(course.lessons[currentLesson].id)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                  >
                    Darsni yakunlash
                  </button>
                  
                  <button
                    onClick={() => currentLesson < course.lessons.length - 1 && handleLessonClick(currentLesson + 1)}
                    disabled={currentLesson === course.lessons.length - 1}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                      currentLesson === course.lessons.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
                  >
                    Keyingi dars
                    <FaArrowLeft className="rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Materials Section */}
            {showMaterials && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaDownload />
                  Kurs Materiallari
                </h3>
                
                <div className="space-y-4">
                  {course.materials.map((material, index) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaFileAlt className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{material.name}</p>
                          <p className="text-sm text-gray-500">{material.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadMaterial(material)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700"
                      >
                        Yuklab olish
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Kurs Statistikasi</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-500">Yakunlangan darslar</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {course.lessons.filter(l => l.completed).length}/{course.lessons.length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaChartLine className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-500">O'rtacha progress</p>
                      <p className="text-2xl font-bold text-gray-800">{course.progress.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FaClock className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-500">O'tkazilgan vaqt</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {Math.round((course.lessons.filter(l => l.completed).length / course.lessons.length) * parseInt(course.duration))}h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCommentAlt />
                Muhokamalar
              </h3>
              
              <div className="space-y-4">
                {[
                  { user: "Ali", comment: "Bu dars juda foydali bo'ldi!", time: "2 soat oldin" },
                  { user: "Dilnoza", comment: "Tushunish qiyin joy bormi?", time: "5 soat oldin" },
                  { user: "O'qituvchi", comment: "Savollaringiz bo'lsa so'rang!", time: "1 kun oldin" }
                ].map((discussion, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                      <span className="font-medium">{discussion.user}</span>
                      <span className="text-sm text-gray-500">{discussion.time}</span>
                    </div>
                    <p className="text-gray-700">{discussion.comment}</p>
                  </div>
                ))}
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Fikringizni yozing..."
                    className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                    <FaCommentAlt />
                  </button>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Tegishli Kurslar</h3>
              
              <div className="space-y-4">
                {[
                  { title: "React Advanced", progress: 30 },
                  { title: "JavaScript Asoslari", progress: 75 },
                  { title: "Mobile App Design", progress: 45 }
                ].map((related, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/dashboard/course/${index + 4}`)}
                    className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{related.title}</span>
                      <span className="text-sm text-gray-500">{related.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${related.progress}%` }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;