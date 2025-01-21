import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: SMS Code
  const [smsCode, setSmsCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setStep(2);
    }
  };

  const handleSmsSubmit = (e) => {
    e.preventDefault();
    if (smsCode === '1234') {
      navigate('/dashboard');
    } else {
      alert('Kod noto‘g‘ri, qayta urinib ko‘ring!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {step === 1 ? (
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white p-8 shadow-lg rounded-lg"
        >
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Emailingizni kiriting"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Parolingizni kiriting"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Kirish
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSmsSubmit}
          className="w-full max-w-sm bg-white p-8 shadow-lg rounded-lg"
        >
          <h1 className="text-3xl font-bold mb-6">SMS Kodni Kiriting</h1>
          <input
            type="text"
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="1234"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
          >
            Tasdiqlash
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
