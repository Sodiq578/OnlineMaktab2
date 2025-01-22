import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import BackImg from '../assets/backImg.jpeg';
import BackImg2 from "../assets/backImg2.jpeg";
import BackImg3 from "../assets/backImg3.jpg";
import Logo from "../assets/Logo.png";
import { FaMoon, FaSun } from 'react-icons/fa'; // For sun and moon icons
import { FaBars } from 'react-icons/fa'; // For hamburger icon

import uzbekFlag from '../assets/uzbFlag.jpg';
import russianFlag from '../assets/rusFlag.jpg';
import englishFlag from '../assets/engFlag.webp';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('uzbek'); // 'uzbek', 'russian', 'english'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add this line for dropdown state

  const images = [
    {
      img: BackImg,
      title: "O'quvchilar uchun eng yaxshi kurslar",
      text: "Bizning platformamizda har bir darajadagi o'quvchilar uchun mo'ljallangan o'quv kurslarini topishingiz mumkin.",
    },
    {
      img: BackImg2,
      title: "Mutaxassis bo'lish yo'li",
      text: "O'zingizga mos keladigan sohani tanlang va muvaffaqiyat sari qadam qo'ying.",
    },
    {
      img: BackImg3,
      title: "Ixtisoslashgan o'qituvchilar",
      text: "Bizning kurslarimiz yetuk va tajribali o'qituvchilar tomonidan ishlab chiqilgan.",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const changeLanguage = (language) => {
    setLanguage(language);
    setIsDropdownOpen(false); // Close dropdown
  };

  const translations = {
    uzbek: {
      title: "Onlayn maktabga xush kelibsiz",
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
      servicesDescription: "Xizmatlarimiz o'quvchilarga eng yaxshi ta'lim imkoniyatlarini taqdim etadi.",
      featuresDescription: "Kurslarimiz interaktiv, ilg'or texnologiyalar bilan ta'minlangan.",
      testimonialsDescription: "Bizning talabalarimiz ta'lim sifati haqida ijobiy fikrlar bildirishadi.",
      aboutContent: "Bizning platformamiz o'quvchilarga eng yangi ta'lim resurslarini taqdim etishga intiladi. Bizning missiyamiz — o'quvchilarga global darajadagi bilimlarni osonlik bilan olish imkoniyatini yaratish. Bizning barcha kurslarimiz malakali o'qituvchilar tomonidan ishlab chiqilgan va yangi texnologiyalar bilan jihozlangan. Bizning ta'lim tizimimiz o'quvchilarni har tomonlama rivojlantirishga mo'ljallangan.",
      moreAbout: "Biz haqimizda yanada ko'proq bilib oling...",
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
      servicesDescription: "Наши услуги предлагают лучшие образовательные возможности для учеников.",
      featuresDescription: "Наши курсы интерактивны и оснащены передовыми технологиями.",
      testimonialsDescription: "Наши студенты оставляют положительные отзывы о качестве образования.",

      aboutContent: "Наша платформа стремится предоставить студентам самые современные образовательные ресурсы. Наша миссия — предоставить студентам возможность получить глобальные знания с легкостью. Все наши курсы разработаны квалифицированными преподавателями и оснащены новейшими технологиями. Наша система образования направлена на всестороннее развитие студентов.",
      moreAbout: "Узнайте больше о нас...",
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
      servicesDescription: "Our services provide the best educational opportunities for students.",
      featuresDescription: "Our courses are interactive and equipped with advanced technologies.",
      testimonialsDescription: "Our students leave positive feedback on the quality of education.",
      aboutContent: "Our platform strives to provide students with the latest educational resources. Our mission is to make global knowledge easily accessible. All our courses are developed by qualified instructors and equipped with the latest technologies. Our educational system is designed to foster all-round development of students.",
      moreAbout: "Learn more about us...",
    }
  };

  const navTitle = {
    home: {
      uzbek: "Bosh Sahifa",
      russian: "Главная",
      english: "Home",
    },
    services: {
      uzbek: "Xizmatlar",
      russian: "Услуги",
      english: "Services",
    },
    about: {
      uzbek: "Haqimizda",
      russian: "О нас",
      english: "About",
    },
    contact: {
      uzbek: "Aloqa",
      russian: "Контакты",
      english: "Contact",
    },
    language: {
      uzbek: "Til",
      russian: "Язык",
      english: "Language",
    },
  };

  const currentLang = translations[language];

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {/* Navbar */}
      <nav className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="cursor-pointer">
            <img src={Logo} alt="Logo" className="h-12 w-auto object-contain" />
          </div>

          {/* Burger Menu for Mobile */}
          <button
            className="md:hidden text-xl"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaBars />
          </button>

          {/* Menu Links */}
          <div className={`md:flex items-center space-x-8 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}>
            <a href="#home" className="hover:text-indigo-500 transition">
              {navTitle.home[language]}
            </a>
            <a href="#services" className="hover:text-indigo-500 transition">
              {navTitle.services[language]}
            </a>
            <a href="#about" className="hover:text-indigo-500 transition">
              {navTitle.about[language]}
            </a>
            <a href="#contact" className="hover:text-indigo-500 transition">
              {navTitle.contact[language]}
            </a>


            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 hover:text-indigo-500 transition"
              >
                <span>{navTitle.language[language]}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-md w-32 z-10">
                  <button
                    onClick={() => changeLanguage('uzbek')}
                    className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <img src={uzbekFlag} alt="Uzbek Flag" className="w-5 h-5 inline-block mr-2" />
                    Uzbek
                  </button>
                  <button
                    onClick={() => changeLanguage('russian')}
                    className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <img src={russianFlag} alt="Russian Flag" className="w-5 h-5 inline-block mr-2" />
                    Russian
                  </button>
                  <button
                    onClick={() => changeLanguage('english')}
                    className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <img src={englishFlag} alt="English Flag" className="w-5 h-5 inline-block mr-2" />
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center bg-gray-200 text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
            >
              {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col lg:flex-row items-center justify-center container mx-auto max-w-[1400px] gap-8 px-4">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-semibold mb-4">{currentLang.title}</h1>
          <p className="text-lg mb-6">{currentLang.description}</p>
          <button
      onClick={() => navigate('/login')}
      className="bg-indigo-600 px-6 py-3 lg:px-8 lg:py-3 rounded-full text-white text-sm lg:text-lg font-semibold hover:bg-indigo-700 transition duration-300"
    >
      {currentLang.start}
    </button>
        </div>
        <div className="lg:w-1/2">
          <img src={images[currentImageIndex].img} alt="Hero Image" className="w-full h-auto object-cover rounded-md shadow-lg" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="  py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">{currentLang.about}</h2>
          <p className="text-lg text-gray-600 mb-8">{currentLang.aboutContent}</p>
          <p className="text-lg mb-8">{currentLang.moreAbout}</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="  py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">{currentLang.services}</h2>
          <p className="text-lg text-gray-600">{currentLang.servicesDescription}</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="  py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">{currentLang.features}</h2>
          <p className="text-lg text-gray-600">{currentLang.featuresDescription}</p>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="  py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">{currentLang.testimonials}</h2>
          <p className="text-lg text-gray-600">{currentLang.testimonialsDescription}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>{currentLang.footer}</p>
          <p className="text-sm mt-4">{currentLang.legal}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;