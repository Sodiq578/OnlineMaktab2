import React from 'react';

const courses = [
  { id: 100, title: 'HTML Kursi', description: 'Oson va tez HTML o\'rganish.' },
  { id: 101, title: 'CSS Dasturlash', description: 'CSS bilan web dizayn yaratish.' },
  { id: 102, title: 'JavaScript asoslari', description: 'JavaScript dasturlash tilini o\'rganish.' },
  { id: 103, title: 'React boshlang\'ich', description: 'React bilan interaktiv veb ilovalar yaratish.' },
  { id: 104, title: 'Frontend Developer', description: 'Frontend dasturchi bo\'lish yo\'li.' },
  { id: 105, title: 'Vue.js bilan ishlash', description: 'Vue.js frameworkini o\'rganish.' },
  { id: 106, title: 'Node.js asoslari', description: 'Node.js bilan backend ilovalar yaratish.' },
  { id: 107, title: 'Git va GitHub', description: 'Kod versiyalarini boshqarish vositalari.' },
  { id: 108, title: 'Sass va SCSS', description: 'CSS preprocessorlardan foydalanish.' },
  { id: 109, title: 'Web dizayn asoslari', description: 'Web dizaynning asosiy prinsiplari.' },
];

const MyCourses = () => {
  return (
    <div className="my-courses-container p-6">
    <h1 className="text-3xl font-semibold mb-6">Mening Kurslarim</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="course-card bg-white rounded-lg p-4 hover:scale-105 transform transition duration-300 hover:shadow-none">
          {/* Tasvirlar va nomlar orasida bo'shliqni yaxshilash */}
          <img 
            src={`https://picsum.photos/500/300?random=${course.id}`} // O'lchamlarni kattaroq qilish
            alt={course.title} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 text-base">{course.description}</p>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default MyCourses;
