import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CommunityPage from './pages/CommunityPage';
import LearningPage from './pages/LearningPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Header />
        <main className="max-w-6xl mx-auto px-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/learn/build-llm-from-scratch" element={<LearningPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}