// "use client";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-slate-200">
      
      {/* Decorative Blurry Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get in Touch
          </h2>
          <p className="text-slate-300 mt-4 text-lg max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have questions about our books,
            services, or anything else — our team is ready to answer.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left panel info */}
          <div className="space-y-10">
            <div className="p-6 bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 hover:border-teal-400 transition">
              <div className="flex items-center gap-4">
                <div className="bg-teal-600 p-4 rounded-full text-white">
                  <FaEnvelope size={25} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Email Us</h4>
                  <p className="text-slate-300">mdnirob30k@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 hover:border-amber-400 transition">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500 p-4 rounded-full text-white">
                  <FaPhoneAlt size={25} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Call Us</h4>
                  <p className="text-slate-300">+880 1908716502</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 hover:border-purple-400 transition">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500 p-4 rounded-full text-white">
                  <FaMapMarkerAlt size={25} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Visit Us</h4>
                  <p className="text-slate-300">
                    Rajshahi, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="space-y-6 bg-slate-800/30 backdrop-blur-xl p-10 rounded-2xl border border-slate-700 shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">Send a Message</h3>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered bg-slate-900/40 border-slate-700 text-white"
              />
            </div>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-slate-900/40 border-slate-700 text-white"
              />
            </div>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32 bg-slate-900/40 border-slate-700 text-white"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button className="btn bg-teal-600 hover:bg-teal-700 border-none text-white w-full text-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
