"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrashAlt, FaEdit, FaEye, FaBook } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from "sweetalert2";

export default function ManageBooks() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosBase.get("/books");
        const myBooks = res.data.filter(
          (book) => book.authorEmail === user.email
        );
        setBooks(myBooks);
      } catch (error) {
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [axiosBase, user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef476f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBase.delete(`/books/${id}`);
          if (res.data.deletedCount > 0) {
            setBooks((prev) => prev.filter((book) => book._id !== id));
            Swal.fire("Deleted!", "The book has been removed.", "success");
          }
        } catch (error) {
          toast.error("Failed to delete book");
        }
      }
    });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Manage <span className="text-rose-500">My Books</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Total Books: {books.length}
            </p>
          </div>

          <Link href="/addbooks">
            <button className="btn bg-gradient-to-r from-rose-400 to-purple-400 hover:opacity-90 text-white border-none gap-2 shadow-lg">
              <FaBook /> Add New Book
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-rose-100/80 text-slate-700 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>Book Info</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-700 divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <span className="loading loading-spinner loading-lg text-rose-400"></span>
                    </td>
                  </tr>
                ) : books.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      You haven't added any books yet.
                    </td>
                  </tr>
                ) : (
                  books.map((book, index) => (
                    <tr
                      key={book._id}
                      className="hover:bg-rose-50 transition-all"
                    >
                      <td className="pl-6 font-mono text-slate-400">
                        {index + 1}
                      </td>

                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask rounded w-12 h-16 bg-white border border-slate-200 shadow-sm">
                              <img
                                src={book.image}
                                alt={book.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className="font-semibold text-slate-800 truncate max-w-[200px]"
                              title={book.title}
                            >
                              {book.title}
                            </div>
                            <div className="text-xs bg-purple-100 px-2 py-0.5 rounded inline-block mt-1 text-purple-700">
                              ⭐ {book.rating || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-blue-100 text-blue-700 font-semibold px-3 py-2 border-none rounded">
                          {book.category}
                        </span>
                      </td>

                      <td className="font-bold text-rose-500">${book.price}</td>

                      <td>
                        <div className="flex items-center justify-center gap-3">

                          {/* View */}
                          <Link href={`/allbooks/${book._id}`}>
                            <button
                              className="btn btn-sm btn-ghost text-blue-500 hover:text-blue-600 tooltip"
                              data-tip="View Details"
                            >
                              <FaEye size={16} />
                            </button>
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/updatebooks/${book._id}`}
                            className="btn btn-sm btn-ghost text-purple-500 hover:text-purple-600 tooltip"
                            data-tip="Edit"
                          >
                            <FaEdit size={16} />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="btn btn-sm btn-ghost text-rose-500 hover:text-rose-600 tooltip"
                            data-tip="Delete"
                          >
                            <FaTrashAlt size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </PrivateRoute>
  );
}
