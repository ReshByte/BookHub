"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaFilter, FaStar, FaBookOpen } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const axiosBase = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosBase.get("/books");
        setBooks(res.data);
        setDisplayBooks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [axiosBase]);

  useEffect(() => {
    let result = books;

    if (category !== "All") result = result.filter((book) => book.category === category);

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((book) => {
        const title = book.title?.toLowerCase() || "";
        const author = book.authorName?.toLowerCase() || "";
        return title.includes(lower) || author.includes(lower);
      });
    }

    setDisplayBooks(result);
  }, [searchTerm, category, books]);

  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 text-slate-700 pb-20">

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200 border-b border-slate-200 pt-24 pb-14 px-6 text-center shadow-sm">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3"
        >
          Explore Our <span className="text-rose-600">Library</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto"
        >
          Browse through a curated collection of wonderful books. Search or filter to discover your next favorite read.
        </motion.p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 bg-white border-slate-300 text-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 placeholder-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute left-3 top-3.5 text-rose-500 pointer-events-none">
              <FaFilter />
            </div>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full pl-10 bg-white border-slate-300 text-slate-700 focus:border-rose-500"
            >
              <option value="All">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Sci-Fi">Sci-Fi & Fantasy</option>
              <option value="Mystery">Mystery & Thriller</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Programming">Programming</option>
              <option value="History">History</option>
            </select>
          </div>

        </motion.div>

        {/* Books Section */}
        <div className="mt-14">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-white/60 rounded-xl animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : displayBooks.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayBooks.map((book) => (
                <motion.div 
                  key={book._id} 
                  variants={item}
                  className="group bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {/* Book Image */}
                  <figure className="relative h-60 rounded-t-2xl overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs text-rose-600 font-bold border border-rose-200 shadow">
                      {book.category}
                    </div>
                  </figure>

                  {/* Card Body */}
                  <div className="p-5">

                    {/* Rating + Price */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1 text-rose-500 text-sm font-semibold">
                        <FaStar /> {book.rating || "4.5"}
                      </div>
                      <div className="text-rose-600 font-bold">${book.price}</div>
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-slate-800 text-lg truncate group-hover:text-rose-600 transition">
                      {book.title}
                    </h2>

                    {/* Author */}
                    <p className="text-slate-500 text-sm mt-1 truncate">by {book.authorName}</p>

                    {/* Button */}
                    <Link href={`/allbooks/${book._id}`} className="block mt-4">
                      <button className="btn btn-sm w-full border-rose-300 text-rose-600 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <FaBookOpen /> View Details
                      </button>
                    </Link>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-slate-800">No Books Found</h3>
              <p className="text-slate-500 mt-2">
                Nothing found for "{searchTerm}" in "{category}".
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setCategory("All");}} 
                className="btn btn-link text-rose-500 mt-4"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
