'use client';

import { useState } from 'react';
import {
    useGetAdminStatsQuery,
    useGetAllSellersQuery,
    useGetAdminOrdersQuery,
} from '@/store/api/apiSlice';
import {
    Users, ShoppingBag, Package, DollarSign,
    CheckCircle2, Clock, XCircle, Truck,
    Search, ChevronDown, RefreshCw, ShieldCheck,
} from 'lucide-react';

// ── Status config ───────────────────────────────────────────────────
const ORDER_STATUS: Record<string, { cls: string; label: string }> = {
    pending: { cls: 'badge-amber', label: 'Pending' },
    paid: { cls: 'badge-blue', label: 'Paid' },
    processing: { cls: 'badge-blue', label: 'Processing' },
    shipped: { cls: 'badge-blue', label: 'Shipped' },
    delivered: { cls: 'badge-green', label: 'Delivered' },
    cancelled: { cls: 'badge-stone', label: 'Cancelled' },
};

// ── Category Management ─────────────────────────────────────────────
const ALL_CATEGORIES = [
    { key: 'amigurumi', label: 'Amigurumi', emoji: '🧸', description: 'Cute crocheted stuffed animals and characters' },
    { key: 'clothing', label: 'Clothing', emoji: '👗', description: 'Wearable crochet garments, tops, cardigans' },
    { key: 'accessories', label: 'Accessories', emoji: '💎', description: 'Hats, scarves, bags, and wearable accessories' },
    { key: 'home_decor', label: 'Home Decor', emoji: '🏡', description: 'Baskets, plant holders, wall art, and decor' },
    { key: 'bags', label: 'Bags', emoji: '👜', description: 'Tote bags, market bags, and purses' },
    { key: 'baby_items', label: 'Baby Items', emoji: '🍼', description: 'Blankets, booties, and soft toys for babies' },
    { key: 'patterns', label: 'Patterns', emoji: '📄', description: 'Digital crochet patterns with difficulty levels' },
    { key: 'other', label: 'Other', emoji: '✨', description: 'Unique items that don\'t fit a category' },
];

// ── Stat Card ────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: any; sub?: string; color: string }) {
    return (
        <div className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '22' }}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
                <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {value ?? <span className="w-16 h-6 rounded bg-stone-100 animate-pulse inline-block" />}
                </p>
                {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
            </div>
        </div>
    );
}

