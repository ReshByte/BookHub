"use client";
import React from "react";
import { FaUserFriends, FaQuoteLeft, FaGlobeAsia, FaRegClock, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-rose-50 via-purple-50 to-blue-50 text-slate-700">
      
      {/* Pastel Background Blobs */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute top-10 left-20 w-72 h-72 bg-rose-300 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-blue-300 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-300 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Section Image */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div
              variants={item}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-rose-200"
            >
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
                alt="Library"
                className="w-full h-[420px] object-cover"
              />
            </motion.div>

            {/* Quote Box */}
            <motion.div
              variants={item}
              className="absolute -bottom-12 -right-6 bg-white/80 backdrop-blur-xl border border-rose-200 shadow-xl rounded-xl p-5 hidden md:block"
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-200 text-blue-600 p-2 rounded-full">
                  <FaQuoteLeft size={20} />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold text-sm leading-snug">
                    Books are the mirrors of the soul. They let us wander into worlds unknown.
                  </p>
                  <p className="text-slate-500 text-xs mt-1">— Virginia Woolf</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Dots */}
            <motion.div variants={item} className="absolute -top-10 -left-10 opacity-40">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <defs>
                  <pattern
                    id="dotPattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="3" cy="3" r="3" fill="#fda4af" />
                  </pattern>
                </defs>
                <rect width="120" height="120" fill="url(#dotPattern)" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Right Text Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="w-full lg:w-1/2 space-y-7"
          >
            <motion.span
              variants={item}
              className="px-4 py-2 text-sm font-bold rounded-full border border-rose-400 text-rose-600 w-fit bg-rose-100"
            >
              About ReadRiot
            </motion.span>

            <motion.h2
              variants={item}
              className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-800"
            >
              A Peaceful Place for  
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500">
                {" "}Beautiful Stories
              </span>
            </motion.h2>

            <motion.p variants={item} className="text-lg text-slate-600 leading-relaxed">
              BookHub is a cozy digital sanctuary for readers, dreamers, and thinkers.  
              Created in 2024, our purpose is simple — help people discover stories that 
              inspire, comfort, and ignite the imagination.
            </motion.p>

            <motion.p variants={item} className="text-slate-500 leading-relaxed">
              Every book we curate is chosen with love. We believe reading should feel warm, 
              magical, and deeply personal.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-rose-200 hover:border-rose-500 transition-all duration-200">
                <FaGlobeAsia size={32} className="text-rose-500" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">Global Reach</h4>
                  <p className="text-slate-500 text-sm">Readers worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-blue-200 hover:border-blue-500 transition-all duration-200">
                <FaRegClock size={32} className="text-blue-500" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">Fast Delivery</h4>
                  <p className="text-slate-500 text-sm">Quick & dependable</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-purple-200 hover:border-purple-500 transition-all duration-200">
                <FaLeaf size={32} className="text-purple-500" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">Eco–Friendly</h4>
                  <p className="text-slate-500 text-sm">Sustainable packaging</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-rose-200 hover:border-rose-500 transition-all duration-200">
                <FaUserFriends size={32} className="text-rose-400" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">Community</h4>
                  <p className="text-slate-500 text-sm">5k+ active readers</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-rose-500">12k+</h3>
                <p className="text-slate-500 text-sm">Books Sold</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-blue-500">7k+</h3>
                <p className="text-slate-500 text-sm">Happy Readers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-purple-500">4.9</h3>
                <p className="text-slate-500 text-sm">User Rating</p>
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              variants={item}
              className="btn bg-gradient-to-r from-rose-400 to-blue-400 border-none text-white mt-8 px-10 py-3 text-lg rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Discover Our Books
            </motion.button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
