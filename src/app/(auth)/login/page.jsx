"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithGoogle, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace(redirectPath);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace(redirectPath);
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      {/* Card container */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image */}
        <div
          className="hidden md:block relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/50 to-transparent"></div>
          <div className="absolute bottom-8 left-6 text-white z-10">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="mt-2 text-sm italic opacity-80">
              “Reading is essential for those who seek to rise above the ordinary.” – Jim Rohn
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h3>
          <p className="text-gray-500 mb-6">Access your digital library</p>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center text-black justify-center gap-2 w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2">OR</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-1 border border-gray-300 rounded-md p-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600 flex justify-between items-center">
                Password
                <Link href="#" className="text-pink-500 text-xs hover:underline">
                  Forgot?
                </Link>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="mt-1 border border-gray-300 rounded-md p-2 pr-10 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-400 hover:text-gray-700 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-semibold shadow"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-pink-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
