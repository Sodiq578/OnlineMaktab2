import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaChalkboardTeacher, FaCheckCircle, FaGraduationCap, FaCalendarAlt, FaCoffee, FaMapMarkerAlt } from "react-icons/fa";

import backImg from "../assets/HeroBack.jpg"; // To'g'ri import


import { FaRegStar, FaHeart, FaRegCalendar } from 'react-icons/fa';


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to handle menu open/close

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Close menu when switching to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 p-4 flex justify-between items-center border-none">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">Logo</h1>
        <ul
          className={`${isMobile
            ? menuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-white p-6"
              : "hidden"
            : "flex gap-6"
            } text-lg md:flex gap-6`}
        >
   <li><Link to="#home" className="hover:text-blue-500">Home</Link></li>
<li><Link to="#darslar" className="hover:text-blue-500">Darslar</Link></li>
<li><Link to="#narxlar" className="hover:text-blue-500">Narxlar</Link></li>
<li><Link to="#savollar" className="hover:text-blue-500">Savollar</Link></li>
<li><Link to="#aloqa" className="hover:text-blue-500">Aloqa Fikrlar</Link></li>
<li><Link to="#xizmatarimiz" className="hover:text-blue-500">Xizmatarimiz</Link></li>

        </ul>
        {isMobile && (
          <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "❌" : "☰"}
          </button>
        )}
      </div>
    </nav>

  );
};

const HeroSection = () => {
  const navigate = useNavigate(); // Sahifaga yo‘naltirish funksiyasi

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id="home" className="hero-box mt-[50px] relative w-full min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-7xl p-6">
        {/* Matn va tugma */}
        <div className="relative z-10 text-left max-w-md" data-aos="fade-right">
          <h1 className="text-5xl font-bold text-blue-900 leading-tight" data-aos="fade-up">
            Biz faqat dars bermaymiz, <br /> biz insonlarning hayotini o'zgartiramiz!
          </h1>
          <p className="mt-4 text-gray-700 text-lg" data-aos="fade-up" data-aos-delay="200">
            9 yil ichida bizning onlayn maktabimiz 50 000 dan ortiq yoshlarning hayotini o'zgartirishga yordam berdi.
          </p>
          {/* Ro'yxatdan o'tish tugmasi */}
          <button
            onClick={() => navigate('/login')}
            className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-full shadow-lg hover:bg-blue-600 transition-all"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Birinchi darsga yoziling ✨
          </button>

        </div>

        {/* Orqa fon rasmi (faqat katta ekranlarda ko‘rinadi) */}
        <div className="absolute top-0 right-0 h-full w-[80%] hidden md:block" data-aos="fade-left">
          <img src={backImg} alt="Onlayn dars" className="hero-back-img object-cover" />
        </div>
      </div>
    </div>
  );
};


