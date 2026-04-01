'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

    return (
        <div className="min-h-[90vh] flex items-center justify-center container mx-auto px-4 py-12">
            <div className="w-full max-w-xl space-y-8 bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-stone-100">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-playfair font-bold text-stone-900">Join the Community</h1>
                    <p className="text-stone-500 text-sm">Start your journey with LizzieMade today</p>
                </div>

                {/* Role Switcher */}
                <div className="flex p-1 bg-stone-100 rounded-2xl">
                    <button
                        onClick={() => setRole('buyer')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${role === 'buyer' ? 'bg-white shadow-sm text-rose-600' : 'text-stone-500'}`}
                    >
                        I want to Buy
                    </button>
                    <button
                        onClick={() => setRole('seller')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${role === 'seller' ? 'bg-white shadow-sm text-rose-600' : 'text-stone-500'}`}
                    >
                        I want to Sell
                    </button>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="Jane Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="jane@example.com" required />
                        </div>
                    </div>

                    {role === 'seller' && (
                        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                            <label className="text-sm font-bold text-stone-700">Shop Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="Jane's Jazzy Knits" required />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Password</label>
                        <input type="password" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition" placeholder="••••••••" required />
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <input type="checkbox" className="mt-1 rounded border-stone-300 text-rose-600 focus:ring-rose-500" required />
                        <label className="text-xs text-stone-500 leading-relaxed">
                            I agree to the <a href="#" className="underline hover:text-rose-600">Terms of Service</a> and <a href="#" className="underline hover:text-rose-600">Privacy Policy</a>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition shadow-lg"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-stone-500">
                    Already have an account? <Link href="/auth/login" className="text-rose-600 font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
