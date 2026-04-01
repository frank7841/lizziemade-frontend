'use client';

import { useState } from 'react';
import {
    Package, Heart, MessageSquare, Star, Settings,
    ChevronRight, Clock, CheckCircle2, XCircle, Truck,
    ExternalLink, AlertCircle,
} from 'lucide-react';
import {
    useGetOrdersQuery,
    useGetMyCustomOrdersQuery,
    useCancelOrderMutation,
    useAcceptCustomOrderQuoteMutation,
} from '@/store/api/apiSlice';
import Link from 'next/link';

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
    pending: { label: 'Pending', cls: 'badge-amber', icon: Clock },
    paid: { label: 'Paid', cls: 'badge-blue', icon: CheckCircle2 },
    processing: { label: 'Processing', cls: 'badge-blue', icon: Clock },
    shipped: { label: 'Shipped', cls: 'badge-blue', icon: Truck },
    delivered: { label: 'Delivered', cls: 'badge-green', icon: CheckCircle2 },
    cancelled: { label: 'Cancelled', cls: 'badge-stone', icon: XCircle },
};

const CUSTOM_STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Awaiting Quote', cls: 'badge-amber' },
    quoted: { label: 'Quote Ready', cls: 'badge-blue' },
    accepted: { label: 'Accepted', cls: 'badge-green' },
    in_progress: { label: 'In Progress', cls: 'badge-blue' },
    completed: { label: 'Completed', cls: 'badge-green' },
    cancelled: { label: 'Cancelled', cls: 'badge-stone' },
    rejected: { label: 'Rejected', cls: 'badge-stone' },
};

