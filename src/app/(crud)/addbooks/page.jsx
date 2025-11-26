"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { useAuth } from "@/Provider/AuthProvider";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import Swal from "sweetalert2";

export default function AddBooks() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageTab, setImageTab] = useState("upload");
  const axiosBase = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);

    let imgURL = "";
    const imageFile = data.image?.[0];
    const imageURL = data.imageURL;

    try {
      if (imageTab === "upload") {
        if (!imageFile) {
          toast.error("Please upload a book cover!");
          setLoading(false);
          return;
        }

        const uploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_hosting_key}`;
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(uploadUrl, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        imgURL = res.data.data.display_url;
      }

      if (imageTab === "url") {
        if (!imageURL) {
          toast.error("Enter an image URL!");
          setLoading(false);
          return;
        }
        imgURL = imageURL;
      }

      const bookData = {
        title: data.title,
        authorName: user?.displayName,
        authorEmail: user?.email,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        description: data.description,
        image: imgURL,
        createdAt: new Date(),
      };

      const dbResponse = await axiosBase.post("/books", bookData);

      if (dbResponse.data.insertedId || dbResponse.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 mt-10">
          <h2 className="text-3xl font-extrabold text-pink-900 sm:text-4xl">
            Add a New <span className="text-pink-500">Book</span>
          </h2>
          <p className="mt-2 text-lg text-pink-700/80">Share a new masterpiece with the community</p>
        </div>

        <div className="max-w-4xl mx-auto bg-pink-100/60 backdrop-blur-md border border-pink-200 rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-pink-800 font-medium">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Alchemist"
                  {...register("title", { required: true })}
                  className="input input-bordered border-pink-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 w-full bg-white"
                />
                {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
              </div>

              <div className="form-control">
                <label className="label text-pink-800 font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered border-pink-300 w-full bg-white"
                  defaultValue=""
                >
                  <option disabled value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Sci-Fi">Sci-Fi & Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Programming">Programming</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-pink-800 font-medium">Author Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered border-pink-300 bg-pink-50 text-pink-600 cursor-not-allowed w-full"
                />
              </div>

              <div className="form-control">
                <label className="label text-pink-800 font-medium">Author Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered border-pink-300 bg-pink-50 text-pink-600 cursor-not-allowed w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-pink-800 font-medium">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: true })}
                  className="input input-bordered border-pink-300 w-full bg-white"
                />
              </div>

              <div className="form-control">
                <label className="label text-pink-800 font-medium flex items-center gap-2">
                  Rating <FaStar className="text-yellow-400 text-xs" />
                </label>
                <select
                  {...register("rating", { required: true })}
                  className="select select-bordered border-pink-300 w-full bg-white"
                  defaultValue="5"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-pink-800 font-medium">Book Cover</label>

              <div className="tabs tabs-boxed w-full bg-pink-50 border border-pink-300">
                <a
                  className={`tab flex-1 ${imageTab === "upload" ? "tab-active bg-pink-400 text-white" : "text-pink-600"}`}
                  onClick={() => setImageTab("upload")}
                >
                  Upload
                </a>
                <a
                  className={`tab flex-1 ${imageTab === "url" ? "tab-active bg-pink-400 text-white" : "text-pink-600"}`}
                  onClick={() => setImageTab("url")}
                >
                  URL
                </a>
              </div>

              {imageTab === "upload" && (
                <div className="relative border-2 border-dashed border-pink-300 rounded-lg p-8 mt-4 bg-pink-50 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <FaCloudUploadAlt className="text-4xl text-pink-300" />
                    <p className="text-sm text-pink-500">Click to upload</p>
                  </div>
                </div>
              )}

              {imageTab === "url" && (
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageURL")}
                  className="input input-bordered border-pink-300 w-full mt-4 bg-white"
                />
              )}
            </div>

            <div className="form-control">
              <label className="label text-pink-800 font-medium">Description</label>
              <textarea
                rows="4"
                {...register("description", { required: true })}
                className="textarea textarea-bordered border-pink-300 w-full bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-lg font-bold"
            >
              {loading ? <span className="loading loading-dots loading-md"></span> : "Add Book to Collection"}
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
