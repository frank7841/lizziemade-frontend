import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    product_id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    variant_id?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.product_id === action.payload.product_id && item.variant_id === action.payload.variant_id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<{ product_id: string; variant_id?: string }>) => {
            state.items = state.items.filter(item => !(item.product_id === action.payload.product_id && item.variant_id === action.payload.variant_id));
        },
        updateQuantity: (state, action: PayloadAction<{ product_id: string; variant_id?: string; quantity: number }>) => {
            const item = state.items.find(item => item.product_id === action.payload.product_id && item.variant_id === action.payload.variant_id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
