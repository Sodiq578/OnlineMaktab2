import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';
import {
  FaPlay,
  FaBookmark,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaSearch,
  FaArrowLeft,
  FaSun,
  FaMoon,
  FaCrown,
  FaEye    // YANGI QO‘SHILDI
} from 'react-icons/fa';

const VideoListPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [videoNotes, setVideoNotes] = useState({});
  const [showNotes, setShowNotes] = useState({});
  const [showCelebration, setShowCelebration] = useState(false); // TO'G'RI NOM
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Format subject: react-js-toliq-kurs → React Js Toliq Kurs
  const formatSubject = (str) =>
    str
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const formattedSubject = formatSubject(subject || '');
  const section = videoData.find((s) => s.sectionName === formattedSubject);

  // localStorage dan yuklash
  useEffect(() => {
    const savedWatched = JSON.parse(localStorage.getItem(`watched_${subject}`)) || [];
    const savedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${subject}`)) || [];
    const savedNotes = JSON.parse(localStorage.getItem(`notes_${subject}`)) || {};

    setWatchedVideos(savedWatched);
    setBookmarkedVideos(savedBookmarks);
    setVideoNotes(savedNotes);

    if (section) {
      const total = section.videos.length;
      const watched = savedWatched.length;
      const percentage = total > 0 ? Math.round((watched / total) * 100) : 0;
      setCompletionPercentage(percentage);

      // Kurs tugasa — confetti
      if (watched === total && total > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 9000);
      }
    }

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [subject, section]);

  // localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem(`watched_${subject}`, JSON.stringify(watchedVideos));
    localStorage.setItem(`bookmarks_${subject}`, JSON.stringify(bookmarkedVideos));
    localStorage.setItem(`notes_${subject}`, JSON.stringify(videoNotes));
  }, [watchedVideos, bookmarkedVideos, videoNotes, subject]);

  const markAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      const updated = [...watchedVideos, videoId];
      setWatchedVideos(updated);
      const percentage = Math.round((updated.length / section.videos.length) * 100);
      setCompletionPercentage(percentage);

      if (updated.length === section.videos.length) {
        setShowCelebration(true);
      }
    }
  };

  const togglePlay = (video) => {
    if (selectedVideo?.id === video.id) {
      setSelectedVideo(null);
    } else {
      setSelectedVideo(video);
      markAsWatched(video.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleBookmark = (videoId) => {
    setBookmarkedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600 mb-6">Kurs topilmadi</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
            "{formattedSubject}" nomli kurs mavjud emas.
          </p>
          <button
            onClick={() => navigate('/all-courses')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold transition"
          >
            Barcha kurslarga qaytish
          </button>
        </div>
      </div>
    );
  }

  const filteredVideos = section.videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Confetti + Tabrik */}
      {showCelebration && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-2xl animate-bounce">
              <FaCrown className="text-9xl text-yellow-500 mx-auto mb-6" />
              <h2 className="text-5xl font-black text-purple-600 mb-4">Tabriklaymiz!</h2>
              <p className="text-3xl text-gray-800 dark:text-white">
                Siz "{section.sectionName}" kursini muvaffaqiyatli tugatdingiz!
              </p>
              <button
                onClick={() => setShowCelebration(false)}
                className="mt-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full text-2xl font-bold hover:scale-110 transition"
              >
                Rahmat
              </button>
            </div>
          </div>
        </>
      )}

      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-purple-600 font-bold text-lg hover:scale-110 transition">
              <FaArrowLeft /> Orqaga
            </button>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {section.sectionName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{section.description}</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-3xl p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition"
            >
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-purple-600" />}
            </button>
          </div>
        </header>

        {/* Progress */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-48 h-48">
                <CircularProgressbar
                  value={completionPercentage}
                  text={`${completionPercentage}%`}
                  styles={{
                    path: { stroke: '#8b5cf6' },
                    text: { fill: '#8b5cf6', fontSize: '24px', fontWeight: 'bold' },
                    trail: { stroke: '#e5e7eb' },
                  }}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold text-gray-800 dark:text-white">Kurs Progressi</h3>
                <p className="text-6xl font-black text-purple-600 mt-4">
                  {watchedVideos.length} / {section.videos.length}
                </p>
                <p className="text-2xl text-gray-600 dark:text-gray-400">dars ko'rildi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player (agar tanlangan bo'lsa) */}
        {selectedVideo && (
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                <button onClick={() => setSelectedVideo(null)} className="text-4xl hover:scale-125 transition">
                  ×
                </button>
              </div>
              <div className="aspect-video">
                {selectedVideo.type === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.src}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video src={selectedVideo.src} controls autoPlay className="w-full h-full" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Qidiruv */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="relative">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
            <input
              type="text"
              placeholder="Videolarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 text-lg rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-purple-400/50 shadow-xl"
            />
          </div>
        </div>

        {/* Videolar ro'yxati */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, i) => {
              const isWatched = watchedVideos.includes(video.id);
              const isBookmarked = bookmarkedVideos.includes(video.id);

              return (
                <div
                  key={video.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 group"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.src}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => (e.target.src = `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`)}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div
                        onClick={() => togglePlay(video)}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition shadow-2xl"
                      >
                        <FaPlay className="text-4xl text-purple-600 ml-2" />
                      </div>
                    </div>
                    {isWatched && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <FaCheckCircle /> Ko'rilgan
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-5">
                      <span><FaClock /> {video.duration || '10:00'}</span>
                      <span><FaEye /> {video.views || '0'}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => togglePlay(video)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-bold hover:scale-105 transition flex items-center justify-center gap-2"
                      >
                        <FaPlay /> {isWatched ? 'Qayta ko‘rish' : 'Ko‘rish'}
                      </button>
                      <button
                        onClick={() => toggleBookmark(video.id)}
                        className={`p-3 rounded-full transition ${isBookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <FaBookmark />
                      </button>
                      <button
                        onClick={() => setShowNotes((prev) => ({ ...prev, [video.id]: !prev[video.id] }))}
                        className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-125 transition"
                      >
                        <FaFileAlt />
                      </button>
                    </div>

                    {showNotes[video.id] && (
                      <textarea
                        placeholder="Eslatmalaringiz..."
                        value={videoNotes[video.id] || ''}
                        onChange={(e) => setVideoNotes((prev) => ({ ...prev, [video.id]: e.target.value }))}
                        className="w-full mt-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 resize-none focus:ring-4 focus:ring-purple-400"
                        rows="3"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoListPage;