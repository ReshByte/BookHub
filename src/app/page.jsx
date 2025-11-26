"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaStar, FaBookOpen } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/Provider/AuthProvider";
import { motion } from "framer-motion";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosBase.get("/books");
        const latestBooks = res.data.reverse().slice(0, 9);
        setBooks(latestBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [axiosBase]);

  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-pink-300 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Discover Your Next <br />
            <span className="text-pink-500">Great Adventure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Explore our friendly collection of books. Filter by category or search for your favorite titles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/allbooks">
              <button className="btn btn-lg bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8 shadow-md">
                Explore Books
              </button>
            </Link>
            {user ? (
              <Link href="/addbooks">
                <button className="btn btn-lg btn-outline border-gray-400 text-gray-900 rounded-full px-8">
                  Add Book
                </button>
              </Link>
            ) : (
              <Link href="/register">
                <button className="btn btn-lg btn-outline border-gray-400 text-gray-900 rounded-full px-8">
                  Join Community
                </button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Fresh <span className="text-purple-500">Arrivals</span>
            </h2>
            <p className="text-gray-600">
              Check out the latest additions to our library.
            </p>
          </div>
          <Link
            href="/allbooks"
            className="hidden md:flex items-center gap-2 text-purple-500 hover:text-purple-400 font-medium transition-colors group"
          >
            View All Books <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div
                key={book._id}
                variants={item}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
                    {book.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2 text-purple-500 text-sm">
                    <FaStar /> <span className="text-gray-700 ml-1">{book.rating || 4.5}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-500 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">by {book.authorName}</p>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                    <span className="text-lg font-bold text-gray-900">${book.price}</span>
                    <Link href={`/allbooks/${book._id}`}>
                      <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-500 transition-colors">
                        <FaBookOpen /> Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Popular <span className="text-pink-500">Categories</span>
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {["Fantasy", "History", "Sci-Fi", "Mystery", "Self-Help", "Programming"].map((cat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-white border border-gray-200 p-6 rounded-2xl text-center cursor-pointer hover:border-pink-300 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <p className="text-lg font-semibold text-gray-900">{cat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Readers <span className="text-purple-500">Love BookHub</span>
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            We bring knowledge, stories, and imagination to your fingertips—curated with care for every reader.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.div
              variants={item}
              className="bg-pink-50 p-8 rounded-2xl border border-pink-100 shadow hover:shadow-lg transition"
            >
              <div className="text-pink-500 text-4xl mb-4">📚</div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">Massive Collection</h3>
              <p className="text-gray-600 text-sm">Thousands of books across all genres available at your fingertips.</p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-purple-50 p-8 rounded-2xl border border-purple-100 shadow hover:shadow-lg transition"
            >
              <div className="text-purple-500 text-4xl mb-4">⚡</div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">Fast & Smooth</h3>
              <p className="text-gray-600 text-sm">Lightning-fast search, quick browsing, and seamless reading experience.</p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow hover:shadow-lg transition"
            >
              <div className="text-blue-500 text-4xl mb-4">🎨</div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">Beautiful UI</h3>
              <p className="text-gray-600 text-sm">Modern, aesthetic, and distraction-free reading layout for comfort.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to get the latest book updates and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-white border-gray-300 text-gray-900 w-full focus:border-pink-400"
            />
            <button className="btn bg-pink-400 hover:bg-pink-500 text-white border-none">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
