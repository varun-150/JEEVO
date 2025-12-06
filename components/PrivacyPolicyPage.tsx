
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 26, 2023</p>
        
        <div className="prose prose-lg text-gray-700">
            <p className="mb-4">At Jeevo ("we", "us", "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our healthcare platform.</p>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h3>
            <p className="mb-4">We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device.</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Personal Identifiers:</strong> Name, address, email address, phone number, date of birth.</li>
                <li><strong>Protected Health Information (PHI):</strong> Medical history, symptoms, test results, diagnoses, and treatment data stored within the Patient Portal.</li>
                <li><strong>Payment Information:</strong> Credit card numbers and billing addresses (processed via secure third-party payment gateways).</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h3>
            <p className="mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To provide, maintain, and improve our services.</li>
                <li>To process transactions and manage your subscription.</li>
                <li>To facilitate telemedicine consultations and appointments.</li>
                <li>To communicate with you regarding updates, security alerts, and support.</li>
                <li>To generate AI-driven health insights (with your explicit consent).</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Data Security</h3>
            <p className="mb-4">We implement industry-standard security measures, including end-to-end encryption for data in transit and at rest, to protect your personal information and PHI. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Sharing of Information</h3>
            <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Healthcare providers involved in your care.</li>
                <li>Service providers who perform services on our behalf (e.g., cloud hosting, payment processing).</li>
                <li>Legal authorities if required by law or valid legal process.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
