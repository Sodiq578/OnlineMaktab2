// src/admin/SectionVideos.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import videoData, { updateAndSave } from '../data/videos';
import AddVideoForm from './AddVideoForm';

const SectionVideos = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const section = videoData.find(s => s.sectionId === parseInt(sectionId));

  const [videos, setVideos] = useState(section?.videos || []);

  useEffect(() => {
    if (!section) {
      alert("Fan topilmadi!");
      navigate('/admin');
    } else {
      setVideos(section.videos);
    }
  }, [section, navigate]);

  const handleDelete = (videoId) => {
    if (window.confirm('Bu videoni o‘chirmoqchimisiz?')) {
      section.videos = section.videos.filter(v => v.id !== videoId);
      updateAndSave();
      setVideos([...section.videos]);
    }
  };

  if (!section) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link to="/admin" className="text-indigo-600 hover:underline mb-6 inline-block">← Orqaga</Link>
      
      <h1 className="text-4xl font-bold mb-4">{section.sectionName}</h1>
      <p className="text-xl text-gray-600 mb-10">Videolar: {videos.length} ta</p>

      <div className="mb-12">
        <AddVideoForm sectionId={sectionId} onSuccess={() => setVideos([...section.videos])} />
      </div>

      <div className="space-y-6">
        {videos.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Hali video qo‘shilmagan</p>
        ) : (
          videos.map((video, i) => (
            <div key={video.id} className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{i + 1}. {video.title}</h3>
                <p className="text-gray-600">ID: {video.src}</p>
              </div>
              <button onClick={() => handleDelete(video.id)} className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700">
                O‘chirish
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionVideos;