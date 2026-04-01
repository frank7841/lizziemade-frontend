'use client';

import { useState } from 'react';
import { Package, Heart, History, Star, User, Bell } from 'lucide-react';

export default function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Profile Sidebar */}
                <aside className="w-full lg:w-80 space-y-8">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-stone-100 text-center space-y-4">
                        <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto flex items-center justify-center text-3xl">👤</div>
                        <div>
                            <h2 className="text-xl font-playfair font-bold">Jane Doe</h2>
                            <p className="text-xs text-stone-400">LizzieMade member since 2024</p>
                        </div>
                        <button className="w-full py-2 border border-stone-200 rounded-xl text-xs font-bold hover:bg-stone-50 transition">
                            Edit Profile
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { id: 'orders', label: 'My Orders', icon: Package },
                            { id: 'wishlist', label: 'Wishlist', icon: Heart },
                            { id: 'custom', label: 'Custom Requests', icon: Bell },
                            { id: 'reviews', label: 'Reviews', icon: Star },
                            { id: 'settings', label: 'Settings', icon: User },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition ${activeTab === item.id ? 'bg-rose-600 text-white shadow-lg' : 'text-stone-500 hover:bg-stone-50'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-grow space-y-8">
                    <div className="flex justify-between items-end border-b border-stone-100 pb-6">
                        <h1 className="text-3xl font-playfair font-bold text-stone-900">
                            {activeTab === 'orders' && 'My Orders'}
                            {activeTab === 'wishlist' && 'My Wishlist'}
                            {activeTab === 'custom' && 'Custom Requests'}
                        </h1>
                        <p className="text-sm text-stone-500">Showing all activity</p>
                    </div>

                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-32 h-32 bg-stone-100 rounded-2xl flex-shrink-0"></div>
                                    <div className="flex-grow space-y-2 text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">
                                            <span>Order #LM-9901</span>
                                            <span>Oct 12, 2024</span>
                                        </div>
                                        <h3 className="text-lg font-bold">Pastel Dream Baby Blanket</h3>
                                        <p className="text-xs text-stone-500">Artisan: Jane's Jazzy Knits</p>
                                        <div className="flex gap-2 justify-center md:justify-start">
                                            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">Delivered</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right space-y-4">
                                        <p className="text-xl font-playfair font-bold text-stone-900">$85.00</p>
                                        <a href={`/orders/${i}`} className="inline-block px-6 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition">
                                            Track Order
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'custom' && (
                        <div className="bg-rose-50 p-12 rounded-[3rem] text-center space-y-4">
                            <div className="text-3xl text-rose-300">✨</div>
                            <h3 className="text-xl font-playfair font-bold">No custom requests yet</h3>
                            <p className="text-sm text-stone-500 max-w-sm mx-auto">Have something specific in mind? Start a custom order with one of our master artisans.</p>
                            <a href="/custom-orders" className="inline-block px-8 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-rose-600 transition shadow-lg">
                                Start a Request
                            </a>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
