'use client';

import React from 'react';
import Link from 'next/link';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/orders', label: 'All Orders', icon: '📦' },
        { href: '/admin/sellers', label: 'Sellers', icon: '🏪' },
        { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
        { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden md:flex flex-col" style={{ background: '#1c1917', color: '#fafaf9' }}>
                <div className="p-6 border-b border-stone-700">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'var(--rose)' }}>🧶</div>
                        <div>
                            <p className="font-playfair font-bold text-white text-sm">LizzieMade</p>
                            <p className="text-[10px] text-stone-400 uppercase tracking-widest">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-stone-300 hover:text-white hover:bg-stone-700"
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-stone-700">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-stone-400 hover:text-white transition">
                        ← Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10" style={{ borderColor: 'var(--border)' }}>
                    <div>
                        <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Control Panel</h2>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>LizzieMade Administration</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Administrator</span>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--rose)' }}>A</div>
                    </div>
                </header>
                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
