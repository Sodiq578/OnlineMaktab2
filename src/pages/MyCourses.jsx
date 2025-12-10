// src/pages/MyCourses.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaPlay, FaBook, FaClock, FaStar, FaCertificate, FaChartLine, FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import './MyCourses.css';

const MyCourses = () => {
  const { purchasedCourses } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [progressFilter, setProgressFilter] = useState('all');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Agar purchasedCourses undefined bo'lsa, bo'sh array ga o'rnatamiz
    if (purchasedCourses && Array.isArray(purchasedCourses)) {
      setCourses(purchasedCourses);
    } else {
      setCourses([]);
    }
  }, [purchasedCourses]);

  const getCourseProgress = (courseId) => {
    try {
      const progress = localStorage.getItem(`course_progress_${courseId}`);
      return progress ? parseInt(progress) : Math.floor(Math.random() * 100);
    } catch (e) {
      return Math.floor(Math.random() * 100);
    }
  };

  const getCourseRating = (courseId) => {
    try {
      const rating = localStorage.getItem(`course_rating_${courseId}`);
      return rating ? parseFloat(rating) : (4 + Math.random()).toFixed(1);
    } catch (e) {
      return (4 + Math.random()).toFixed(1);
    }
  };

  const handleCourseClick = (course) => {
    if (course && course.sectionName) {
      const slug = course.sectionName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      navigate(`/videos/${slug}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Hali boshlanmagan";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Hali boshlanmagan";
      return date.toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Hali boshlanmagan";
    }
  };

  // Filter va sort qilish
  const filteredAndSortedCourses = courses
    .filter(course => {
      if (!course) return false;
      
      const courseName = course.sectionName || '';
      const matchesSearch = courseName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const progress = getCourseProgress(course.sectionId || course.id || 0);
      let matchesProgress = true;
      
      if (progressFilter === 'completed') matchesProgress = progress >= 90;
      else if (progressFilter === 'inprogress') matchesProgress = progress > 0 && progress < 90;
      else if (progressFilter === 'notstarted') matchesProgress = progress === 0;
      
      return matchesSearch && matchesProgress;
    })
    .sort((a, b) => {
      const progressA = getCourseProgress(a.sectionId || a.id || 0);
      const progressB = getCourseProgress(b.sectionId || b.id || 0);
      const nameA = a.sectionName || '';
      const nameB = b.sectionName || '';
      const ratingA = getCourseRating(a.sectionId || a.id || 0);
      const ratingB = getCourseRating(b.sectionId || b.id || 0);
      
      switch(sortBy) {
        case 'progress':
          return progressB - progressA;
        case 'recent':
          const dateA = a.purchaseDate || '';
          const dateB = b.purchaseDate || '';
          return dateB.localeCompare(dateA);
        case 'name':
          return nameA.localeCompare(nameB);
        case 'rating':
          return ratingB - ratingA;
        default:
          return 0;
      }
    });

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10B981';
    if (progress >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getTotalDuration = (course) => {
    return course.totalDuration || course.videoCount * 60 || 120;
  };

  const getVideoCount = (course) => {
    return course.videoCount || course.videos?.length || 12;
  };

  // Statistika hisoblash
  const averageProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, course) => 
        acc + getCourseProgress(course.sectionId || course.id || 0), 0) / courses.length)
    : 0;

  const completedCount = courses.filter(course => 
    getCourseProgress(course.sectionId || course.id || 0) >= 90
  ).length;

  const averageDuration = courses.length > 0
    ? Math.round(courses.reduce((acc, course) => 
        acc + getTotalDuration(course), 0) / courses.length)
    : 0;

  return (
    <div className="my-courses-page">
      <div className="courses-header">
        <div className="header-content">
          <h1 className="page-title">
            <FaBook /> Mening Kurslarim
          </h1>
          <p className="page-subtitle">
            Sotib olgan kurslaringiz: {courses.length} ta
          </p>
        </div>
        
        {courses.length > 0 && (
          <div className="stats-cards">
            <div className="stat-card">
              <FaChartLine className="stat-icon" />
              <div>
                <h3>O'rtacha Progress</h3>
                <p className="stat-value">{averageProgress}%</p>
              </div>
            </div>
            <div className="stat-card">
              <FaCertificate className="stat-icon" />
              <div>
                <h3>Tugatilgan</h3>
                <p className="stat-value">{completedCount} ta</p>
              </div>
            </div>
            <div className="stat-card">
              <FaClock className="stat-icon" />
              <div>
                <h3>O'rtacha Vaqt</h3>
                <p className="stat-value">{averageDuration} min</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="courses-container">
        {courses.length === 0 ? (
          <div className="empty-courses">
            <div className="empty-content">
              <FaBook className="empty-icon" />
              <h2>Hozircha kurslaringiz yo'q</h2>
              <p>Yangi kurslarni sotib olish uchun bosh sahifaga o'ting</p>
              <button 
                onClick={() => navigate('/dashboard/home')}
                className="browse-courses-btn"
              >
                Kurslarni ko'rish
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="courses-filters">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Kurslarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-controls">
                <div className="filter-group">
                  <label><FaFilter /> Holati:</label>
                  <select 
                    value={progressFilter} 
                    onChange={(e) => setProgressFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">Barchasi</option>
                    <option value="completed">Tugatilgan</option>
                    <option value="inprogress">Davom etayotgan</option>
                    <option value="notstarted">Boshlanmagan</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label><FaSort /> Tartiblash:</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="recent">So'nggi qo'shilgan</option>
                    <option value="progress">Progress bo'yicha</option>
                    <option value="name">Nom bo'yicha</option>
                    <option value="rating">Reyting bo'yicha</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="courses-grid">
              {filteredAndSortedCourses.map((course) => {
                if (!course) return null;
                
                const courseId = course.sectionId || course.id || 0;
                const progress = getCourseProgress(courseId);
                const rating = getCourseRating(courseId);
                const courseName = course.sectionName || 'Kurs nomi';
                const courseDescription = course.description || 'Professional kurs';
                const thumbnail = course.thumbnail || 
                  `https://picsum.photos/seed/${courseId}/400/250`;
                const category = course.category || "Dasturlash";
                const totalDuration = getTotalDuration(course);
                const videoCount = getVideoCount(course);
                
                return (
                  <div 
                    key={courseId} 
                    className="course-card"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="course-image">
                      <img
                        src={thumbnail}
                        alt={courseName}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/seed/${courseId}/400/250`;
                        }}
                      />
                      <div className="course-badges">
                        <span className="badge category">
                          {category}
                        </span>
                        {progress >= 90 && (
                          <span className="badge completed">
                            <FaCertificate /> Tugatildi
                          </span>
                        )}
                      </div>
                      <div className="play-overlay">
                        <FaPlay />
                      </div>
                    </div>

                    <div className="course-content">
                      <div className="course-header">
                        <h3 className="course-title">{courseName}</h3>
                        <div className="course-rating">
                          <FaStar className="star-icon" />
                          <span>{rating}</span>
                        </div>
                      </div>

                      <p className="course-description">
                        {courseDescription}
                      </p>

                      <div className="course-meta">
                        <span className="meta-item">
                          <FaClock /> {totalDuration} min
                        </span>
                        <span className="meta-item">
                          <FaBook /> {videoCount} dars
                        </span>
                      </div>

                      <div className="progress-section">
                        <div className="progress-header">
                          <span>Progress: {progress}%</span>
                          <span className="last-access">
                            {course.lastAccess ? formatDate(course.lastAccess) : "Hali boshlanmagan"}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: getProgressColor(progress)
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="course-actions">
                        <button 
                          className="continue-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course);
                          }}
                        >
                          {progress === 0 ? "Boshlash" : progress >= 90 ? "Ko'rib chiqish" : "Davom etish"}
                        </button>
                        <button 
                          className="certificate-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Sertifikat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;