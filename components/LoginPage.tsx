
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
    onLogin: (user: any) => void;
    onNavigate: (view: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole>('personal');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            onLogin({ 
                name: name || (role === 'admin' ? 'Admin User' : role === 'organization' ? 'Org Admin' : 'John Doe'), 
                email, 
                id: '12345',
                role
            });
            // Navigation to portal is now handled by handleLogin in App.tsx to ensure state is updated first
        }, 800);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center flex flex-col items-center">
                     <div className="relative overflow-hidden rounded-full w-20 h-20 border-4 border-primary/10 mb-4 shadow-sm">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hanuman_carrying_Dronagiri_mountain.jpg/320px-Hanuman_carrying_Dronagiri_mountain.jpg" 
                            alt="Jeevo Logo" 
                            className="w-full h-full object-cover"
                        />
                     </div>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 leading-none">Jeevo</h2>
                    <span className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mt-1 mb-6">Inspired by Strength, Driven by Care.</span>
                    
                    <h3 className="text-2xl font-bold text-gray-800 font-inter">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? 'Sign in to access your ' : 'Get started with your '} 
                        <span className="font-semibold text-primary">{role}</span> dashboard.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Full Name / Organization Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                            <select
                                id="role"
                                name="role"
                                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                            >
                                <option value="personal">Personal (Patient)</option>
                                <option value="organization">Organization (Hospital/Clinic)</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-primary hover:text-blue-500 transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
