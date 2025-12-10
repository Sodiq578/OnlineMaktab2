// src/pages/AllCourses.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import videoData from '../data/videos';
import { FaPlay, FaLock, FaStar, FaUsers, FaClock } from 'react-icons/fa';

const AllCourses = () => {
  const navigate = useNavigate();
  const { purchasedCourses = [] } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = videoData.filter(course =>
    course.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const isPurchased = (sectionId) => purchasedCourses.some(p => p.sectionId === sectionId);

  return (
    <div className="all-courses-page">
      <div className="page-header">
        <h1>Barcha Kurslar</h1>
        <input
          type="text"
          placeholder="Kurs nomini qidiring..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="courses-grid">
        {filtered.map(course => {
          const purchased = isPurchased(course.sectionId);
          return (
            <div key={course.sectionId} className="course-card" onClick={() => {
              if (purchased) {
                navigate(`/videos/${course.sectionId}`);
              } else {
                navigate('/dashboard/payments', { state: { section: course } });
              }
            }}>
              <div className="course-image">
                <img src={course.thumbnail || `https://picsum.photos/seed/${course.sectionId}/400/250`} alt="" />
                {purchased ? <div className="badge purchased">Sotib olingan</div> : <div className="badge price">{course.price.toLocaleString()} so'm</div>}
                <div className="play-overlay"><FaPlay /></div>
              </div>
              <div className="course-info">
                <h3>{course.sectionName}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span><FaStar className="gold" /> {course.rating}</span>
                  <span><FaUsers /> {course.enrolled}+</span>
                  <span><FaClock /> {course.videoCount} dars</span>
                </div>
                <div className="course-tags">
                  {course.tags?.slice(0, 3).map((tag, i) => <span key={i}>{tag}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCourses;