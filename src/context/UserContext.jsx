// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  
  // localStorage dan sotib olingan kurslarni yuklash
  useState(() => {
    try {
      const saved = localStorage.getItem('eduhub_purchasedCourses');
      if (saved) {
        setPurchasedCourses(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Kurslarni yuklashda xato:', e);
    }
  }, []);

  // Kurs sotib olish funksiyasi
  const purchaseCourse = (course) => {
    setPurchasedCourses(prev => {
      const newCourses = [...prev, { 
        ...course, 
        purchaseDate: new Date().toISOString(),
        lastAccess: new Date().toISOString()
      }];
      localStorage.setItem('eduhub_purchasedCourses', JSON.stringify(newCourses));
      return newCourses;
    });
  };

  return (
    <UserContext.Provider value={{ 
      purchasedCourses, 
      purchaseCourse,
      setPurchasedCourses 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};