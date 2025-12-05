// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaSave, 
  FaCamera, 
  FaLock, 
  FaGlobe,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaChartLine,
  FaUserFriends,
  FaHistory
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    fullName: user?.fullName || "Foydalanuvchi",
    email: user?.email || "example@mail.com",
    phone: user?.phone || "+998 90 123 45 67",
    birthDate: user?.birthDate || "1990-01-01",
    location: user?.location || "Toshkent, O'zbekiston",
    education: user?.education || "Toshkent Davlat Universiteti",
    occupation: user?.occupation || "Dasturchi",
    bio: user?.bio || "Dasturlashni yaxshi ko'raman va doim yangi narsalarni o'rganishga harakat qilaman.",
    website: user?.website || "",
    languages: user?.languages || ["O'zbek", "Rus", "Ingliz"]
  });

  const [stats, setStats] = useState({
    completedCourses: 8,
    activeCourses: 3,
    totalHours: 156,
    certificates: 5,
    achievements: 12,
    streakDays: 24
  });

  useEffect(() => {
    // Load stats from localStorage or API
    const savedStats = JSON.parse(localStorage.getItem('user_stats')) || stats;
    setStats(savedStats);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Save to localStorage
        localStorage.setItem('profile_image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(userData);
    setIsEditing(false);
    // Save to localStorage
    localStorage.setItem('user_profile', JSON.stringify(userData));
  };

  const handleAddLanguage = () => {
    const newLang = prompt("Yangi tilni kiriting:");
    if (newLang && !userData.languages.includes(newLang)) {
      setUserData(prev => ({
        ...prev,
        languages: [...prev.languages, newLang]
      }));
    }
  };

  const handleRemoveLanguage = (language) => {
    setUserData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const loadDefaultImage = () => {
    const initials = userData.fullName.split(' ').map(n => n[0]).join('');
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 150, 150);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 150, 150);
    
    // White text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials.toUpperCase(), 75, 75);
    
    setProfileImage(canvas.toDataURL());
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      loadDefaultImage();
    }
  }, [userData.fullName]);

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1 className="page-title">
            <FaUser /> Profil
          </h1>
          <button 
            className={`edit-btn ${isEditing ? 'save' : ''}`}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            {isEditing ? 'Saqlash' : 'Tahrirlash'}
          </button>
        </div>

        {/* Main Profile Section */}
        <div className="profile-main">
          {/* Left Column - Profile Info */}
          <div className="profile-info-section">
            <div className="profile-card">
              <div className="profile-image-section">
                <div className="image-container">
                  <img
                    src={profileImage}
                    alt="Profil rasmi"
                    className="profile-image"
                  />
                  <label className="image-upload-btn">
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden-input"
                    />
                  </label>
                </div>
                
                <div className="profile-basic">
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Ism Familya"
                    />
                  ) : (
                    <h2 className="profile-name">{userData.fullName}</h2>
                  )}
                  <p className="profile-bio">{userData.bio}</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <FaGraduationCap className="stat-icon" />
                  <div className="stat-info">
                    <h3>{stats.completedCourses}</h3>
                    <p>Tugatilgan kurs</p>
                  </div>
                </div>
                <div className="stat-card">
                  <FaChartLine className="stat-icon" />
                  <div className="stat-info">
                    <h3>{stats.totalHours} soat</h3>
                    <p>O'qilgan vaqt</p>
                  </div>
                </div>
                <div className="stat-card">
                  <FaCertificate className="stat-icon" />
                  <div className="stat-info">
                    <h3>{stats.certificates}</h3>
                    <p>Sertifikat</p>
                  </div>
                </div>
                <div className="stat-card">
                  <FaHistory className="stat-icon" />
                  <div className="stat-info">
                    <h3>{stats.streakDays} kun</h3>
                    <p>Ketma-ket</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-card">
              <h3 className="card-title">
                <FaUser /> Kontakt ma'lumotlari
              </h3>
              
              <div className="contact-list">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div className="contact-info">
                    <span className="contact-label">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="contact-value">{userData.email}</span>
                    )}
                  </div>
                </div>

                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div className="contact-info">
                    <span className="contact-label">Telefon</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="contact-value">{userData.phone}</span>
                    )}
                  </div>
                </div>

                <div className="contact-item">
                  <FaCalendarAlt className="contact-icon" />
                  <div className="contact-info">
                    <span className="contact-label">Tug'ilgan sana</span>
                    {isEditing ? (
                      <input
                        type="date"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="contact-value">
                        {new Date(userData.birthDate).toLocaleDateString('uz-UZ')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div className="contact-info">
                    <span className="contact-label">Manzil</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="contact-value">{userData.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="profile-details-section">
            {/* Education & Occupation */}
            <div className="details-card">
              <h3 className="card-title">
                <FaGraduationCap /> Ta'lim va Ish
              </h3>
              
              <div className="details-group">
                <div className="detail-item">
                  <span className="detail-label">Ta'lim:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="education"
                      value={userData.education}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <span className="detail-value">{userData.education}</span>
                  )}
                </div>

                <div className="detail-item">
                  <span className="detail-label">Kasb:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="occupation"
                      value={userData.occupation}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <span className="detail-value">{userData.occupation}</span>
                  )}
                </div>

                <div className="detail-item">
                  <span className="detail-label">Veb-sayt:</span>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={userData.website}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="https://example.com"
                    />
                  ) : userData.website ? (
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="website-link">
                      <FaGlobe /> {userData.website}
                    </a>
                  ) : (
                    <span className="detail-value no-website">Kiritilmagan</span>
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="details-card">
              <h3 className="card-title">
                <FaGlobe /> Tillar
              </h3>
              
              <div className="languages-list">
                {userData.languages.map((language, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{language}</span>
                    {isEditing && (
                      <button 
                        className="remove-language"
                        onClick={() => handleRemoveLanguage(language)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button className="add-language-btn" onClick={handleAddLanguage}>
                    + Til qo'shish
                  </button>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="details-card">
              <h3 className="card-title">
                <FaUser /> O'zim haqimda
              </h3>
              
              {isEditing ? (
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="bio-textarea"
                  rows="4"
                  placeholder="O'zingiz haqingizda qisqacha yozing..."
                />
              ) : (
                <p className="bio-content">{userData.bio}</p>
              )}
            </div>

            {/* Security */}
            <div className="details-card">
              <h3 className="card-title">
                <FaLock /> Xavfsizlik
              </h3>
              
              <div className="security-options">
                <button className="security-btn">
                  <FaLock /> Parolni o'zgartirish
                </button>
                <button className="security-btn">
                  <FaUserFriends /> Sessiyalarni boshqarish
                </button>
                <button className="security-btn">
                  <FaBriefcase /> Privatlik sozlamalari
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3 className="section-title">
            <FaHistory /> So'nggi faoliyat
          </h3>
          
          <div className="activity-list">
            <div className="activity-item completed">
              <div className="activity-icon">🎓</div>
              <div className="activity-info">
                <h4>"Python Dasturlash" kursini tugatdingiz</h4>
                <p className="activity-time">2 soat oldin</p>
              </div>
              <span className="activity-badge">Tugatildi</span>
            </div>
            
            <div className="activity-item in-progress">
              <div className="activity-icon">📚</div>
              <div className="activity-info">
                <h4>"Web Dasturlash" kursida yangi dars</h4>
                <p className="activity-time">Kecha, 15:30</p>
              </div>
              <span className="activity-badge">Davom etmoqda</span>
            </div>
            
            <div className="activity-item achievement">
              <div className="activity-icon">🏆</div>
              <div className="activity-info">
                <h4>"100 soat o'qish" yutug'ini oldingiz</h4>
                <p className="activity-time">3 kun oldin</p>
              </div>
              <span className="activity-badge">Yutuq</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;