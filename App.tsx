
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import TechnologyShowcase from './components/TechnologyShowcase';
import Testimonials from './components/Testimonials';
import TrustAndCompliance from './components/TrustAndCompliance';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import InteractiveTools from './components/InteractiveTools';
import LoginPage from './components/LoginPage';
import PatientPortal from './components/PatientPortal';
import FindProvider from './components/FindProvider';
import AppointmentBooking from './components/AppointmentBooking';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TechnologyPage from './components/TechnologyPage';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import CareersPage from './components/CareersPage';
import PressPage from './components/PressPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import HIPAANoticePage from './components/HIPAANoticePage';
import { User, SubscriptionPlan } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [preSelectedDoctor, setPreSelectedDoctor] = useState('');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('portal'); // Automatically navigate to portal on login
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
      if (user) {
          setUser({ ...user, ...updatedData });
      }
  };

  const handleNavigate = (view: string) => {
    // Protected routes check
    if (view === 'portal' && !user) {
        setCurrentView('login');
        return;
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleBookDoctor = (doctorName: string) => {
      setPreSelectedDoctor(doctorName);
      setCurrentView('book');
      window.scrollTo(0, 0);
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
      if (user) {
          const updatedUser = { ...user, subscriptionPlan: plan };
          setUser(updatedUser);
          // In a real app, you would also trigger a toast/notification here
      }
  };

  const renderView = () => {
      switch(currentView) {
          case 'login':
              return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
          case 'portal':
              return user ? <PatientPortal user={user} onUpdateUser={handleUpdateUser} /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
          case 'providers':
              return <FindProvider onBook={handleBookDoctor} />;
          case 'book':
              return <AppointmentBooking preSelectedDoctor={preSelectedDoctor} onComplete={() => handleNavigate('home')} />;
          case 'about':
              return <AboutPage />;
          case 'services':
              return <ServicesPage />;
          case 'technology':
              return <TechnologyPage />;
          case 'pricing':
              return <PricingPage user={user} onNavigate={handleNavigate} onSubscribe={handleSubscribe} />;
          case 'contact':
              return <ContactPage />;
          case 'careers':
              return <CareersPage />;
          case 'press':
              return <PressPage />;
          case 'privacy':
              return <PrivacyPolicyPage />;
          case 'terms':
              return <TermsOfServicePage />;
          case 'hipaa':
              return <HIPAANoticePage />;
          case 'home':
          default:
              return (
                  <>
                    <Hero />
                    <Services />
                    <TechnologyShowcase />
                    <InteractiveTools />
                    <Testimonials />
                    <TrustAndCompliance />
                  </>
              );
      }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <ChatBot />
    </div>
  );
};

export default App;
