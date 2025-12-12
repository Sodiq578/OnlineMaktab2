import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [newsItems, setNewsItems] = useState([
    { 
      id: 1, 
      title: 'Yangi kurslar boshlanishi', 
      description: 'Yangi kurslar 1-fevraldan boshlab boshlanadi. Qatnashish uchun ro\'yxatdan o\'tish zarur.', 
      date: '2025-01-20', 
      category: 'Kurslar',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      moreInfo: 'Kurslar haqida batafsil ma\'lumotni bu yerda topishingiz mumkin.',
      likes: 42,
      comments: 8,
      isLiked: false
    },
    { 
      id: 2, 
      title: 'Webinar: Onlayn ta\'limning kelajagi', 
      description: '19-fevral kuni onlayn ta\'limni rivojlantirish haqidagi webinar bo\'lib o\'tadi.', 
      date: '2025-01-18', 
      category: 'Webinar',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      moreInfo: 'Webinarni onlayn tarzda tomosha qilish imkoniyati mavjud.',
      likes: 28,
      comments: 15,
      isLiked: true
    },
    { 
      id: 3, 
      title: 'Dars jadvali yangilanishi', 
      description: 'Kurslar jadvali yangilandi, yangi darslar va vaqtlar haqida ma\'lumot olish uchun tizimga kiring.', 
      date: '2025-01-15', 
      category: 'Yangilik',
      priority: 'low',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      moreInfo: 'Jadvalga kirish uchun tizimga kirishingiz zarur.',
      likes: 15,
      comments: 3,
      isLiked: false
    },
    { 
      id: 4, 
      title: 'Xalqaro talabalar kuni', 
      description: 'Xalqaro talabalar kunini nishonlash doirasida turli tadbirlar o\'tkaziladi.', 
      date: '2025-01-25', 
      category: 'Bayram',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      moreInfo: 'Tadbirlar haqida batafsil ma\'lumotni telegram kanalimizda topishingiz mumkin.',
      likes: 56,
      comments: 12,
      isLiked: false
    },
  ]);

  const [newNews, setNewNews] = useState({
    title: '',
    description: '',
    category: 'Yangilik',
    priority: 'medium'
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const categories = ['all', 'Kurslar', 'Webinar', 'Yangilik', 'Bayram', 'Musobaqa'];

  const handleLike = (id) => {
    setNewsItems(newsItems.map(item => 
      item.id === id 
        ? { ...item, likes: item.isLiked ? item.likes - 1 : item.likes + 1, isLiked: !item.isLiked }
        : item
    ));
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNews.title.trim() || !newNews.description.trim()) {
      alert('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: newNews.title,
      description: newNews.description,
      date: new Date().toISOString().split('T')[0],
      category: newNews.category,
      priority: newNews.priority,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      moreInfo: newNews.description,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setNewsItems([newItem, ...newsItems]);
    setNewNews({ title: '', description: '', category: 'Yangilik', priority: 'medium' });
    alert('Yangilik muvaffaqiyatli qo\'shildi!');
  };

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const filteredNews = newsItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'Muhim';
      case 'medium': return 'O\'rtacha';
      case 'low': return 'Oddiy';
      default: return 'Noma\'lum';
    }
  };

  return (
    <div className="events-container">
      {/* Header */}
      <div className="events-header">
        <div className="header-content">
          <h1 className="events-title">Ta'lim Yangiliklari</h1>
          <p className="events-subtitle">So'nggi yangiliklar, tadbirlar va kurslar haqida ma'lumot</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{newsItems.length}</span>
            <span className="stat-label">Yangiliklar</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{newsItems.reduce((sum, item) => sum + item.likes, 0)}</span>
            <span className="stat-label">Layklar</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{newsItems.reduce((sum, item) => sum + item.comments, 0)}</span>
            <span className="stat-label">Sharhlar</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="events-controls">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Yangiliklarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'Hammasi' : category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map((item) => (
          <div key={item.id} className="news-card">
            <div className="news-card-header">
              <div className="category-badge" style={{ backgroundColor: getPriorityColor(item.priority) }}>
                {item.category}
              </div>
              <div className="priority-badge">
                <span className="priority-dot" style={{ backgroundColor: getPriorityColor(item.priority) }}></span>
                {getPriorityText(item.priority)}
              </div>
            </div>
            
            <div className="news-image-container">
              <img src={item.image} alt={item.title} className="news-image" />
              <div className="news-date">
                <span className="date-day">{new Date(item.date).getDate()}</span>
                <span className="date-month">
                  {new Date(item.date).toLocaleString('uz-UZ', { month: 'short' })}
                </span>
              </div>
            </div>

            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              
              <div className="news-footer">
                <div className="news-actions">
                  <button 
                    className={`like-button ${item.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(item.id)}
                  >
                    <svg className="like-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.06211 22.0329 6.39465C21.7563 5.72719 21.351 5.12083 20.84 4.61Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item.likes}
                  </button>
                  <button className="comment-button">
                    <svg className="comment-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 20.0004 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00041 9.92179 4.44142 8.37488 5.27153 7.03258C6.10164 5.69028 7.28918 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item.comments}
                  </button>
                </div>
                <button 
                  className="details-button"
                  onClick={() => openModal(item)}
                >
                  Batafsil
                  <svg className="details-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add News Form */}
      <div className="add-news-section">
        <div className="section-header">
          <h2 className="section-title">Yangilik Qo'shish</h2>
          <p className="section-subtitle">Yangi yangilik yoki tadbir haqida ma'lumot qo'shing</p>
        </div>
        
        <form onSubmit={handleAddNews} className="add-news-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20H21M3 20H4.67454C5.16372 20 5.40832 20 5.63849 19.9447C5.84256 19.8957 6.03765 19.8149 6.2166 19.7053C6.41843 19.5816 6.59138 19.4086 6.93729 19.0627L19.5 6.5C20.3284 5.67157 20.3284 4.32843 19.5 3.5C18.6716 2.67157 17.3284 2.67157 16.5 3.5L3.93726 16.0627C3.59136 16.4086 3.4184 16.5816 3.29469 16.7834C3.18506 16.9624 3.10425 17.1574 3.05526 17.3615C3 17.5917 3 17.8363 3 18.3255V20Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sarlavha
              </label>
              <input
                type="text"
                placeholder="Yangilik sarlavhasi..."
                value={newNews.title}
                onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 8H15M9 16H12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Toifa
              </label>
              <select
                value={newNews.category}
                onChange={(e) => setNewNews({...newNews, category: e.target.value})}
                className="form-select"
              >
                <option value="Yangilik">Yangilik</option>
                <option value="Kurslar">Kurslar</option>
                <option value="Webinar">Webinar</option>
                <option value="Bayram">Bayram</option>
                <option value="Musobaqa">Musobaqa</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ahamiyati
              </label>
              <select
                value={newNews.priority}
                onChange={(e) => setNewNews({...newNews, priority: e.target.value})}
                className="form-select"
              >
                <option value="low">Oddiy</option>
                <option value="medium">O'rtacha</option>
                <option value="high">Muhim</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H7C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16ZM7 12H11C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12ZM19 6H5C3.34315 6 2 7.34315 2 9V15C2 16.6569 3.34315 18 5 18H19C20.6569 18 22 16.6569 22 15V9C22 7.34315 20.6569 6 19 6Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tavsif
            </label>
            <textarea
              placeholder="Yangilik haqida batafsil ma'lumot..."
              value={newNews.description}
              onChange={(e) => setNewNews({...newNews, description: e.target.value})}
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            <svg className="submit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Yangilik Qo'shish
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="modal-category" style={{ backgroundColor: getPriorityColor(modalContent.priority) }}>
                {modalContent.category}
              </div>
              <h3 className="modal-title">{modalContent.title}</h3>
              <p className="modal-date">
                <svg className="modal-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {modalContent.date}
              </p>
            </div>
            
            <div className="modal-body">
              <img src={modalContent.image} alt={modalContent.title} className="modal-image" />
              <div className="modal-info">
                <h4 className="modal-subtitle">Batafsil ma'lumot:</h4>
                <p className="modal-description">{modalContent.moreInfo}</p>
                
                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="stat-label">Layklar:</span>
                    <span className="stat-value">{modalContent.likes}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Sharhlar:</span>
                    <span className="stat-value">{modalContent.comments}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Ahamiyati:</span>
                    <span className="stat-value" style={{ color: getPriorityColor(modalContent.priority) }}>
                      {getPriorityText(modalContent.priority)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-button secondary" onClick={closeModal}>
                Yopish
              </button>
              <button className="modal-button primary">
                Ulashish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;