// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import { useUser } from '../context/UserContext';
import { 
  FaPlay, FaLock, FaCheck, FaStar, FaUsers, FaClock, FaChevronRight, 
  FaBookOpen, FaGraduationCap, FaVideo, FaCertificate, FaTrophy, 
  FaRocket, FaSearch, FaFire, FaChartLine, FaHeart, FaEye, 
  FaBookmark, FaFilter, FaSortAmountDown, 
  FaRegHeart, FaCrown, FaMedal, FaAward, FaSeedling,
  FaBolt, FaMagic, FaPaintBrush, FaCode, FaMobileAlt,
  FaRobot, FaGamepad, FaMusic, FaCamera, FaEnvelope,
  FaDesktop, FaBolt as FaLightning, FaSeedling as FaLeaf
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { purchasedCourses = [], user = {} } = useUser(); // Bu yerda default qiymatlar!
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState(videoData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...videoData];

    // Qidiruv
    if (searchTerm) {
      filtered = filtered.filter(section =>
        section.sectionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.tags && section.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Kategoriya
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(section => section.category === selectedCategory);
    }

    // Saralash
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return (a.price || 0) - (b.price || 0);
        case 'price-high': return (b.price || 0) - (a.price || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default: return (b.enrolled || 0) - (a.enrolled || 0);
      }
    });

    setFilteredSections(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleCourseClick = (section) => {
    const slug = section.sectionName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'course';
    
    // purchasedCourses array ekanligini va undefined emasligini tekshirdik
    const isPurchased = Array.isArray(purchasedCourses) && 
      purchasedCourses.some(course => course?.sectionId === section.sectionId);

    if (isPurchased) {
      navigate(`/videos/${slug}`);
    } else {
      navigate('/dashboard/payments', { state: { section } });
    }
  };

  const toggleFavorite = (sectionId, e) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const categories = [
    { id: 'all', name: 'Barcha Kurslar', icon: <FaBookOpen />, count: videoData.length, color: '#4f46e5' },
    { id: 'web', name: 'Web Dasturlash', icon: <FaDesktop />, count: videoData.filter(s => s.category === 'web').length, color: '#06b6d4' },
    { id: 'mobile', name: 'Mobil Dasturlash', icon: <FaMobileAlt />, count: videoData.filter(s => s.category === 'mobile').length, color: '#8b5cf6' },
    { id: 'design', name: 'Dizayn', icon: <FaPaintBrush />, count: videoData.filter(s => s.category === 'design').length, color: '#ec4899' },
    { id: 'ai', name: 'Suniy Intelekt', icon: <FaRobot />, count: videoData.filter(s => s.category === 'ai').length, color: '#10b981' },
    { id: 'game', name: 'Oʻyin Dasturlash', icon: <FaGamepad />, count: videoData.filter(s => s.category === 'game').length, color: '#f59e0b' },
    { id: 'music', name: 'Musiqa', icon: <FaMusic />, count: videoData.filter(s => s.category === 'music').length, color: '#ef4444' },
    { id: 'photo', name: 'Fotografiya', icon: <FaCamera />, count: videoData.filter(s => s.category === 'photo').length, color: '#84cc16' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Ommabop', icon: <FaFire /> },
    { id: 'rating', name: 'Yuqori Reyting', icon: <FaStar /> },
    { id: 'newest', name: 'Yangi', icon: <FaRocket /> },
    { id: 'price-low', name: 'Arzondan', icon: <FaSortAmountDown /> },
    { id: 'price-high', name: 'Qimmatdan', icon: <FaChartLine /> },
  ];

  const getDifficultyBadge = (level) => {
    const config = {
      beginner: { color: '#10b981', label: "Boshlang'ich", icon: <FaLeaf /> },
      intermediate: { color: '#f59e0b', label: "O'rta", icon: <FaLightning /> },
      advanced: { color: '#ef4444', label: 'Qiyin', icon: <FaFire /> },
      expert: { color: '#8b5cf6', label: 'Ekspert', icon: <FaCrown /> }
    };
    return config[level] || config.beginner;
  };

  const stats = {
    totalCourses: videoData.length,
    totalDuration: videoData.reduce((acc, s) => acc + (s.totalDuration || 0), 0),
    enrolledUsers: user?.enrolledCourses?.length || 0,
    completionRate: user?.completionRate || 0,
    totalStudents: videoData.reduce((acc, s) => acc + (s.enrolled || 0), 0)
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badges">
            <span className="hero-badge"><FaTrophy /> Eng Yaxshi Platforma</span>
            <span className="hero-badge"><FaUsers /> {stats.totalStudents}+ O'quvchi</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Bilim</span> sari bir qadam
          </h1>
          <p className="hero-subtitle">
            O'zingizga mos kurslarni toping va yangi ko'nikmalarni egallang
          </p>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Kurslarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button"><FaChevronRight /></button>
          </div>
          <div className="hero-tags">
            <span>#WebDasturlash</span>
            <span>#Python</span>
            <span>#Dizayn</span>
            <span>#AI</span>
            <span>#Mobile</span>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
              <FaBookOpen style={{ color: '#4f46e5' }} />
            </div>
            <div><h3>{stats.totalCourses}</h3><p>Kurslar</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
              <FaClock style={{ color: '#06b6d4' }} />
            </div>
            <div><h3>{Math.round(stats.totalDuration / 60)}h</h3><p>O'quv vaqti</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <FaUsers style={{ color: '#8b5cf6' }} />
            </div>
            <div><h3>{stats.totalStudents}+</h3><p>O'quvchilar</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <FaTrophy style={{ color: '#10b981' }} />
            </div>
            <div><h3>{stats.completionRate}%</h3><p>Bitirish</p></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-bar">
        <div className="quick-stat"><FaEye /><span>{user?.views || 0} Ko'rish</span></div>
        <div className="quick-stat"><FaBookmark /><span>{user?.savedCourses?.length || 0} Saqlangan</span></div>
        <div className="quick-stat"><FaMedal /><span>{user?.achievements?.length || 0} Yutuq</span></div>
        <div className="quick-stat"><FaCrown /><span>{user?.level || 1}-Daraja</span></div>
      </div>

      {/* Kategoriyalar */}
      <div className="categories-section">
        <h2 className="section-title"><FaFilter /> Kategoriyalar</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCategory(category.id)}
            >
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <h3>{category.name}</h3>
              <span className="category-count">{category.count} kurs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saralash */}
      <div className="sort-section">
        <div className="sort-controls">
          {sortOptions.map(option => (
            <button
              key={option.id}
              className={`sort-btn ${sortBy === option.id ? 'active' : ''}`}
              onClick={() => setSortBy(option.id)}
              type="button"
            >
              {option.icon}<span>{option.name}</span>
            </button>
          ))}
        </div>
        <div className="results-count">{filteredSections.length} ta kurs topildi</div>
      </div>

      {/* Kurslar */}
      <div className="courses-section">
        {loading ? (
          <div className="loading-grid">
            {[1,2,3,4,5,6].map(i => (
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
            <FaSearch className="empty-icon" />
            <h3>Kurslar topilmadi</h3>
            <p>Boshqa so'zlar bilan qidiring yoki kategoriyani o'zgartiring</p>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredSections.map((section, index) => {
              const isPurchased = Array.isArray(purchasedCourses) && 
                purchasedCourses.some(c => c?.sectionId === section.sectionId);
              const isFavorite = favorites.includes(section.sectionId);
              const difficulty = getDifficultyBadge(section.difficulty || 'beginner');
              const progress = user?.progress?.[section.sectionId] || 0;
              const thumbnail = section.thumbnail || `https://picsum.photos/seed/${section.sectionId || Math.random()}/400/250`;

              return (
                <div
                  key={section.sectionId}
                  className="course-card"
                  onClick={() => handleCourseClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCourseClick(section)}
                  style={{ '--index': index }}
                >
                  <div className="course-image">
                    <img 
                      src={thumbnail} 
                      alt={section.sectionName} 
                      loading="lazy" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${Date.now()}/400/250`;
                      }}
                    />
                    <div className="course-badges">
                      <span className="difficulty-badge" style={{ backgroundColor: difficulty.color }}>
                        {difficulty.icon} {difficulty.label}
                      </span>
                      {section.isNew && <span className="new-badge"><FaRocket /> Yangi</span>}
                      {section.isHot && <span className="hot-badge"><FaFire /> Mashhur</span>}
                    </div>
                    <button 
                      className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                      onClick={(e) => toggleFavorite(section.sectionId, e)}
                      type="button"
                      aria-label={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
                    >
                      {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <div className="play-overlay"><FaPlay /></div>
                  </div>

                  <div className="course-content">
                    <div className="course-header">
                      <h3 className="course-title">{section.sectionName}</h3>
                      <div className="course-rating"><FaStar /> {section.rating || 4.8}</div>
                    </div>
                    <p className="course-description">{section.description || "Professional dasturlash kursi"}</p>

                    <div className="course-meta">
                      <span className="meta-item"><FaVideo /> {section.videoCount || 12} video</span>
                      <span className="meta-item"><FaClock /> {section.totalDuration || 120} min</span>
                      <span className="meta-item"><FaUsers /> {section.enrolled || 145} o'quvchi</span>
                    </div>

                    {section.tags && section.tags.length > 0 && (
                      <div className="course-tags">
                        {section.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="course-footer">
                      <div className="price-section">
                        {isPurchased ? (
                          <span className="price-purchased"><FaCheck /> Sizda mavjud</span>
                        ) : (
                          <>
                            <span className="price-current">
                              {(section.price || 99000).toLocaleString()} so'm
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
                          <> <FaPlay /> Davom etish </>
                        ) : (
                          <> <FaLock /> Sotib olish </>
                        )}
                      </button>
                    </div>

                    {progress > 0 && (
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${progress}%`, 
                              background: progress === 100 
                                ? '#10b981' 
                                : 'linear-gradient(90deg, #4f46e5, #8b5cf6)' 
                            }}
                          />
                        </div>
                        <span className="progress-text">
                          {progress}% tamomlandi {progress === 100 && <FaCheck style={{ marginLeft: '5px' }} />}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Featured */}
      <div className="featured-section">
        <div className="featured-content">
          <div className="featured-badge"><FaAward /> Siz uchun maxsus</div>
          <h2 className="featured-title">
            <FaRocket className="rocket-icon" /> O'qing, O'rganing, O'sting!
          </h2>
          <p className="featured-text">
            Har bir kurs sizga amaliy ko'nikmalar, sertifikat va yangi imkoniyatlar keltiradi. Bugundan boshlang!
          </p>
          <div className="featured-buttons">
            <button className="cta-button primary" type="button">
              <FaGraduationCap /> Bepul kursni boshlash
            </button>
            <button className="cta-button secondary" type="button">
              <FaCertificate /> Sertifikat olish
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h3>
            <FaEnvelope /> Yangiliklardan xabardor bo'ling
          </h3>
          <p>Yangi kurslar va chegirmalar haqida birinchi bo'lib bilib oling</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email manzilingiz" 
              required 
            />
            <button type="submit">Obuna bo'lish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;