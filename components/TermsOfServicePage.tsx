
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 26, 2023</p>
        
        <div className="prose prose-lg text-gray-700">
            <p className="mb-4">Please read these Terms of Service ("Terms") carefully before using the Jeevo website and platform operated by Jeevo Inc.</p>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h3>
            <p className="mb-4">By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Medical Disclaimer</h3>
            <p className="mb-4 bg-yellow-50 p-4 border-l-4 border-yellow-400 rounded">
                <strong>Important:</strong> Jeevo is a technology platform. The AI-generated insights and information provided by JeevoBot or other tools on this site are for informational purposes only and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Accounts</h3>
            <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Intellectual Property</h3>
            <p className="mb-4">The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Jeevo Inc. and its licensors.</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Termination</h3>
            <p className="mb-4">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            
             <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Limitation of Liability</h3>
            <p className="mb-4">In no event shall Jeevo Inc, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
