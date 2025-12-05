// src/pages/VideoListPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos';
import './VideoListPage.css';
import Confetti from 'react-confetti';
import { CircularProgressbar } from 'react-circular-progressbar';
import { 
  FaPlay, FaPause, FaBookmark, FaBook, FaClock, 
  FaCheckCircle, FaFilter, FaSearch, FaArrowLeft,
  FaSun, FaMoon, FaExpand, FaCompress, FaStar,
  FaVolumeUp, FaClosedCaptioning, FaDownload,
  FaShareAlt, FaThumbsUp, FaEye, FaFileAlt,
  FaChevronDown, FaChevronUp, FaCrown, FaMedal
} from 'react-icons/fa';
import { GiAchievement } from 'react-icons/gi';

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
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [filterWatched, setFilterWatched] = useState('all');
  const [videoNotes, setVideoNotes] = useState({});
  const [videoRatings, setVideoRatings] = useState({});
  const [showNotes, setShowNotes] = useState({});
  const [showExercises, setShowExercises] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const videoRefs = useRef({});
  const playerRef = useRef(null);

  const formattedSubject = subject.replace(/-/g, ' ').toLowerCase().trim();
  const section = videoData.find(
    (sec) => sec.sectionName.toLowerCase() === formattedSubject
  );

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const storedWatched = JSON.parse(localStorage.getItem(`${subject}_watched`)) || [];
    const storedBookmarks = JSON.parse(localStorage.getItem(`${subject}_bookmarks`)) || [];
    const storedNotes = JSON.parse(localStorage.getItem(`${subject}_notes`)) || {};
    const storedRatings = JSON.parse(localStorage.getItem(`${subject}_ratings`)) || {};
    const storedAchievements = JSON.parse(localStorage.getItem(`${subject}_achievements`)) || [];

    setWatchedVideos(storedWatched);
    setBookmarkedVideos(storedBookmarks);
    setVideoNotes(storedNotes);
    setVideoRatings(storedRatings);
    setAchievements(storedAchievements);

    if (section) {
      const totalVideos = section.videos.length;
      const watchedCount = storedWatched.length;
      const percentage = totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0;
      setCompletionPercentage(percentage);
      
      if (watchedCount === totalVideos && totalVideos > 0 && !storedAchievements.includes('completed_all')) {
        setShowCelebration(true);
        const newAchievements = [...storedAchievements, 'completed_all'];
        setAchievements(newAchievements);
        localStorage.setItem(`${subject}_achievements`, JSON.stringify(newAchievements));
      }
    }
  }, [subject, section]);

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Fullscreen handler
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const markVideoAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      const updatedWatched = [...watchedVideos, videoId];
      setWatchedVideos(updatedWatched);
      localStorage.setItem(`${subject}_watched`, JSON.stringify(updatedWatched));

      const totalVideos = section.videos.length;
      const percentage = totalVideos > 0 ? Math.round((updatedWatched.length / totalVideos) * 100) : 0;
      setCompletionPercentage(percentage);
      
      // Check for achievements
      checkAchievements(updatedWatched);
      
      if (updatedWatched.length === totalVideos && totalVideos > 0) {
        setTimeout(() => setShowCelebration(true), 1000);
      }
    }
  };

  const checkAchievements = (watchedVideosList) => {
    const totalVideos = section.videos.length;
    const watchedCount = watchedVideosList.length;
    const newAchievements = [...achievements];

    if (watchedCount >= 3 && !newAchievements.includes('watched_3')) {
      newAchievements.push('watched_3');
    }
    if (watchedCount >= 10 && !newAchievements.includes('watched_10')) {
      newAchievements.push('watched_10');
    }
    if (watchedCount === totalVideos && !newAchievements.includes('completed_all')) {
      newAchievements.push('completed_all');
    }

    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements);
      localStorage.setItem(`${subject}_achievements`, JSON.stringify(newAchievements));
      setShowAchievements(true);
      setTimeout(() => setShowAchievements(false), 3000);
    }
  };

  const togglePlay = (videoId) => {
    if (playingVideo !== videoId) {
      setPlayingVideo(videoId);
      setSelectedVideo(section.videos.find(v => v.id === videoId));
      markVideoAsWatched(videoId);
      
      // Auto-scroll to video player
      setTimeout(() => {
        const element = document.getElementById(`video-${videoId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      setPlayingVideo(null);
      setSelectedVideo(null);
    }
  };

  const toggleBookmark = (videoId) => {
    const updatedBookmarks = bookmarkedVideos.includes(videoId)
      ? bookmarkedVideos.filter((id) => id !== videoId)
      : [...bookmarkedVideos, videoId];
    setBookmarkedVideos(updatedBookmarks);
    localStorage.setItem(`${subject}_bookmarks`, JSON.stringify(updatedBookmarks));
  };

  const handleNoteChange = (videoId, note) => {
    const updatedNotes = { ...videoNotes, [videoId]: note };
    setVideoNotes(updatedNotes);
    localStorage.setItem(`${subject}_notes`, JSON.stringify(updatedNotes));
  };

  const handleRating = (videoId, rating) => {
    const updatedRatings = { ...videoRatings, [videoId]: rating };
    setVideoRatings(updatedRatings);
    localStorage.setItem(`${subject}_ratings`, JSON.stringify(updatedRatings));
  };

  const handleExerciseSubmit = (videoId, answer) => {
    const video = section.videos.find(v => v.id === videoId);
    const isCorrect = answer.toLowerCase() === video.correctAnswer?.toLowerCase();
    
    setExerciseAnswers((prev) => ({
      ...prev,
      [videoId]: { answer, isCorrect, submitted: true },
    }));

    if (isCorrect && !achievements.includes('solved_exercise')) {
      const newAchievements = [...achievements, 'solved_exercise'];
      setAchievements(newAchievements);
      localStorage.setItem(`${subject}_achievements`, JSON.stringify(newAchievements));
      setShowAchievements(true);
    }
  };

  const toggleFullScreen = (videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen().catch(err => {
          console.error(`Error enabling full-screen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleVideoSpeed = (speed) => {
    setVideoSpeed(speed);
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      video.playbackRate = speed;
    });
  };

  const takeQuiz = () => {
    const totalQuestions = section.videos.length;
    const correctAnswers = Object.values(exerciseAnswers).filter(ans => ans.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizScore(score);
    setShowQuizModal(true);

    if (score >= 80 && !achievements.includes('quiz_master')) {
      const newAchievements = [...achievements, 'quiz_master'];
      setAchievements(newAchievements);
      localStorage.setItem(`${subject}_achievements`, JSON.stringify(newAchievements));
    }
  };

  const getAchievementIcon = (achievement) => {
    switch(achievement) {
      case 'watched_3': return <FaEye />;
      case 'watched_10': return <FaMedal />;
      case 'completed_all': return <FaCrown />;
      case 'solved_exercise': return <FaCheckCircle />;
      case 'quiz_master': return <GiAchievement />;
      default: return <FaStar />;
    }
  };

  const getAchievementText = (achievement) => {
    switch(achievement) {
      case 'watched_3': return "3 ta video ko'rdingiz";
      case 'watched_10': return "10 ta video ko'rdingiz";
      case 'completed_all': return "Barcha videolarni tamomladingiz";
      case 'solved_exercise': return "Mashqni to'g'ri yechdingiz";
      case 'quiz_master': return "Testda yaxshi natija ko'rsatdingiz";
      default: return "Yutuq";
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
      <div className="video-page-not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">Fan topilmadi</h1>
          <p className="not-found-message">
            Kechirasiz, "{formattedSubject}" bo'yicha ma'lumotlar topilmadi.
          </p>
          <button
            onClick={() => navigate('/dashboard/home')}
            className="back-home-btn"
          >
            <FaArrowLeft /> Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-list-page">
      {/* Celebration Confetti */}
      {showCelebration && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
            colors={['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2']}
          />
          <div className="celebration-modal">
            <div className="celebration-content">
              <FaCrown className="celebration-icon" />
              <h2>Tabriklaymiz! 👑</h2>
              <p>
                Siz "{section.sectionName}" kursidagi barcha videolarni 
                muvaffaqiyatli tamomladingiz!
              </p>
              <button
                onClick={() => setShowCelebration(false)}
                className="celebration-btn"
              >
                Davom etish
              </button>
            </div>
          </div>
        </>
      )}

      {/* Achievements Toast */}
      {showAchievements && (
        <div className="achievements-toast">
          {achievements.slice(-1).map(achievement => (
            <div key={achievement} className="achievement-toast">
              <div className="achievement-icon">
                {getAchievementIcon(achievement)}
              </div>
              <div>
                <h4>Yangi yutuq!</h4>
                <p>{getAchievementText(achievement)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="quiz-modal">
          <div className="quiz-content">
            <h2>Test Natijalari</h2>
            <div className="quiz-score-circle">
              <CircularProgressbar
                value={quizScore}
                text={`${quizScore}%`}
                styles={{
                  path: {
                    stroke: quizScore >= 80 ? '#4ECDC4' : quizScore >= 60 ? '#FFD166' : '#FF6B6B',
                    strokeLinecap: 'round',
                  },
                  text: {
                    fill: quizScore >= 80 ? '#4ECDC4' : quizScore >= 60 ? '#FFD166' : '#FF6B6B',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  },
                  trail: {
                    stroke: '#E0E0E0',
                  },
                }}
              />
            </div>
            <p className="quiz-message">
              {quizScore >= 80 
                ? "Ajoyib natija! Siz kursni mukammal o'zlashtirdingiz!" 
                : quizScore >= 60 
                ? "Yaxshi ish qildingiz! Biroz yana mashq qilishingiz kerak." 
                : "Ko'proq mashq qilishingiz kerak. Qaytadan ko'rib chiqing!"}
            </p>
            <div className="quiz-actions">
              <button onClick={() => setShowQuizModal(false)} className="quiz-close-btn">
                Yopish
              </button>
              <button onClick={() => navigate('/dashboard/home')} className="quiz-home-btn">
                Bosh sahifa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="video-header">
        <div className="header-content">
          <button onClick={() => navigate('/dashboard/home')} className="back-btn">
            <FaArrowLeft /> Bosh sahifa
          </button>
          <div className="header-center">
            <h1 className="section-title">
              <FaBook /> {section.sectionName}
            </h1>
            <p className="section-subtitle">{section.description || "Professional video kurs"}</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-toggle"
            aria-label={darkMode ? "Kunduzgi rejim" : "Tungi rejim"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="video-main">
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-card">
            <div className="progress-circle">
              <CircularProgressbar
                value={completionPercentage}
                text={`${completionPercentage}%`}
                styles={{
                  path: {
                    stroke: `rgba(74, 222, 128, ${completionPercentage / 100})`,
                    strokeLinecap: 'round',
                  },
                  text: {
                    fill: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  },
                  trail: {
                    stroke: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
            </div>
            <div className="progress-info">
              <h3>Kurs Progressi</h3>
              <div className="progress-stats">
                <span className="stat-item">
                  <FaEye /> {watchedVideos.length} / {section.videos.length}
                </span>
                <span className="stat-item">
                  <FaBookmark /> {bookmarkedVideos.length}
                </span>
                <span className="stat-item">
                  <FaClock /> {section.totalDuration || "0"} min
                </span>
              </div>
              <div className="progress-actions">
                <button onClick={() => setFilterWatched('unwatched')} className="progress-btn">
                  Davom etish
                </button>
                <button onClick={takeQuiz} className="progress-btn quiz">
                  Test topshirish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Videolarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterWatched === 'all' ? 'active' : ''}`}
              onClick={() => setFilterWatched('all')}
            >
              Barchasi
            </button>
            <button 
              className={`filter-btn ${filterWatched === 'watched' ? 'active' : ''}`}
              onClick={() => setFilterWatched('watched')}
            >
              Ko'rilgan
            </button>
            <button 
              className={`filter-btn ${filterWatched === 'unwatched' ? 'active' : ''}`}
              onClick={() => setFilterWatched('unwatched')}
            >
              Ko'rilmagan
            </button>
            <select 
              value={videoSpeed} 
              onChange={(e) => handleVideoSpeed(parseFloat(e.target.value))}
              className="speed-select"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="main-video-player" id={`video-${selectedVideo.id}`}>
            <div className="video-player-container">
              <div className="player-header">
                <h3 className="player-title">{selectedVideo.title}</h3>
                <div className="player-actions">
                  <button className="player-btn" onClick={() => toggleBookmark(selectedVideo.id)}>
                    <FaBookmark className={bookmarkedVideos.includes(selectedVideo.id) ? 'bookmarked' : ''} />
                  </button>
                  <button className="player-btn" onClick={() => toggleFullScreen(selectedVideo.id)}>
                    {isFullScreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
              <div className="video-wrapper" ref={playerRef}>
                {selectedVideo.type === 'youtube' ? (
                  <iframe
                    ref={(el) => (videoRefs.current[selectedVideo.id] = el)}
                    src={`https://www.youtube.com/embed/${selectedVideo.src}?autoplay=1&controls=1&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-player"
                  />
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[selectedVideo.id] = el)}
                    src={selectedVideo.src}
                    controls
                    autoPlay
                    className="local-player"
                  />
                )}
              </div>
              <div className="player-footer">
                <div className="video-meta">
                  <span className="meta-item">
                    <FaClock /> {selectedVideo.duration || "10:00"}
                  </span>
                  <span className="meta-item">
                    <FaThumbsUp /> {selectedVideo.likes || "0"}
                  </span>
                  <span className="meta-item">
                    <FaEye /> {selectedVideo.views || "0"}
                  </span>
                </div>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      className={`star ${star <= (videoRatings[selectedVideo.id] || 0) ? 'active' : ''}`}
                      onClick={() => handleRating(selectedVideo.id, star)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="video-grid-section">
          <h2 className="grid-title">
            <FaPlay /> Videolar ({filteredVideos?.length || 0})
          </h2>
          
          {filteredVideos?.length === 0 ? (
            <div className="no-videos-found">
              <FaSearch className="no-videos-icon" />
              <h3>Videolar topilmadi</h3>
              <p>"{searchQuery}" so'rovi bo'yicha hech narsa topilmadi.</p>
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="video-grid">
              {filteredVideos.map((video, index) => (
                <div 
                  key={video.id} 
                  className={`video-card ${watchedVideos.includes(video.id) ? 'watched' : ''} ${
                    bookmarkedVideos.includes(video.id) ? 'bookmarked' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="card-header">
                    <div className="video-thumbnail" onClick={() => togglePlay(video.id)}>
                      {video.type === 'youtube' ? (
                        <img
                          src={`https://img.youtube.com/vi/${video.src}/hqdefault.jpg`}
                          alt={video.title}
                          className="thumbnail-img"
                        />
                      ) : (
                        <div className="thumbnail-placeholder">
                          <FaPlay />
                        </div>
                      )}
                      <div className="thumbnail-overlay">
                        <div className="play-button">
                          <FaPlay />
                        </div>
                        <div className="video-duration">{video.duration || "10:00"}</div>
                      </div>
                    </div>
                    
                    <div className="video-badges">
                      {watchedVideos.includes(video.id) && (
                        <span className="badge watched-badge">
                          <FaCheckCircle /> Ko'rilgan
                        </span>
                      )}
                      {bookmarkedVideos.includes(video.id) && (
                        <span className="badge bookmark-badge">
                          <FaBookmark />
                        </span>
                      )}
                      <span className="badge difficulty-badge">
                        {video.difficulty || "O'rtacha"}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">
                      {video.description || "Video ta'rifi mavjud emas."}
                    </p>
                    
                    <div className="video-meta">
                      <span className="meta-item">
                        <FaClock /> {video.duration || "10:00"}
                      </span>
                      <span className="meta-item">
                        <FaEye /> {video.views || "0"} ko'rish
                      </span>
                    </div>

                    <div className="video-actions">
                      <button 
                        onClick={() => togglePlay(video.id)}
                        className={`action-btn ${playingVideo === video.id ? 'playing' : 'play'}`}
                      >
                        {playingVideo === video.id ? <FaPause /> : <FaPlay />}
                        {playingVideo === video.id ? "To'xtatish" : "Ko'rish"}
                      </button>
                      
                      <div className="secondary-actions">
                        <button 
                          onClick={() => toggleBookmark(video.id)}
                          className={`icon-btn ${bookmarkedVideos.includes(video.id) ? 'active' : ''}`}
                          title="Xatcho'p qilish"
                        >
                          <FaBookmark />
                        </button>
                        <button 
                          onClick={() => setShowNotes(prev => ({...prev, [video.id]: !prev[video.id]}))}
                          className="icon-btn"
                          title="Eslatmalar"
                        >
                          <FaFileAlt />
                        </button>
                        {video.exercise && (
                          <button 
                            onClick={() => setShowExercises(prev => ({...prev, [video.id]: !prev[video.id]}))}
                            className="icon-btn"
                            title="Mashqlar"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Notes Section */}
                    {showNotes[video.id] && (
                      <div className="notes-section">
                        <h4 className="notes-title">
                          <FaFileAlt /> Eslatmalar
                        </h4>
                        <textarea
                          placeholder="Video bo'yicha eslatmalaringizni yozing..."
                          value={videoNotes[video.id] || ''}
                          onChange={(e) => handleNoteChange(video.id, e.target.value)}
                          className="notes-textarea"
                          rows="3"
                        />
                      </div>
                    )}

                    {/* Exercise Section */}
                    {showExercises[video.id] && video.exercise && (
                      <div className="exercise-section">
                        <h4 className="exercise-title">
                          <FaCheckCircle /> Mashq
                        </h4>
                        <p className="exercise-question">{video.exercise}</p>
                        
                        {!exerciseAnswers[video.id]?.submitted ? (
                          <div className="exercise-input">
                            <input
                              type="text"
                              placeholder="Javobingizni kiriting..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleExerciseSubmit(video.id, e.target.value);
                                }
                              }}
                              className="answer-input"
                            />
                            <button 
                              onClick={() => handleExerciseSubmit(video.id, document.querySelector(`#exercise-${video.id}`)?.value || '')}
                              className="submit-answer-btn"
                            >
                              Yuborish
                            </button>
                          </div>
                        ) : (
                          <div className={`exercise-result ${exerciseAnswers[video.id].isCorrect ? 'correct' : 'incorrect'}`}>
                            <FaCheckCircle className="result-icon" />
                            <span>
                              {exerciseAnswers[video.id].isCorrect 
                                ? "To'g'ri javob! 🎉" 
                                : "Noto'g'ri javob. Qayta urinib ko'ring."}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="achievements-section">
            <h3 className="achievements-title">
              <FaMedal /> Yutuqlar
            </h3>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement} className="achievement-card">
                  <div className="achievement-icon">
                    {getAchievementIcon(achievement)}
                  </div>
                  <p className="achievement-text">{getAchievementText(achievement)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoListPage;