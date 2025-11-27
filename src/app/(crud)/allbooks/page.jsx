// app/allbooks/[id]/page.js

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      next: { revalidate: 3600 } // ১ ঘন্টা পর পর ডেটা রিভ্যালিডেট করবে
    });
    const books = await res.json();
    
    return books.map((book) => ({
      id: book._id.toString()
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Allbooks({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Book not found');
    }
    
    const book = await res.json();

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              {/* Book Image */}
              <div className="lg:relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-96 lg:h-full object-cover"
                />
              </div>

              {/* Book Details */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {book.category}
                  </span>
                  <div className="text-rose-600 font-bold text-3xl">${book.price}</div>
                </div>

                <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                  {book.title}
                </h1>

                <p className="text-slate-600 text-lg mb-6">
                  by <span className="font-semibold">{book.authorName}</span>
                </p>

                <div className="flex items-center gap-2 text-rose-500 text-xl mb-8">
                  <span className="text-2xl">★</span>
                  {book.rating || "4.5"}
                </div>

                {book.description && (
                  <div className="mb-10">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {book.description}
                    </p>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn btn-primary flex-1 py-3 text-lg">
                      Add to Cart
                    </button>
                    <button className="btn btn-outline flex-1 py-3 text-lg">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Book Not Found</h1>
          <p className="text-slate-600">The book you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
}