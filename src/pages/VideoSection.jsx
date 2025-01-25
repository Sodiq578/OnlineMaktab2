import React from 'react';
import { useParams } from 'react-router-dom';

const VideoSection = () => {
  const { subject } = useParams();  // URL dan fan nomini olish

  // YouTube video ID-larining ro'yxati
  const videoIds = [
    'https://www.youtube.com/watch?v=1yyOrElDS7o', // Video 1
    'https://www.youtube.com/watch?v=rQFMWwl2vOU', // Video 2
    'https://www.youtube.com/watch?v=uVCDKfV69wA', // Video 3
    'https://www.youtube.com/watch?v=14ZCLoQqXxk', // Video 4
    'https://www.youtube.com/watch?v=MOsTpgKIGT4', // Video 5
  ];

  // Tasodifiy video ID-ni tanlash
  const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];

  const videoUrl = `https://www.youtube.com/watch?v=MOsTpgKIGT4=${randomVideoId}`;

  return (
    <div className="video-section">
      <h2>{subject} bo'limi</h2>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoSection;
