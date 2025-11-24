// "use client";
import { FaBook, FaShippingFast, FaGift, FaHeadset, FaStar, FaTags } from "react-icons/fa";

export default function Service() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-slate-200">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-20 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-slate-300 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            At BookHub, we offer a wide range of services to make your reading journey
            enjoyable, convenient, and memorable. From exclusive book collections to
            fast delivery and personalized support — we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Service 1 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-teal-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-teal-500 text-white p-4 rounded-full">
                <FaBook size={28} />
              </div>
              <h3 className="text-2xl font-bold">Curated Book Collections</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Explore our hand-picked selection of books across genres. We curate
              only the best reads so that you find exactly what you love.
            </p>
          </div>

          {/* Service 2 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-purple-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500 text-white p-4 rounded-full">
                <FaShippingFast size={28} />
              </div>
              <h3 className="text-2xl font-bold">Fast Delivery</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Receive your books quickly and safely with our premium shipping
              services. Track your order anytime.
            </p>
          </div>

          {/* Service 3 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-amber-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-amber-500 text-white p-4 rounded-full">
                <FaGift size={28} />
              </div>
              <h3 className="text-2xl font-bold">Gift & Personalized Packs</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Send books as gifts with our beautifully wrapped and personalized
              packages. Perfect for friends and family.
            </p>
          </div>

          {/* Service 4 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-indigo-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-500 text-white p-4 rounded-full">
                <FaHeadset size={28} />
              </div>
              <h3 className="text-2xl font-bold">24/7 Customer Support</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Our team is always ready to help you with orders, recommendations, or
              any book-related inquiries, anytime.
            </p>
          </div>

          {/* Service 5 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-teal-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-teal-500 text-white p-4 rounded-full">
                <FaStar size={28} />
              </div>
              <h3 className="text-2xl font-bold">Top Rated Books</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              We provide access to the highest rated books in every category,
              ensuring you enjoy quality reads every time.
            </p>
          </div>

          {/* Service 6 */}
          <div className="p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 hover:border-purple-400 transition shadow-lg hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500 text-white p-4 rounded-full">
                <FaTags size={28} />
              </div>
              <h3 className="text-2xl font-bold">Special Discounts</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Enjoy exclusive offers and discounts on your favorite books. Save
              more while reading more.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
