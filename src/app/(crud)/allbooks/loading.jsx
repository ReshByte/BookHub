import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      {/* Animated Ring */}
      <motion.div
        className="w-16 h-16 border-4 border-rose-300 border-t-rose-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-4 text-rose-600 font-semibold text-lg"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
