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
  FaBolt, FaPaintBrush, FaCode, FaMobileAlt,
  FaRobot, FaGamepad, FaMusic, FaCamera, FaEnvelope,
  FaDesktop, FaBolt as FaLightning, FaSeedling as FaLeaf,
  FaLanguage, FaGlobe, FaDatabase, FaShieldAlt, FaBrain,
  FaChartBar, FaPalette, FaMobile, FaCloud, FaServer,
  FaTerminal, FaReact, FaNodeJs, FaPython, FaJava,
  FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaDocker,
  FaLinux, FaWindows, FaApple, FaAndroid, FaWordpress,
  FaYoutube, FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
  FaTelegram, FaWhatsapp, FaDiscord, FaReddit,
  FaStackOverflow, FaGithub, FaGitlab, FaBitbucket, FaNpm,
  FaYarn, FaSass, FaBootstrap, FaTag
} from 'react-icons/fa';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { purchasedCourses = [], user = {} } = useUser();
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalStats, setTotalStats] = useState({
    totalCourses: 0,
    totalDuration: 0,
    totalStudents: 0,
    totalVideos: 0,
    averageRating: 0
  });

  // Avtomatik kategoriyalarni yuklash
  useEffect(() => {
    const loadCategories = () => {
      try {
        // videoData'dan barcha kategoriyalarni olish
        const allCategories = {};
        let totalDuration = 0;
        let totalStudents = 0;
        let totalVideos = 0;
        let totalRating = 0;

        videoData.forEach(section => {
          // Kategoriya statistikasi
          const category = section.category || 'other';
          if (!allCategories[category]) {
            allCategories[category] = {
              id: category,
              name: getCategoryName(category),
              icon: getCategoryIcon(category),
              color: getCategoryColor(category),
              count: 0
            };
          }
          allCategories[category].count++;

          // Umumiy statistikalar
          totalDuration += section.totalDuration || 0;
          totalStudents += section.enrolled || 0;
          totalVideos += section.videoCount || section.videos?.length || 0;
          totalRating += section.rating || 0;
        });

        // Kategoriyalarni array ga o'tkazish
        const categoryArray = Object.values(allCategories);
        
        // "Barcha kurslar" kategoriyasini qo'shish
        categoryArray.unshift({
          id: 'all',
          name: 'Barcha Kurslar',
          icon: <FaBookOpen />,
          color: '#4f46e5',
          count: videoData.length
        });

        setCategories(categoryArray);

        // Umumiy statistikalar
        setTotalStats({
          totalCourses: videoData.length,
          totalDuration: Math.round(totalDuration / 60), // minutlarni soatga aylantirish
          totalStudents,
          totalVideos,
          averageRating: (totalRating / videoData.length).toFixed(1)
        });

        // Kurslarni filter qilish
        filterCourses(videoData, '', 'all', 'popular');
      } catch (error) {
        console.error('Kategoriyalarni yuklashda xato:', error);
      }
    };

    loadCategories();
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Kategoriya nomlarini o'zbek tilida qaytarish
  const getCategoryName = (category) => {
    const categoryNames = {
      'web': 'Web Dasturlash',
      'office': 'Ofis Dasturlar',
      'mathematics': 'Matematika',
      'science': 'Fan',
      'programming': 'Dasturlash',
      'design': 'Dizayn',
      'marketing': 'Marketing',
      'business': 'Biznes',
      'language': 'Tillar',
      'music': 'Musiqa',
      'art': 'San\'at',
      'photography': 'Fotografiya',
      'video': 'Video',
      'ai': 'Suniy Intelekt',
      'data': 'Ma\'lumotlar',
      'mobile': 'Mobil Dasturlash',
      'game': 'Oʻyin Dasturlash',
      'security': 'Xavfsizlik',
      'cloud': 'Bulut',
      'devops': 'DevOps',
      'other': 'Boshqa'
    };
    return categoryNames[category] || category;
  };

  // Kategoriya ikonkasi
  const getCategoryIcon = (category) => {
    const icons = {
      'web': <FaGlobe />,
      'office': <FaDesktop />,
      'mathematics': <FaChartBar />,
      'science': <FaBrain />,
      'programming': <FaCode />,
      'design': <FaPalette />,
      'marketing': <FaChartLine />,
      'business': <FaChartBar />,
      'language': <FaLanguage />,
      'music': <FaMusic />,
      'art': <FaPaintBrush />,
      'photography': <FaCamera />,
      'video': <FaVideo />,
      'ai': <FaRobot />,
      'data': <FaDatabase />,
      'mobile': <FaMobile />,
      'game': <FaGamepad />,
      'security': <FaShieldAlt />,
      'cloud': <FaCloud />,
      'devops': <FaServer />,
      'other': <FaBookOpen />
    };
    return icons[category] || <FaBookOpen />;
  };

  // Kategoriya rangi
  const getCategoryColor = (category) => {
    const colors = {
      'web': '#4f46e5',
      'office': '#06b6d4',
      'mathematics': '#8b5cf6',
      'science': '#10b981',
      'programming': '#ec4899',
      'design': '#f59e0b',
      'marketing': '#ef4444',
      'business': '#84cc16',
      'language': '#14b8a6',
      'music': '#f97316',
      'art': '#8b5cf6',
      'photography': '#3b82f6',
      'video': '#a855f7',
      'ai': '#06b6d4',
      'data': '#10b981',
      'mobile': '#f59e0b',
      'game': '#ef4444',
      'security': '#84cc16',
      'cloud': '#3b82f6',
      'devops': '#8b5cf6',
      'other': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  // Kurslarni filter qilish funksiyasi
  const filterCourses = (sections, search, category, sort) => {
    let filtered = [...sections];

    // Qidiruv
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(section =>
        (section.sectionName || '').toLowerCase().includes(searchLower) ||
        (section.description || '').toLowerCase().includes(searchLower) ||
        (section.tags && section.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Kategoriya
    if (category !== 'all') {
      filtered = filtered.filter(section => section.category === category);
    }

    // Saralash
    filtered.sort((a, b) => {
      switch(sort) {
        case 'price-low': return (a.price || 0) - (b.price || 0);
        case 'price-high': return (b.price || 0) - (a.price || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return (b.createdAt || 0) - (a.createdAt || 0);
        case 'videos': return (b.videoCount || 0) - (a.videoCount || 0);
        case 'students': return (b.enrolled || 0) - (a.enrolled || 0);
        default: return (b.enrolled || 0) - (a.enrolled || 0); // popular
      }
    });

    return filtered;
  };

  // Filter va sort o'zgarganda kurslarni yangilash
  useEffect(() => {
    const filtered = filterCourses(videoData, searchTerm, selectedCategory, sortBy);
    setFilteredSections(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleCourseClick = (section) => {
    if (!section || !section.sectionName) return;
    
    const slug = section.sectionName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || 'course';
    
    const isPurchased = Array.isArray(purchasedCourses) && 
      purchasedCourses.some(course => course?.sectionId === section.sectionId);

    if (isPurchased) {
      navigate(`/videos/${slug}`);
    } else {
      navigate(`/course/${section.sectionId}`);
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

  const sortOptions = [
    { id: 'popular', name: 'Ommabop', icon: <FaFire /> },
    { id: 'rating', name: 'Yuqori Reyting', icon: <FaStar /> },
    { id: 'newest', name: 'Yangi', icon: <FaRocket /> },
    { id: 'price-low', name: 'Arzondan', icon: <FaSortAmountDown /> },
    { id: 'price-high', name: 'Qimmatdan', icon: <FaChartLine /> },
    { id: 'videos', name: 'Ko\'p Videolar', icon: <FaVideo /> },
    { id: 'students', name: 'Ko\'p O\'quvchilar', icon: <FaUsers /> },
  ];

  const getDifficultyBadge = (level) => {
    const config = {
      beginner: { color: '#10b981', label: "Boshlang'ich", icon: <FaSeedling /> },
      intermediate: { color: '#f59e0b', label: "O'rta", icon: <FaLightning /> },
      advanced: { color: '#ef4444', label: 'Qiyin', icon: <FaFire /> },
      expert: { color: '#8b5cf6', label: 'Ekspert', icon: <FaCrown /> }
    };
    return config[level] || config.beginner;
  };

  // Kurs teglari uchun ikonkalar
  const getTagIcon = (tag) => {
    const tagIcons = {
      'HTML': <FaHtml5 />,
      'CSS': <FaCss3Alt />,
      'JavaScript': <FaJsSquare />,
      'React': <FaReact />,
      'Node.js': <FaNodeJs />,
      'Python': <FaPython />,
      'Java': <FaJava />,
      'Git': <FaGitAlt />,
      'Docker': <FaDocker />,
      'Linux': <FaLinux />,
      'Windows': <FaWindows />,
      'MacOS': <FaApple />,
      'Android': <FaAndroid />,
      'WordPress': <FaWordpress />,
      'YouTube': <FaYoutube />,
      'Instagram': <FaInstagram />,
      'Facebook': <FaFacebook />,
      'Twitter': <FaTwitter />,
      'LinkedIn': <FaLinkedin />,
      'Telegram': <FaTelegram />,
      'WhatsApp': <FaWhatsapp />,
      'Discord': <FaDiscord />,
      'Reddit': <FaReddit />,
      'Stack Overflow': <FaStackOverflow />,
      'GitHub': <FaGithub />,
      'GitLab': <FaGitlab />,
      'Bitbucket': <FaBitbucket />,
      'npm': <FaNpm />,
      'Yarn': <FaYarn />,
      'Sass': <FaSass />,
      'Bootstrap': <FaBootstrap />,
      'Web': <FaGlobe />,
      'Frontend': <FaCode />,
      'Backend': <FaServer />,
      'Fullstack': <FaDesktop />,
      'Mobile': <FaMobile />,
      'Database': <FaDatabase />,
      'Security': <FaShieldAlt />,
      'AI': <FaBrain />,
      'Cloud': <FaCloud />,
      'DevOps': <FaTerminal />,
      'Matematika': <FaChartBar />,
      'Fizika': <FaBrain />,
      'Word': <FaDesktop />,
      'Excel': <FaChartBar />,
      'Office': <FaDesktop />,
      'Table': <FaDatabase />
    };
    return tagIcons[tag] || <FaTag />;
  };

  // Rasm yo'q bo'lsa, placeholder
  const getCourseImage = (section) => {
    if (section.thumbnail) return section.thumbnail;
    
    // Kategoriya bo'yicha placeholder rasm
    const categoryImages = {
      'web': `https://source.unsplash.com/400x250/?web,development,coding`,
      'office': `https://source.unsplash.com/400x250/?office,computer`,
      'mathematics': `https://source.unsplash.com/400x250/?math,numbers`,
      'science': `https://source.unsplash.com/400x250/?science,physics`,
      'programming': `https://source.unsplash.com/400x250/?programming,code`,
      'design': `https://source.unsplash.com/400x250/?design,art`,
      'default': `https://source.unsplash.com/400x250/?education,learning`
    };
    
    return categoryImages[section.category] || categoryImages.default;
  };

  // Kursning qisqacha tavsifi
  const getShortDescription = (description, maxLength = 100) => {
    if (!description) return "Professional ta'lim kursi";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badges">
            <span className="hero-badge"><FaTrophy /> {totalStats.averageRating} Reyting</span>
            <span className="hero-badge"><FaUsers /> {totalStats.totalStudents.toLocaleString()}+ O'quvchi</span>
            <span className="hero-badge"><FaVideo /> {totalStats.totalVideos}+ Video</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Professional</span> Ta'lim Platformasi
          </h1>
          <p className="hero-subtitle">
            {totalStats.totalCourses}+ kurs, {totalStats.totalDuration}+ soat o'quv materiallari
          </p>
          
          <div className="search-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Kurslarni qidirish (HTML, Matematika, Fizika...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Kurslarni qidirish"
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Qidiruvni tozalash"
                >
                  ×
                </button>
              )}
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
            <div className="search-tags">
              <span onClick={() => setSearchTerm('HTML')}>HTML</span>
              <span onClick={() => setSearchTerm('CSS')}>CSS</span>
              <span onClick={() => setSearchTerm('Matematika')}>Matematika</span>
              <span onClick={() => setSearchTerm('Fizika')}>Fizika</span>
              <span onClick={() => setSearchTerm('Word')}>Word</span>
              <span onClick={() => setSearchTerm('Excel')}>Excel</span>
            </div>
          </div>

          <div className="hero-features">
            <div className="feature">
              <FaCheck className="feature-icon" />
              <span>Bepas darslar</span>
            </div>
            <div className="feature">
              <FaCheck className="feature-icon" />
              <span>Amaliy topshiriqlar</span>
            </div>
            <div className="feature">
              <FaCheck className="feature-icon" />
              <span>Sertifikat</span>
            </div>
            <div className="feature">
              <FaCheck className="feature-icon" />
              <span>24/7 qo'llab-quvvatlash</span>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
              <FaBookOpen style={{ color: '#4f46e5' }} />
            </div>
            <div className="stat-content">
              <h3>{totalStats.totalCourses}</h3>
              <p>Kurslar</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
              <FaVideo style={{ color: '#06b6d4' }} />
            </div>
            <div className="stat-content">
              <h3>{totalStats.totalVideos}+</h3>
              <p>Videolar</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <FaUsers style={{ color: '#8b5cf6' }} />
            </div>
            <div className="stat-content">
              <h3>{totalStats.totalStudents.toLocaleString()}+</h3>
              <p>O'quvchilar</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <FaClock style={{ color: '#10b981' }} />
            </div>
            <div className="stat-content">
              <h3>{totalStats.totalDuration}+</h3>
              <p>Soat dars</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats (agar login qilgan bo'lsa) */}
      {user && Object.keys(user).length > 0 && (
        <div className="user-stats-section">
          <div className="user-welcome">
            <h2>Xush kelibsiz, <span className="user-name">{user.name || 'Foydalanuvchi'}!</span></h2>
            <p>Sizning ta'lim statistikangiz</p>
          </div>
          <div className="user-stats-grid">
            <div className="user-stat">
              <FaEye className="stat-icon" />
              <div>
                <h4>{user.views || 0}</h4>
                <p>Ko'rishlar</p>
              </div>
            </div>
            <div className="user-stat">
              <FaBookmark className="stat-icon" />
              <div>
                <h4>{user.savedCourses?.length || 0}</h4>
                <p>Saqlangan</p>
              </div>
            </div>
            <div className="user-stat">
              <FaMedal className="stat-icon" />
              <div>
                <h4>{user.achievements?.length || 0}</h4>
                <p>Yutuqlar</p>
              </div>
            </div>
            <div className="user-stat">
              <FaCrown className="stat-icon" />
              <div>
                <h4>{user.level || 1}</h4>
                <p>Daraja</p>
              </div>
            </div>
            <div className="user-stat">
              <FaCertificate className="stat-icon" />
              <div>
                <h4>{user.certificates?.length || 0}</h4>
                <p>Sertifikatlar</p>
              </div>
            </div>
            <div className="user-stat">
              <FaGraduationCap className="stat-icon" />
              <div>
                <h4>{user.completedCourses?.length || 0}</h4>
                <p>Tugatilgan</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kategoriyalar */}
      <div className="categories-section">
        <div className="section-header">
          <h2 className="section-title">
            <FaFilter /> Kategoriyalar bo'yicha kurslar
          </h2>
          <p className="section-subtitle">
            O'zingizga mos kategoriyani tanlang va o'rganishni boshlang
          </p>
        </div>
        
        <div className="categories-scroll">
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
                <div className="category-icon-wrapper" style={{ background: `${category.color}15` }}>
                  <div className="category-icon" style={{ color: category.color }}>
                    {category.icon}
                  </div>
                </div>
                <h3>{category.name}</h3>
                <span className="category-count">{category.count} kurs</span>
                <div className="category-progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: '100%',
                      background: 'rgba(0,0,0,0.1)',
                      height: '4px',
                      borderRadius: '2px',
                      marginTop: '8px'
                    }}
                  >
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(category.count / videoData.length) * 100}%`,
                        background: category.color,
                        height: '100%',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saralash va natijalar */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="sort-controls">
            <div className="sort-label">
              <FaSortAmountDown /> Saralash:
            </div>
            {sortOptions.map(option => (
              <button
                key={option.id}
                className={`sort-btn ${sortBy === option.id ? 'active' : ''}`}
                onClick={() => setSortBy(option.id)}
                type="button"
                aria-label={`${option.name} bo'yicha saralash`}
              >
                {option.icon}<span>{option.name}</span>
              </button>
            ))}
          </div>
          
          <div className="results-info">
            <span className="results-count">
              {filteredSections.length} ta kurs topildi
            </span>
            {selectedCategory !== 'all' && (
              <button 
                className="clear-filter" 
                onClick={() => setSelectedCategory('all')}
                type="button"
              >
                Filterni tozalash
              </button>
            )}
          </div>
        </div>
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
                  <div className="skeleton-meta"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredSections.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <FaSearch className="empty-icon" />
            </div>
            <h3>Hech qanday kurs topilmadi</h3>
            <p>"{searchTerm}" so'zi bo'yicha kurslar topilmadi. Boshqa so'zlar bilan qidiring.</p>
            <div className="empty-actions">
              <button 
                onClick={() => setSearchTerm('')}
                className="action-btn primary"
                type="button"
              >
                Barcha kurslarni ko'rish
              </button>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="action-btn secondary"
                type="button"
              >
                Barcha kategoriyalar
              </button>
            </div>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredSections.map((section, index) => {
              const isPurchased = Array.isArray(purchasedCourses) && 
                purchasedCourses.some(c => c?.sectionId === section.sectionId);
              const isFavorite = favorites.includes(section.sectionId);
              const difficulty = getDifficultyBadge(section.difficulty || 'beginner');
              const progress = user?.progress?.[section.sectionId] || 0;
              const imageUrl = getCourseImage(section);
              const shortDescription = getShortDescription(section.description);

              return (
                <div
                  key={section.sectionId}
                  className="course-card"
                  onClick={() => handleCourseClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCourseClick(section)}
                  data-category={section.category}
                  data-difficulty={section.difficulty}
                >
                  <div className="course-image-container">
                    <div className="course-image">
                      <img 
                        src={imageUrl} 
                        alt={section.sectionName} 
                        loading="lazy" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://source.unsplash.com/400x250/?${section.category || 'education'}`;
                        }}
                      />
                      <div className="image-overlay"></div>
                      
                      {/* Kurs yorlig'lari */}
                      <div className="course-badges">
                        <span 
                          className="difficulty-badge" 
                          style={{ 
                            background: difficulty.color,
                            color: 'white'
                          }}
                        >
                          {difficulty.icon} {difficulty.label}
                        </span>
                        
                        {section.rating >= 4.5 && (
                          <span className="rating-badge">
                            <FaStar /> {section.rating}
                          </span>
                        )}
                        
                        {section.enrolled > 2000 && (
                          <span className="popular-badge">
                            <FaFire /> Mashhur
                          </span>
                        )}
                      </div>

                      {/* Sevimlilar tugmasi */}
                      <button 
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                        onClick={(e) => toggleFavorite(section.sectionId, e)}
                        type="button"
                        aria-label={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
                      >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                      </button>

                      {/* O'ynatish tugmasi */}
                      <div className="play-overlay">
                        <div className="play-button">
                          <FaPlay />
                        </div>
                        <span>Kursni ko'rish</span>
                      </div>
                    </div>
                  </div>

                  <div className="course-content">
                    {/* Sarlavha va narx */}
                    <div className="course-header">
                      <h3 className="course-title" title={section.sectionName}>
                        {section.sectionName}
                      </h3>
                      <div className="course-price">
                        {isPurchased ? (
                          <span className="purchased-badge">
                            <FaCheck /> Sotib olindi
                          </span>
                        ) : (
                          <>
                            <span className="current-price">
                              {(section.price || 0).toLocaleString()} so'm
                            </span>
                            {section.oldPrice && section.oldPrice > section.price && (
                              <span className="old-price">
                                {section.oldPrice.toLocaleString()} so'm
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tavsif */}
                    <p className="course-description" title={section.description}>
                      {shortDescription}
                    </p>

                    {/* Meta ma'lumotlar */}
                    <div className="course-meta">
                      <div className="meta-item" title="Video soni">
                        <FaVideo /> <span>{section.videoCount || section.videos?.length || 0}</span>
                      </div>
                      <div className="meta-item" title="Davomiylik">
                        <FaClock /> <span>{Math.round((section.totalDuration || 0) / 60)} soat</span>
                      </div>
                      <div className="meta-item" title="O'quvchilar soni">
                        <FaUsers /> <span>{section.enrolled?.toLocaleString() || 0}</span>
                      </div>
                      <div className="meta-item" title="Reyting">
                        <FaStar /> <span>{section.rating || 4.5}</span>
                      </div>
                    </div>

                    {/* Teglar */}
                    {section.tags && section.tags.length > 0 && (
                      <div className="course-tags">
                        {section.tags.slice(0, 4).map((tag, i) => (
                          <span key={i} className="tag" title={tag}>
                            {getTagIcon(tag)}
                            <span>{tag}</span>
                          </span>
                        ))}
                        {section.tags.length > 4 && (
                          <span className="tag-more">+{section.tags.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Harakat tugmalari */}
                    <div className="course-actions">
                      <button 
                        className={`action-btn ${isPurchased ? 'continue' : 'enroll'}`}
                        onClick={() => handleCourseClick(section)}
                        type="button"
                      >
                        {isPurchased ? (
                          <>
                            <FaPlay /> Davom etish
                          </>
                        ) : (
                          <>
                            <FaLock /> Kursni ko'rish
                          </>
                        )}
                      </button>
                      
                      <button 
                        className="details-btn"
                        onClick={() => navigate(`/course/${section.sectionId}`)}
                        type="button"
                      >
                        Batafsil
                      </button>
                    </div>

                    {/* Progress (agar bor bo'lsa) */}
                    {progress > 0 && (
                      <div className="progress-container">
                        <div className="progress-info">
                          <span>Progress: {progress}%</span>
                          {progress === 100 && (
                            <span className="completed-badge">
                              <FaCheck /> Tamomlandi
                            </span>
                          )}
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${progress}%`,
                              background: progress === 100 
                                ? 'linear-gradient(90deg, #10b981, #34d399)'
                                : 'linear-gradient(90deg, #4f46e5, #8b5cf6)'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <div className="cta-badge">
            <FaAward /> MAXSUS TAKLIF
          </div>
          <h2 className="cta-title">
            <FaRocket className="rocket-icon" /> Ta'limni yangi darajaga olib chiqing!
          </h2>
          <p className="cta-text">
            Professional kurslar, amaliy topshiriqlar va sertifikatlar bilan o'z karyerangizni rivojlantiring.
            Bugun boshlang, ertaga muvaffaqiyatga erishing!
          </p>
          <div className="cta-features">
            <div className="feature-item">
              <FaCheck className="feature-check" />
              <span>100% amaliy bilimlar</span>
            </div>
            <div className="feature-item">
              <FaCheck className="feature-check" />
              <span>Hayotiy loyihalar</span>
            </div>
            <div className="feature-item">
              <FaCheck className="feature-check" />
              <span>Sertifikat bilan ta'minlash</span>
            </div>
            <div className="feature-item">
              <FaCheck className="feature-check" />
              <span>Doimiy qo'llab-quvvatlash</span>
            </div>
          </div>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/dashboard/all-courses')}
              type="button"
            >
              <FaGraduationCap /> Barcha kurslarni ko'rish
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => navigate('/dashboard/certificates')}
              type="button"
            >
              <FaCertificate /> Sertifikatlarim
            </button>
          </div>
        </div>
        <div className="cta-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Ta'lim va o'qish" 
          />
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <FaEnvelope className="newsletter-icon" />
            <h3>Yangiliklardan xabardor bo'ling</h3>
            <p>Yangi kurslar, chegirmalar va maxsus takliflar haqida birinchi bo'lib bilib oling</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Elektron pochta manzilingiz" 
                  required 
                  aria-label="Elektron pochta manzili"
                />
                <button type="submit" className="subscribe-btn">
                  Obuna bo'lish
                </button>
              </div>
              <div className="form-note">
                Xabarnomani istalgan vaqtda bekor qilishingiz mumkin. Maxfiylik siyosati bilan tanishish.
              </div>
            </form>
          </div>
          <div className="newsletter-stats">
            <div className="stat">
              <h4>10,000+</h4>
              <p>Obunachilar</p>
            </div>
            <div className="stat">
              <h4>100+</h4>
              <p>Yangiliklar</p>
            </div>
            <div className="stat">
              <h4>50%</h4>
              <p>Chegirmalar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;