// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const purchaseCourse = (section) => {
    setPurchasedCourses((prev) => [...prev, section]);
  };

  return (
    <UserContext.Provider value={{ purchasedCourses, purchaseCourse }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);