'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Logged in! (Demo mode)');
        window.location.href = '/';
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4 py-12">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-stone-100">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-playfair font-bold text-stone-900">Welcome Back</h1>
                    <p className="text-stone-500 text-sm">Enter your details to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-bold text-stone-700">Password</label>
                            <a href="#" className="text-xs text-rose-600 hover:underline">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition text-sm font-medium">
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition text-sm font-medium">
                        Apple
                    </button>
                </div>

                <p className="text-center text-sm text-stone-500">
                    New to LizzieMade? <Link href="/auth/register" className="text-rose-600 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
}
