
import React from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);


const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-32 md:py-48"
      style={{ backgroundImage: "url('/emergency_hero.png')" }}
    >
      <div className="absolute inset-0 bg-primary opacity-60"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-inter font-extrabold mb-4 leading-tight">
          Experience the Future of Healthcare Today
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
          Advanced AI diagnostics, telemedicine, and personalized care - all in one platform
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="#consultation"
            className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300"
          >
            Book Your Virtual Consultation
          </a>
          <a
            href="#technology"
            className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300"
          >
            Explore Our Technology
          </a>
        </div>
        <div className="flex justify-center space-x-8 text-lg">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-6 h-6 text-green-300" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-6 h-6 text-green-300" />
            <span>24/7 Support Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-6 h-6 text-green-300" />
            <span>500+ Specialists Network</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
