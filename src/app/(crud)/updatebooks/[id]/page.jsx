"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaStar, FaEdit, FaLink } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import Swal from "sweetalert2";

export default function UpdateBook() {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageTab, setImageTab] = useState("upload");
  const axiosBase = useAxios();

  // Fetch Book Data
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axiosBase.get(`/books/${id}`);
        const book = res.data;

        setCurrentImage(book.image);

        setValue("title", book.title);
        setValue("category", book.category);
        setValue("price", book.price);
        setValue("rating", book.rating);
        setValue("description", book.description || book.full_desc);
        setValue("authorName", book.authorName);
        setValue("authorEmail", book.authorEmail);
        setValue("imageURL", book.image);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load book data.");
        setLoading(false);
      }
    };

    if (id) fetchBookData();
  }, [id, axiosBase, setValue]);

  // Submit Handler
  const onSubmit = async (data) => {
    setSubmitting(true);
    let imgURL = currentImage;

    try {
      if (imageTab === "upload" && data.image?.[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const image_hosting_key = "271869a6b9ececa3a8f8f741c63e00f5";
        const uploadURL = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        const imgRes = await axios.post(uploadURL, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        imgURL = imgRes.data.data.display_url;
      } else if (imageTab === "url" && data.imageURL) {
        imgURL = data.imageURL;
      }

      const updatedBook = {
        title: data.title,
        category: data.category,
        price: Number(data.price),
        rating: Number(data.rating),
        description: data.description,
        image: imgURL,
      };

      const res = await axiosBase.patch(`/books/${id}`, updatedBook);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Book Updated Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/dashboard/manage-books");
      } else {
        toast("No changes made.");
      }
    } catch {
      toast.error("Failed to update book.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mt-10 mb-10">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Update <span className="text-rose-500">Book</span>
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Modify details for this masterpiece
          </p>
        </div>

        {/* Card */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-8">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Title + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-slate-700">Book Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="input input-bordered bg-white border-slate-300 text-slate-800 focus:border-rose-400 w-full"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700">Category</label>
                <select
                  {...register("category")}
                  className="select select-bordered bg-white border-slate-300 text-slate-800 focus:border-rose-400 w-full"
                >
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Sci-Fi</option>
                  <option>Mystery</option>
                  <option>Self-Help</option>
                  <option>History</option>
                </select>
              </div>
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-slate-700">Author Name</label>
                <input
                  readOnly
                  {...register("authorName")}
                  className="input input-bordered bg-gray-100 text-slate-500 cursor-not-allowed w-full"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700">Author Email</label>
                <input
                  readOnly
                  {...register("authorEmail")}
                  className="input input-bordered bg-gray-100 text-slate-500 cursor-not-allowed w-full"
                />
              </div>
            </div>

            {/* Price & Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-slate-700">Price ($)</label>
                <input
                  type="number"
                  {...register("price")}
                  className="input input-bordered bg-white border-slate-300 text-slate-800 focus:border-rose-400 w-full"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 flex items-center gap-2">
                  Rating <FaStar className="text-yellow-400" />
                </label>
                <select
                  {...register("rating")}
                  className="select select-bordered bg-white border-slate-300 text-slate-800 focus:border-rose-400 w-full"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="font-medium text-slate-700">Book Cover</label>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="avatar">
                  <div className="w-24 h-32 rounded-lg ring ring-rose-300 overflow-hidden shadow">
                    <img src={currentImage} alt="current" />
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex-1 w-full">
                  <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => setImageTab("upload")}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        imageTab === "upload"
                          ? "bg-rose-400 text-white shadow"
                          : "text-slate-600 hover:text-rose-500"
                      }`}
                    >
                      <FaCloudUploadAlt /> Upload
                    </button>

                    <button
                      type="button"
                      onClick={() => setImageTab("url")}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        imageTab === "url"
                          ? "bg-rose-400 text-white shadow"
                          : "text-slate-600 hover:text-rose-500"
                      }`}
                    >
                      <FaLink /> URL
                    </button>
                  </div>

                  {imageTab === "upload" ? (
                    <div className="relative border-2 border-dashed border-rose-300 rounded-lg p-6 bg-white hover:bg-rose-50 transition cursor-pointer">
                      <input
                        type="file"
                        {...register("image")}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-center text-rose-400">
                        <FaCloudUploadAlt className="text-3xl mx-auto" />
                        <p className="mt-2 text-sm">Upload New Cover</p>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="url"
                      {...register("imageURL")}
                      placeholder="https://example.com/image.jpg"
                      className="input input-bordered bg-white border-slate-300 text-slate-800 w-full"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-medium text-slate-700">Description</label>
              <textarea
                {...register("description")}
                className="textarea textarea-bordered bg-white border-slate-300 text-slate-800 w-full h-32"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline border-slate-400 text-slate-600 hover:bg-slate-200 flex-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="btn bg-gradient-to-r from-rose-400 to-purple-400 hover:opacity-90 text-white border-none shadow-lg flex-1 text-lg"
              >
                {submitting ? (
                  <span className="loading loading-dots"></span>
                ) : (
                  <><FaEdit /> Update Book</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
