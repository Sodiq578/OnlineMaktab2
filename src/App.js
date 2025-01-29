// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payments from './pages/Payments'; // Payments sahifasini import qilish
  
import Sidebar from './components/Sidebar';
import Events from './pages/Events'; // Import qilingan
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import MyCourses from './pages/MyCourses';
import AllCourses from './pages/AllCourses';
import Certificates from './pages/Certificates';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import VideoSection from './pages/VideoSection'; // Video sahifasi


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Saytni ochganingizda ko'rsatiladi */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page - Landing sahifadan login sahifasiga o'tish */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/video/:subject" element={<VideoSection />} />
        {/* Dashboard sahifasi va sidebar bilan boshqa bo'limlar */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="all-courses" element={<AllCourses />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="payments" element={<Payments />} /> {/* To'lovlar sahifasi */}
     
          <Route path="events" element={<Events />} /> 
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
