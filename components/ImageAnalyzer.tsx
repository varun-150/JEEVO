
import React, { useState, useCallback } from 'react';
import { analyzeImageWithPrompt } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("What do you see in this medical image? Provide a preliminary analysis but include a disclaimer that this is not a medical diagnosis.");
    const [analysis, setAnalysis] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setAnalysis("");
            setError("");
            // Clear input so selecting the same file triggers change again
            e.target.value = '';
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!image || !prompt) {
            setError("Please upload an image and provide a prompt.");
            return;
        }
        setIsLoading(true);
        setError("");
        setAnalysis("");
        try {
            const result = await analyzeImageWithPrompt(prompt, image);
            setAnalysis(result);
        } catch (err) {
            setError("Failed to analyze the image. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [image, prompt]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-inter font-bold text-gray-800">AI-Powered Diagnostic Assistant</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Upload a medical image (e.g., skin lesion, X-ray) and our AI will provide a preliminary analysis. <strong className="text-accent">This is not a substitute for professional medical advice.</strong></p>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="file-upload" className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
                    <label htmlFor="file-upload" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="mx-auto h-40 w-auto rounded-md" />
                            ) : (
                                <>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-sm text-gray-600">Drag & drop or <span className="text-primary font-semibold">browse</span></p>
                                </>
                            )}
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        </div>
                    </label>
                    <textarea
                        className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-lg"
                        rows={3}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt here..."
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !image}
                        className="mt-4 w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-300 text-lg"
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Analysis Results</label>
                    <div className="w-full h-full p-4 border border-gray-200 bg-gray-50 rounded-md min-h-[280px] text-lg">
                        {isLoading && <p className="text-gray-500 animate-pulse">Generating analysis...</p>}
                        {error && <p className="text-accent">{error}</p>}
                        {analysis && <p className="text-gray-800 whitespace-pre-wrap">{analysis}</p>}
                        {!isLoading && !analysis && !error && <p className="text-gray-400">Your analysis will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAnalyzer;
