
import React, { useState, useEffect } from 'react';
import { ComponentType } from './types';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ButtonsShowcase from './components/showcases/ButtonsShowcase';
import CardsShowcase from './components/showcases/CardsShowcase';
import ModalsShowcase from './components/showcases/ModalsShowcase';
import TablesShowcase from './components/showcases/TablesShowcase';
import InputsShowcase from './components/showcases/InputsShowcase';
import WelcomeShowcase from './components/showcases/WelcomeShowcase';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>(ComponentType.Buttons);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  const renderContent = () => {
    switch (activeComponent) {
      case ComponentType.Buttons:
        return <ButtonsShowcase />;
      case ComponentType.Cards:
        return <CardsShowcase />;
      case ComponentType.Modals:
        return <ModalsShowcase />;
      case ComponentType.Tables:
        return <TablesShowcase />;
      case ComponentType.Inputs:
        return <InputsShowcase />;
      default:
        return <WelcomeShowcase/>;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <Header 
        activeComponent={activeComponent} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeComponent={activeComponent} 
          setActiveComponent={setActiveComponent}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="w-full max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;