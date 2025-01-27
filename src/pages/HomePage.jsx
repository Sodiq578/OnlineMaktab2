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
    <div className="homepage">
      <h1>Barcha fanlar</h1>
      <div className="cards-container">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="card"
            onClick={() => handleClick(subject)}
          >
            <img src="https://picsum.photos/300/310" alt={subject.name} />
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;