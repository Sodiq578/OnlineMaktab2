// src/admin/AddSection.jsx
import React, { useState } from 'react';
import { videoData, updateAndSave } from '../data/videos';
import { useNavigate } from 'react-router-dom';

const AddSection = () => {
  const [sectionName, setSectionName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sectionName.trim()) {
      setMessage('Fan nomini kiriting!');
      return;
    }

    // Yangi ID yaratish
    const newId = videoData.length > 0 
      ? Math.max(...videoData.map(s => s.sectionId)) + 1 
      : 1;

    const newSection = {
      sectionId: newId,
      sectionName: sectionName.trim(),
      videos: []
    };

    videoData.push(newSection);
    updateAndSave(); // localStorage’ga saqlaydi

    setSectionName('');
    setMessage(`"${newSection.sectionName}" fani qo‘shildi!`);
    setTimeout(() => {
      setMessage('');
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Yangi Fan Qo‘shish</h2>

      {message && (
        <div className={`p-5 rounded-lg text-center text-lg font-bold mb-6 ${message.includes('qo‘shildi') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl">
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="Masalan: React JS Darslari"
          className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl text-lg focus:border-indigo-500 focus:outline-none"
          autoFocus
        />

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-xl"
          >
            Qo‘shish
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex-1 bg-gray-500 text-white py-5 rounded-xl font-bold text-xl hover:bg-gray-600 transition"
          >
            Orqaga
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSection;