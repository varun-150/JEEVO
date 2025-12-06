
import React, { useState, useCallback } from 'react';
import { getFastResponse, getThinkingResponse } from '../services/geminiService';

const InteractiveToolCard: React.FC<{
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    modelInfo: string;
    onSubmit: (prompt: string) => Promise<string>;
}> = ({ title, description, placeholder, buttonText, modelInfo, onSubmit }) => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async () => {
        if (!prompt) {
            setError('Please enter a query.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');
        try {
            const response = await onSubmit(prompt);
            setResult(response);
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, onSubmit]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col">
            <h3 className="text-2xl font-inter font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 my-4 text-lg flex-grow">{description}</p>
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-md p-2 mb-4">
                Powered by: <span className="font-semibold">{modelInfo}</span>
            </div>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-lg"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-4 w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-300 text-lg"
            >
                {isLoading ? 'Processing...' : buttonText}
            </button>
            {error && <p className="text-accent mt-4">{error}</p>}
            {result && (
                 <div className="mt-6 w-full p-4 border border-gray-200 bg-gray-50 rounded-md">
                    <h4 className="font-inter font-bold text-gray-800 mb-2">Response:</h4>
                    <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
};


const InteractiveTools: React.FC = () => {
  return (
    <section id="interactive-tools" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-inter font-extrabold text-gray-800">
            AI-Powered Health Tools
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Get instant insights and in-depth analysis with our suite of intelligent tools.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
            <InteractiveToolCard
                title="Symptom Checker"
                description="Describe your symptoms to get a quick, preliminary assessment. Optimized for low-latency responses."
                placeholder="e.g., I have a headache and a slight fever..."
                buttonText="Check Symptoms"
                modelInfo="gemini-2.5-flash-lite"
                onSubmit={getFastResponse}
            />
            <InteractiveToolCard
                title="Medical Research Assistant"
                description="Ask complex medical questions or request detailed explanations. Powered by our most advanced model with extended 'thinking' time for thorough analysis."
                placeholder="e.g., Explain the mechanism of action for mRNA vaccines..."
                buttonText="Get Detailed Analysis"
                modelInfo="gemini-2.5-pro (Thinking Mode)"
                onSubmit={getThinkingResponse}
            />
        </div>
      </div>
    </section>
  );
};

export default InteractiveTools;
