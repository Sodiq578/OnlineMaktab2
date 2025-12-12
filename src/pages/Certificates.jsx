// src/pages/Certificates.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  FaCertificate, 
  FaDownload, 
  FaTrophy, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt, 
  FaUserGraduate,
  FaMedal,
  FaFire,
  FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Certificates.css';

const Certificates = () => {
  const { user, purchasedCourses = [], completedCourses = [] } = useUser();

  // Loading holati
  if (!user || purchasedCourses.length === 0) {
    return (
      <div className="certificates-page flex items-center justify-center">
        <div className="text-center">
          <div className="loading-icon">
            <FaCertificate className="loading-svg" />
          </div>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Hozircha sizda sertifikat mavjud emas. Kursni tugatganingizdan so‘ng sertifikat avtomatik tarzda beriladi.
          </p>
        </div>
      </div>
    );
  }

  // Tugallangan kurslarni aniqlash
  const completedIds = new Set(completedCourses.map(c => c.sectionId));

  const certificates = purchasedCourses
    .filter(course => completedIds.has(course.sectionId) && course.hasCertificate !== false)
    .map(course => ({
      id: course.sectionId,
      title: course.sectionName || course.title || 'Premium Kurs',
      instructor: course.instructor || 'EduHub Academy',
      completedDate: course.completedDate || new Date().toISOString().split('T')[0],
      durationHours: Math.round((course.totalDuration || 120) / 60),
      thumbnail: course.thumbnail || `https://picsum.photos/seed/${course.sectionId}/800/500`,
      rating: course.rating || 4.9,
      students: course.enrolled || 3200
    }));

  const totalHours = certificates.reduce((sum, c) => sum + c.durationHours, 0);

  return (
    <div className="certificates-page py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="cert-header">
          <h1 className="cert-title">Sertifikatlarim</h1>
          <p className="cert-subtitle">
            {certificates.length > 0 
              ? `Siz ${certificates.length} ta kursni muvaffaqiyatli tugatdingiz va sertifikatga ega bo‘ldingiz!`
              : "Hozircha sertifikatingiz yo‘q. Kurslarni tugatib, birinchisini oling!"}
          </p>
        </div>

        {/* Bo‘sh holat */}
        {certificates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-card">
              <div className="empty-icon">
                <FaTrophy />
              </div>
              <h3 className="empty-title">Hozircha sertifikat yo‘q</h3>
              <p className="empty-text">
                Kurslarni to‘liq tugatib, birinchi sertifikatingizni oling!
              </p>
              <Link to="/dashboard/all-courses" className="btn-primary">
                Kurslarga o‘tish <FaArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Statistikalar */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><FaTrophy /></div>
                <div className="stat-value">{certificates.length}</div>
                <div className="stat-label">Jami Sertifikat</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon"><FaClock /></div>
                <div className="stat-value">{totalHours}+</div>
                <div className="stat-label">O‘qilgan soat</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon"><FaCheckCircle /></div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Bitirish darajasi</div>
              </div>
            </div>

            {/* Sertifikatlar Grid */}
            <div className="certificates-grid">
              {certificates.map((cert) => (
                <div key={cert.id} className="certificate-card group">
                  
                  <div className="cert-image">
                    <img src={cert.thumbnail} alt={cert.title} />
                    <div className="cert-overlay" />
                    <div className="cert-badge"><FaMedal /> Sertifikat</div>
                    {cert.rating >= 4.8 && (
                      <div className="trend-badge"><FaFire /> TREND</div>
                    )}
                  </div>

                  <div className="cert-content">
                    <h3 className="cert-title-card">{cert.title}</h3>
                    <div className="cert-instructor">
                      <FaUserGraduate className="text-purple-600" />
                      <span>{cert.instructor}</span>
                    </div>
                    <div className="cert-meta">
                      <span><FaCalendarAlt /> {new Date(cert.completedDate).toLocaleDateString('uz-UZ')}</span>
                      <span><FaClock /> {cert.durationHours} soat</span>
                    </div>
                    <div className="cert-actions">
                      <button className="btn-download">
                        Yuklab olish <FaDownload />
                      </button>
                      <button className="btn-share">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Motivatsion banner */}
            <div className="motivation-banner">
              <div className="banner-card">
                <h2 className="banner-title">Yana ko‘proq bilim oling!</h2>
                <p className="banner-text">
                  Har bir tugallangan kurs — sizning karyerangizdagi yangi qadam!
                </p>
                <Link to="/dashboard/all-courses" className="btn-banner">
                  Yangi kurslarni ko‘rish <FaArrowRight />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificates;
