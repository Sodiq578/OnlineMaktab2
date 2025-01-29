import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Fandlar ro'yxati va ularning videolari
  const subjects = [
    { name: 'Matematika', id: 1, videoId: '1yyOrElDS7o' },
    { name: 'Fizika', id: 2, videoId: 'rQFMWwl2vOU' },
    { name: 'Kimyo', id: 3, videoId: 'uVCDKfV69wA' },
    { name: 'Biologiya', id: 4, videoId: '14ZCLoQqXxk' },
    { name: 'Ingliz tili', id: 5, videoId: 'MOsTpgKIGT4' },
    { name: 'Tarix', id: 6, videoId: 'lwd78VfDHBg' },
    { name: 'Geografiya', id: 7, videoId: 'VUkSauXKz5s' },
    { name: 'Adabiyot', id: 8, videoId: 'HWjCStB6k4o' },
    { name: 'Jismoniy tarbiya', id: 9, videoId: 'XKDdvVj9Nsc' },
    { name: 'Chizmachilik', id: 10, videoId: 'KWLoJM1sOlo' },
    { name: 'San’at', id: 11, videoId: 'xyewN0gMfD4' },
    // Qo'shimcha fanlar qo'shishingiz mumkin
  ];

  // Karta bosilganda, foydalanuvchini video bo'limiga yo'naltirish
  const handleClick = (subject) => {
    navigate(`/video/${subject.name.toLowerCase()}`, {
      state: { videoId: subject.videoId },
    }); // Fan bo'limiga yo'naltirish
  };

  return (
    <div className="homepage p-6">
      <h1 className="text-3xl font-semibold mb-6">Barcha fanlar</h1>
      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="card bg-white rounded-lg shadow-lg p-3 hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => handleClick(subject)}
          >
            <img
              src="https://picsum.photos/300/310"
              alt={subject.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
