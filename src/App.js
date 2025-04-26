// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Context import
import Payments from './pages/Payments';
import Sidebar from './components/Sidebar';
import Events from './pages/Events';
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
import VideoListPage from './pages/VideoListPage';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/videos/:subject" element={<VideoListPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<HomePage />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="payments" element={<Payments />} />
            <Route path="events" element={<Events />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;