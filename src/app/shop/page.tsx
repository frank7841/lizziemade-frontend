'use client';

import { useGetProductsQuery } from '@/store/api/apiSlice';
import Link from 'next/link';

export default function ShopPage() {
    const { data: products, isLoading, isError } = useGetProductsQuery({});

    if (isLoading) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin"></div>
                <p className="text-stone-500 font-playfair italic">Gathering our finest crochet items...</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-playfair font-bold text-stone-900">The Collection</h1>
                    <p className="text-stone-500">Discover hand-stitched perfection</p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                    {['All', 'Amigurumi', 'Clothing', 'Accessories', 'Home Decor'].map((cat) => (
                        <button key={cat} className="px-6 py-2 rounded-full bg-stone-100 hover:bg-rose-100 hover:text-rose-600 transition whitespace-nowrap text-sm font-medium">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products?.map((product) => (
                    <Link href={`/shop/${product.id}`} key={product.id} className="group flex flex-col gap-4">
                        <div className="relative aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition duration-500">
                            <div className="w-full h-full flex items-center justify-center text-stone-300 italic p-8 text-center text-sm">
                                [Image: {product.title}]
                            </div>
                            <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                                <button className="p-3 bg-white rounded-full shadow-lg hover:bg-rose-600 hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                </button>
                            </div>
                            {product.is_customizable && (
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] uppercase font-bold tracking-widest rounded-full shadow-sm">Customizable</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-stone-900 group-hover:text-rose-600 transition">{product.title}</h3>
                                <span className="font-playfair font-bold text-rose-600">${product.price}</span>
                            </div>
                            <p className="text-sm text-stone-500 line-clamp-1">{product.description}</p>
                        </div>
                    </Link>
                ))}

                {/* Placeholder if none found */}
                {(!products || products.length === 0) && (
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="aspect-square bg-stone-50 rounded-3xl animate-pulse border border-stone-100 flex items-center justify-center">
                                <span className="text-stone-300 italic text-xs">Awaiting new arrivals</span>
                            </div>
                            <div className="h-4 w-2/3 bg-stone-50 rounded animate-pulse"></div>
                            <div className="h-4 w-1/4 bg-stone-50 rounded animate-pulse"></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
