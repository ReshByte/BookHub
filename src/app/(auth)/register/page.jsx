"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageTab, setImageTab] = useState("upload");
  const { loginWithGoogle, register } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const imageFile = form.image?.files?.[0];
    const imageURL = form.imageURL?.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must contain 1 uppercase, 1 lowercase, 1 number, and 6+ characters.");
      setLoading(false);
      return;
    }

    let photoURL = "";

    if (imageTab === "upload") {
      if (!imageFile) {
        toast.error("Please upload a profile picture.");
        setLoading(false);
        return;
      }
      const api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_hosting_key}`;
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axios.post(api, formData, { headers: { "content-type": "multipart/form-data" } });
      photoURL = res.data.data.display_url;
    }

    if (imageTab === "url") {
      if (!imageURL) {
        toast.error("Please enter a valid image URL.");
        setLoading(false);
        return;
      }
      photoURL = imageURL;
    }

    try {
      await register(email, password, name, photoURL);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      {/* Back link */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
        <FaArrowLeft /> Back to Home
      </Link>

      {/* Card container */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image */}
        <div
          className="hidden md:block relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/50 to-transparent"></div>
          <div className="absolute bottom-8 left-6 text-white z-10">
            <h2 className="text-3xl font-bold">Join the Community</h2>
            <p className="mt-2 text-sm italic opacity-80">“Books are a uniquely portable magic.” – Stephen King</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h3>
          <p className="text-gray-500 mb-6">Start your reading journey today</p>

          {/* Google Sign-up */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>

          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2">OR</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="mt-1 border border-gray-300 rounded-md p-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Profile Picture</label>
              <div className="bg-gray-100 border border-gray-300 rounded-md p-2">
                <div className="flex mb-2">
                  <button
                    type="button"
                    className={`flex-1 py-1 rounded-md text-sm font-medium ${imageTab === "upload" ? "bg-pink-500 text-white" : "text-gray-700 bg-gray-200"}`}
                    onClick={() => setImageTab("upload")}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-1 rounded-md text-sm font-medium ${imageTab === "url" ? "bg-pink-500 text-white" : "text-gray-700 bg-gray-200"}`}
                    onClick={() => setImageTab("url")}
                  >
                    URL
                  </button>
                </div>

                {imageTab === "upload" && (
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="w-full border border-gray-300 rounded-md p-2 pl-10"
                    />
                    <FaCloudUploadAlt className="absolute left-3 top-3 text-gray-400" />
                  </div>
                )}
                {imageTab === "url" && (
                  <input
                    type="text"
                    name="imageURL"
                    placeholder="https://example.com/photo.jpg"
                    className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-1 border border-gray-300 rounded-md p-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
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
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-semibold shadow"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
