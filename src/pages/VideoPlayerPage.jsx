import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import './VideoListPage.css'; // CSS faylini keyinroq yaratamiz

const VideoListPage = () => {
  const { subject } = useParams(); // URLdan fanni olish (masalan, "html-darslari")
  const navigate = useNavigate();

  // URLdagi fanni videos.js dagi sectionName bilan solishtirish uchun
  const formattedSubject = subject
    .replace(/-/g, ' ') // chiziqchalarni bo'shliqqa aylantirish
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); // Har bir so'zning birinchi harfini katta qilish

  // Fanga mos videolarni topish
  const section = videoData.find(
    (sec) => sec.sectionName.toLowerCase() === formattedSubject.toLowerCase()
  );

  // Agar fan topilmasa, xabar ko'rsatish
  if (!section) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Fan topilmadi</h1>
        <button
          onClick={() => navigate('/dashboard/home')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="video-list-page p-6">
      <h1 className="text-3xl font-semibold mb-6">{section.sectionName}</h1>
      <div className="video-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {section.videos.map((video) => (
          <div
            key={video.id}
            className="video-card bg-white rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            {video.type === 'youtube' ? (
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.src}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                width="100%"
                height="200"
                controls
                src={video.src}
                className="rounded-lg"
              >
                Brauzeringiz video elementini qo'llab-quvvatlamaydi.
              </video>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/dashboard/home')}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Orqaga qaytish
      </button>
    </div>
  );
};

export default VideoListPage;