const Features = () => {
  const features = [
    {
      title: "Bepul ikkinchi o‘qituvchi",
      text: "Yordamchi o‘qituvchilar sizga doimo yordam beradi.",
      icon: <FaChalkboardTeacher />,
      link: "/teacher",
      bgColor: "bg-blue-500",
    },
    {
      title: "Test markazi",
      text: "Cambridge shahrida haqiqiy IELTS imtihonini topshiring.",
      icon: <FaCheckCircle />,
      link: "/test-center",
      bgColor: "bg-green-500",
    },
    {
      title: "Tajribali o‘qituvchilar",
      text: "O‘qituvchilarimiz IELTS natijalari 9.0 gacha.",
      icon: <FaGraduationCap />,
      link: "/teachers",
      bgColor: "bg-purple-500",
    },
    {
      title: "Bepul tadbirlar",
      text: "Barcha o‘quvchilar uchun qiziqarli tadbirlar mavjud.",
      icon: <FaCalendarAlt />,
      link: "/events",
      bgColor: "bg-red-500",
    },
    {
      title: "Hamkorlik zonalari",
      text: "Har bir filialda maxsus hamkorlik zonalari mavjud.",
      icon: <FaCoffee />,
      link: "/co-working",
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-screen-xl">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {features.map((feature, index) => (
            <SwiperSlide
              key={index}
              className="p-8 bg-gray-200 rounded-3xl shadow-xl text-center transition-transform transform hover:scale-105 h-auto min-h-[350px] flex flex-col justify-between"
            >
              {/* Ikona - dumaloq fon */}
              <div
                className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full text-white ${feature.bgColor} text-4xl shadow-lg`}
              >
                {feature.icon}
              </div>
              {/* Card content */}
              <div>
                <h3 className="text-2xl font-bold mt-6 text-blue-900">{feature.title}</h3>
                <p className="mt-3 text-gray-700 text-lg">{feature.text}</p>
              </div>
              <a
                href={feature.link}
                className="mt-5 inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                Batafsil →
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


const Testimonials = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  const testimonials = [
    {
      name: "Jasur Islomov",
      feedback: "Eng yaxshi o'quv tajribasi!",
      location: "Toshkent",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Malika Nurmatova",
      feedback: "Ajoyib o'qituvchilar va ajoyib muhit!",
      location: "Buxoro",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Dilmurod Karimov",
      feedback: "Faqat 6 oy ichida ingliz tilimni rivojlantirdim!",
      location: "Andijon",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Shahlo Rashidova",
      feedback: "Har bir darsda yangi narsa o'rganaman!",
      location: "Jizzax",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Olimjon Davronov",
      feedback: "Ta'lim sifati va yordam juda zo'r!",
      location: "Navoiy",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Gulnoza Rahimova",
      feedback: "Haqiqatan ham qiziqarli va foydali darslar!",
      location: "Samarqand",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Bobur Anvarov",
      feedback: "Men uchun eng yaxshi tanlov bo'ldi!",
      location: "Farg'ona",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Nilufar Saidova",
      feedback: "Barcha savollarimga batafsil javob berishdi.",
      location: "Namangan",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Sanjar Eshmurodov",
      feedback: "Innovatsion yondashuv menga juda yoqdi.",
      location: "Xorazm",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Zilola Kamolova",
      feedback: "Darslar o'z vaqtida va qiziqarli o'tdi!",
      location: "Qashqadaryo",
      profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Murod Mirzayev",
      feedback: "Endi o'z sohamda bemalol muloqot qila olaman!",
      location: "Surxondaryo",
      profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];
  

  const handleShowMore = () => {
    setVisibleTestimonials((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleTestimonials(3); // Faqat oxirgi 3 ta malumotni qoldirish
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-6">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Talabalarimiz nima deyishadi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
              data-aos="fade-up"
            >
              <img
                src={testimonial.profileImage}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-lg italic">"{testimonial.feedback}"</p>
              <h3 className="font-bold text-xl mt-4 text-blue-900">
                {testimonial.name}
              </h3>
              <div className="flex justify-center items-center mt-2">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <p className="text-gray-700">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 space-x-4">
          {visibleTestimonials < testimonials.length && (
            <button
              onClick={handleShowMore}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Yana ko'rish
            </button>
          )}

          {visibleTestimonials > 3 && (
            <button
              onClick={handleShowLess}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Yopish
            </button>
          )}
        </div>
      </div>
    </section>
  );
};


const Gallery = () => {
  const galleryRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const subjects = [
    "Matematika", "Fizika", "Kimyo", "Biologiya", "Informatika", "Tarix",
    "Ona tili va adabiyot", "Chet tili (Ingliz, Rus, Nemis)", "Geografiya", "Astronomiya",
    "Iqtisodiyot", "Huquqshunoslik", "Jismoniy tarbiya", "Chizmachilik", "Texnologiya",
    "Psixologiya", "Falsafa", "Ekologiya", "Tibbiyot asoslari", "San’at va madaniyat",
    "Qur’on va hadis ilmi", "Robototexnika", "Dasturlash asoslari", "Sun’iy intellekt",
    "Mexanika", "Elektronika", "Kiberxavfsizlik", "Nanotexnologiya", "Grafik dizayn",
    "Web dasturlash"
  ];

  const lessons = subjects.map((title, index) => ({
    title,
    imageUrl: `https://picsum.photos/200/300?random=${index + 1}`,
  }));

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    const cardHeight = 240;
    const scrollAmount = cardHeight * 3;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isUserScrolling) {
          if (galleryElement.scrollTop + galleryElement.clientHeight >= galleryElement.scrollHeight) {
            galleryElement.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            galleryElement.scrollBy({ top: scrollAmount, behavior: "smooth" });
          }
        }
      }, 3000);
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval);
  }, [isUserScrolling]);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    const handleUserScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(window.userScrollTimeout);
      window.userScrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    };

    galleryElement.addEventListener("scroll", handleUserScroll);

    return () => galleryElement.removeEventListener("scroll", handleUserScroll);
  }, []);

  return (
  <section id="darslar" className="py-16 px-6">
  <div className="container mx-auto max-w-screen-xl">
    <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-10">Bizning Darslar</h2>

    <div
      ref={galleryRef}
      className="overflow-auto rounded-2xl  duration-300"
      style={{ height: "600px" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-100 to-white rounded-3xl overflow-hidden   transition-all duration-300"
          >
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              className="w-full h-80 object-cover rounded-t-3xl transform transition-transform duration-300 hover:scale-110"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-800">{lesson.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{lesson.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};



const Pricing = () => {
  const navigate = useNavigate(); // navigate hook

  const pricingPlans = [
    {
      plan: "Asosiy",
      price: "$29/oy",
      features: [
        { title: "Barcha kurslarga kirish", description: "Barcha asosiy kurslarga bepul kirish imkoniyati." },
        { title: "Bepul tadbirlar", description: "Oylik bepul tadbirlar va vebinarlar." },
        { title: "Elektron pochta yordam", description: "Elektron pochta orqali 24/7 yordam." },
      ],
    },
    {
      plan: "Premium",
      price: "$49/oy",
      features: [
        { title: "Asosiy xususiyatlar", description: "Asosiy plan xususiyatlariga to'liq kirish." },
        { title: "Shaxsiy darslar", description: "1:1 shaxsiy darslar va maslahatlar." },
        { title: "Prioritet yordam", description: "Tezkor javoblar va alohida yordam." },
      ],
    },
    {
      plan: "Pro",
      price: "$79/oy",
      features: [
        { title: "Premium xususiyatlar", description: "Premium xususiyatlarga to'liq kirish imkoniyati." },
        { title: "Shaxsiy o'quv reja", description: "O'quv rejangizni shaxsiylashtirish." },
        { title: "Birinchi o'quvchi bilan darslar", description: "To'g'ridan-to'g'ri ustoz bilan darslar." },
      ],
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Narxlarimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-200 p-6 rounded-3xl shadow-lg text-center w-full hover:shadow-2xl transition-shadow duration-300"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-blue-900">{plan.plan}</h3>
              <p className="text-xl font-semibold text-blue-500 mt-4">{plan.price}</p>
              <ul className="text-left mt-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    <strong>{feature.title}:</strong> {feature.description}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/buy')} // Sotib olish sahifasiga yo'naltirish
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600"
              >
                Sotib olish
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const faqItems = [
    {
      question: "Onlayn maktabda qanday kurslar mavjud?",
      answer: "Bizda ingliz tili, matematika, dasturlash va boshqa ko'plab fanlar bo'yicha kurslar mavjud.",
    },
    {
      question: "Qanday qilib ro'yxatdan o'tish mumkin?",
      answer: "Ro'yxatdan o'tish uchun sahifada 'Ro'yxatdan o'tish' tugmasini bosing va kerakli ma'lumotlarni to'ldiring.",
    },
    {
      question: "Onlayn darslar qanday o'tkaziladi?",
      answer: "Darslar onlayn platformada video darslar, interaktiv mashqlar va o'qituvchi bilan jonli muhokamalar shaklida o'tkaziladi.",
    },
    {
      question: "Shaxsiy darslarni qanday olish mumkin?",
      answer: "Shaxsiy darslar uchun 'Premium' va 'Pro' rejalari mavjud. Ro'yxatdan o'tganingizdan so'ng, shaxsiy dars jadvalini belgilashingiz mumkin.",
    },
    {
      question: "To'lovlarni qanday amalga oshirish mumkin?",
      answer: "To'lovlarni onlayn tarzda, bank kartalari yoki boshqa to'lov tizimlari orqali amalga oshirishingiz mumkin.",
    },
    {
      question: "Kurslar uchun qanday sertifikatlar beriladi?",
      answer: "Har bir tamomlagan kurs uchun biz sertifikatlar taqdim etamiz, ular sizning muvaffaqiyatli o'qishni tamomlaganingizni tasdiqlaydi.",
    },
  ];

  const itemsToShow = showMore ? faqItems : faqItems.slice(0, 4);

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Ko'p beriladigan savollar (FAQ)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itemsToShow.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-xl font-semibold text-blue-900 flex justify-between items-center">
                {item.question}
                <span
                  className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                >
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </h3>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden mt-2 text-gray-700"
              >
                {openIndex === index && <p>{item.answer}</p>}
              </motion.div>
            </div>
          ))}
        </div>

        {faqItems.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              {showMore ? "Kamroq ko'rsatish" : "Barchasini ko'rsatish"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Biz bilan bog'laning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Bizga xabar yuboring</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Ismingiz</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ismingizni kiriting"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Elektron pochta</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email manzilingiz"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Xabar</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Xabaringizni kiriting"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Yuborish
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Biz bilan bog'laning</h3>
            <p className="text-gray-700 mb-4">Onlayn maktabning asosiy manzili:</p>
            <p className="text-gray-700 font-semibold">Toshkent, O'zbekiston</p>
            <p className="text-gray-700 mt-4">Telefon: <span className="font-semibold">+998 90 123 45 67</span></p>
            <p className="text-gray-700 mt-2">Email: <span className="font-semibold">support@onlinemaktab.uz</span></p>
            <div className="mt-6">
              <p className="text-gray-700 font-semibold">Telegram orqali bog'laning:</p>
              <a href="https://t.me/Sadikov001" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                @Sadikov001 Telegram
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-700 font-semibold">Bizni ijtimoiy tarmoqlarda kuzating:</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a>
                <a href="#" className="text-blue-500 hover:text-blue-600">Instagram</a>
                <a href="#" className="text-blue-500 hover:text-blue-600">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Cambridge School. All rights reserved.</p>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <Gallery />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
