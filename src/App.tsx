import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import MyTokenPage from './pages/MyTokenPage';
import InterestSurvey from './pages/InterestSurvey';
import BottomNavigation from './components/BottomNavigation';
import ProfilePage from './pages/ProfilePage';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-custom-beige flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mission/:id" element={<MissionPage />} />
            <Route path="/my-tokens" element={<MyTokenPage />} />
            <Route path="/interest-survey" element={<InterestSurvey />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;