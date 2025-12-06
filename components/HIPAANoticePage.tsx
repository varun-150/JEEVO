
import React from 'react';

const HIPAANoticePage: React.FC = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">HIPAA</h1>
        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8">
            <p className="text-blue-900 font-medium">This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.</p>
        </div>
        
        <div className="prose prose-lg text-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Rights</h3>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Get a copy of your paper or electronic medical record.</li>
                <li>Correct your paper or electronic medical record.</li>
                <li>Request confidential communication.</li>
                <li>Ask us to limit the information we share.</li>
                <li>Get a list of those with whom we’ve shared your information.</li>
                <li>Get a copy of this privacy notice.</li>
                <li>Choose someone to act for you.</li>
                <li>File a complaint if you believe your privacy rights have been violated.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Uses and Disclosures</h3>
            <p className="mb-4">We may use and share your information as we:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Treat you.</li>
                <li>Run our organization.</li>
                <li>Bill for your services.</li>
                <li>Help with public health and safety issues.</li>
                <li>Do research.</li>
                <li>Comply with the law.</li>
                <li>Respond to organ and tissue donation requests.</li>
                <li>Work with a medical examiner or funeral director.</li>
                <li>Address workers’ compensation, law enforcement, and other government requests.</li>
                <li>Respond to lawsuits and legal actions.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Responsibilities</h3>
            <p className="mb-4">
                We are required by law to maintain the privacy and security of your protected health information. We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information. We must follow the duties and privacy practices described in this notice and give you a copy of it.
            </p>
            <p className="mb-4">
                For more information see: <a href="https://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html" target="_blank" rel="noreferrer" className="text-primary hover:underline">www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default HIPAANoticePage;
