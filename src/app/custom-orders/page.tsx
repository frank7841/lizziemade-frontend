'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomOrdersPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'clothing',
        budget: '',
        deadline: '',
        colors: '',
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Request submitted! Our artisans will review and get back with a quote.');
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl font-playfair font-bold text-stone-900">Custom Creation</h1>
                <p className="text-stone-500">Tell us what you're dreaming of, and we'll stitch it to life.</p>

                {/* Progress bar */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-rose-600' : 'bg-stone-100'}`}></div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-stone-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-playfair font-bold">The Basics</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">What are we making?</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    placeholder="e.g., A custom sweater for my cat"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="clothing">Clothing</option>
                                    <option value="amigurumi">Amigurumi</option>
                                    <option value="home">Home Decor</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-playfair font-bold">The Details</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Description</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    placeholder="Share details about size, pattern, and any specific requests..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Color Palette</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    placeholder="e.g., Soft pastels, forest green"
                                    value={formData.colors}
                                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 py-4 bg-stone-100 text-stone-900 font-bold rounded-2xl hover:bg-stone-200 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-playfair font-bold">Timeline & Budget</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Desired Completion Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Approximate Budget ($)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                                    placeholder="50"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 py-4 bg-stone-100 text-stone-900 font-bold rounded-2xl hover:bg-stone-200 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <div className="mt-12 p-6 bg-stone-50 rounded-2xl text-center text-sm text-stone-500">
                <p>By submitting, your request will be sent to our top-rated artisans. You'll receive price quotes via email and in your dashboard within 24-48 hours.</p>
            </div>
        </div>
    );
}
