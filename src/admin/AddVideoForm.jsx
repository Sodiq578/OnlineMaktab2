// src/admin/AddVideoForm.jsx - To'g'rilangan versiya
import React, { useState, useEffect } from 'react';
import { Upload, Youtube, Link2, CheckCircle, AlertCircle, ChevronDown, RefreshCw } from 'lucide-react';
import { addVideoToSection, getVideoData } from '../data/videos';

const AddVideoForm = ({ onSuccess }) => {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    src: '',
    type: 'youtube',
    thumbnail: '',
    description: '',
    exercise: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ma'lumotlarni yuklash
  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = () => {
    try {
      const currentData = getVideoData();
      setSections(currentData);
      
      if (currentData.length > 0 && !selectedSectionId) {
        setSelectedSectionId(currentData[0].sectionId.toString());
      }
    } catch (error) {
      console.error('Kurslarni yuklashda xato:', error);
      setSections([]);
    }
  };

  // YouTube ID ni ajratish
  const extractYouTubeId = (url) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : url.trim();
      return id;
    } catch (error) {
      return url;
    }
  };

  // Thumbnail generatsiya
  const generateThumbnail = (id) => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validatsiya
    if (!selectedSectionId) {
      setMessage({ type: 'error', text: '❌ Iltimos, fanni tanlang!' });
      setLoading(false);
      return;
    }

    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: '❌ Video sarlavhasi bo\'sh bo\'lishi mumkin emas!' });
      setLoading(false);
      return;
    }

    if (!formData.src.trim()) {
      setMessage({ type: 'error', text: '❌ Video manbasi (ID yoki link) bo\'sh bo\'lishi mumkin emas!' });
      setLoading(false);
      return;
    }

    // YouTube linkini tekshirish
    let videoSrc = formData.src.trim();
    if (formData.type === 'youtube') {
      videoSrc = extractYouTubeId(videoSrc);
      if (videoSrc.length !== 11) {
        setMessage({ type: 'error', text: '❌ Iltimos, to\'g\'ri YouTube video ID yoki link kiriting! (11 belgi)' });
        setLoading(false);
        return;
      }
    }

    // Video ma'lumotlarini tayyorlash
    const videoDataToAdd = {
      title: formData.title.trim(),
      type: formData.type,
      src: videoSrc,
      thumbnail: formData.type === 'youtube' 
        ? (formData.thumbnail || generateThumbnail(videoSrc))
        : formData.thumbnail,
      description: formData.description.trim(),
      exercise: formData.exercise.trim()
    };

    // Video'ni qo'shish
    const success = addVideoToSection(selectedSectionId, videoDataToAdd);

    if (success) {
      // Muvaffaqiyat xabari
      const selectedSection = sections.find(s => s.sectionId.toString() === selectedSectionId);
      setMessage({ 
        type: 'success', 
        text: `✅ "${videoDataToAdd.title}" videosi "${selectedSection?.sectionName}" fanga muvaffaqiyatli qo'shildi!` 
      });
      
      // Formani tozalash
      setFormData({ 
        title: '', 
        src: '', 
        type: 'youtube', 
        thumbnail: '', 
        description: '', 
        exercise: '' 
      });
      
      // Kurslarni yangilash
      loadSections();
      
      // Agar onSuccess callback bo'lsa
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1000);
      }
    } else {
      setMessage({ 
        type: 'error', 
        text: '❌ Video qo\'shishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' 
      });
    }

    setLoading(false);
  };

  // Input o'zgarishlari
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // YouTube linki uchun thumbnail generatsiya
    if (name === 'src' && formData.type === 'youtube') {
      const id = extractYouTubeId(value);
      if (id.length === 11) {
        setFormData(prev => ({ ...prev, thumbnail: generateThumbnail(id) }));
      }
    }
  };

  // Video turini o'zgartirish
  const handleTypeChange = (type) => {
    setFormData(prev => ({ ...prev, type, thumbnail: '', src: '' }));
  };

  // Kurslarni yangilash
  const refreshSections = () => {
    loadSections();
    setMessage({ type: 'info', text: '🔄 Kurslar yangilandi!' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold flex items-center gap-3">
              <Upload size={32} />
              Yangi Video Qo'shish
            </h2>
            <p className="mt-2 text-indigo-100">Har qanday fanga yangi video qo'shing</p>
          </div>
          <button
            onClick={refreshSections}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition flex items-center gap-2"
            title="Kurslarni yangilash"
          >
            <RefreshCw size={20} />
            Yangilash
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Xabarlar */}
        {message && (
          <div className={`flex items-center gap-3 p-5 rounded-2xl mb-6 transition-all ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}>
            {message.type === 'success' ? <CheckCircle size={24} /> : message.type === 'error' ? <AlertCircle size={24} /> : <RefreshCw size={24} />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Fan tanlash */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-lg font-bold text-gray-800">
                1. Fanni tanlang *
              </label>
              <span className="text-sm text-gray-500">
                {sections.length} ta kurs mavjud
              </span>
            </div>
            
            <div className="relative">
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                required
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition appearance-none bg-white text-gray-800 font-medium"
              >
                <option value="">-- Fan tanlang --</option>
                {sections.length > 0 ? (
                  sections.map(section => (
                    <option key={section.sectionId} value={section.sectionId}>
                      {section.sectionName} ({section.videos?.length || 0} ta video)
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Kurslar mavjud emas</option>
                )}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            {selectedSectionId && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {sections.find(s => s.sectionId.toString() === selectedSectionId)?.sectionName?.charAt(0) || 'K'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {sections.find(s => s.sectionId.toString() === selectedSectionId)?.sectionName || 'Tanlanmagan'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {sections.find(s => s.sectionId.toString() === selectedSectionId)?.description || 'Tavsif mavjud emas'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Video sarlavhasi */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">
              2. Video sarlavhasi *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masalan: React Hooks nima? JavaScript asoslari..."
              required
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-gray-800"
            />
          </div>

          {/* 3. Video turi */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">
              3. Video turi *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleTypeChange('youtube')}
                className={`flex items-center justify-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.type === 'youtube' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 hover:border-red-300'}`}
              >
                <Youtube className={`${formData.type === 'youtube' ? 'text-red-600' : 'text-gray-500'}`} size={28} />
                <span className={`font-bold ${formData.type === 'youtube' ? 'text-red-700' : 'text-gray-700'}`}>
                  YouTube
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('local')}
                className={`flex items-center justify-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.type === 'local' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300 hover:border-purple-300'}`}
              >
                <Link2 className={`${formData.type === 'local' ? 'text-purple-600' : 'text-gray-500'}`} size={28} />
                <span className={`font-bold ${formData.type === 'local' ? 'text-purple-700' : 'text-gray-700'}`}>
                  Mahalliy video
                </span>
              </button>
            </div>
          </div>

          {/* 4. Video manbasi */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">
              4. Video manbasi *
            </label>
            <input
              type="text"
              name="src"
              value={formData.src}
              onChange={handleChange}
              placeholder={formData.type === 'youtube' 
                ? 'YouTube video ID yoki link (masalan: 9dUhZq9dkHM)' 
                : 'Video URL manzili (masalan: https://example.com/video.mp4)'}
              required
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-gray-800"
            />
            {formData.type === 'youtube' && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 YouTube video ID: 11 ta belgidan iborat (masalan: <code className="bg-white px-2 py-1 rounded">9dUhZq9dkHM</code>)
                </p>
              </div>
            )}
          </div>

          {/* 5. Thumbnail preview */}
          {formData.type === 'youtube' && formData.thumbnail && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <p className="text-sm font-bold text-gray-800 mb-3">✨ Avtomatik thumbnail:</p>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={formData.thumbnail} 
                  alt="Preview" 
                  className="w-full md:w-64 h-36 object-cover rounded-xl shadow-lg border border-gray-300" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x225?text=Thumbnail+Yuklanmadi';
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Agar thumbnail ko'rinmasa, video ID noto'g'ri yoki YouTube videoni o'chirilgan bo'lishi mumkin.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. Tavsif */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">
              5. Video tavsifi (ixtiyoriy)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Video haqida qisqacha tavsif yozing..."
              rows="3"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-gray-800 resize-none"
            />
          </div>

          {/* 7. Amaliy vazifa */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">
              6. Amaliy vazifa (ixtiyoriy)
            </label>
            <textarea
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              placeholder="O'quvchilar uchun amaliy topshiriq yozing..."
              rows="4"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-gray-800 resize-none"
            />
          </div>

          {/* 8. Submit button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading || !selectedSectionId}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Qo'shilmoqda...
                </>
              ) : (
                <>
                  <Upload size={24} />
                  Video Qo'shish
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Default prop qiymatlari
AddVideoForm.defaultProps = {
  onSuccess: () => {}
};

// Eksport qilish
export default AddVideoForm;