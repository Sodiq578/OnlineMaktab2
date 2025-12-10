// src/pages/Certificates.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  FaCertificate, FaDownload, FaTrophy, FaCheckCircle, 
  FaClock, FaCalendarAlt, FaUserGraduate 
} from 'react-icons/fa';
import './Certificates.css';

const Certificates = () => {
  // Bu yerda default qiymatlar qo‘shildi — XATO CHIQQAN JOY SHU!
  const { 
    user = {}, 
    purchasedCourses = [], 
    completedCourses = [] 
  } = useUser();

  // Agar hali yuklanmagan bo‘lsa, loading ko‘rsatamiz
  if (!user || !purchasedCourses || !completedCourses) {
    return (
      <div className="certificates-page loading">
        <div className="loading-spinner">
          <FaCertificate className="spin" />
          <p>Sertifikatlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Foydalanuvchining tugatgan kurslarini aniqlaymiz
  const userCompletedCourseIds = completedCourses.map(c => c.sectionId);

  // Faqat tugatgan va sertifikati bor kurslarni filtr qilamiz
  const certificates = purchasedCourses
    .filter(course => 
      course && 
      userCompletedCourseIds.includes(course.sectionId) &&
      course.hasCertificate !== false // agar false bo‘lmasa
    )
    .map(course => ({
      id: course.sectionId,
      title: course.sectionName || course.title || 'Nomsiz kurs',
      instructor: course.instructor || 'EduHub',
      completedDate: course.completedDate || new Date().toISOString().split('T')[0],
      duration: course.totalDuration || 0,
      thumbnail: course.thumbnail || `https://picsum.photos/seed/${course.sectionId}/600/400`
    }));

  return (
    <div className="certificates-page">
      <div className="certificates-header">
        <h1>
          <FaCertificate /> Mening Sertifikatlarim
        </h1>
        <p>
          {certificates.length > 0 
            ? `Siz ${certificates.length} ta kursni muvaffaqiyatli tugatdingiz!` 
            : "Hozircha sertifikatingiz yo‘q. Kurslarni tugatib, birinchisini oling!"}
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="empty-certificates">
          <div className="empty-icon">
            <FaTrophy />
          </div>
          <h3>Hozircha sertifikat yo‘q</h3>
          <p>Kurslarni to‘liq tugatib, birinchi sertifikatingizni oling!</p>
          <button 
            onClick={() => window.location.href = '/dashboard/all-courses'}
            className="btn-primary"
          >
            Kurslarga o‘tish
          </button>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div key={cert.id || index} className="certificate-card">
              <div className="certificate-preview">
                <img 
                  src={cert.thumbnail} 
                  alt={cert.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/4f46e5/ffffff?text=Sertifikat';
                  }}
                />
                <div className="certificate-overlay">
                  <FaCertificate className="overlay-icon" />
                  <span>Muvaffaqiyatli tugatildi</span>
                </div>
              </div>

              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <div className="instructor">
                  <FaUserGraduate /> {cert.instructor}
                </div>

                <div className="cert-meta">
                  <span><FaCalendarAlt /> {cert.completedDate}</span>
                  <span><FaClock /> {Math.round(cert.duration / 60)} soat</span>
                </div>

                <div className="cert-actions">
                  <button className="btn-download">
                    <FaDownload /> Yuklab olish
                  </button>
                  <button className="btn-share">
                    <FaCheckCircle /> Ulashish
                  </button>
                </div>
              </div>

              <div className="certificate-badge">
                <FaTrophy />
                <span>Sertifikat</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Qo‘shimcha statistika */}
      {certificates.length > 0 && (
        <div className="certificates-stats">
          <div className="stat-item">
            <FaTrophy className="stat-icon gold" />
            <div>
              <h4>{certificates.length}</h4>
              <p>Jami sertifikat</p>
            </div>
          </div>
          <div className="stat-item">
            <FaClock className="stat-icon" />
            <div>
              <h4>{certificates.reduce((acc, c) => acc + Math.round(c.duration / 60), 0)}</h4>
              <p>Umumiy o‘qish soati</p>
            </div>
          </div>
          <div className="stat-item">
            <FaCheckCircle className="stat-icon success" />
            <div>
              <h4>100%</h4>
              <p>Bitirish darajasi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;