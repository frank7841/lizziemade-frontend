'use client';

import { useParams } from 'next/navigation';
import { useGetProductQuery } from '@/store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { useState } from 'react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductQuery(id as string);
    const dispatch = useDispatch();
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart({
            id: Math.random().toString(36).substring(7),
            product_id: product.id,
            title: product.title,
            price: product.price,
            quantity: selectedQuantity,
            image: '', // placeholder
        }));
        alert('Added to cart!');
    };

    if (isLoading) return <div className="container mx-auto px-4 py-40 text-center animate-pulse italic text-stone-500">Wait a moment while we unravel the details...</div>;
    if (!product) return <div className="container mx-auto px-4 py-40 text-center font-playfair">This piece seems to have lost its way.</div>;

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Images */}
                <div className="space-y-6">
                    <div className="aspect-square bg-stone-100 rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center text-stone-300 italic text-lg p-20 text-center">
                        [High Res Main Image for {product.title}]
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center text-[10px] text-stone-300 italic">Thumbnail</div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] tracking-widest uppercase font-bold rounded-full">
                            {product.category}
                        </span>
                        <h1 className="text-5xl font-playfair font-bold text-stone-900">{product.title}</h1>
                        <p className="text-3xl font-playfair text-rose-600">${product.price}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-stone-900">About this creation</h3>
                        <p className="text-stone-600 leading-relaxed max-w-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-stone-100">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                    className="px-4 py-2 hover:bg-stone-50 transition"
                                >-</button>
                                <span className="px-6 py-2 font-bold w-16 text-center">{selectedQuantity}</span>
                                <button
                                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                                    className="px-4 py-2 hover:bg-stone-50 transition"
                                >+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 px-8 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition shadow-xl"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {product.is_customizable && (
                            <a href={`/custom-orders?product_id=${product.id}`} className="block w-full text-center px-8 py-4 bg-white text-stone-900 border border-stone-200 font-bold rounded-2xl hover:border-rose-300 transition">
                                Request Custom Version
                            </a>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-10">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-xl">🚚</div>
                            <div className="text-xs">
                                <p className="font-bold">Fast Shipping</p>
                                <p className="text-stone-500">Ships in 3-5 days</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-xl">🧶</div>
                            <div className="text-xs">
                                <p className="font-bold">Organic Cotton</p>
                                <p className="text-stone-500">Premium quality</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
