// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import { useUser } from '../context/UserContext';
import { FaPlay, FaLock, FaCheck, FaStar, FaUsers, FaClock, FaChevronRight, FaBookOpen, FaGraduationCap, FaVideo, FaCertificate, FaTrophy, FaRocket } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { purchasedCourses, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState(videoData);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = videoData.filter(section => {
      const matchesSearch = section.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           section.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredSections(filtered);
  }, [searchTerm, selectedCategory]);

  const handleCourseClick = (section) => {
    const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const isPurchased = purchasedCourses.some(course => course.sectionId === section.sectionId);
    
    if (isPurchased) {
      navigate(`/videos/${slug}`);
    } else {
      navigate(`/dashboard/payments`, { state: { section } });
    }
  };

  const categories = [
    { id: 'all', name: 'Barcha Kurslar', icon: '📚', count: videoData.length },
    { id: 'web', name: 'Web Dasturlash', icon: '💻', count: videoData.filter(s => s.category === 'web').length },
    { id: 'mobile', name: 'Mobil Dasturlash', icon: '📱', count: videoData.filter(s => s.category === 'mobile').length },
    { id: 'design', name: 'Dizayn', icon: '🎨', count: videoData.filter(s => s.category === 'design').length },
    { id: 'ai', name: 'Suniy Intelekt', icon: '🤖', count: videoData.filter(s => s.category === 'ai').length },
  ];

  const getDifficultyBadge = (level) => {
    const config = {
      beginner: { color: 'var(--success)', label: 'Boshlang\'ich' },
      intermediate: { color: 'var(--warning)', label: 'O\'rtacha' },
      advanced: { color: 'var(--danger)', label: 'Qiyin' }
    };
    return config[level] || config.beginner;
  };

  const stats = {
    totalCourses: videoData.length,
    totalDuration: videoData.reduce((acc, section) => acc + (section.totalDuration || 0), 0),
    enrolledUsers: user?.enrolledCourses?.length || 0,
    completionRate: user?.completionRate || 0
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Bilim</span> sari bir qadam
          </h1>
          <p className="hero-subtitle">
            O'zingizga mos kurslarni toping va yangi ko'nikmalarni egallang
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Kurslarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <FaBookOpen className="stat-icon" />
            <div>
              <h3>{stats.totalCourses}</h3>
              <p>Kurslar</p>
            </div>
          </div>
          <div className="stat-card">
            <FaClock className="stat-icon" />
            <div>
              <h3>{Math.round(stats.totalDuration / 60)}h</h3>
              <p>O'quv vaqti</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <h3>{stats.enrolledUsers}+</h3>
              <p>O'quvchilar</p>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-icon" />
            <div>
              <h3>{stats.completionRate}%</h3>
              <p>Bitirish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <h2 className="section-title">Kategoriyalar</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <span className="category-count">{category.count} kurs</span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-section">
        <div className="section-header">
          <h2 className="section-title">Ommabop Kurslar</h2>
          <div className="courses-count">
            {filteredSections.length} ta kurs topildi
          </div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="course-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredSections.length === 0 ? (
          <div className="empty-state">
            <FaBookOpen className="empty-icon" />
            <h3>Kurslar topilmadi</h3>
            <p>Boshqa so'zlar bilan qidiring yoki kategoriyani o'zgartiring</p>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredSections.map(section => {
              const isPurchased = purchasedCourses.some(course => course.sectionId === section.sectionId);
              const difficulty = getDifficultyBadge(section.difficulty);
              const progress = user?.progress?.[section.sectionId] || 0;

              return (
                <div
                  key={section.sectionId}
                  className="course-card"
                  onClick={() => handleCourseClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCourseClick(section);
                    }
                  }}
                >
                  <div className="course-image">
                    <img
                      src={section.thumbnail || `https://picsum.photos/seed/${section.sectionId}/400/250`}
                      alt={section.sectionName}
                      loading="lazy"
                    />
                    <div className="course-badges">
                      <span className="difficulty-badge" style={{ backgroundColor: difficulty.color }}>
                        {difficulty.label}
                      </span>
                      {isPurchased && (
                        <span className="purchased-badge">
                          <FaCheck /> Sotib olindi
                        </span>
                      )}
                    </div>
                    <div className="play-overlay">
                      <FaPlay />
                    </div>
                  </div>

                  <div className="course-content">
                    <div className="course-header">
                      <h3 className="course-title">{section.sectionName}</h3>
                      <div className="course-rating">
                        <FaStar /> {section.rating || 4.8}
                      </div>
                    </div>

                    <p className="course-description">
                      {section.description || "Professional dasturlash kursi"}
                    </p>

                    <div className="course-meta">
                      <span className="meta-item">
                        <FaVideo /> {section.videoCount || 12} video
                      </span>
                      <span className="meta-item">
                        <FaClock /> {section.totalDuration || 120} min
                      </span>
                      <span className="meta-item">
                        <FaUsers /> {section.enrolled || 145} o'quvchi
                      </span>
                    </div>

                    <div className="course-footer">
                      <div className="price-section">
                        {isPurchased ? (
                          <span className="price-purchased">
                            <FaCheck /> Sizda mavjud
                          </span>
                        ) : (
                          <>
                            <span className="price-current">
                              {section.price?.toLocaleString() || "99 000"} so'm
                            </span>
                            {section.oldPrice && (
                              <span className="price-old">
                                {section.oldPrice.toLocaleString()} so'm
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <button className={`course-action-btn ${isPurchased ? 'purchased' : 'buy'}`}>
                        {isPurchased ? (
                          <>
                            <FaPlay /> Davom etish
                          </>
                        ) : (
                          <>
                            <FaLock /> Sotib olish
                          </>
                        )}
                      </button>
                    </div>

                    {progress > 0 && (
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{progress}% tamomlandi</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="featured-content">
          <h2 className="featured-title">
            <FaRocket className="rocket-icon" />
            O'qing, O'rganing, O'sting!
          </h2>
          <p className="featured-text">
            Har bir kurs sizga amaliy ko'nikmalar, sertifikat va yangi imkoniyatlar keltiradi.
            Bugundan boshlang!
          </p>
          <button className="cta-button">
            <FaGraduationCap /> Bepul kursni boshlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;