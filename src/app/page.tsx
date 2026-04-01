import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-stone-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-stone-900 leading-tight">
              Artisan Crafted <span className="text-rose-600">Crochet</span> Magic
            </h1>
            <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
              Discover a world of hand-knit wonders. From cozy wearables to whimsical amigurumi, find the perfect piece for your story.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/shop" className="px-8 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-stone-800 transition shadow-xl">
                Shop Collection
              </a>
              <a href="/custom-orders" className="px-8 py-4 bg-white text-stone-900 border border-stone-200 font-bold rounded-full hover:border-rose-300 transition shadow-sm">
                Request Custom Piece
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 transform transition hover:rotate-0 duration-500">
              <div className="w-full h-full bg-rose-200 flex items-center justify-center text-rose-500 font-playfair italic text-xl p-12 text-center border-8 border-white">
                [High Quality Crochet Hero Image Placeholder]
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl space-y-2 hidden lg:block">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e11d48" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p className="text-sm font-bold">"Absolutely stunning detail!"</p>
              <p className="text-xs text-stone-400">Sarah M., Verified Buyer</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -z-0 rounded-l-full blur-3xl"></div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-stone-900">Shop by Category</h2>
            <p className="text-stone-500">Curated collections just for you</p>
          </div>
          <a href="/categories" className="text-rose-600 font-bold border-b-2 border-rose-600 pb-1">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Amigurumi", color: "bg-blue-50", items: "120+ Items" },
            { name: "Clothing", color: "bg-amber-50", items: "85+ Items" },
            { name: "Patterns", color: "bg-orange-50", items: "50+ Digital" },
            { name: "Home Decor", color: "bg-teal-50", items: "45+ Items" },
            { name: "Accessories", color: "bg-purple-50", items: "150+ Items" },
          ].map((cat) => (
            <div key={cat.name} className={`${cat.color} p-8 rounded-3xl hover:shadow-lg transition cursor-pointer group`}>
              <div className="h-40 bg-white/50 mb-6 rounded-2xl flex items-center justify-center text-stone-300 group-hover:scale-105 transition">
                [Icon]
              </div>
              <h3 className="text-xl font-playfair font-bold text-stone-900">{cat.name}</h3>
              <p className="text-sm text-stone-500">{cat.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why LizzieMade */}
      <section className="bg-stone-900 text-white py-20 rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              ⭐
            </div>
            <h3 className="text-xl font-bold">100% Handmade</h3>
            <p className="text-stone-400 text-sm">Every stitch is made with love by skilled artisans around the globe.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              🧶
            </div>
            <h3 className="text-xl font-bold">Premium Materials</h3>
            <p className="text-stone-400 text-sm">We only use high-quality, ethically sourced yarns and materials.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              ✨
            </div>
            <h3 className="text-xl font-bold">Fully Customizable</h3>
            <p className="text-stone-400 text-sm">Can't find what you need? Request a custom order tailored to you.</p>
          </div>
        </div>
      </section>

      {/* Call to Action for Custom Orders */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-rose-50 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900">
              Can't Find Your Dream Piece?
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Our master artisans can bring your vision to life. Share your ideas, pick your colors, and get a one-of-a-kind creation delivered to your door.
            </p>
            <a href="/custom-orders" className="inline-block px-10 py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-rose-600 transition shadow-xl">
              Start Your Custom Order
            </a>
          </div>
          <div className="flex-1 relative">
            <div className="w-full aspect-video bg-white rounded-3xl shadow-inner flex items-center justify-center text-stone-300 italic">
              [Custom Order Process Illustration]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
