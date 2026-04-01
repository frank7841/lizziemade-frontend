'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
    const { items, isOpen } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => dispatch(toggleCart())}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-rose-600" />
                        <h2 className="text-xl font-playfair font-bold">Your Basket</h2>
                    </div>
                    <button
                        onClick={() => dispatch(toggleCart())}
                        className="p-2 hover:bg-stone-50 rounded-full transition"
                    >
                        <X className="w-6 h-6 text-stone-400" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-8">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-3xl opacity-50">🧶</div>
                            <p className="text-stone-500 font-playfair italic">Your basket is empty...</p>
                            <button
                                onClick={() => dispatch(toggleCart())}
                                className="text-rose-600 font-bold hover:underline"
                            >
                                Go find some magic
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-20 h-20 bg-stone-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-stone-300 text-xs italic">
                                    [Img]
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-stone-900 truncate">{item.title}</h3>
                                        <p className="font-playfair font-bold text-rose-600">${item.price}</p>
                                    </div>
                                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Handmade Artisan Piece</p>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-stone-100 rounded-lg scale-90 -ml-2">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ product_id: item.product_id, variant_id: item.variant_id, quantity: Math.max(1, item.quantity - 1) }))}
                                                className="px-2 py-1 hover:bg-stone-50"
                                            >-</button>
                                            <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ product_id: item.product_id, variant_id: item.variant_id, quantity: item.quantity + 1 }))}
                                                className="px-2 py-1 hover:bg-stone-50"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => dispatch(removeFromCart({ product_id: item.product_id, variant_id: item.variant_id }))}
                                            className="text-stone-300 hover:text-rose-600 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-6">
                        <div className="flex justify-between items-end">
                            <span className="text-stone-500 text-sm">Subtotal</span>
                            <span className="text-2xl font-playfair font-bold text-stone-900">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition shadow-xl overflow-hidden relative group">
                            <span className="relative z-10">Proceed to Checkout</span>
                            <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest">
                            Shipping & taxes calculated at next step
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
