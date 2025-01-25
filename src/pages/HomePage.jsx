import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Fandlar ro'yxati
  const subjects = [
    { name: 'Matematika', id: 1 },
    { name: 'Fizika', id: 2 },
    { name: 'Kimyo', id: 3 },
    { name: 'Biologiya', id: 4 },
    { name: 'Ingliz tili', id: 5 },
    { name: 'Tarix', id: 6 },
    { name: 'Geografiya', id: 7 },
    { name: 'Adabiyot', id: 8 },
    { name: 'Jismoniy tarbiya', id: 9 },
    { name: 'Chizmachilik', id: 10 },
    { name: 'San’at', id: 11 },
    { name: 'Musiqa', id: 12 },
    { name: 'Astronomiya', id: 13 },
    { name: 'Informatika', id: 14 },
    { name: 'Ekologiya', id: 15 },
    { name: 'Psixologiya', id: 16 },
    { name: 'Filosofiya', id: 17 },
    { name: 'Sosiologiya', id: 18 },
    { name: 'Ximoya', id: 19 },
    { name: 'Tarmoqlar va texnologiyalar', id: 20 },
    { name: 'Lug’at ishlatish', id: 22 },
  ];

  // Karta bosilganda, foydalanuvchini video bo'limiga yo'naltirish
  const handleClick = (subject) => {
    navigate(`/video/${subject}`); // Fan bo'limiga yo'naltirish
  };

  return (
    <div className="homepage">
      <h1>Barcha fanlar</h1>
      <div className="cards-container">
        {subjects.map(subject => (
          <div key={subject.id} className="card" onClick={() => handleClick(subject.name)}>
            <img src="https://picsum.photos/200/300" alt={subject.name} />
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
