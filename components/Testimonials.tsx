import React from 'react';

const TestimonialCard: React.FC<{ quote: string; name: string; context: string; outcome: string; }> = ({ quote, name, context, outcome }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
        <svg className="w-12 h-12 text-primary mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1.25a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 1.25zM3.636 4.364a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06L3.636 5.424a.75.75 0 010-1.06zM15.303 3.303a.75.75 0 011.06 1.06l-2.475 2.475a.75.75 0 01-1.06-1.06l2.475-2.475zM1.25 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 011.25 10zM18.75 10a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5h3.5a.75.75 0 01.75.75zM6.111 15.303a.75.75 0 011.06-1.06l2.475 2.475a.75.75 0 01-1.06 1.06L6.11 15.303zM15.303 16.364a.75.75 0 01-1.06 0l-2.475-2.475a.75.75 0 011.06-1.06l2.475 2.475a.75.75 0 010 1.06zM10 18.75a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5a.75.75 0 01-.75.75z"></path></svg>
        <p className="text-xl font-medium text-gray-700 italic mb-4 flex-grow">"{quote}"</p>
        <div className="font-bold text-lg text-gray-800">{name}</div>
        <div className="text-gray-500 mb-4">{context}</div>
        <div className="bg-secondary/10 text-secondary font-bold py-2 px-4 rounded-full">
            Outcome: {outcome}
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-inter font-extrabold text-gray-800">
                        Real Patients, Real Results
                    </h2>
                    <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                        Hear from patients and providers who have experienced the Jeevo difference.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    <TestimonialCard 
                        quote="The AI-powered glucose monitoring helped me maintain perfect blood sugar levels for 6 months straight."
                        name="Sarah M."
                        context="Diabetes Management"
                        outcome="95% improvement in glucose control"
                    />
                    <TestimonialCard 
                        quote="The telemedicine platform increased my patient capacity by 40% while maintaining quality care."
                        name="Dr. James L."
                        context="Cardiologist"
                        outcome="40% increase in patient reach"
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;