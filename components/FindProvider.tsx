import React, { useState } from 'react';

const doctors = [
    { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology", location: "Main Hospital", rating: 4.9, image: "https://picsum.photos/200/200?image=1027" },
    { id: 2, name: "Dr. James Wilson", specialty: "Dermatology", location: "Downtown Clinic", rating: 4.8, image: "https://picsum.photos/200/200?image=1005" },
    { id: 3, name: "Dr. Emily Chen", specialty: "Pediatrics", location: "Westside Center", rating: 4.9, image: "https://picsum.photos/200/200?image=1011" },
    { id: 4, name: "Dr. Michael Ross", specialty: "General Practice", location: "Main Hospital", rating: 4.7, image: "https://picsum.photos/200/200?image=1025" },
    { id: 5, name: "Dr. Lisa Cuddy", specialty: "Endocrinology", location: "North Wing", rating: 4.9, image: "https://picsum.photos/200/200?image=1006" },
    { id: 6, name: "Dr. Gregory House", specialty: "Diagnostics", location: "Main Hospital", rating: 4.5, image: "https://picsum.photos/200/200?image=1008" },
];

const FindProvider: React.FC<{ onBook: (doctorName: string) => void }> = ({ onBook }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');

    const filteredDoctors = doctors.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty)))];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-inter font-extrabold text-gray-800 mb-4">Find a Specialist</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Browse our network of top-rated healthcare providers.</p>
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Provider</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="Search by name or specialty..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="md:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Specialty</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                        >
                            {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="flex p-6">
                                <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-2 border-primary/20" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                    <p className="text-gray-500 text-sm mt-1">{doctor.location}</p>
                                    <div className="flex items-center mt-2">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <span className="text-gray-700 font-bold ml-1">{doctor.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6 pt-2">
                                <button 
                                    onClick={() => onBook(doctor.name)}
                                    className="w-full bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindProvider;