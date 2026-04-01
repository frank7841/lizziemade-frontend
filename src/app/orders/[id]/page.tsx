'use client';

import { useParams } from 'next/navigation';
import { useGetOrderQuery, useGetShipmentQuery } from '@/store/api/apiSlice';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: order, isLoading: orderLoading } = useGetOrderQuery(id as string);
    const { data: shipment, isLoading: shipmentLoading } = useGetShipmentQuery(id as string);

    if (orderLoading) return <div className="container mx-auto px-4 py-40 text-center animate-pulse italic text-stone-500">Unpacking order details...</div>;

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <div className="flex items-center gap-3 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <a href="/dashboard" className="hover:text-rose-600">Dashboard</a>
                        <span>/</span>
                        <span className="text-stone-900">Order #{id?.slice(0, 8)}</span>
                    </div>
                    <h1 className="text-4xl font-playfair font-bold text-stone-900">Order Tracking</h1>
                </div>
                <div className="px-6 py-2 bg-green-50 text-green-600 rounded-full text-sm font-bold border border-green-100">
                    Status: {order?.status || 'Processing'}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Tracking Timeline */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Truck className="w-40 h-40" />
                        </div>

                        <h3 className="text-xl font-playfair font-bold mb-10 relative z-10">Live Updates</h3>

                        <div className="space-y-12 relative z-10">
                            {(shipment?.events || [
                                { status: 'shipped', description: 'Package is on its way', location: 'Nairobi Hub', timestamp: new Date().toISOString() },
                                { status: 'processing', description: 'Order confirmed and being prepared', location: 'Artisan Workshop', timestamp: new Date(Date.now() - 86400000).toISOString() },
                                { status: 'ordered', description: 'Payment successful', location: 'System', timestamp: new Date(Date.now() - 172800000).toISOString() },
                            ]).map((event: { status: string; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; timestamp: string | number | Date; }, idx: number) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${idx === 0 ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-stone-200 text-stone-300'}`}>
                                            {idx === 0 ? <Truck className="w-4 h-4" /> : <div className="w-2 h-2 bg-current rounded-full" />}
                                        </div>
                                        {idx < 2 && <div className="w-0.5 flex-grow bg-stone-100 my-2"></div>}
                                    </div>
                                    <div className="pb-4">
                                        <p className={`font-bold ${idx === 0 ? 'text-stone-900' : 'text-stone-400'}`}>{event.status.toUpperCase()}</p>
                                        <p className="text-stone-500 text-sm mt-1">{event.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                            <span>•</span>
                                            <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-stone-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-6">
                        <h3 className="text-lg font-playfair font-bold border-b border-stone-800 pb-4">Shipping To</h3>
                        <div className="space-y-2 text-sm text-stone-400">
                            <p className="font-bold text-white">Jane Doe</p>
                            <p>123 Kilimanjaro Ave</p>
                            <p>Nairobi, Kenya</p>
                            <p>+254 712 345 678</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-xl space-y-6">
                        <h3 className="text-lg font-playfair font-bold border-b border-stone-100 pb-4">Items</h3>
                        <div className="space-y-4">
                            {[1].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-stone-50 rounded-xl flex-shrink-0"></div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-xs font-bold text-stone-900 truncate">Pastel Dream Baby Blanket</p>
                                        <p className="text-[10px] text-stone-500">Qty: 1 • $85.00</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Total Paid</span>
                            <span className="text-xl font-playfair font-bold text-stone-900">$85.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
