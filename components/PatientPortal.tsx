
import React, { useState, useEffect } from 'react';
import { analyzeHealthData, analyzeImageWithPrompt } from '../services/geminiService';
import { User } from '../types';

// Helper to get dynamic dates for demonstration
const getRelativeDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const mockHealthData = {
    patient: "John Doe",
    age: 45,
    bloodType: "O+",
    vitals: {
        bloodPressure: "135/85 mmHg",
        heartRate: "78 bpm",
        temperature: "98.6 F",
        weight: "185 lbs"
    },
    recentLabs: [
        { test: "Cholesterol Total", value: 240, unit: "mg/dL", range: "< 200", status: "High" },
        { test: "HDL", value: 45, unit: "mg/dL", range: "> 40", status: "Normal" },
        { test: "LDL", value: 160, unit: "mg/dL", range: "< 100", status: "High" },
        { test: "Glucose (Fasting)", value: 98, unit: "mg/dL", range: "70-99", status: "Normal" }
    ],
    appointments: [
        { id: 101, doctor: "Dr. Sarah Smith", type: "Cardiology Follow-up", date: getRelativeDate(1), time: "10:00 AM", daysAway: 1 },
        { id: 102, doctor: "Dr. Mike Ross", type: "Annual Physical", date: getRelativeDate(14), time: "09:00 AM", daysAway: 14 }
    ]
};

interface Notification {
    id: number;
    type: 'email' | 'sms' | 'system';
    subject: string;
    message: string;
    date: string;
    read: boolean;
}

interface UploadedFile {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    fileObject?: File; // Store the actual file for analysis
    analysis?: string;
}

interface PatientPortalProps {
    user: User;
    onUpdateUser: (updatedData: Partial<User>) => void;
}

