
import React from 'react';

interface FooterProps {
    onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, view: string) => {
      e.preventDefault();
      if (onNavigate) {
          onNavigate(view);
          window.scrollTo(0, 0);
      }
  };

  const footerLinks = {
    'For Patients': [
        { label: 'Patient Portal', view: 'portal' },
        { label: 'Find a Provider', view: 'providers' },
        { label: 'Book Appointment', view: 'book' },
        { label: 'Services', view: 'services' }
    ],
    'For Providers': [
        { label: 'Provider Portal', view: 'login' }, // Reuse login for now
        { label: 'Our Technology', view: 'technology' },
        { label: 'Partnerships', view: 'contact' }, // Changed to contact
        { label: 'Resources', view: 'services' }
    ],
    'Company': [
        { label: 'About Us', view: 'about' },
        { label: 'Contact', view: 'contact' },
        { label: 'Careers', view: 'careers' },
        { label: 'Press', view: 'press' }
    ],
    'Legal': [
        { label: 'Privacy Policy', view: 'privacy' },
        { label: 'Terms of Service', view: 'terms' },
        { label: 'HIPAA', view: 'hipaa' }
    ],
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-700 pb-10">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
                 <div className="relative overflow-hidden rounded-full w-12 h-12 border-2 border-white/20 bg-white/10">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hanuman_carrying_Dronagiri_mountain.jpg/320px-Hanuman_carrying_Dronagiri_mountain.jpg" 
                        alt="Jeevo Logo" 
                        className="w-full h-full object-cover"
                    />
                 </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-serif font-bold text-white leading-none">Jeevo</span>
                    <span className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Inspired by Strength, Driven by Care.</span>
                </div>
            </div>
            <div className="flex space-x-6">
                 {/* Social Media Placeholders */}
                 <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-all hover:scale-110">
                    <span className="font-bold">F</span>
                 </div>
                 <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-all hover:scale-110">
                    <span className="font-bold">T</span>
                 </div>
                 <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-all hover:scale-110">
                    <span className="font-bold">L</span>
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-inter font-bold text-lg mb-4 text-gray-100">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button 
                        onClick={(e) => handleLinkClick(e, link.view)} 
                        className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jeevo. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
              <button onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-white cursor-pointer">Privacy</button>
              <button onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-white cursor-pointer">Terms</button>
              <button onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-white cursor-pointer">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
