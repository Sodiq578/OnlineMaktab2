import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import './VideoListPage.css';
import Confetti from 'react-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const VideoListPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [enlargedVideo, setEnlargedVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [filterWatched, setFilterWatched] = useState('all');
  const [videoNotes, setVideoNotes] = useState({});
  const [isFullScreen, setIsFullScreen] = useState({});
  const videoRefs = useRef({});

  const formattedSubject = subject.replace(/-/g, ' ').toLowerCase().trim();
  const section = videoData.find(
    (sec) => sec.sectionName.toLowerCase() === formattedSubject
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedWatched = JSON.parse(localStorage.getItem(`${subject}_watched_videos`)) || [];
    setWatchedVideos(storedWatched);

    if (section) {
      const totalVideos = section.videos.length;
      const watchedCount = storedWatched.length;
      const percentage = totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0;
      setCompletionPercentage(percentage);
      if (watchedCount === totalVideos && totalVideos > 0) {
        setShowCelebration(true);
      }
    }
  }, [subject, section]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem(`${subject}_bookmarked_videos`)) || [];
    const storedNotes = JSON.parse(localStorage.getItem(`${subject}_video_notes`)) || {};
    setBookmarkedVideos(storedBookmarks);
    setVideoNotes(storedNotes);
  }, [subject]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen({});
      }
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const markVideoAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      const updatedWatched = [...watchedVideos, videoId];
      setWatchedVideos(updatedWatched);
      localStorage.setItem(`${subject}_watched_videos`, JSON.stringify(updatedWatched));

      const totalVideos = section.videos.length;
      const percentage = totalVideos > 0 ? Math.round((updatedWatched.length / totalVideos) * 100) : 0;
      setCompletionPercentage(percentage);
      if (updatedWatched.length === totalVideos && totalVideos > 0) {
        setTimeout(() => setShowCelebration(true), 1000);
      }
    }
  };

  const togglePlay = (videoId) => {
    if (playingVideo !== videoId) {
      setPlayingVideo(videoId);
      setEnlargedVideo(videoId);
      markVideoAsWatched(videoId);
    } else {
      setPlayingVideo(null);
      setEnlargedVideo(null);
    }
  };

  const toggleBookmark = (videoId) => {
    const updatedBookmarks = bookmarkedVideos.includes(videoId)
      ? bookmarkedVideos.filter((id) => id !== videoId)
      : [...bookmarkedVideos, videoId];
    setBookmarkedVideos(updatedBookmarks);
    localStorage.setItem(`${subject}_bookmarked_videos`, JSON.stringify(updatedBookmarks));
  };

  const handleNoteChange = (videoId, note) => {
    const updatedNotes = { ...videoNotes, [videoId]: note };
    setVideoNotes(updatedNotes);
    localStorage.setItem(`${subject}_video_notes`, JSON.stringify(updatedNotes));
  };

  const handleExerciseSubmit = (videoId, answer) => {
    const isCorrect = answer.toLowerCase() === 'correct';
    setExerciseAnswers((prev) => ({
      ...prev,
      [videoId]: { answer, isCorrect, submitted: true },
    }));
  };

  const toggleFullScreen = (videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen().then(() => {
          setIsFullScreen((prev) => ({ ...prev, [videoId]: true }));
        }).catch((err) => {
          console.error(`Error enabling full-screen: ${err.message}`);
          if (videoElement.tagName === 'IFRAME' && /Mobi|Android/i.test(navigator.userAgent)) {
            const video = section.videos.find((v) => v.id === videoId);
            if (video?.type === 'youtube' && video.src) {
              window.open(`https://www.youtube.com/watch?v=${video.src}`, '_blank');
            }
          }
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullScreen((prev) => ({ ...prev, [videoId]: false }));
        });
      }
    }
  };

  const filteredVideos = section?.videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterWatched === 'all' ||
      (filterWatched === 'watched' && watchedVideos.includes(video.id)) ||
      (filterWatched === 'unwatched' && !watchedVideos.includes(video.id));
    return matchesSearch && matchesFilter;
  });

  if (!section) {
    return (
      <div className="p-6 animate-fade-in">
        <h1 className="text-2xl font-semibold mb-4">Fan topilmadi</h1>
        <button
          onClick={() => navigate('/dashboard/home')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className={`video-list-page p-6 animate-fade-in relative min-h-screen ${darkMode ? 'dark' : ''}`}>
      {showCelebration && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={window.innerWidth < 768 ? 150 : 300}
            gravity={0.2}
          />
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4 text-center transform animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Tabriklaymiz!
              </h2>
              <p className="text-lg mb-6 dark:text-gray-300">
                Siz "{section.sectionName}" bo'limidagi barcha videolarni muvaffaqiyatli ko'rib chiqdingiz!
              </p>
              <button
                onClick={() => setShowCelebration(false)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ajoyib!
              </button>
            </div>
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-slide-down">
          <button
            onClick={() => navigate('/dashboard/home')}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Orqaga
          </button>
          <h1 className="text-4xl font-bold text-center text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            {section.sectionName}
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-slide-up flex flex-col sm:flex-row items-center justify-between">
          <div className="w-24 h-24 mb-4 sm:mb-0">
            <CircularProgressbar
              value={completionPercentage}
              text={`${completionPercentage}%`}
              styles={buildStyles({
                pathColor: '#3b82f6',
                textColor: darkMode ? '#fff' : '#1f2937',
                trailColor: darkMode ? '#4b5563' : '#e5e7eb',
              })}
            />
          </div>
          <div className="flex-1 sm:ml-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Kurs progressi: {completionPercentage}%
              </span>
              {completionPercentage === 100 && (
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Yakunlandi!
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mb-8 animate-slide-up flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Videolarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl border-0 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400 transition-all duration-300"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <select
            value={filterWatched}
            onChange={(e) => setFilterWatched(e.target.value)}
            className="p-4 rounded-xl border-0 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
          >
            <option value="all">Barchasi</option>
            <option value="watched">Ko'rilgan</option>
            <option value="unwatched">Ko'rilmagan</option>
          </select>
        </div>

        {filteredVideos?.length > 0 ? (
          <div className="video-grid">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                className={`video-card ${watchedVideos.includes(video.id) ? 'border-l-4 border-green-500' : ''} ${
                  bookmarkedVideos.includes(video.id) ? 'border-r-4 border-yellow-500' : ''
                } ${enlargedVideo === video.id ? 'enlarged' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{video.title}</h3>
                    <button
                      onClick={() => toggleBookmark(video.id)}
                      className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 transition-all duration-300"
                      aria-label={bookmarkedVideos.includes(video.id) ? "Xatcho'pdan olib tashlash" : "Xatcho'p qilish"}
                    >
                      {bookmarkedVideos.includes(video.id) ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <button
                      onClick={() => togglePlay(video.id)}
                      onKeyDown={(e) => e.key === 'Enter' && togglePlay(video.id)}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md ${
                        playingVideo === video.id ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      }`}
                      aria-label={playingVideo === video.id ? "Videoni to'xtatish" : "Videoni ko'rish"}
                    >
                      {playingVideo === video.id ? (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                          To'xtatish
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7L8 5z" />
                          </svg>
                          Videoni ko'rish
                        </>
                      )}
                    </button>
                    {playingVideo === video.id && (
                      <button
                        onClick={() => toggleFullScreen(video.id)}
                        onKeyDown={(e) => e.key === 'Enter' && toggleFullScreen(video.id)}
                        className="flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 shadow-md"
                        aria-label={isFullScreen[video.id] ? "Ekrandan chiqish" : "To'liq ekran"}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          {isFullScreen[video.id] ? (
                            <path d="M5 16h3v3H5v-3zm3-8H5v3h3V8zm11 8h-3v3h3v-3zm-3-8h3v3h-3V8z" />
                          ) : (
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                          )}
                        </svg>
                        {isFullScreen[video.id] ? "Ekrandan chiqish" : "To'liq ekran"}
                      </button>
                    )}
                  </div>

                  {playingVideo === video.id ? (
                    <div className="mb-4 rounded-lg overflow-hidden animate-zoom-in relative">
                      {video.type === 'youtube' && video.src ? (
                        <iframe
                          ref={(el) => (videoRefs.current[video.id] = el)}
                          width="100%"
                          height="auto"
                          src={`https://www.youtube.com/embed/${video.src}?autoplay=1`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          className="w-full aspect-video video-player"
                          loading="lazy"
                        ></iframe>
                      ) : video.type === 'local' && video.src ? (
                        <video
                          ref={(el) => (videoRefs.current[video.id] = el)}
                          width="100%"
                          height="auto"
                          controls
                          autoPlay
                          src={video.src}
                          className="w-full aspect-video video-player"
                          loading="lazy"
                        >
                          Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                        </video>
                      ) : (
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200">
                          <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Video manbasi topilmadi
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 rounded-lg overflow-hidden transition-opacity duration-300 hover:opacity-90 relative">
                      {video.type === 'youtube' && video.src ? (
                        <div className="relative">
                          <img
                            src={`https://img.youtube.com/vi/${video.src}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full aspect-video object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
                              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7L8 5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : video.type === 'local' && video.src ? (
                        <video
                          width="100%"
                          height="auto"
                          src={video.src}
                          className="w-full aspect-video"
                          muted
                          loop
                          playsInline
                          loading="lazy"
                        >
                          Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                        </video>
                      ) : (
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200">
                          <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Video manbasi topilmadi
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <details className="notes-details cursor-pointer">
                      <summary className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.707 14.707a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414L8.414 10l1.293 1.293a1 1 0 010 1.414z" />
                          <path d="M11 5a1 1 0 100 2h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 100 2h4a3 3 0 003-3V8a3 3 0 00-3-3h-4z" />
                        </svg>
                        Video uchun eslatmalar
                      </summary>
                      <div className="notes-content p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-slide-in">
                        <textarea
                          placeholder="Eslatmalaringizni bu yerga yozing..."
                          value={videoNotes[video.id] || ''}
                          onChange={(e) => handleNoteChange(video.id, e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none transition-all duration-300"
                          rows="4"
                        />
                      </div>
                    </details>
                  </div>

                  {video.exercise && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg animate-fade-in">
                      <details className="cursor-pointer">
                        <summary className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
                          <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Amaliy Mashq
                        </summary>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{video.exercise}</p>
                        <input
                          type="text"
                          placeholder="Javobingizni kiriting..."
                          onChange={(e) => handleExerciseSubmit(video.id, e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={exerciseAnswers[video.id]?.submitted}
                        />
                        {exerciseAnswers[video.id]?.submitted && (
                          <p className={`mt-2 ${exerciseAnswers[video.id].isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {exerciseAnswers[video.id].isCorrect ? (
                              <>
                                <svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                To'g'ri!
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Noto'g'ri, qayta urinib ko'ring.
                              </>
                            )}
                          </p>
                        )}
                      </details>
                    </div>
                  )}

                  {watchedVideos.includes(video.id) && (
                    <div className="flex items-center text-green-600 dark:text-green-400 mt-4">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Ko'rilgan</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">
              Hech narsa topilmadi
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              "{searchQuery}" so'rovi bo'yicha videolar topilmadi.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Barcha videolarni ko'rish
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/dashboard/home')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoListPage;