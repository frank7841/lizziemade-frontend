'use client';

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCart } from "@/store/slices/cartSlice";
import { ShoppingBag, Menu, User, Search } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-inter`}>
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <CartDrawer />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-3xl font-playfair font-bold text-stone-900 hover:text-rose-600 transition">
              LizzieMade<span className="text-rose-600">.</span>
            </a>
            <nav className="hidden lg:flex gap-8 font-bold text-sm tracking-wide uppercase">
              <a href="/shop" className="hover:text-rose-600 transition">Shop</a>
              <a href="/custom-orders" className="hover:text-rose-600 transition">Custom Orders</a>
              <a href="/sellers" className="hover:text-rose-600 transition">Artisans</a>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition">
              <Search className="w-4 h-4" />
              <span className="text-xs font-bold">Search magic...</span>
            </button>

            <div className="flex items-center gap-2">
              <a href="/auth/login" className="p-3 hover:bg-rose-50 text-stone-900 hover:text-rose-600 rounded-full transition relative group">
                <User className="w-6 h-6" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Account</span>
              </a>

              <button
                onClick={() => dispatch(toggleCart())}
                className="p-3 hover:bg-rose-50 text-stone-900 hover:text-rose-600 rounded-full transition relative group"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Basket</span>
              </button>

              <button className="lg:hidden p-3 hover:bg-stone-50 rounded-full transition">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-playfair font-bold text-white mb-4">LizzieMade</div>
            <p className="text-sm">Connecting lovers of handmade crochet with artisans worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop/clothing" className="hover:text-white">Clothing</a></li>
              <li><a href="/shop/amigurumi" className="hover:text-white">Amigurumi</a></li>
              <li><a href="/shop/home" className="hover:text-white">Home Decor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Join Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/sellers/register" className="hover:text-white">Start Selling</a></li>
              <li><a href="/affiliate" className="hover:text-white">Affiliate Program</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          &copy; {new Date().getFullYear()} LizzieMade. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
