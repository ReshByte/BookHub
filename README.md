📚 BookHub - Online Library & Book Store

BookHub is a modern, responsive, and full-stack web application built with Next.js and Express.js. It serves as an online platform where users can browse books, view details, and manage their own book collections. The application features a premium UI with dark mode aesthetics, secure authentication, and real-time data management.

🔗 Live Links

Client (Frontend): Live Demo Link Here

Server (Backend): API Server Link Here

✨ Key Features

🌍 Public Pages

Landing Page: A visually stunning homepage with Hero section, Featured Books, Testimonials, and FAQ.

All Books Page: Browse the complete collection with Real-time Search and Category Filtering.

Book Details: Dynamic page showing detailed information about a specific book with 3D cover effects.

Authentication: Secure Login and Registration system using NextAuth.js (Google & Email/Password).

🔒 Protected Pages (User Dashboard)

Add Book: Users can upload new books to the library. Includes ImgBB API integration for image uploads.

Manage Books: A dashboard table to view, edit, or delete books uploaded by the logged-in user.

Update Book: Functionality to modify book details and cover images.

Private Routes: Middleware to protect dashboard routes from unauthorized access.

🎨 UI/UX

Responsive Design: Fully optimized for Mobile, Tablet, and Desktop.

Premium Theme: Dark mode aesthetic using Tailwind CSS and DaisyUI.

Interactions: Smooth animations, glassmorphism effects, and toast notifications.

🛠️ Technologies Used

Frontend

Framework: Next.js (App Router)

Styling: Tailwind CSS, DaisyUI

Icons: React Icons

Authentication: NextAuth.js

HTTP Client: Axios

Form Handling: React Hook Form

Notifications: React Hot Toast / SweetAlert2

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Native Driver)

Deployment: Vercel (Serverless Function)