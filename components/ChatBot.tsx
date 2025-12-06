import React, { useState, useEffect, useRef } from 'react';
import { generateChatResponse, generateGroundedResponse, startChat } from '../services/geminiService';
import type { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [useGroundedSearch, setUseGroundedSearch] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        startChat();
        setMessages([{ role: 'model', content: "Hello! I'm JeevoBot. How can I help you today?" }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (useGroundedSearch) {
                const { text, sources } = await generateGroundedResponse(input);
                const modelMessage: ChatMessage = { role: 'model', content: text, sources };
                setMessages(prev => [...prev, modelMessage]);
            } else {
                const responseText = await generateChatResponse(input);
                const modelMessage: ChatMessage = { role: 'model', content: responseText };
                setMessages(prev => [...prev, modelMessage]);
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button onClick={() => setIsOpen(true)} className="bg-primary text-white rounded-full p-4 shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
            </div>

            <div className={`fixed bottom-5 right-5 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <div className="flex justify-between items-center p-4 border-b bg-primary text-white rounded-t-2xl">
                    <h3 className="font-inter font-bold text-xl">Jeevo Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p className="text-lg">{msg.content}</p>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 border-t border-gray-300 pt-2">
                                        <h4 className="font-bold text-sm mb-1">Sources:</h4>
                                        <ul className="list-disc list-inside text-sm">
                                            {msg.sources.map((source, i) => source.web && (
                                                <li key={i}><a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="underline hover:text-secondary">{source.web.title || source.web.uri}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="flex justify-start mb-4"><div className="rounded-2xl px-4 py-2 bg-gray-200 text-gray-500 animate-pulse">...</div></div>}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t">
                     <div className="flex items-center justify-center mb-2">
                        <label htmlFor="grounded-search-toggle" className="flex items-center cursor-pointer">
                            <span className="mr-3 text-sm font-medium text-gray-900">Use Search Grounding</span>
                            <div className="relative">
                                <input type="checkbox" id="grounded-search-toggle" className="sr-only" checked={useGroundedSearch} onChange={() => setUseGroundedSearch(!useGroundedSearch)} />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${useGroundedSearch ? 'transform translate-x-6 bg-secondary' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-l-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="bg-primary text-white px-5 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBot;