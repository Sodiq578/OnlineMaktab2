// src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Noto‘g‘ri parol!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Admin Kirish</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolni kiriting"
            className="w-full px-6 py-4 bg-gray-700 text-white rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-indigo-500"
          />
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition">
            Kirish
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">Demo parol: admin123</p>
      </div>
    </div>
  );
};

export default AdminLogin;