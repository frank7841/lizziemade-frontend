'use client';

import { useState } from 'react';
import { Shield, Users, ShoppingCart, AlertCircle, BarChart3, Globe } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-stone-900 text-stone-300 p-8">
            <div className="container mx-auto space-y-12">
                <header className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 text-rose-600 mb-2">
                            <Shield className="w-5 h-5" />
                            <span className="text-[10px] uppercase font-heavy tracking-[0.2em]">Administrative Console</span>
                        </div>
                        <h1 className="text-4xl font-playfair font-bold text-white">LizzieMade Overview</h1>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-stone-800 rounded-2xl border border-stone-700 text-xs font-bold">System Status: <span className="text-green-500">Healthy</span></div>
                    </div>
                </header>

                {/* Global Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Revenue', value: '$45,820', icon: BarChart3 },
                        { label: 'Total Orders', value: '1,240', icon: ShoppingCart },
                        { label: 'Verified Sellers', value: '82', icon: Users },
                        { label: 'Global Traffic', value: '128k', icon: Globe },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-stone-800/50 p-8 rounded-[2.5rem] border border-stone-700/50 hover:border-rose-500/50 transition duration-500">
                            <stat.icon className="w-8 h-8 text-rose-600 mb-6" />
                            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-playfair font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Dispute Queue */}
                    <div className="lg:col-span-2 bg-stone-800/30 rounded-[3rem] border border-stone-800 p-10 space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold text-white">Open Disputes</h3>
                            <span className="text-rose-600 text-xs font-bold">4 Requiring Attention</span>
                        </div>

                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-stone-900/50 p-6 rounded-3xl border border-stone-800 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-rose-900/20 text-rose-600 rounded-2xl flex items-center justify-center">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">Order #LM-7721 - Item Not As Described</p>
                                            <p className="text-xs text-stone-500">Buyer: mark@dev.com | Seller: KnitWiz | Opened: 2h ago</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-xl transition">Resolve</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-stone-800/30 rounded-[3rem] border border-stone-800 p-10 space-y-8">
                        <h3 className="text-xl font-playfair font-bold text-white">Platform Control</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button className="w-full text-left p-4 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-stone-700 transition">
                                <p className="text-xs font-bold text-white">Deploy Announcement</p>
                                <p className="text-[10px] text-stone-500">All-platform notification</p>
                            </button>
                            <button className="w-full text-left p-4 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-stone-700 transition">
                                <p className="text-xs font-bold text-white">Seller Verification</p>
                                <p className="text-[10px] text-stone-500">12 pending applications</p>
                            </button>
                            <button className="w-full text-left p-4 bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-stone-700 transition">
                                <p className="text-xs font-bold text-white">Financial Export</p>
                                <p className="text-[10px] text-stone-500">Q1 tax and commission summary</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