function OrderCard({ order, onCancel }: { order: any; onCancel: (id: string) => void }) {
    const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
    const StatusIcon = cfg.icon;
    const date = new Date(order.created_at);

    return (
        <div className="card p-5 flex flex-col md:flex-row gap-5 items-start md:items-center animate-fadeIn">
            <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'var(--bg)' }}>
                📦
            </div>
            <div className="flex-grow space-y-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                        #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className={`badge ${cfg.cls} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                    </span>
                </div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    {order.notes ?? 'Standard Order'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                    <p className="text-lg font-playfair font-bold" style={{ color: 'var(--rose)' }}>
                        ${order.total?.toFixed(2) ?? '—'}
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        +${order.shipping_fee?.toFixed(2) ?? '0.00'} shipping
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href={`/orders/${order.id}`} className="btn-secondary py-2 px-3 text-xs">
                        <ExternalLink className="w-3 h-3" /> Details
                    </Link>
                    {order.status === 'pending' && (
                        <button
                            onClick={() => onCancel(order.id)}
                            className="py-2 px-3 rounded-lg text-xs font-bold transition"
                            style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function CustomOrderCard({ order, onAccept }: { order: any; onAccept: (id: string) => void }) {
    const cfg = CUSTOM_STATUS_CONFIG[order.status] ?? CUSTOM_STATUS_CONFIG.pending;

    return (
        <div className="card p-5 space-y-3 animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>{order.title}</h4>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{order.description}</p>
                </div>
                <span className={`badge ${cfg.cls} whitespace-nowrap`}>{cfg.label}</span>
            </div>
            {order.quoted_price && (
                <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Artisan Quote</p>
                        <p className="text-xl font-playfair font-bold" style={{ color: 'var(--rose)' }}>${order.quoted_price}</p>
                        {order.seller_notes && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{order.seller_notes}</p>}
                    </div>
                    {order.status === 'quoted' && (
                        <button onClick={() => onAccept(order.id)} className="btn-primary text-xs py-2 px-4">
                            Accept Quote
                        </button>
                    )}
                </div>
            )}
            {order.desired_deadline && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Desired by: {new Date(order.desired_deadline).toLocaleDateString()}
                </p>
            )}
        </div>
    );
}

const TABS = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'custom', label: 'Custom Requests', icon: MessageSquare },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState('orders');
    const [orderSearch, setOrderSearch] = useState('');

    const { data: orders = [], isLoading: loadingOrders, isError: errOrders } = useGetOrdersQuery();
    const { data: customOrders = [], isLoading: loadingCustom } = useGetMyCustomOrdersQuery();
    const [cancelOrder] = useCancelOrderMutation();
    const [acceptQuote] = useAcceptCustomOrderQuoteMutation();

    const filteredOrders = orders.filter(o =>
        orderSearch === '' || o.id.includes(orderSearch) || (o.notes ?? '').toLowerCase().includes(orderSearch.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full lg:w-72 space-y-4 flex-shrink-0">
                    {/* Profile card */}
                    <div className="card p-6 text-center space-y-4">
                        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold"
                            style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
                            J
                        </div>
                        <div>
                            <h2 className="font-playfair font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Jane Doe</h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Member since 2024</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                            <div className="text-center">
                                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{orders.length}</p>
                                <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Orders</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{customOrders.length}</p>
                                <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Custom</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>0</p>
                                <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Reviews</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="card p-3 space-y-1">
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition"
                                    style={{
                                        background: active ? 'var(--rose)' : 'transparent',
                                        color: active ? '#fff' : 'var(--text-secondary)',
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </span>
                                    {active && <ChevronRight className="w-4 h-4" />}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-grow min-w-0 space-y-6">

                    {/* ── My Orders ── */}
                    {activeTab === 'orders' && (
                        <>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-playfair font-bold" style={{ color: 'var(--text-primary)' }}>My Orders</h1>
                                <input
                                    type="text"
                                    placeholder="Search orders…"
                                    value={orderSearch}
                                    onChange={e => setOrderSearch(e.target.value)}
                                    className="border rounded-xl px-4 py-2 text-sm outline-none bg-white"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', width: '200px' }}
                                />
                            </div>

                            {loadingOrders ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="card h-24 animate-pulse" />)}
                                </div>
                            ) : errOrders ? (
                                <div className="card p-8 text-center">
                                    <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--rose)' }} />
                                    <p className="font-bold">Could not load orders</p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Please check your connection or log in again.</p>
                                </div>
                            ) : filteredOrders.length === 0 ? (
                                <div className="card p-12 text-center space-y-4">
                                    <div className="text-5xl">🛍️</div>
                                    <h3 className="font-playfair font-bold text-xl">No orders yet</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Time to treat yourself to some handmade magic!</p>
                                    <Link href="/shop" className="btn-primary inline-flex">Browse Collection</Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredOrders.map((order: any) => (
                                        <OrderCard key={order.id} order={order} onCancel={id => cancelOrder(id)} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Custom Requests ── */}
                    {activeTab === 'custom' && (
                        <>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-playfair font-bold" style={{ color: 'var(--text-primary)' }}>Custom Requests</h1>
                                <Link href="/custom-orders" className="btn-primary text-sm py-2">+ New Request</Link>
                            </div>

                            {loadingCustom ? (
                                <div className="space-y-4">{[1, 2].map(i => <div key={i} className="card h-32 animate-pulse" />)}</div>
                            ) : customOrders.length === 0 ? (
                                <div className="card p-12 text-center space-y-4">
                                    <div className="text-5xl">✨</div>
                                    <h3 className="font-playfair font-bold text-xl">No custom requests</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Have a dream piece in mind? Our artisans can make it!</p>
                                    <Link href="/custom-orders" className="btn-primary inline-flex">Start a Request</Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {customOrders.map((co: any) => (
                                        <CustomOrderCard key={co.id} order={co} onAccept={id => acceptQuote(id)} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Wishlist placeholder ── */}
                    {activeTab === 'wishlist' && (
                        <div className="card p-12 text-center space-y-4">
                            <div className="text-5xl">💖</div>
                            <h3 className="font-playfair font-bold text-xl">Your wishlist is empty</h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Save items you love by tapping the heart icon.</p>
                            <Link href="/shop" className="btn-primary inline-flex">Explore Shop</Link>
                        </div>
                    )}

                    {/* ── Reviews placeholder ── */}
                    {activeTab === 'reviews' && (
                        <div className="card p-12 text-center space-y-4">
                            <div className="text-5xl">⭐</div>
                            <h3 className="font-playfair font-bold text-xl">No reviews yet</h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>After receiving an order, share your thoughts with the community.</p>
                        </div>
                    )}

                    {/* ── Settings placeholder ── */}
                    {activeTab === 'settings' && (
                        <div className="card p-8 space-y-6">
                            <h1 className="text-2xl font-playfair font-bold" style={{ color: 'var(--text-primary)' }}>Account Settings</h1>
                            <div className="space-y-4">
                                {['Full Name', 'Email', 'Phone Number', 'Shipping Address'].map(field => (
                                    <div key={field}>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{field}</label>
                                        <input type="text" placeholder={`Enter ${field.toLowerCase()}…`}
                                            className="w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        />
                                    </div>
                                ))}
                                <button className="btn-primary">Save Changes</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
