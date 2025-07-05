import React, { useState, useEffect } from 'react';
import Sidebar from './Layout/Sidebar';
import HomeContent from './Sections/HomeContent';
import Services from './Sections/Services';
import Packages from './Sections/Packages';
import Orders from './Sections/Orders';
import Team from './Sections/Team';
import Reviews from './Sections/Reviews';
import Portfolio from './Sections/Portfolio';
import Messages from './Sections/Messages';
import SectionImages from './Sections/SectionImages';
import ContactInfo from './Sections/ContactInfo';
import { initializeSampleData } from '../utils/storage';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    initializeSampleData();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeContent />;
      case 'services':
        return <Services />;
      case 'packages':
        return <Packages />;
      case 'orders':
        return <Orders />;
      case 'team':
        return <Team />;
      case 'reviews':
        return <Reviews />;
      case 'portfolio':
        return <Portfolio />;
      case 'messages':
        return <Messages />;
      case 'images':
        return <SectionImages />;
      case 'contact':
        return <ContactInfo />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 flex flex-col">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;