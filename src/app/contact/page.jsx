"use client";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const contacts = [
    {
      icon: <FaEnvelope size={25} className="text-white" />,
      title: "Email Us",
      desc: "redwanreshat@gmail.com",
      bg: "bg-rose-400",
      borderHover: "hover:border-rose-400",
    },
    {
      icon: <FaPhoneAlt size={25} className="text-white" />,
      title: "Call Us",
      desc: "+880 1763254017",
      bg: "bg-blue-400",
      borderHover: "hover:border-blue-400",
    },
    {
      icon: <FaMapMarkerAlt size={25} className="text-white" />,
      title: "Visit Us",
      desc: "Dhaka, Bangladesh",
      bg: "bg-purple-400",
      borderHover: "hover:border-purple-400",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 text-slate-700 overflow-hidden">

      {/* Soft Pastel Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-300 rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute -bottom-10 left-20 w-96 h-96 bg-purple-300 rounded-full blur-[200px] opacity-40"></div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Heading */}
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">Get in Touch</h2>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            We’d love to hear from you! Whether you have questions about our books,
            services, or anything else — our team is ready to answer.
          </p>
        </motion.div>

        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Cards */}
          <motion.div variants={container} className="space-y-10">
            {contacts.map((c, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`p-6 bg-white/70 backdrop-blur-md rounded-xl border border-slate-200 ${c.borderHover} transition shadow-lg hover:shadow-xl`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${c.bg} p-4 rounded-full text-white flex items-center justify-center shadow-md`}
                  >
                    {c.icon}
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-slate-800">{c.title}</h4>
                    <p className="text-slate-600">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={item}
            className="space-y-6 bg-white/60 backdrop-blur-xl p-10 rounded-2xl border border-slate-200 shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4 text-slate-800">Send a Message</h3>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-700">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered bg-white border-slate-300 text-slate-700"
              />
            </div>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-700">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white border-slate-300 text-slate-700"
              />
            </div>

            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-700">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32 bg-white border-slate-300 text-slate-700"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button className="btn bg-gradient-to-r from-rose-400 to-blue-400 hover:opacity-90 border-none text-white w-full text-lg rounded-xl">
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}
