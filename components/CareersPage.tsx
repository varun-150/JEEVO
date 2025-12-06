
import React from 'react';

const CareersPage: React.FC = () => {
  const jobs = [
    { title: "Senior AI Research Scientist", department: "Engineering", type: "Full-time", location: "Remote / SF" },
    { title: "Full Stack Engineer", department: "Engineering", type: "Full-time", location: "San Francisco, CA" },
    { title: "Clinical Operations Manager", department: "Operations", type: "Full-time", location: "New York, NY" },
    { title: "Customer Success Specialist", department: "Support", type: "Full-time", location: "Remote" },
    { title: "Product Designer", department: "Design", type: "Contract", location: "Remote" },
  ];

  return (
    <div>
        {/* Hero */}
        <div className="bg-primary py-20 text-white text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-inter font-bold mb-4">Join Our Mission</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Help us redefine the future of healthcare. We are looking for passionate individuals to join our growing team.</p>
            </div>
        </div>

        {/* Benefits */}
        <div className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Why Work at Jeevo?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     <div className="text-center p-6">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Impactful Work</h3>
                        <p className="text-gray-600">Work on technology that directly saves lives and improves patient outcomes globally.</p>
                     </div>
                     <div className="text-center p-6">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Work-Life Balance</h3>
                        <p className="text-gray-600">Flexible hours, remote-first options, and unlimited PTO policy.</p>
                     </div>
                     <div className="text-center p-6">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Growth & Learning</h3>
                        <p className="text-gray-600">Annual learning stipend, conference budgets, and internal hackathons.</p>
                     </div>
                </div>
            </div>
        </div>

        {/* Job Listings */}
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                 <h2 className="text-3xl font-bold text-gray-800 mb-8">Open Positions</h2>
                 <div className="space-y-4">
                     {jobs.map((job, idx) => (
                         <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center">
                             <div className="mb-4 md:mb-0">
                                 <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                                 <p className="text-gray-600">{job.department} • {job.location}</p>
                             </div>
                             <div className="flex items-center gap-4">
                                 <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">{job.type}</span>
                                 <button className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">Apply</button>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    </div>
  );
};

export default CareersPage;
