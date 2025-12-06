
import React from 'react';
import ImageAnalyzer from './ImageAnalyzer';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-primary/10 p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-inter font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4 text-lg flex-grow">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-700">
          <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const servicesData = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: "AI-Powered Diagnostics",
    description: "Advanced machine learning algorithms for early disease detection and accurate diagnosis. Upload an image to get a preliminary analysis.",
    features: ["Medical Imaging Analysis", "Predictive Analytics", "Treatment Recommendations"],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    title: "Telemedicine Platform",
    description: "Connect with healthcare providers from anywhere with our secure video consultation platform.",
    features: ["Virtual Consultations", "Remote Monitoring", "Digital Prescriptions"],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: "Digital Therapeutics",
    description: "Evidence-based mobile health applications for chronic disease management.",
    features: ["Medication Reminders", "Health Tracking", "Behavioral Support"],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: "Precision Medicine",
    description: "Personalized treatment plans based on genetic analysis and individual health data.",
    features: ["Genomic Testing", "Personalized Therapy", "Drug Compatibility Testing"],
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-inter font-extrabold text-gray-800">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Leveraging technology to provide accessible, personalized, and high-quality care for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="md:col-span-2">
              <ImageAnalyzer />
          </div>
          {servicesData.slice(1).map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

