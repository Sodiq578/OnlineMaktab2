// src/utils/videoHelpers.js
export const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url.trim();
};

export const generateYouTubeThumbnail = (id) => {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

export const validateYouTubeId = (id) => {
  return id && id.length === 11;
};

export const createVideoId = (sectionId) => {
  return `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
};