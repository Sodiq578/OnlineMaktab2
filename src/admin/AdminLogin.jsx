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
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Kirish</h1>
          <p className="text-gray-400">Faqat ruxsat etilgan adminlar kirishi mumkin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Admin parolini kiriting"
              className="w-full px-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none text-lg"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
          >
            Kirish
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo parol: <span className="font-mono text-gray-400">admin123</span></p>
          <p className="mt-2 text-xs text-gray-600">Bu sahifa faqat adminlar uchun</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;