'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ArrowLeft, Upload, Check } from 'lucide-react';

export default function AddProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert('Product published successfully!');
            router.push('/seller');
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold text-sm mb-8 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-playfair font-bold text-stone-900">List a New Creation</h1>
                        <p className="text-stone-500">Share your hand-stitched magic with the community.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Product Title</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="e.g., Cozy Cotton Bunny" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-700">Description</label>
                                <textarea rows={6} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="Tell the story behind this piece, materials used, and care instructions..." required></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700">Price ($)</label>
                                    <input type="number" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="45.00" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700">Category</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition">
                                        <option>Amigurumi</option>
                                        <option>Clothing</option>
                                        <option>Home Decor</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                                <input type="checkbox" className="w-5 h-5 rounded border-stone-300 text-rose-600 focus:ring-rose-500" />
                                <div className="text-xs">
                                    <p className="font-bold text-stone-900">Available for Customization</p>
                                    <p className="text-stone-500">Allow buyers to request custom colors/sizes for this item.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-5 bg-stone-900 text-white font-bold rounded-2xl transition shadow-xl flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-rose-600'}`}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Check className="w-5 h-5" />
                            )}
                            {isSubmitting ? 'Publishing...' : 'List Product'}
                        </button>
                    </form>
                </div>

                {/* Right: Assets & Tips */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-lg space-y-6">
                        <h3 className="text-lg font-playfair font-bold">Product Imagery</h3>
                        <div className="aspect-square bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-center p-8 group cursor-pointer hover:border-rose-300 transition">
                            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center group-hover:scale-110 transition">
                                <Upload className="w-5 h-5 text-stone-400 group-hover:text-rose-600" />
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                                Click to upload or drag & drop
                            </div>
                            <p className="text-[9px] text-stone-300">Min 1000 x 1000px, 5MB Max</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-stone-50 rounded-xl border border-stone-100"></div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-rose-50 p-8 rounded-[3rem] space-y-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">💡</div>
                        <h4 className="font-bold text-stone-900">Photography Pro-Tip</h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            Natural light is your best friend. Shoot your crochet items near a window for a soft, premium look that shows off the stitch detail.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
