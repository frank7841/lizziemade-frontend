'use client';

import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '@/store/api/apiSlice';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, Tag, ChevronDown } from 'lucide-react';

const CATEGORIES = [
    { value: '', label: 'All Items' },
    { value: 'amigurumi', label: 'Amigurumi 🧸' },
    { value: 'clothing', label: 'Clothing 👗' },
    { value: 'accessories', label: 'Accessories 💎' },
    { value: 'home_decor', label: 'Home Decor 🏡' },
    { value: 'bags', label: 'Bags 👜' },
    { value: 'baby_items', label: 'Baby Items 🍼' },
    { value: 'patterns', label: 'Patterns 📄' },
    { value: 'other', label: 'Other ✨' },
];

const SORT_OPTIONS = [
    { value: '', label: 'Most Recent' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    green: { label: 'In Stock', cls: 'badge-green' },
    amber: { label: 'Low Stock', cls: 'badge-amber' },
};

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isCustomizable, setIsCustomizable] = useState<boolean | undefined>(undefined);
    const [sort, setSort] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const params: Record<string, any> = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (category) params.category = category;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (isCustomizable !== undefined) params.is_customizable = isCustomizable;

    const { data: products, isLoading, isFetching } = useGetProductsQuery(params);

    const clearFilters = () => {
        setSearch(''); setCategory(''); setMinPrice('');
        setMaxPrice(''); setIsCustomizable(undefined); setSort('');
    };

    const hasFilters = search || category || minPrice || maxPrice || isCustomizable !== undefined;

    const sorted = [...(products ?? [])].sort((a, b) => {
        if (sort === 'price_asc') return a.price - b.price;
        if (sort === 'price_desc') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        return 0;
    });

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            {/* Page Header */}
            <section className="bg-white border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="container mx-auto px-4 py-10">
                    <h1 className="text-4xl font-playfair font-bold" style={{ color: 'var(--text-primary)' }}>
                        The Collection
                    </h1>
                    <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Handcrafted with love by artisans around the world
                    </p>

                    {/* Search bar */}
                    <div className="mt-6 flex gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-white border rounded-xl px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search for crochet magic..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-sm outline-none"
                                style={{ color: 'var(--text-primary)' }}
                            />
                            {search && (
                                <button onClick={() => setSearch('')}>
                                    <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition"
                            style={{
                                background: showFilters ? 'var(--rose)' : 'var(--surface)',
                                color: showFilters ? '#fff' : 'var(--text-primary)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {hasFilters && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />}
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Filter Panel */}
                {showFilters && (
                    <div className="card p-6 mb-8 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="w-full appearance-none border rounded-xl px-4 py-3 pr-10 text-sm bg-white outline-none"
                                        style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                    >
                                        {CATEGORIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                                    Min Price ($)
                                </label>
                                <input
                                    type="number" min="0" placeholder="0"
                                    value={minPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                                    Max Price ($)
                                </label>
                                <input
                                    type="number" min="0" placeholder="Any"
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                />
                            </div>

                            {/* Customizable */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                                    Type
                                </label>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { val: undefined, label: 'All Products' },
                                        { val: true, label: 'Customizable Only' },
                                        { val: false, label: 'Ready-made Only' },
                                    ].map(opt => (
                                        <button
                                            key={String(opt.val)}
                                            onClick={() => setIsCustomizable(opt.val)}
                                            className="text-left text-sm px-4 py-2 rounded-lg transition"
                                            style={{
                                                background: isCustomizable === opt.val ? 'var(--rose-light)' : 'transparent',
                                                color: isCustomizable === opt.val ? 'var(--rose)' : 'var(--text-secondary)',
                                                fontWeight: isCustomizable === opt.val ? '700' : '400',
                                            }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {hasFilters && (
                            <button onClick={clearFilters} className="mt-4 flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--rose)' }}>
                                <X className="w-3.5 h-3.5" /> Clear all filters
                            </button>
                        )}
                    </div>
                )}

                {/* Category Pills */}
                <div className="flex gap-3 overflow-x-auto pb-2 mb-8 no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition flex-shrink-0"
                            style={{
                                background: category === cat.value ? 'var(--rose)' : 'var(--surface)',
                                color: category === cat.value ? '#fff' : 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results bar */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {isFetching ? 'Searching...' : `${sorted.length} items found`}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Sort:</span>
                        <div className="relative">
                            <select
                                value={sort} onChange={e => setSort(e.target.value)}
                                className="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm bg-white outline-none"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                                {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card overflow-hidden animate-pulse">
                                <div className="aspect-square bg-stone-100" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-stone-100 rounded w-3/4" />
                                    <div className="h-3 bg-stone-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : sorted.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl mb-4">🧶</div>
                        <h3 className="text-xl font-playfair font-bold mb-2">No items found</h3>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                        <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sorted.map((product: any) => (
                            <Link
                                href={`/shop/${product.id}`}
                                key={product.id}
                                className="card overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                            >
                                <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--bg)' }}>
                                    {product.images?.[0]?.url ? (
                                        <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl">🧶</div>
                                    )}
                                    {product.is_customizable && (
                                        <span className="absolute top-3 left-3 badge badge-rose">Customizable</span>
                                    )}
                                    {product.is_digital && (
                                        <span className="absolute top-3 right-3 badge badge-blue">Digital</span>
                                    )}
                                    {product.category === 'patterns' && product.difficulty_level && (
                                        <span className="absolute bottom-3 left-3 badge badge-stone capitalize">{product.difficulty_level}</span>
                                    )}
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-sm leading-snug group-hover:text-rose-600 transition" style={{ color: 'var(--text-primary)' }}>
                                            {product.title}
                                        </h3>
                                        <span className="font-playfair font-bold text-base whitespace-nowrap" style={{ color: 'var(--rose)' }}>
                                            ${product.price}
                                        </span>
                                    </div>
                                    <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                                        {product.description}
                                    </p>
                                    {product.rating > 0 && (
                                        <div className="flex items-center gap-1">
                                            <span className="text-amber-400 text-xs">★</span>
                                            <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({product.review_count})</span>
                                        </div>
                                    )}
                                    {product.materials?.length > 0 && (
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <Tag className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                                            {product.materials.slice(0, 2).map((m: string) => (
                                                <span key={m} className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>{m}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
