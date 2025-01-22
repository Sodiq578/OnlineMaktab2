import React, { useState } from 'react';
import About from './About'; // Import qilish
import { FaMoon, FaSun } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('uzbek');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const translations = {
    uzbek: {
      about: "Biz Haqimizda",
      aboutText: "Biz har bir talaba uchun eng yaxshi ta'limni taqdim etishga intilamiz.",
    },
    russian: {
      about: "О Нас",
      aboutText: "Мы стремимся предоставить лучшее образование для каждого студента.",
    },
    english: {
      about: "About Us",
      aboutText: "We strive to provide the best education for every student.",
    },
  };

  const changeLanguage = (language) => {
    setLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {/* Navbar */}
      <nav className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="cursor-pointer">
            <img src={Logo} alt="Logo" className="h-12 w-auto object-contain" />
          </div>
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:text-indigo-500 transition"
            >
              <span>Language</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-32 z-10">
                <button
                  onClick={() => changeLanguage('uzbek')}
                  className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Uzbek
                </button>
                <button
                  onClick={() => changeLanguage('russian')}
                  className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Russian
                </button>
                <button
                  onClick={() => changeLanguage('english')}
                  className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* About Section */}
      <About language={language} translations={translations} />

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="flex items-center bg-gray-200 text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
      >
        {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default LandingPage;