// ── Main ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const [tab, setTab] = useState<'overview' | 'orders' | 'sellers' | 'categories'>('overview');
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState('');

    const { data: stats, isLoading: loadingStats, refetch: refetchStats } = useGetAdminStatsQuery();
    const { data: sellers = [], isLoading: loadingSellers } = useGetAllSellersQuery();
    const { data: orders = [], isLoading: loadingOrders } = useGetAdminOrdersQuery();

    const filteredOrders = orders.filter((o: any) => {
        const matchSearch = !orderSearch || o.id.includes(orderSearch);
        const matchStatus = !orderStatusFilter || o.status === orderStatusFilter;
        return matchSearch && matchStatus;
    });

    const TABS = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'sellers', label: 'Sellers', icon: '🏪' },
        { id: 'categories', label: 'Categories', icon: '🏷️' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Tab bar */}
            <div className="flex gap-1 bg-white rounded-xl p-1 border" style={{ borderColor: 'var(--border)', width: 'fit-content' }}>
                {TABS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id as any)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition"
                        style={{
                            background: tab === t.id ? 'var(--rose)' : 'transparent',
                            color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        <span>{t.icon}</span>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── Overview ── */}
            {tab === 'overview' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Platform Overview</h3>
                        <button onClick={() => refetchStats()} className="flex items-center gap-2 text-sm btn-secondary py-2 px-4">
                            <RefreshCw className="w-3.5 h-3.5" /> Refresh
                        </button>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard icon={Users} label="Total Users" value={stats?.users} color="#2563eb" />
                        <StatCard icon={ShieldCheck} label="Active Sellers" value={stats?.sellers} color="#16a34a" />
                        <StatCard icon={ShoppingBag} label="Products Listed" value={stats?.products} color="#e11d48" />
                        <StatCard icon={Package} label="Total Orders" value={stats?.orders} color="#d97706" />
                    </div>

                    {/* Quick-action cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: 'Manage Orders', desc: 'View and update all platform orders.', action: 'orders', icon: '📦', color: '#e11d48' },
                            { title: 'Seller Roster', desc: 'Review and verify artisan accounts.', action: 'sellers', icon: '🏪', color: '#2563eb' },
                            { title: 'Categories', desc: 'Manage product category definitions.', action: 'categories', icon: '🏷️', color: '#16a34a' },
                        ].map(card => (
                            <button
                                key={card.action}
                                onClick={() => setTab(card.action as any)}
                                className="card p-6 text-left hover:shadow-md transition-all hover:-translate-y-0.5 group"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: card.color + '18' }}>
                                    {card.icon}
                                </div>
                                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{card.title}</p>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Orders ── */}
            {tab === 'orders' && (
                <div className="space-y-5">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>All Orders</h3>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 border rounded-xl px-4 py-2 bg-white" style={{ borderColor: 'var(--border)' }}>
                            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text" placeholder="Search order ID…"
                                value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                                className="text-sm outline-none bg-transparent" style={{ color: 'var(--text-primary)', width: '160px' }}
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={orderStatusFilter} onChange={e => setOrderStatusFilter(e.target.value)}
                                className="appearance-none border rounded-xl px-4 py-2 pr-9 text-sm bg-white outline-none"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                                <option value="">All Statuses</option>
                                {Object.entries(ORDER_STATUS).map(([val, { label }]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <span className="text-sm self-center" style={{ color: 'var(--text-muted)' }}>
                            {filteredOrders.length} orders
                        </span>
                    </div>

                    {/* Table */}
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                                        {['Order ID', 'Status', 'Total', 'Shipping', 'Date', 'Actions'].map(h => (
                                            <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingOrders ? (
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i}>
                                                {[...Array(6)].map((_, j) => (
                                                    <td key={j} className="px-5 py-4">
                                                        <div className="h-4 rounded bg-stone-100 animate-pulse" />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-5 py-12 text-center" style={{ color: 'var(--text-muted)' }}>
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : filteredOrders.map((order: any) => {
                                        const sc = ORDER_STATUS[order.status] ?? ORDER_STATUS.pending;
                                        return (
                                            <tr key={order.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                                                <td className="px-5 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                    #{order.id.slice(0, 8).toUpperCase()}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className={`badge ${sc.cls}`}>{sc.label}</span>
                                                </td>
                                                <td className="px-5 py-3 font-bold" style={{ color: 'var(--rose)' }}>
                                                    ${order.total?.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-3" style={{ color: 'var(--text-secondary)' }}>
                                                    ${order.shipping_fee?.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-3" style={{ color: 'var(--text-muted)' }}>
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button className="text-xs font-bold hover:underline" style={{ color: 'var(--rose)' }}>
                                                        View →
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Sellers ── */}
            {tab === 'sellers' && (
                <div className="space-y-5">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Artisan Sellers</h3>
                    {loadingSellers ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => <div key={i} className="card h-24 animate-pulse" />)}
                        </div>
                    ) : sellers.length === 0 ? (
                        <div className="card p-12 text-center">
                            <p className="text-4xl mb-3">🏪</p>
                            <p className="font-bold">No sellers yet</p>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Sellers will appear here once they register.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sellers.map((seller: any) => (
                                <div key={seller.id} className="card p-5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                                            style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
                                            {seller.shop_name?.[0]?.toUpperCase() ?? 'S'}
                                        </div>
                                        <div>
                                            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{seller.shop_name ?? 'Unnamed Shop'}</p>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>ID: {seller.id.slice(0, 8)}</p>
                                        </div>
                                    </div>
                                    <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Verify
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── Categories ── */}
            {tab === 'categories' && (
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Category Management</h3>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {ALL_CATEGORIES.length} categories defined in the system
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ALL_CATEGORIES.map(cat => (
                            <div key={cat.key} className="card p-5 flex items-start justify-between gap-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'var(--bg)' }}>
                                        {cat.emoji}
                                    </div>
                                    <div>
                                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{cat.label}</p>
                                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.description}</p>
                                        <code className="text-[10px] mt-1 inline-block px-2 py-0.5 rounded" style={{ background: 'var(--bg)', color: 'var(--text-secondary)' }}>
                                            key: {cat.key}
                                        </code>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 flex-shrink-0">
                                    <button className="text-xs btn-secondary py-1.5 px-3">Edit</button>
                                    <span className="badge badge-green text-center">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card p-5 border-dashed border-2 text-center" style={{ borderColor: 'var(--border)' }}>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                            + Add new category by updating the backend <code>ProductCategory</code> enum and deploying
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
