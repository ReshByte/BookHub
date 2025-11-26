"use client";

import { useAuth } from "@/Provider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={`px-3 py-2 rounded transition font-medium ${
            pathname === "/"
              ? "bg-pink-100 text-pink-600"
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
          }`}
        >
          Home
        </Link>
      </li>

      {user && (
        <li>
          <Link
            href="/allbooks"
            className={`px-3 py-2 rounded transition font-medium ${
              pathname === "/allbooks"
                ? "bg-pink-100 text-pink-600"
                : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
            }`}
          >
            All Books
          </Link>
        </li>
      )}

      <li>
        <Link
          href="/about"
          className={`px-3 py-2 rounded transition font-medium ${
            pathname === "/about"
              ? "bg-pink-100 text-pink-600"
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
          }`}
        >
          About
        </Link>
      </li>

      <li>
        <Link
          href="/service"
          className={`px-3 py-2 rounded transition font-medium ${
            pathname === "/service"
              ? "bg-pink-100 text-pink-600"
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
          }`}
        >
          Service
        </Link>
      </li>

      <li>
        <Link
          href="/contact"
          className={`px-3 py-2 rounded transition font-medium ${
            pathname === "/contact"
              ? "bg-pink-100 text-pink-600"
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
          }`}
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white shadow-md">
      
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content mt-3 w-52 p-3 rounded-xl bg-white shadow-lg space-y-2"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <span className="text-2xl font-bold tracking-wide text-pink-500">
          ReadRiot
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 font-medium">
          {links}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-gray-300">
                <img
                  alt="User photo"
                  src={user?.photoURL || "/default-avatar.png"}
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-white rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="flex flex-col items-center justify-center border-b border-gray-200 mb-1 pb-1">
                  <h1 className="text-gray-700 font-semibold">{user.displayName}</h1>
                  <h1 className="text-gray-500 text-sm">{user.email}</h1>
                </div>
              </li>

              <li>
                <Link href={"/addbooks"} className="text-gray-700 hover:text-pink-500">
                  Add Book
                </Link>
              </li>
              <li>
                <Link href={"/managebooks"} className="text-gray-700 hover:text-pink-500">
                  Manage Book
                </Link>
              </li>

              <li>
                <button
                  onClick={logout}
                  className="w-full text-left text-gray-700 hover:text-pink-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="font-medium btn bg-pink-100 hover:bg-pink-200 text-pink-600 border-none"
          >
            {loading ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              "Login"
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
