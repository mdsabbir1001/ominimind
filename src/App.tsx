import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Team from './pages/Team';
import ReviewsPage from './pages/Reviews';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Common/Preloader';

import { API_URL } from './utils/api';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate a delay for demo purposes
      }
    };

    fetchBackendData();
  }, []);

  return (
    <Router>
      <Preloader loading={loading} />
      <ScrollToTop />
      <div className={`min-h-screen bg-white ${loading ? 'hidden' : 'block'}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/team" element={<Team />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;