"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-slate-300 py-16">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">BookHub</h3>
            <p className="text-slate-300 leading-relaxed">
              Your one-stop online bookstore. Discover, read, and share the joy of books.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-teal-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-400 transition">About</Link></li>
              <li><Link href="/service" className="hover:text-teal-400 transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-500 transition"><FaFacebookF /></a>
              <a href="#" className="p-3 bg-teal-600 rounded-full text-white hover:bg-teal-500 transition"><FaTwitter /></a>
              <a href="#" className="p-3 bg-pink-500 rounded-full text-white hover:bg-pink-400 transition"><FaInstagram /></a>
              <a href="#" className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/10 pt-6 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} BookHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
