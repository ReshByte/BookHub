"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 text-slate-700 py-16 overflow-hidden">

      {/* Soft Pastel Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-300 rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-300 rounded-full blur-[200px] opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">ReadRiot</h3>
            <p className="text-slate-600 leading-relaxed">
              Your one-stop online bookstore. Discover, read, and explore worlds beyond imagination.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-rose-500 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-rose-500 transition">About</Link></li>
              <li><Link href="/service" className="hover:text-rose-500 transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-rose-500 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-3 bg-rose-400 rounded-full text-white shadow-md hover:bg-rose-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="p-3 bg-blue-400 rounded-full text-white shadow-md hover:bg-blue-500 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="p-3 bg-pink-400 rounded-full text-white shadow-md hover:bg-pink-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="p-3 bg-purple-400 rounded-full text-white shadow-md hover:bg-purple-500 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-slate-300/40 pt-6 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} ReadRiot. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
