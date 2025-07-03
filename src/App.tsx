import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Team from './pages/Team';
import Reviews from './pages/Reviews';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop'; // ScrollToTop কম্পোনেন্টটি ইম্পোর্ট করুন

function App() {
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await fetch('https://minimind-backend.onrender.com/'); 
        const data = await response.json();
        console.log('Data from backend:', data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchBackendData();
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* এখানে ScrollToTop কম্পোনেন্টটি যোগ করুন */}
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/team" element={<Team />} />
            <Route path="/reviews" element={<Reviews />} />
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