// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import { useUser } from '../context/UserContext'; // Context import
import abloshkaImage from '../assets/abloshka.jpg';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { purchasedCourses } = useUser();

  const handleClick = (section) => {
    const slug = section.sectionName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Kurs sotib olinganligini tekshirish
    const isPurchased = purchasedCourses.some((course) => course.sectionId === section.sectionId);
    if (isPurchased) {
      navigate(`/videos/${slug}`); // Kurs ochiladi
    } else {
      navigate(`/dashboard/payments`, { state: { section } }); // To‘lov sahifasiga
    }
  };

  const getThumbnailUrl = (video) => {
    if (!video) return abloshkaImage;
    return video.type === 'youtube'
      ? `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`
      : video.thumbnail || abloshkaImage;
  };

  return (
    <div className="homepage p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Barcha fanlar</h1>
      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videoData.map((section) => (
          <div
            key={section.sectionId}
            className="card bg-white rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => handleClick(section)}
            role="button"
            aria-label={`View videos for ${section.sectionName}`}
          >
            <img
              src={getThumbnailUrl(section.videos && section.videos[0])}
              alt={`${section.sectionName} thumbnail`}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => (e.target.src = abloshkaImage)}
            />
            <h3 className="text-xl font-semibold text-gray-700 text-center">{section.sectionName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;