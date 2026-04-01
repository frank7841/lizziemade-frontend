'use client';

import { useState } from 'react';
import { useGetProductsQuery } from '@/store/api/apiSlice';
import { LayoutDashboard, Package, ShoppingCart, Settings, Plus, TrendingUp } from 'lucide-react';

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-stone-100 hidden lg:flex flex-col">
                <div className="p-8">
                    <div className="text-xl font-playfair font-bold text-rose-600">Seller Studio</div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">LizzieMade Partner</p>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'listings', label: 'My Listings', icon: Package },
                        { id: 'orders', label: 'Orders', icon: ShoppingCart },
                        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                        { id: 'settings', label: 'Shop Settings', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${activeTab === item.id ? 'bg-rose-50 text-rose-600' : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-stone-100">
                    <div className="bg-stone-900 rounded-2xl p-4 text-white text-xs space-y-2">
                        <p className="font-bold">Need help?</p>
                        <p className="opacity-60">Check our creator guide for tips on photography and pricing.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-playfair font-bold text-stone-900">
                            {activeTab === 'overview' && 'Welcome back, Artisan'}
                            {activeTab === 'listings' && 'My Listings'}
                            {activeTab === 'orders' && 'Recent Orders'}
                        </h1>
                        <p className="text-stone-500 text-sm">Here's what's happening with your shop today.</p>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-rose-600 transition shadow-lg">
                        <Plus className="w-5 h-5" />
                        Add New Creation
                    </button>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Revenue', value: '$1,240.00', change: '+12%', color: 'text-rose-600' },
                                { label: 'Active Orders', value: '8', change: '2 new', color: 'text-blue-600' },
                                { label: 'Shop Views', value: '1,420', change: '+5%', color: 'text-stone-900' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                                    <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                                    <div className="flex justify-between items-end">
                                        <p className="text-3xl font-playfair font-bold text-stone-900">{stat.value}</p>
                                        <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                                <h3 className="font-bold text-stone-900">Recent Activity</h3>
                                <button className="text-xs text-rose-600 font-bold">View History</button>
                            </div>
                            <div className="divide-y divide-stone-50">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-6 flex items-center justify-between hover:bg-stone-50 transition">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-lg">🧶</div>
                                            <div>
                                                <p className="text-sm font-bold text-stone-900">New order for "Blueberry Whale Amigurumi"</p>
                                                <p className="text-xs text-stone-400">2 hours ago • Order #LM-8291</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">Processing</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'listings' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {[1, 2, 3, 4].map((i) => (
                                    <tr key={i} className="hover:bg-stone-50 transition">
                                        <td className="px-6 py-6 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-stone-100 rounded-xl"></div>
                                            <p className="text-sm font-bold text-stone-900">Crochet Item {i}</p>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-playfair font-bold text-stone-900">$45.00</td>
                                        <td className="px-6 py-6 text-sm text-stone-500">12 units</td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase">Active</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <button className="text-stone-400 hover:text-rose-600 transition p-2">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
