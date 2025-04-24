import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import './VideoListPage.css';
import Confetti from 'react-confetti';

const VideoListPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const formattedSubject = subject
    .replace(/-/g, ' ')
    .toLowerCase()
    .trim();

  const section = videoData.find(
    (sec) => sec.sectionName.toLowerCase() === formattedSubject
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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

      // Show celebration if all videos are watched
      if (watchedCount === totalVideos && totalVideos > 0) {
        setShowCelebration(true);
      }
    }
  }, [subject, section]);

  const markVideoAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      const updatedWatched = [...watchedVideos, videoId];
      setWatchedVideos(updatedWatched);
      localStorage.setItem(`${subject}_watched_videos`, JSON.stringify(updatedWatched));

      const totalVideos = section.videos.length;
      const percentage = totalVideos > 0 ? Math.round((updatedWatched.length / totalVideos) * 100) : 0;
      setCompletionPercentage(percentage);

      // Check if all videos are now watched
      if (updatedWatched.length === totalVideos && totalVideos > 0) {
        setTimeout(() => setShowCelebration(true), 1000);
      }
    }
  };

  const togglePlay = (videoId) => {
    if (playingVideo !== videoId) {
      setPlayingVideo(videoId);
      markVideoAsWatched(videoId);
    } else {
      setPlayingVideo(null);
    }
  };

  const filteredVideos = section?.videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="video-list-page p-6 animate-fade-in relative min-h-screen">
      {showCelebration && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 text-center transform animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Tabriklaymiz!
              </h2>
              <p className="text-lg mb-6">
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
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Orqaga
          </button>
          <h1 className="text-4xl font-bold text-center text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            {section.sectionName}
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress Section */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-medium text-gray-700">
              Kurs progressi: {completionPercentage}%
            </span>
            {completionPercentage === 100 && (
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                Yakunlandi!
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8 animate-slide-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Videolarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl border-0 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition-all duration-300"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
        </div>

        {/* Videos Grid */}
        {filteredVideos?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl animate-fade-in-up ${watchedVideos.includes(video.id) ? 'border-l-4 border-green-500' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{video.title}</h3>
                  
                  <button
                    onClick={() => togglePlay(video.id)}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-lg mb-4 text-white font-medium transition-all duration-300 transform hover:scale-105 ${playingVideo === video.id ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
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

                  {playingVideo === video.id ? (
                    <div className="mb-4 rounded-lg overflow-hidden animate-zoom-in">
                      {video.type === 'youtube' && video.src ? (
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${video.src}?autoplay=1`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full aspect-video"
                        ></iframe>
                      ) : video.type === 'local' && video.src ? (
                        <video
                          width="100%"
                          height="200"
                          controls
                          autoPlay
                          src={video.src}
                          className="w-full aspect-video"
                        >
                          Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                        </video>
                      ) : (
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                          Video manbasi topilmadi
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 rounded-lg overflow-hidden transition-opacity duration-300 hover:opacity-90">
                      {video.type === 'youtube' && video.src ? (
                        <div className="relative">
                          <img
                            src={`https://img.youtube.com/vi/${video.src}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-3">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7L8 5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : video.type === 'local' && video.src ? (
                        <video
                          width="100%"
                          height="200"
                          src={video.src}
                          className="w-full aspect-video"
                          muted
                          loop
                          playsInline
                        >
                          Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                        </video>
                      ) : (
                        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                          Video manbasi topilmadi
                        </div>
                      )}
                    </div>
                  )}

                  {watchedVideos.includes(video.id) && (
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">Hech narsa topilmadi</h3>
            <p className="mt-1 text-gray-500">
              "{searchQuery}" so'rovi bo'yicha videolar topilmadi.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Barcha videolarni ko'rish
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/dashboard/home')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoListPage;