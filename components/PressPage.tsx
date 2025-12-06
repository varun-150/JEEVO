
import React from 'react';

const PressPage: React.FC = () => {
    const articles = [
        {
            date: "October 15, 2023",
            source: "TechCrunch",
            title: "Jeevo Raises $50M Series B to Revolutionize AI Diagnostics",
            excerpt: "The healthcare startup aims to expand its AI capabilities and enter new international markets.",
            image: "https://picsum.photos/400/250?image=1"
        },
        {
            date: "September 02, 2023",
            source: "Forbes",
            title: "How Jeevo is Bringing Hospital-Grade Care to Rural Areas",
            excerpt: "A deep dive into the company's portable diagnostic tools and telemedicine platform.",
            image: "https://picsum.photos/400/250?image=2"
        },
        {
            date: "July 20, 2023",
            source: "Health & Science Journal",
            title: "Study Shows Jeevo's AI 98% Accurate in Detecting Early Skin Cancer",
            excerpt: "Clinical trials validate the effectiveness of the image analysis algorithms used in the app.",
            image: "https://picsum.photos/400/250?image=3"
        }
    ];

    return (
        <div className="bg-white min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-800 mb-4">Newsroom</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Latest updates, press releases, and media coverage.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                    <span>{article.source}</span>
                                    <span>{article.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-primary cursor-pointer">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <button className="text-primary font-bold hover:underline">Read More &rarr;</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gray-900 text-white rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
                    <p className="text-gray-300 mb-6">For press kits, interview requests, or official assets, please contact our media team.</p>
                    <a href="mailto:press@jeevo.health" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        Contact Press Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PressPage;
