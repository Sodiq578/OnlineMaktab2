// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoData from '../data/videos'; // Import video data from the new path

 
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Navigate to the video list page for the selected subject
  const handleClick = (section) => {
    navigate(`/videos/${section.sectionName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="homepage p-6">
      <h1 className="text-3xl font-semibold mb-6">Barcha fanlar</h1>
      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {videoData.map((section) => (
          <div
            key={section.sectionId}
            className="card bg-white rounded-lg shadow-lg p-3 hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => handleClick(section)}
          >
            <img
              src={
                section.videos[0].type === 'youtube'
                  ? `https://img.youtube.com/vi/${section.videos[0].src}/hqdefault.jpg`
                  : section.videos[0].src // Fallback to video src for local videos
              }
              alt={section.sectionName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{section.sectionName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;