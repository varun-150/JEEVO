
import React, { useState } from 'react';
import { User, SubscriptionPlan } from '../types';

interface PricingPageProps {
    user: User | null;
    onNavigate: (view: string) => void;
    onSubscribe: (plan: SubscriptionPlan) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ user, onNavigate, onSubscribe }) => {
    const [selectedPlan, setSelectedPlan] = useState<{ id: SubscriptionPlan, price: number, name: string } | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock payment state
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 499,
            features: ['Symptom Checker', 'Access to Health Articles', 'Find Providers', 'Standard Support'],
            color: 'bg-gray-100',
            textColor: 'text-gray-800',
            btnColor: 'bg-gray-800'
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 1499,
            features: ['Everything in Basic', '2 Virtual Consultations/mo', 'Patient Portal Access', 'Priority Email Support'],
            color: 'bg-blue-50',
            textColor: 'text-primary',
            btnColor: 'bg-primary'
        },
        {
            id: 'pro_max',
            name: 'Pro Max',
            price: 2999,
            features: ['Everything in Pro', 'Unlimited Virtual Consultations', 'Advanced AI Diagnostics', 'Family Coverage (4 Members)', 'Instant Chat Support'],
            recommended: true,
            color: 'bg-indigo-50',
            textColor: 'text-indigo-600',
            btnColor: 'bg-indigo-600'
        },
        {
            id: 'ultra_pro',
            name: 'Ultra Pro',
            price: 5999,
            features: ['Everything in Pro Max', '24/7 Concierge Doctor', 'Genetic Analysis Integration', 'Home Sample Collection', 'Zero Waiting Time', 'Dedicated Health Manager'],
            color: 'bg-gradient-to-br from-gray-900 to-black text-white',
            textColor: 'text-yellow-400',
            btnColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
        }
    ];

    const handleSelectPlan = (plan: any) => {
        if (!user) {
            onNavigate('login');
            return;
        }
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
            if (selectedPlan) {
                onSubscribe(selectedPlan.id as SubscriptionPlan);
            }
            setIsProcessing(false);
            setShowPaymentModal(false);
            onNavigate('portal'); // Redirect to portal after success
        }, 2000);
    };

    return (
        <div className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-800 mb-4">Choose Your Health Plan</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transparent pricing in INR. Invest in your health with our flexible subscription tiers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative rounded-2xl p-8 flex flex-col ${plan.color} ${plan.recommended ? 'ring-4 ring-primary shadow-2xl scale-105 z-10' : 'shadow-lg border border-gray-100'}`}>
                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}
                            <h3 className={`text-2xl font-bold mb-2 ${plan.id === 'ultra_pro' ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className={`text-4xl font-extrabold ${plan.textColor}`}>₹{plan.price}</span>
                                <span className={`ml-2 ${plan.id === 'ultra_pro' ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.id === 'ultra_pro' ? 'text-yellow-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={plan.id === 'ultra_pro' ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                className={`w-full py-4 rounded-xl font-bold transition-all transform hover:scale-105 ${plan.btnColor} text-white shadow-lg`}
                            >
                                {user?.subscriptionPlan === plan.id ? 'Current Plan' : `Get ${plan.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedPlan && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowPaymentModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-xl leading-6 font-bold text-gray-900 mb-4" id="modal-title">
                                            Secure Payment
                                        </h3>
                                        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-700">{selectedPlan.name} Plan</p>
                                                <p className="text-sm text-gray-500">Monthly Subscription</p>
                                            </div>
                                            <div className="text-xl font-bold text-primary">₹{selectedPlan.price}</div>
                                        </div>
                                        
                                        <form onSubmit={handlePayment} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                                                    placeholder="0000 0000 0000 0000"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    maxLength={19}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                                                        placeholder="MM/YY"
                                                        value={expiry}
                                                        onChange={(e) => setExpiry(e.target.value)}
                                                        maxLength={5}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                    <input 
                                                        type="password" 
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                                                        placeholder="123"
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)}
                                                        maxLength={3}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <button 
                                                    type="submit" 
                                                    disabled={isProcessing}
                                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                                                >
                                                    {isProcessing ? (
                                                        <span className="flex items-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        `Pay ₹${selectedPlan.price}`
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PricingPage;
