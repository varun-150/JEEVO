
import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
    onNavigate: (view: string) => void;
    user: User | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Services', view: 'services' },
        { label: 'Technology', view: 'technology' },
        { label: 'Plans', view: 'pricing' },
        { label: 'Providers', view: 'providers' },
        { label: 'About', view: 'about' },
    ];

    const handleNavClick = (view: string) => {
        onNavigate(view);
        setIsMenuOpen(false);
    };

    const getPortalLabel = () => {
        if (!user) return 'Portal';
        switch (user.role) {
            case 'admin': return 'Admin Panel';
            case 'organization': return 'Org Dashboard';
            default: return 'Patient Portal';
        }
    };

    const getRoleBadgeColor = () => {
        switch (user?.role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'organization': return 'bg-purple-100 text-purple-800';
            default: return 'bg-primary/10 text-primary';
        }
    };

    return (
        <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
                        {/* Using a placeholder image that represents Hanuman carrying the mountain, similar to the provided logo */}
                        <div className="relative overflow-hidden rounded-full w-12 h-12 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                            <img
                                src="/logo.png"
                                alt="Jeevo Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-3xl font-serif font-bold text-gray-900 leading-none">Jeevo</span>
                            <span className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest hidden sm:block">Inspired by Strength, Driven by Care.</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:text-primary font-semibold transition-colors">Home</button>
                        {navLinks.map((link) => (
                            <button key={link.label} onClick={() => handleNavClick(link.view)} className="text-gray-600 hover:text-primary font-semibold transition-colors">
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4 text-sm">
                        <button onClick={() => handleNavClick('book')} className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-semibold hover:bg-secondary/20 transition-colors">
                            Book Appointment
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <button onClick={() => handleNavClick('portal')} className={`px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${getRoleBadgeColor()}`}>
                                    <span>{getPortalLabel()}</span>
                                    <span className="text-xs opacity-75 uppercase tracking-wider border-l border-current pl-2 ml-1">{user.role}</span>
                                </button>
                                <button onClick={onLogout} className="text-gray-500 hover:text-red-500 font-semibold transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => handleNavClick('login')} className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md">
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                        <div className="flex flex-col space-y-4">
                            <button onClick={() => handleNavClick('home')} className="text-left text-lg font-semibold text-gray-700 hover:text-primary px-2 py-1 rounded-md hover:bg-gray-50">
                                Home
                            </button>
                            {navLinks.map((link) => (
                                <button key={link.label} onClick={() => handleNavClick(link.view)} className="text-left text-lg font-semibold text-gray-700 hover:text-primary px-2 py-1 rounded-md hover:bg-gray-50">
                                    {link.label}
                                </button>
                            ))}

                            <div className="border-t border-gray-100 my-2 pt-2 space-y-3">
                                <button onClick={() => handleNavClick('book')} className="w-full text-center bg-secondary/10 text-secondary px-4 py-2.5 rounded-lg font-semibold">
                                    Book Appointment
                                </button>

                                {user ? (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-gray-800">{user.name}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide ${getRoleBadgeColor()}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                        <button onClick={() => handleNavClick('portal')} className="w-full mb-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                                            Go to {getPortalLabel()}
                                        </button>
                                        <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full border border-red-200 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleNavClick('login')} className="w-full text-center bg-primary text-white px-4 py-2.5 rounded-lg font-semibold shadow-sm">
                                        Login / Sign Up
                                    </button>
                                )}

                                <div className="flex justify-center items-center space-x-2 text-gray-500 py-2">
                                    <span className="text-accent font-bold">Emergency?</span>
                                    <span className="font-bold">Call 1-800-JEEVO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
