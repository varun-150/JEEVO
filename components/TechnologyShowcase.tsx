
import React from 'react';

const TechnologyCard: React.FC<{ imageUrl: string; title: string; description: string; }> = ({ imageUrl, title, description }) => (
    <div className="group relative rounded-xl overflow-hidden shadow-lg">
        <img src={imageUrl} alt={title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-3xl font-inter font-bold text-white mb-2">{title}</h3>
            <p className="text-white/90 text-lg">{description}</p>
        </div>
    </div>
);

const TechnologyShowcase: React.FC = () => {
    return (
        <section id="technology" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-inter font-extrabold text-gray-800">
                        Cutting-Edge Healthcare Technology
                    </h2>
                    <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                        We are at the forefront of medical innovation, developing and integrating technologies that redefine patient care.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <TechnologyCard 
                        imageUrl="https://picsum.photos/800/600?image=31"
                        title="PathAI Integration"
                        description="AI-powered pathology for accurate cancer detection. Visualized in a lab with AI analysis screens."
                    />
                    <TechnologyCard 
                        imageUrl="https://picsum.photos/800/600?image=17"
                        title="Remote Patient Monitoring"
                        description="IoT devices for continuous health tracking. Featuring wearable devices and monitoring dashboards."
                    />
                    <TechnologyCard 
                        imageUrl="https://picsum.photos/800/600?image=2"
                        title="3D Bioprinting Lab"
                        description="Advanced tissue engineering for regenerative medicine. Showcasing a 3D bioprinter creating tissue structures."
                    />
                </div>
            </div>
        </section>
    );
};

export default TechnologyShowcase;
