// src/admin/AddVideoForm.jsx
import React, { useState } from 'react';
import { Upload, Youtube, Link2, CheckCircle, AlertCircle } from 'lucide-react';
import videoData, { updateAndSave } from '../data/videos';

const AddVideoForm = ({ sectionId, onSuccess }) => {
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

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url.trim();
  };

  const generateThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const section = videoData.find(s => s.sectionId === parseInt(sectionId));
    if (!section) {
      setMessage({ type: 'error', text: 'Fan topilmadi!' });
      setLoading(false);
      return;
    }

    let src = formData.src.trim();
    if (formData.type === 'youtube') {
      src = extractYouTubeId(src);
      if (src.length !== 11) {
        setMessage({ type: 'error', text: 'Iltimos, to‘g‘ri YouTube video ID yoki link kiriting!' });
        setLoading(false);
        return;
      }
    }

    const newVideo = {
      id: `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title: formData.title.trim(),
      type: formData.type,
      src,
      thumbnail: formData.type === 'youtube'
        ? (formData.thumbnail || generateThumbnail(src))
        : formData.thumbnail,
      description: formData.description.trim() || undefined,
      exercise: formData.exercise.trim() || undefined
    };

    section.videos.push(newVideo);
    updateAndSave();

    setMessage({ type: 'success', text: 'Video muvaffaqiyatli qo‘shildi!' });
    setFormData({ title: '', src: '', type: 'youtube', thumbnail: '', description: '', exercise: '' });
    setLoading(false);
    
    if (onSuccess) onSuccess();
    
    setTimeout(() => setMessage(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'src' && formData.type === 'youtube') {
      const id = extractYouTubeId(value);
      if (id.length === 11) {
        setFormData(prev => ({ ...prev, thumbnail: generateThumbnail(id) }));
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
        <h2 className="text-3xl font-extrabold flex items-center gap-3">
          <Upload size={32} />
          Yangi Video Qo‘shish
        </h2>
      </div>

      <div className="p-8">
        {/* Success/Error Message */}
        {message && (
          <div className={`flex items-center gap-3 p-5 rounded-2xl mb-6 transition-all ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Video sarlavhasi (masalan: React Hooks nima?)"
            required
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Video turi</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:border-indigo-500 transition">
                <input type="radio" name="type" value="youtube" checked={formData.type === 'youtube'} onChange={handleChange} className="w-5 h-5 text-indigo-600" />
                <Youtube className="text-red-600" size={28} />
                <span className="font-medium">YouTube</span>
              </label>
              <label className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:border-purple-500 transition">
                <input type="radio" name="type" value="local" checked={formData.type === 'local'} onChange={handleChange} className="w-5 h-5 text-purple-600" />
                <Link2 size={28} />
                <span className="font-medium">Mahalliy video</span>
              </label>
            </div>
          </div>

          <input
            type="text"
            name="src"
            value={formData.src}
            onChange={handleChange}
            placeholder={formData.type === 'youtube' ? 'YouTube video ID yoki link' : 'Video fayl manzili (URL)'}
            required
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
          />

          {formData.type === 'youtube' && formData.thumbnail && (
            <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-indigo-300">
              <p className="text-sm font-medium text-gray-700 mb-2">Avto-generatsiya qilingan thumbnail:</p>
              <img src={formData.thumbnail} alt="Preview" className="w-full max-w-md rounded-xl shadow-md" />
            </div>
          )}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Video haqida qisqacha tavsif (ixtiyoriy)"
            rows="3"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition resize-none"
          />

          <textarea
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            placeholder="Amaliy vazifa (masalan: Todo ilova yasang) (ixtiyoriy)"
            rows="4"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-lg py-5 rounded-2xl hover:from-indigo-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>Qo‘shilmoqda...</>
            ) : (
              <>
                <Upload size={24} />
                Video Qo‘shish
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideoForm;