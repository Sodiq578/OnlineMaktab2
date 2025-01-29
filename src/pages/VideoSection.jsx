import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'; // Cjevro iconi
import './VideoSection.css'; // CSS faylini import qilish

const VideoSection = () => {
  const { subject } = useParams(); // URL dan fan nomini olish
  const location = useLocation();
  const { videoId, fileVideos = [] } = location.state || {}; // Video ID va fayldan keladigan videolarni olish
  const navigate = useNavigate(); // useNavigate hook

  if (!videoId && fileVideos.length === 0) {
    return <div>Hech qanday video topilmadi.</div>;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoId}`; // To'g'ri URL bilan video linkini o'rnatish

  // Orqaga qaytish funksiyasi
  const goBack = () => {
    navigate(-1); // Orqaga qaytish uchun
  };

  // 20 ta karta uchun video ro'yxati
  const videoCards = new Array(20).fill(videoUrl); // 20 ta video kartasi yaratish

  return (
    <div className="video-section">
      <div className="back-icon" onClick={goBack}>
        <FaChevronLeft /> 
      </div>
      <h2 className="section-title">{subject} bo'limi</h2>

      <div className="card-container">
        {fileVideos.map((fileVideo, index) => (
          <div className="video-card" key={`file-${index}`}>
            <video width="100%" height="200" controls>
              <source src={fileVideo} type="video/mp4" />
              Sizning brauzeringiz videoni qo'llab-quvvatlamaydi.
            </video>
            <p>Fayldan video {index + 1}</p>
          </div>
        ))}

        {videoCards.map((video, index) => (
          <div className="video-card" key={`embed-${index}`}>
            <iframe
              width="100%"
              height="200"
              src={video}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>Video {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
