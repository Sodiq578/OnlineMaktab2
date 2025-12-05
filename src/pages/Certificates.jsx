// src/pages/Certificates.js
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaCertificate, FaDownload, FaShareAlt, FaPrint, FaEye, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import './Certificates.css';

const Certificates = () => {
  const { purchasedCourses } = useUser();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filter, setFilter] = useState('all');

  const certificates = purchasedCourses
    .filter(course => {
      // Simulated: assume courses with > 80% progress have certificates
      const progress = localStorage.getItem(`course_progress_${course.sectionId}`);
      const progressValue = progress ? parseInt(progress) : 0;
      return progressValue >= 80;
    })
    .map(course => {
      const completionDate = new Date();
      completionDate.setDate(completionDate.getDate() - Math.floor(Math.random() * 30));
      
      return {
        id: course.sectionId,
        courseName: course.sectionName,
        studentName: "Foydalanuvchi",
        completionDate: completionDate.toISOString().split('T')[0],
        certificateId: `CERT-${course.sectionId}-${Date.now().toString().slice(-6)}`,
        grade: (4 + Math.random()).toFixed(1),
        downloadUrl: '#',
        shareUrl: '#',
        verified: true
      };
    });

  const filteredCertificates = certificates.filter(cert => {
    if (filter === 'recent') {
      const certDate = new Date(cert.completionDate);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return certDate > monthAgo;
    }
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (certificateId) => {
    // Here you would implement actual download functionality
    alert(`Sertifikat ${certificateId} yuklanmoqda...`);
  };

  const handleShare = (certificate) => {
    // Implement share functionality
    const shareText = `Men "${certificate.courseName}" kursini muvaffaqiyatli tugatdim! 🎓`;
    if (navigator.share) {
      navigator.share({
        title: 'Sertifikat',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Sertifikat havolasi nusxalandi!');
    }
  };

  const handlePrint = (certificateId) => {
    // Implement print functionality
    alert(`Sertifikat ${certificateId} chop etilmoqda...`);
  };

  return (
    <div className="certificates-page">
      <div className="certificates-header">
        <div className="header-content">
          <h1 className="page-title">
            <FaCertificate /> Sertifikatlarim
          </h1>
          <p className="page-subtitle">
            Olingan sertifikatlar: {certificates.length} ta
          </p>
        </div>

        {certificates.length > 0 && (
          <div className="certificate-stats">
            <div className="stat-card">
              <div className="stat-value">{certificates.length}</div>
              <div className="stat-label">Jami</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{certificates.filter(c => c.grade >= 4.5).length}</div>
              <div className="stat-label">Yuqori Baholar</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {certificates.filter(c => {
                  const certDate = new Date(c.completionDate);
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return certDate > monthAgo;
                }).length}
              </div>
              <div className="stat-label">Oxirgi oy</div>
            </div>
          </div>
        )}
      </div>

      {certificates.length === 0 ? (
        <div className="no-certificates">
          <div className="empty-state">
            <FaCertificate className="empty-icon" />
            <h2>Hozircha sertifikatingiz yo'q</h2>
            <p>Kurslarni tugatib, sertifikatlarni oling!</p>
            <button className="view-courses-btn">
              Kurslarni ko'rish
            </button>
          </div>
        </div>
      ) : (
        <div className="certificates-container">
          <div className="certificates-controls">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Barchasi
              </button>
              <button 
                className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
                onClick={() => setFilter('recent')}
              >
                So'nggi oy
              </button>
            </div>
            
            <div className="view-toggle">
              <span>Ko'rinish:</span>
              <button className="view-btn active">Kartalar</button>
              <button className="view-btn">Ro'yxat</button>
            </div>
          </div>

          <div className="certificates-grid">
            {filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="certificate-card">
                <div className="certificate-header">
                  <div className="certificate-badge">
                    <FaCertificate />
                    <span>Sertifikat</span>
                  </div>
                  <div className="certificate-grade">
                    <span className="grade-value">{certificate.grade}</span>
                    <span className="grade-label">Baholar</span>
                  </div>
                </div>

                <div className="certificate-body">
                  <h3 className="course-name">{certificate.courseName}</h3>
                  <div className="certificate-info">
                    <div className="info-item">
                      <span className="info-label">Talaba:</span>
                      <span className="info-value">{certificate.studentName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">ID:</span>
                      <span className="info-value">{certificate.certificateId}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">
                        <FaCalendarAlt /> Berilgan sana:
                      </span>
                      <span className="info-value">{formatDate(certificate.completionDate)}</span>
                    </div>
                    {certificate.verified && (
                      <div className="verified-badge">
                        <FaCheckCircle /> Tasdiqlangan
                      </div>
                    )}
                  </div>
                </div>

                <div className="certificate-footer">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    <FaEye /> Ko'rish
                  </button>
                  <button 
                    className="action-btn download-btn"
                    onClick={() => handleDownload(certificate.certificateId)}
                  >
                    <FaDownload /> Yuklab olish
                  </button>
                  <button 
                    className="action-btn share-btn"
                    onClick={() => handleShare(certificate)}
                  >
                    <FaShareAlt /> Ulashish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCertificate && (
        <div className="certificate-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sertifikatni ko'rish</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedCertificate(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="certificate-preview">
              <div className="preview-header">
                <FaCertificate className="preview-icon" />
                <h3>TABRIKLAYMIZ!</h3>
              </div>
              
              <div className="preview-body">
                <h4>{selectedCertificate.studentName}</h4>
                <p>quyidagi kursni muvaffaqiyatli tugatdi:</p>
                <h2>{selectedCertificate.courseName}</h2>
                
                <div className="preview-details">
                  <p>Sertifikat ID: {selectedCertificate.certificateId}</p>
                  <p>Berilgan sana: {formatDate(selectedCertificate.completionDate)}</p>
                  <p>O'rtacha baho: {selectedCertificate.grade}</p>
                </div>
                
                <div className="signatures">
                  <div className="signature">
                    <div className="signature-line"></div>
                    <p>Platforma Direktori</p>
                  </div>
                  <div className="signature">
                    <div className="signature-line"></div>
                    <p>O'qituvchi</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="action-btn print-btn"
                onClick={() => handlePrint(selectedCertificate.certificateId)}
              >
                <FaPrint /> Chop etish
              </button>
              <button 
                className="action-btn download-btn"
                onClick={() => handleDownload(selectedCertificate.certificateId)}
              >
                <FaDownload /> Yuklab olish
              </button>
              <button 
                className="action-btn close-modal-btn"
                onClick={() => setSelectedCertificate(null)}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;