const PatientPortal: React.FC<PatientPortalProps> = ({ user, onUpdateUser }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'messages' | 'settings'>('overview');
    const [aiAnalysis, setAiAnalysis] = useState<string>('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // Notification System State
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [preferences, setPreferences] = useState({
        emailReminders: true,
        smsReminders: false,
        marketingEmails: false
    });

    // File Upload State
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { id: '1', name: 'Blood_Panel_Oct2023.pdf', type: 'application/pdf', date: 'Oct 20, 2023', size: '1.2 MB' },
        { id: '2', name: 'Chest_XRay.jpg', type: 'image/jpeg', date: 'Sep 15, 2023', size: '3.5 MB' }
    ]);
    const [isUploading, setIsUploading] = useState(false);
    const [analyzingFileId, setAnalyzingFileId] = useState<string | null>(null);

    // Profile Edit State
    const [profileData, setProfileData] = useState({
        name: user.name || '',
        email: user.email || '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setProfileData(prev => ({ ...prev, name: user.name, email: user.email }));
    }, [user]);

    // Simulate Reminder System
    useEffect(() => {
        const generatedNotifications: Notification[] = [];
        
        // Check for upcoming appointments (simulating backend cron job)
        mockHealthData.appointments.forEach(apt => {
            // Email Logic
            if (apt.daysAway <= 1 && preferences.emailReminders) {
                generatedNotifications.push({
                    id: Date.now() + apt.id,
                    type: 'email',
                    subject: `Reminder: Appointment with ${apt.doctor} Tomorrow`,
                    message: `Dear ${user.name},\n\nThis is a friendly reminder for your upcoming appointment.\n\nType: ${apt.type}\nProvider: ${apt.doctor}\nTime: ${apt.time}, ${apt.date}\nLocation: Main Clinic, Room 302\n\nPlease arrive 15 minutes early to complete any necessary paperwork.\n\nBest regards,\nJeevo Health Team`,
                    date: 'Just now',
                    read: false
                });
            }

            // SMS Logic
            if (apt.daysAway <= 1 && preferences.smsReminders) {
                generatedNotifications.push({
                    id: Date.now() + apt.id + 1000, // unique id
                    type: 'sms',
                    subject: `SMS: Appointment Reminder`,
                    message: `Jeevo Alert: Appt with ${apt.doctor} tomorrow at ${apt.time}. Reply C to confirm.`,
                    date: 'Just now',
                    read: false
                });
            }
        });

        // Add a welcome message if empty
        if (generatedNotifications.length === 0 && notifications.length === 0) {
             generatedNotifications.push({
                id: 1,
                type: 'system',
                subject: 'Welcome to Jeevo Portal',
                message: 'Welcome to your new patient dashboard. Here you can view your records, appointments, and AI insights.',
                date: '2 days ago',
                read: true
            });
        }

        if (generatedNotifications.length > 0) {
            setNotifications(prev => {
                const oldMessages = prev.filter(n => n.date !== 'Just now');
                return [...generatedNotifications, ...oldMessages];
            });
        }
    }, [preferences.emailReminders, preferences.smsReminders, user.name]);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const analysis = await analyzeHealthData(mockHealthData);
            setAiAnalysis(analysis);
        } catch (error) {
            console.error(error);
            setAiAnalysis("Sorry, I couldn't analyze the data at this moment.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];
            const fileInput = e.target; // Capture reference to clear it later
            
            // Simulate upload delay
            setTimeout(() => {
                const newFile: UploadedFile = {
                    id: Date.now().toString(),
                    name: file.name,
                    type: file.type,
                    date: new Date().toLocaleDateString(),
                    size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                    fileObject: file
                };
                // Use functional update to ensure we have the latest state
                setUploadedFiles(prev => [newFile, ...prev]);
                setIsUploading(false);
                // Clear the input using captured reference
                fileInput.value = '';
            }, 1500);
        }
    };

    const handleAnalyzeFile = async (fileId: string, file: File) => {
        setAnalyzingFileId(fileId);
        try {
            const prompt = "Analyze this medical image or scan. Describe what you see, identify any anomalies, and provide a summary in simple terms. Include a disclaimer.";
            const result = await analyzeImageWithPrompt(prompt, file);
            
            setUploadedFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, analysis: result } : f
            ));
        } catch (error) {
            console.error(error);
            alert("Failed to analyze the image.");
        } finally {
            setAnalyzingFileId(null);
        }
    };

    const handleSaveProfile = () => {
        if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        onUpdateUser({ name: profileData.name, email: profileData.email });
        
        // In a real app, we would send password to backend here
        if (profileData.newPassword) {
            alert("Profile and password updated successfully!");
        } else {
            alert("Profile information updated successfully!");
        }
        
        setProfileData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getDashboardLabel = () => {
        switch (user.role) {
            case 'admin': return 'Administrator Panel';
            case 'organization': return 'Organization Dashboard';
            default: return 'Patient Health Portal';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-inter font-bold text-gray-800">Welcome back, {user.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'organization' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                {user.role}
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium text-lg">{getDashboardLabel()}</p>
                        <p className="text-gray-500 text-sm mt-1">Member ID: #{user.id}99283</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                        {['overview', 'records', 'messages', 'settings'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`relative px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${activeTab === tab ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab}
                                {tab === 'messages' && unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-50">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Recent Vitals
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Blood Pressure</span>
                                        <span className="font-semibold text-gray-800">{mockHealthData.vitals.bloodPressure}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Heart Rate</span>
                                        <span className="font-semibold text-gray-800">{mockHealthData.vitals.heartRate}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Weight</span>
                                        <span className="font-semibold text-gray-800">{mockHealthData.vitals.weight}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Upcoming Appointments
                                </h3>
                                {mockHealthData.appointments.map((apt, idx) => (
                                    <div key={idx} className="mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="font-bold text-gray-800">{apt.type}</div>
                                        <div className="text-sm text-gray-600">{apt.doctor}</div>
                                        <div className="mt-2 text-sm text-primary font-semibold">{apt.date} • {apt.time}</div>
                                        {apt.daysAway <= 1 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {preferences.emailReminders && (
                                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-flex items-center">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                                        Email Sent
                                                    </span>
                                                )}
                                                {preferences.smsReminders && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-flex items-center">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.586l-2.707 2.707A1 1 0 0110 18.414V17H4a2 2 0 01-2-2V5z" /></svg>
                                                        SMS Sent
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-xl shadow-md">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Latest Lab Results</h3>
                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                        className="flex items-center bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        {isAnalyzing ? 'Analyzing...' : 'AI Explain Results'}
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                                <th className="px-6 py-3">Test Name</th>
                                                <th className="px-6 py-3">Value</th>
                                                <th className="px-6 py-3">Range</th>
                                                <th className="px-6 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {mockHealthData.recentLabs.map((lab, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 font-medium text-gray-900">{lab.test}</td>
                                                    <td className="px-6 py-4 text-gray-700">{lab.value} {lab.unit}</td>
                                                    <td className="px-6 py-4 text-gray-500">{lab.range}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lab.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {lab.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {aiAnalysis && (
                                    <div className="mt-6 p-6 bg-blue-50 border border-blue-100 rounded-xl animate-fadeIn">
                                        <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                            AI Health Insight
                                        </h4>
                                        <div className="prose text-blue-800 whitespace-pre-wrap">
                                            {aiAnalysis}
                                        </div>
                                        <p className="text-xs text-blue-600 mt-4 italic">
                                            Disclaimer: This analysis is generated by AI and should not be considered a medical diagnosis. Please consult with your healthcare provider.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">Inbox & Reminders</h3>
                                <span className="text-sm text-gray-500">{notifications.length} Messages</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No messages.</div>
                                ) : (
                                    notifications.map((note) => (
                                        <div key={note.id} 
                                             onClick={() => markAsRead(note.id)}
                                             className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${!note.read ? 'bg-blue-50/50' : 'bg-white'}`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    {!note.read && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                                                    {note.type === 'sms' && (
                                                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase">SMS</span>
                                                    )}
                                                    {note.type === 'email' && (
                                                        <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-bold uppercase">Email</span>
                                                    )}
                                                    <h4 className={`text-lg ${!note.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                                        {note.subject}
                                                    </h4>
                                                </div>
                                                <span className="text-sm text-gray-500">{note.date}</span>
                                            </div>
                                            <p className="text-gray-600 whitespace-pre-line text-sm pl-4 border-l-2 border-gray-200">
                                                {note.message}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Profile Section */}
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                Profile Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Leave blank to keep current"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            value={profileData.newPassword}
                                            onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Confirm new password"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            value={profileData.confirmPassword}
                                            onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 text-right">
                                    <button 
                                        onClick={handleSaveProfile}
                                        className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notification Preferences */}
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                Notification Preferences
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Email Reminders</h4>
                                        <p className="text-sm text-gray-500">Receive appointment reminders 24 hours in advance.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.emailReminders} onChange={() => togglePreference('emailReminders')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-bold text-gray-800">SMS Reminders</h4>
                                        <p className="text-sm text-gray-500">Get text message alerts for urgent updates.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.smsReminders} onChange={() => togglePreference('smsReminders')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Marketing & News</h4>
                                        <p className="text-sm text-gray-500">Stay updated with new features and health tips.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={preferences.marketingEmails} onChange={() => togglePreference('marketingEmails')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RECORDS TAB */}
                {activeTab === 'records' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* File Upload Section */}
                        <div className="bg-white rounded-xl shadow-md p-8">
                             <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                Upload Medical Records
                            </h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-primary transition-colors bg-gray-50">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                         <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="text-gray-600 font-medium">Uploading secure document...</p>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-lg text-gray-700 font-medium">Drag and drop your files here</p>
                                        <p className="text-gray-500 mb-4">or click to browse</p>
                                        <label className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-md inline-block">
                                            Upload Image / PDF
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept=".pdf, .jpg, .jpeg, .png, .webp" 
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                        <p className="text-xs text-gray-400 mt-4">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* File List */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-800">My Documents</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {uploadedFiles.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No documents uploaded yet.</div>
                                ) : (
                                    uploadedFiles.map((file) => (
                                        <div key={file.id} className="p-4 transition-colors hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={`p-3 rounded-lg mr-4 ${file.type.includes('pdf') ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                            {file.type.includes('pdf') ? (
                                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{file.name}</h4>
                                                        <p className="text-sm text-gray-500">{file.date} • {file.size}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {/* Show analyze button for images ONLY if fileObject exists (newly uploaded) */}
                                                    {file.fileObject && file.type.startsWith('image/') && (
                                                        <button 
                                                            onClick={() => handleAnalyzeFile(file.id, file.fileObject!)}
                                                            disabled={analyzingFileId === file.id}
                                                            className="text-xs bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-3 py-1 rounded-full font-bold transition-colors disabled:opacity-50"
                                                        >
                                                            {analyzingFileId === file.id ? 'Analyzing...' : 'Analyze with AI'}
                                                        </button>
                                                    )}
                                                    {/* Tooltip or fallback for historical items without fileObject */}
                                                    {!file.fileObject && file.type.startsWith('image/') && (
                                                        <span className="text-xs text-gray-400 italic px-2">Archived (No Analysis)</span>
                                                    )}
                                                    <button className="text-gray-400 hover:text-primary">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* AI Analysis Result */}
                                            {file.analysis && (
                                                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg ml-14 animate-fadeIn">
                                                    <h5 className="text-sm font-bold text-blue-900 mb-1 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                                        Analysis Report
                                                    </h5>
                                                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{file.analysis}</p>
                                                    <p className="text-[10px] text-blue-500 mt-2 uppercase tracking-wide">AI-Generated • Not a medical diagnosis</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientPortal;
