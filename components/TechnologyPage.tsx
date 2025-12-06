import React from 'react';
import TechnologyShowcase from './TechnologyShowcase';

const TechnologyPage: React.FC = () => {
  return (
    <div>
        <div className="bg-gray-900 py-20 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/20"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl md:text-5xl font-inter font-bold mb-4">Innovation at Core</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90 text-gray-300">Pioneering the future of medicine with AI, Robotics, and Genomics.</p>
            </div>
        </div>

        <TechnologyShowcase />

        <div className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Research & Development</h2>
                        <p className="text-gray-600 mb-4 text-lg">
                            Our R&D labs are working tirelessly to bridge the gap between biological science and data science. We invest 25% of our revenue back into research.
                        </p>
                        <p className="text-gray-600 mb-4 text-lg">
                            From creating digital twins for personalized surgery simulation to developing non-invasive glucose monitoring sensors, Jeevo is building the tools for tomorrow's doctors.
                        </p>
                         <button className="text-primary font-bold hover:underline text-lg">Read our Research Papers &rarr;</button>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://picsum.photos/800/600?image=5" alt="Lab Research" className="rounded-xl shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TechnologyPage;