// src/pages/MyCourses.js
import React from 'react';
import { useUser } from '../context/UserContext';

const MyCourses = () => {
  const { purchasedCourses } = useUser();

  return (
    <div className="my-courses-container p-6">
      <h1 className="text-3xl font-semibold mb-6">Mening Kurslarim</h1>
      {purchasedCourses.length === 0 ? (
        <p className="text-center text-gray-600">Hozircha sotib olingan kurslar yo‘q.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((course) => (
            <div
              key={course.sectionId}
              className="course-card bg-white rounded-lg p-4 hover:scale-105 transform transition duration-300 hover:shadow-none"
            >
              <img
                src={
                  course.videos && course.videos[0]
                    ? `https://img.youtube.com/vi/${course.videos[0].src}/hqdefault.jpg`
                    : 'https://picsum.photos/500/300?random=' + course.sectionId
                }
                alt={course.sectionName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{course.sectionName}</h3>
              <p className="text-gray-600 text-base">Kursni davom ettirish uchun bosing.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;