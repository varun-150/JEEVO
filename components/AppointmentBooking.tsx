
import React, { useState } from 'react';
import { getFastResponse } from '../services/geminiService';

const AppointmentBooking: React.FC<{ preSelectedDoctor?: string; onComplete: () => void }> = ({ preSelectedDoctor, onComplete }) => {
    const [step, setStep] = useState(1);
    const [doctor, setDoctor] = useState(preSelectedDoctor || '');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [aiTip, setAiTip] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Notification preference for this specific appointment
    const [sendEmailReminder, setSendEmailReminder] = useState(true);
    const [sendSmsReminder, setSendSmsReminder] = useState(false);

    const handleConfirm = async () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(async () => {
            // Get AI tip for the appointment
            try {
                const prompt = `I am booking a medical appointment for: "${reason}". Give me one short sentence of advice on how to prepare for this visit.`;
                const tip = await getFastResponse(prompt);
                setAiTip(tip);
            } catch (e) {
                console.error(e);
            }
            setStep(3);
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-white text-center">
                    <h2 className="text-2xl font-bold font-inter">Book an Appointment</h2>
                    <p className="opacity-90">Schedule your visit in a few simple steps</p>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Select Provider</label>
                                <select 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    value={doctor}
                                    onChange={(e) => setDoctor(e.target.value)}
                                >
                                    <option value="">-- Choose a Doctor --</option>
                                    <option value="Dr. Sarah Smith">Dr. Sarah Smith (Cardiology)</option>
                                    <option value="Dr. James Wilson">Dr. James Wilson (Dermatology)</option>
                                    <option value="Dr. Emily Chen">Dr. Emily Chen (Pediatrics)</option>
                                    <option value="Dr. Michael Ross">Dr. Michael Ross (General Practice)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Preferred Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Reason for Visit</label>
                                <textarea 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    rows={3}
                                    placeholder="Briefly describe your symptoms or reason..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="space-y-2 pt-2">
                                <div className="flex items-center">
                                    <input 
                                        id="emailReminder" 
                                        type="checkbox" 
                                        checked={sendEmailReminder}
                                        onChange={(e) => setSendEmailReminder(e.target.checked)}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor="emailReminder" className="ml-2 block text-gray-700 font-medium">
                                        Send me an email reminder
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        id="smsReminder" 
                                        type="checkbox" 
                                        checked={sendSmsReminder}
                                        onChange={(e) => setSendSmsReminder(e.target.checked)}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor="smsReminder" className="ml-2 block text-gray-700 font-medium">
                                        Send me an SMS reminder
                                    </label>
                                </div>
                            </div>
                            <button 
                                onClick={() => setStep(2)}
                                disabled={!doctor || !date || !reason}
                                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center space-y-6">
                            <h3 className="text-xl font-bold text-gray-800">Confirm Appointment Details</h3>
                            <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
                                <p><span className="font-semibold text-gray-600">Doctor:</span> {doctor}</p>
                                <p><span className="font-semibold text-gray-600">Date:</span> {new Date(date).toLocaleString()}</p>
                                <p><span className="font-semibold text-gray-600">Reason:</span> {reason}</p>
                                <p><span className="font-semibold text-gray-600">Notifications:</span> 
                                    {sendEmailReminder ? ' Email' : ''}
                                    {sendEmailReminder && sendSmsReminder ? ' &' : ''}
                                    {sendSmsReminder ? ' SMS' : ''}
                                    {!sendEmailReminder && !sendSmsReminder ? ' None' : ''}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="w-1/2 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleConfirm}
                                    disabled={isProcessing}
                                    className="w-1/2 bg-secondary text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    {isProcessing ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h3>
                            <p className="text-gray-600 mb-2">
                                We have booked your visit with {doctor}.
                            </p>
                            <div className="text-sm text-primary font-medium mb-8 space-y-1">
                                {sendEmailReminder && <p>✓ Confirmation email sent</p>}
                                {sendSmsReminder && <p>✓ SMS confirmation sent</p>}
                            </div>
                            
                            {aiTip && (
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
                                    <p className="font-semibold text-blue-800 mb-1">JeevoBot Tip:</p>
                                    <p className="text-blue-700 italic">"{aiTip}"</p>
                                </div>
                            )}

                            <button 
                                onClick={onComplete}
                                className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Return Home
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;
