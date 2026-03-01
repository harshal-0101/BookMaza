'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookStorePage() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [hoveredBook, setHoveredBook] = useState(null)

  const readersFavorites = [
    {
      id: 9,
      slug: 'the-48-laws-of-power',
      title: 'The 48 Laws of Power',
      author: 'Robert Greene',
      description: 'Understand the laws that govern human behavior',
      genre: 'Strategy',
      cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
      price: 699,
      rating: 4.6,
      reviewCount: 14532,
      whyLoveIt: 'Timeless strategies for success',
      publishDate: 'Sep 2024',
      pageCount: 452,
      readingTime: '9 hours'
    },
    {
      id: 10,
      slug: 'educated',
      title: 'Educated',
      author: 'Tara Westover',
      description: 'From survivalist family to Cambridge PhD',
      genre: 'Memoir',
      cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop',
      price: 549,
      rating: 4.9,
      reviewCount: 18234,
      whyLoveIt: 'Powerful story of resilience',
      publishDate: 'Published this month',
      pageCount: 334,
      readingTime: '7 hours'
    },
    {
      id: 11,
      slug: 'meditations',
      title: 'Meditations',
      author: 'Marcus Aurelius',
      description: 'Ancient Stoic philosophy for modern life',
      genre: 'Philosophy',
      cover: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=600&fit=crop',
      price: 349,
      rating: 4.8,
      reviewCount: 9876,
      whyLoveIt: 'Eternal wisdom that never ages',
      publishDate: 'Oct 2024',
      pageCount: 304,
      readingTime: '6 hours'
    },
    {
      id: 12,
      slug: 'the-power-of-now',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      description: 'Find peace in the present moment',
      genre: 'Spirituality',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop',
      price: 479,
      rating: 4.7,
      reviewCount: 12456,
      whyLoveIt: 'Life-changing perspective shift',
      publishDate: 'Nov 2024',
      pageCount: 236,
      readingTime: '5 hours'
    }
  ]

  const addToCart = (bookId) => {
    if (!cart.includes(bookId)) {
      setCart([...cart, bookId])
      setTimeout(() => {
        setCart(cart.filter(id => id !== bookId))
      }, 2000)
    }
  }

  const toggleWishlist = (bookId) => {
    if (wishlist.includes(bookId)) {
      setWishlist(wishlist.filter(id => id !== bookId))
    } else {
      setWishlist([...wishlist, bookId])
    }
  }

  const getBadgeStyles = (badge) => {
    const styles = {
      "Editor's Pick": 'bg-gradient-to-r from-purple-600 to-indigo-600',
      'Bestseller': 'bg-gradient-to-r from-amber-500 to-orange-500',
      'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
      'Popular': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      "Readers' Favorite": 'bg-gradient-to-r from-emerald-500 to-teal-500'
    }
    return styles[badge] || 'bg-gradient-to-r from-slate-600 to-slate-700'
  }

  const BookCard = ({ book }) => (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 flex flex-col h-full"
      onMouseEnter={() => setHoveredBook(book.id)}
      onMouseLeave={() => setHoveredBook(null)}
    >
      {book.badge && (
        <div className={`absolute top-3 left-3 z-20 ${getBadgeStyles(book.badge)} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm`}>
          {book.badge}
        </div>
      )}

      <button
        onClick={() => toggleWishlist(book.id)}
        className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200 group/heart"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-4 h-4 transition-all duration-200 ${wishlist.includes(book.id)
              ? 'fill-rose-500 text-rose-500 scale-110'
              : 'fill-none text-slate-400 group-hover/heart:text-rose-500'
            }`}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="relative overflow-hidden bg-slate-100 aspect-[1/1] flex-shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-all duration-500 flex flex-col justify-end p-4 ${hoveredBook === book.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
          <div className="text-white space-y-2">
            <p className="text-xs text-white/90 leading-relaxed line-clamp-2">{book.description}</p>
            <div className="flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1 flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {book.pageCount} pages
              </span>
              <span className="flex items-center gap-1 flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {book.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2.5 flex flex-col flex-1">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-base mb-0.5 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight break-words">
                {book.title}
              </h3>
              <p className="text-slate-600 text-sm font-medium truncate">{book.author}</p>
            </div>
          </div>
          {book.tagline && (
            <p className="text-slate-500 text-xs italic line-clamp-2 break-words">{book.tagline}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
            {book.genre}
          </span>
          <span className="text-xs text-slate-500 truncate">{book.publishDate}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(book.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 fill-slate-300'
                  }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-700 flex-shrink-0">
            {book.rating}
          </span>
          <span className="text-xs text-slate-500 truncate">
            ({book.reviewCount.toLocaleString()})
          </span>
        </div>


        <div className="pt-3 border-t border-slate-100 space-y-2.5 mt-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-slate-900">
                ₹{book.price}
              </span>
            </div>
          </div>
          <button 
            onClick={() => router.push('/checkout')}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Great Read
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Curated collection of bestsellers, timeless classics, and hidden gems
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">New Release</h2>
              </div>
              <p className="text-slate-600 ml-6">Freshly added titles from top authors</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {readersFavorites.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}