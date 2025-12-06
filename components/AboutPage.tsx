import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-800 mb-6">About Jeevo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to transforming healthcare through innovation, compassion, and cutting-edge technology.
          </p>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <img src="https://picsum.photos/800/600?image=1062" alt="Medical Team" className="rounded-xl shadow-lg" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6 text-lg">
                    To provide accessible, affordable, and high-quality healthcare to everyone, everywhere, leveraging the power of Artificial Intelligence and human compassion.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg">
                    A world where advanced healthcare is a fundamental right, not a privilege. We envision a future where technology empowers patients and providers to achieve better health outcomes.
                </p>
            </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: 'Dr. Eleanor Rigby', role: 'Chief Medical Officer', img: 'https://picsum.photos/300/300?image=1027' },
                    { name: 'Marcus Chen', role: 'Chief Technology Officer', img: 'https://picsum.photos/300/300?image=1012' },
                    { name: 'Sarah Connor', role: 'Chief Operations Officer', img: 'https://picsum.photos/300/300?image=1011' }
                ].map((member, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
                        <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
       {/* Stats */}
      <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-blue-100">Years Experience</div>
              </div>
              <div>
                  <div className="text-4xl font-bold mb-2">50k+</div>
                  <div className="text-blue-100">Patients Cured</div>
              </div>
              <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-blue-100">Expert Doctors</div>
              </div>
              <div>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Emergency Support</div>
              </div>
          </div>
      </div>
    </div>
  );
};
export default AboutPage;