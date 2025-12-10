// src/admin/AddVideoForm.jsx
import React, { useState } from 'react';
import videoData, { updateAndSave } from '../data/videos';

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

  const extractYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return url;
  };

  const generateThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const section = videoData.find(s => s.sectionId === parseInt(sectionId));
    if (!section) {
      setMessage({ type: 'error', text: 'Fan topilmadi!' });
      setLoading(false);
      return;
    }

    let videoId = formData.src.trim();
    if (formData.type === 'youtube') {
      videoId = extractYouTubeId(videoId);
      if (videoId.length !== 11) {
        setMessage({ type: 'error', text: 'Noto‘g‘ri YouTube ID!' });
        setLoading(false);
        return;
      }
    }

    const newVideo = {
      id: `${sectionId}_${Date.now()}`,
      title: formData.title.trim(),
      type: formData.type,
      src: videoId,
      thumbnail: formData.type === 'youtube' ? (formData.thumbnail || generateThumbnail(videoId)) : formData.thumbnail,
      description: formData.description.trim() || undefined,
      exercise: formData.exercise.trim() || undefined
    };

    section.videos.push(newVideo);
    updateAndSave();

    setFormData({ title: '', src: '', type: 'youtube', exercise: '', thumbnail: '', description: '' });
    setMessage({ type: 'success', text: 'Video qo‘shildi!' });
    if (onSuccess) onSuccess();
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'src' && formData.type === 'youtube' && value.trim().length === 11) {
      setFormData(prev => ({ ...prev, thumbnail: generateThumbnail(value.trim()) }));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Yangi Video Qo‘shish</h3>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Video sarlavhasi" required className="w-full px-4 py-3 border rounded-xl" />
        
        <div>
          <label className="block mb-2">Turi</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl">
            <option value="youtube">YouTube</option>
            <option value="local">Mahalliy video</option>
          </select>
        </div>

        <input name="src" value={formData.src} onChange={handleChange} placeholder={formData.type === 'youtube' ? 'YouTube ID yoki URL' : 'Video manzili'} required className="w-full px-4 py-3 border rounded-xl" />

        {formData.type === 'youtube' && (
          <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail (ixtiyoriy)" className="w-full px-4 py-3 border rounded-xl" />
        )}

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tavsif (ixtiyoriy)" rows="3" className="w-full px-4 py-3 border rounded-xl" />
        <textarea name="exercise" value={formData.exercise} onChange={handleChange} placeholder="Amaliy vazifa (ixtiyoriy)" rows="3" className="w-full px-4 py-3 border rounded-xl" />

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50">
          {loading ? 'Qo‘shilmoqda...' : 'Video Qo‘shish'}
        </button>
      </form>
    </div>
  );
};

export default AddVideoForm;