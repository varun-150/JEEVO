
import React from 'react';

const StatItem: React.FC<{ value: string; label: string; }> = ({ value, label }) => (
    <div className="text-center">
        <div className="text-5xl font-inter font-extrabold text-primary">{value}</div>
        <div className="text-lg text-gray-600 mt-2">{label}</div>
    </div>
);

const TrustAndCompliance: React.FC = () => {
    const certifications = [
        "HIPAA Compliant",
        "SOC 2 Type II",
        "FDA Approved Devices",
        "ISO 27001",
    ];

    return (
        <section id="trust" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-inter font-extrabold text-gray-800 mb-4">
                            Trust & Compliance
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Your security and privacy are our top priorities. We adhere to the highest industry standards to protect your data.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
                                    <svg className="w-6 h-6 text-secondary mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944a11.954 11.954 0 007.834 3.055a1.002 1.002 0 00.976-.927c.075-.526-.22-1.026-.733-1.22a13.954 13.954 0 00-9.077-3.464c-3.443 0-6.703 1.25-9.077 3.464a1.002 1.002 0 00-.733 1.22c.165.927.976.927.976.927z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 18a1 1 0 001-1v-4.834a1 1 0 00-2 0V17a1 1 0 001 1zM2 10a1 1 0 011-1h1.01a1 1 0 011.01 1.01v.98a1 1 0 01-1.01 1.01H3a1 1 0 01-1-1v-.98zm14 0a1 1 0 011-1h1.01a1 1 0 011.01 1.01v.98a1 1 0 01-1.01 1.01H17a1 1 0 01-1-1v-.98zm-8-3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    <span className="font-semibold text-gray-700 text-lg">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <StatItem value="99.9%" label="Uptime Guaranteed" />
                        <StatItem value="500,000+" label="Patients Served" />
                        <StatItem value="1,200+" label="Healthcare Providers" />
                        <StatItem value="50+" label="Integrated Medical Systems" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustAndCompliance;
