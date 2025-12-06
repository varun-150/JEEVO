import React from 'react';
import Services from './Services';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
        <div className="bg-primary py-20 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-inter font-bold mb-4">Our Medical Services</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">Comprehensive care powered by advanced technology and human expertise.</p>
        </div>

        {/* Reuse existing Services Component */}
        <Services />

        {/* FAQ Section */}
        <div className="container mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
                {[
                    { q: "How does the AI diagnostic tool work?", a: "Our AI analyzes medical images using deep learning algorithms trained on millions of cases to provide a preliminary assessment. It supports doctors but does not replace them." },
                    { q: "Is my medical data secure?", a: "Absolutely. We use bank-level encryption and are fully HIPAA compliant to ensure your personal health information remains private and secure." },
                    { q: "Can I book virtual consultations?", a: "Yes, our telemedicine platform allows you to connect with specialists via secure video calls from the comfort of your home." },
                    { q: "Do you accept insurance?", a: "We partner with most major insurance providers. You can verify your coverage within the patient portal." }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.q}</h3>
                        <p className="text-gray-600">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ServicesPage;