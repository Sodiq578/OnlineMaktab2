import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  
  // Dark/Light Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Language State
  const [language, setLanguage] = useState('uzbek'); // 'uzbek', 'russian', 'english'
  
  // Toggle Dark/Light Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Toggle Language
  const changeLanguage = (lang) => setLanguage(lang);

  // Translations based on the selected language
  const translations = {
    uzbek: {
      title: "Onlayn Dars Platformasiga Xush Kelibsiz",
      description: "O'qing, o'rganing va rivojlaning — barcha darslar va resurslar bir joyda.",
      start: "Boshlash",
      login: "Kirish",
      moreInfo: "Batafsil Ma'lumot",
      about: "Biz Haqimizda",
      services: "Bizning Xizmatlarimiz",
      features: "Xususiyatlar",
      testimonials: "Fikrlar",
      footer: "Sevgi bilan ta'lim olishni targ'ib qilamiz.",
      legal: "Barcha huquqlar himoyalangan.",
      interactiveLearning: "Interaktiv O'rganish",
      onlineCourses: "Onlayn Kurslar",
      expertTutors: "Mutaxassis O'qituvchilar",
      subscribe: "Yangi yangilanishlarni olish uchun obuna bo'ling!",
      joinCommunity: "Hamjamiyatga Qo'shiling",
      getInTouch: "Biz bilan Bog'laning"
    },
    russian: {
      title: "Добро пожаловать на Платформу Онлайн Классов",
      description: "Чтение, обучение и развитие — все уроки и ресурсы в одном месте.",
      start: "Начать",
      login: "Войти",
      moreInfo: "Подробнее",
      about: "О Нас",
      services: "Наши Услуги",
      features: "Особенности",
      testimonials: "Отзывы",
      footer: "Мы продвигаем образование с любовью.",
      legal: "Все права защищены.",
      interactiveLearning: "Интерактивное Обучение",
      onlineCourses: "Онлайн Курсы",
      expertTutors: "Экспертные Преподаватели",
      subscribe: "Подпишитесь, чтобы получить обновления!",
      joinCommunity: "Присоединяйтесь к сообществу",
      getInTouch: "Свяжитесь с нами"
    },
    english: {
      title: "Welcome to the Online Classes Platform",
      description: "Read, learn, and grow — all lessons and resources in one place.",
      start: "Get Started",
      login: "Login",
      moreInfo: "Learn More",
      about: "About Us",
      services: "Our Services",
      features: "Features",
      testimonials: "Testimonials",
      footer: "We promote learning with love.",
      legal: "All rights reserved.",
      interactiveLearning: "Interactive Learning",
      onlineCourses: "Online Courses",
      expertTutors: "Expert Tutors",
      subscribe: "Subscribe for the latest updates!",
      joinCommunity: "Join the Community",
      getInTouch: "Get in Touch"
    }
  };

  const currentLang = translations[language];

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {/* Navbar */}
      <nav className={`p-4 ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-blue-300'} shadow-lg`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-extrabold text-white tracking-wider cursor-pointer">
            {currentLang.title}
          </div>
          <div>
            {/* Language Buttons */}
            <button onClick={() => changeLanguage('uzbek')} className="mr-4 text-white">
              Uz
            </button>
            <button onClick={() => changeLanguage('russian')} className="mr-4 text-white">
              Ru
            </button>
            <button onClick={() => changeLanguage('english')} className="mr-4 text-white">
              En
            </button>
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition duration-300">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?education')" }}
      >
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">{currentLang.title}</h1>
        <p className="text-xl mb-8 max-w-xl mx-auto drop-shadow-lg">{currentLang.description}</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 px-8 py-3 rounded-full text-white text-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          {currentLang.start}
        </button>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-300 mb-6">{currentLang.about}</h2>
          <p className="text-lg mb-10 leading-relaxed">
            {currentLang.about} haqida ko'proq ma'lumot.
          </p>
          <button
            onClick={() => alert('More info section')}
            className="bg-indigo-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-indigo-700 transition duration-300"
          >
            {currentLang.moreInfo}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-300 mb-6">{currentLang.services}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <img src="https://source.unsplash.com/400x300/?online,course" alt="Service 1" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold mt-4">{currentLang.onlineCourses}</h3>
              <p className="text-lg mt-2">Access a variety of courses in one place.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <img src="https://source.unsplash.com/400x300/?education,student" alt="Service 2" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold mt-4">{currentLang.interactiveLearning}</h3>
              <p className="text-lg mt-2">Engage with content interactively for better retention.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <img src="https://source.unsplash.com/400x300/?tutor,online" alt="Service 3" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold mt-4">{currentLang.expertTutors}</h3>
              <p className="text-lg mt-2">Learn from experts with personalized guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-300 mb-6">{currentLang.features}</h2>
          <p className="text-lg mb-10 leading-relaxed">{currentLang.features} haqida ma'lumot.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-300 mb-6">{currentLang.testimonials}</h2>
          <div className="flex justify-center space-x-8">
            <div className="w-80 bg-white shadow-lg p-6 rounded-lg">
              <p className="text-lg mb-4">"This platform has helped me improve my skills significantly."</p>
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-sm text-gray-500">Student</p>
            </div>
            <div className="w-80 bg-white shadow-lg p-6 rounded-lg">
              <p className="text-lg mb-4">"The interactive learning features are amazing!"</p>
              <h4 className="font-semibold">Jane Smith</h4>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`p-6 ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-blue-300'} text-white`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-medium">&copy; 2025 {currentLang.footer}</p>
          <p className="text-sm mt-2">{currentLang.legal}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
