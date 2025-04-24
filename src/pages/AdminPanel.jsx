import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newVideo, setNewVideo] = useState({
    subjectId: '',
    youtubeId: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    if (token) {
      fetchSubjects();
    }
  }, [token]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subjects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('adminToken', response.data.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/subjects',
        { name: newSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewSubject('');
      fetchSubjects();
    } catch (error) {
      alert('Error adding subject');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/videos',
        newVideo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewVideo({ subjectId: '', youtubeId: '', title: '', description: '' });
    } catch (error) {
      alert('Error adding video');
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubjects();
    } catch (error) {
      alert('Error deleting subject');
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Video deleted');
    } catch (error) {
      alert('Error deleting video');
    }
  };

  if (!token) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <button
        onClick={() => {
          setToken('');
          localStorage.removeItem('adminToken');
        }}
        className="mb-6 bg-red-500 text-white p-2 rounded-lg"
      >
        Logout
      </button>

      {/* Add Subject */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Subject</h2>
        <form onSubmit={handleAddSubject} className="max-w-md">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Subject name"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Add Subject
          </button>
        </form>
      </div>

      {/* Add Video */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Video</h2>
        <form onSubmit={handleAddVideo} className="max-w-md">
          <select
            value={newVideo.subjectId}
            onChange={(e) => setNewVideo({ ...newVideo, subjectId: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newVideo.youtubeId}
            onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
            placeholder="YouTube Video ID (e.g., 1yyOrElDS7o)"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
            required
          />
          <input
            type="text"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            placeholder="Video Title"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
            required
          />
          <textarea
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            placeholder="Video Description"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Add Video
          </button>
        </form>
      </div>

      {/* Manage Subjects */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Subjects</h2>
        <ul className="space-y-4">
          {subjects.map((subject) => (
            <li key={subject._id} className="bg-gray-100 p-4 rounded-lg flex justify-between">
              <span>{subject.name}</span>
              <button
                onClick={() => handleDeleteSubject(subject._id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;