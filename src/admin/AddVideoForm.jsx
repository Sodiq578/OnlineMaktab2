// src/admin/AddVideoForm.jsx
import React, { useState } from 'react';
import { videoData, updateAndSave } from '../data/videos';

const AddVideoForm = ({ sectionId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    src: '',
    type: 'youtube',
    exercise: '',
    thumbnail: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // YouTube URL'dan ID ni ajratib olish funksiyasi
  const extractYouTubeId = (url) => {
    try {
      // Turli YouTube URL formatlari
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return url; // Agar pattern mos kelmasa, asl matnni qaytar
    } catch (error) {
      return url;
    }
  };

  // Thumbnail URL yaratish
  const generateThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Formni yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Section ni topish
      const section = videoData.find(s => s.sectionId === parseInt(sectionId));
      if (!section) {
        throw new Error('Fan topilmadi!');
      }

      // Video ID ni ajratish
      let videoId = formData.src.trim();
      
      // Agar YouTube URL bo'lsa, ID ni ajrat
      if (formData.type === 'youtube') {
        videoId = extractYouTubeId(videoId);
        
        // Agar to'liq URL bo'lsa, faqat ID ni olish
        if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
          videoId = extractYouTubeId(videoId);
        }
        
        // Video ID validatsiyasi
        if (!videoId || videoId.length !== 11) {
          throw new Error('Noto‘g‘ri YouTube video ID yoki URL! ID 11 ta belgidan iborat bo‘lishi kerak.');
        }
      }

      // Yangi video obyekti
      const newVideo = {
        id: `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title.trim(),
        type: formData.type,
        src: videoId,
        ...(formData.type === 'youtube' && {
          thumbnail: formData.thumbnail || generateThumbnailUrl(videoId)
        }),
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.exercise && { exercise: formData.exercise.trim() })
      };

      // Videoni qo'shish
      section.videos.push(newVideo);
      
      // Saqlash
      updateAndSave();

      // Formani tozalash
      setFormData({
        title: '',
        src: '',
        type: 'youtube',
        exercise: '',
        thumbnail: '',
        description: ''
      });

      setMessage({
        type: 'success',
        text: `"${newVideo.title}" videosi muvaffaqiyatli qo'shildi!`
      });

      // Parent component'ga xabar berish
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Xatolik yuz berdi!'
      });
    } finally {
      setLoading(false);
    }
  };

  // Input o'zgarishi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // YouTube URL bo'lsa, avtomatik thumbnail generatsiya
    if (name === 'src' && formData.type === 'youtube' && value.trim().length === 11) {
      const videoId = extractYouTubeId(value);
      if (videoId && videoId.length === 11) {
        setFormData(prev => ({
          ...prev,
          thumbnail: generateThumbnailUrl(videoId)
        }));
      }
    }
  };

  // YouTube video URL formatlari misollari
  const youtubeExamples = [
    'https://youtu.be/ZOu4q4stPio',
    'https://www.youtube.com/watch?v=ZOu4q4stPio',
    'https://youtube.com/embed/ZOu4q4stPio',
    'ZOu4q4stPio (faqat ID)'
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Yangi Video Qo'shish</h3>

      {/* Xabarlar */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center">
            <span className={`text-xl mr-3 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.type === 'success' ? '✅' : '❌'}
            </span>
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video turi */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Video Turi</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="youtube"
                checked={formData.type === 'youtube'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-red-600 font-medium">YouTube</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="local"
                checked={formData.type === 'local'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-blue-600 font-medium">Mahalliy Video</span>
            </label>
          </div>
        </div>

        {/* Sarlavha */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Video Sarlavhasi *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masalan: HTML 30-dars. CSS bilan ishlash"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Video manbasi */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {formData.type === 'youtube' ? 'YouTube Video ID yoki URL *' : 'Video Fayl Manbasi *'}
          </label>
          <input
            type="text"
            name="src"
            value={formData.src}
            onChange={handleChange}
            placeholder={
              formData.type === 'youtube' 
                ? 'https://youtu.be/ZOu4q4stPio yoki ZOu4q4stPio'
                : '/videos/lesson-1.mp4'
            }
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
          />
          
          {/* YouTube misollar */}
          {formData.type === 'youtube' && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-medium">Misol formatlar:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                {youtubeExamples.map((example, idx) => (
                  <li key={idx} className="font-mono bg-white px-3 py-1 rounded border">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Thumbnail (faqat YouTube uchun) */}
        {formData.type === 'youtube' && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Thumbnail URL (ixtiyoriy)
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Avtomatik generatsiya qilinadi"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
            />
            {formData.thumbnail && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Thumbnail ko‘rinishi:</p>
                <img 
                  src={formData.thumbnail} 
                  alt="Thumbnail preview" 
                  className="w-40 h-24 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${extractYouTubeId(formData.src)}/hqdefault.jpg`;
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Tavsif */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Tavsif (ixtiyoriy)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Video haqida qisqacha ma'lumot..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Amaliy vazifa */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Amaliy Vazifa (ixtiyoriy)
          </label>
          <textarea
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            placeholder="O'quvchilar uchun amaliy topshiriq..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Tugmalar */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Qo'shilyapti...
              </span>
            ) : (
              'Video Qo\'shish'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                src: '',
                type: 'youtube',
                exercise: '',
                thumbnail: '',
                description: ''
              });
              setMessage('');
            }}
            className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            Tozalash
          </button>
        </div>
      </form>

      {/* Qo'shimcha ma'lumot */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-bold text-blue-800 mb-2">💡 Qo'shimcha ma'lumot:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• YouTube videolari uchun faqat ID yoki to'liq URL kiriting</li>
          <li>• Video ID har doim 11 ta belgidan iborat bo'ladi</li>
          <li>• Thumbnail avtomatik generatsiya qilinadi</li>
          <li>• Barcha o'zgarishlar darhol saqlanadi</li>
        </ul>
      </div>
    </div>
  );
};

export default AddVideoForm;