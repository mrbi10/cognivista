import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import the new background component
import ParticlesBackground from './components/ParticlesBackground';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Event1 from './events/Event1';
import Event2 from './events/Event2';
import Event3 from './events/Event3';
import Event4 from './events/Event4';

import './styles/App.css';
import './styles/index.css';

function Home() {
  return (
    <>
      <Hero />
      <Events />
      <Banner />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
        {/* 2. Place the background here. It will stay fixed behind all routes */}
        <ParticlesBackground />

        {/* 3. Your UI components stay exactly as they were */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/event1" element={<Event1 />} />
          <Route path="/events/event2" element={<Event2 />} />
          <Route path="/events/event3" element={<Event3 />} />
          <Route path="/events/event4" element={<Event4 />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;