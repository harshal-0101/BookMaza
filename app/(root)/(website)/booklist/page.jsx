"use client"
import React, { useState } from "react";
import { SidebarFilters } from "@/components/ui/SidebarFilters"
import { ChevronLeft, ChevronRight, LayoutGrid, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const BOOKS = [
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
  },
  {
    id: 13,
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Tiny changes, remarkable results',
    genre: 'Self-Help',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    price: 599,
    rating: 4.8,
    reviewCount: 25678,
    publishDate: 'Oct 2024',
    pageCount: 320,
    readingTime: '6.5 hours'
  },
  {
    id: 14,
    slug: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    description: 'A brief history of humankind',
    genre: 'History',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
    price: 649,
    rating: 4.7,
    reviewCount: 19234,
    publishDate: 'Sep 2024',
    pageCount: 443,
    readingTime: '8.5 hours'
  },
]

export default function ProductListingPage() {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("az");
  const [showCount, setShowCount] = useState(12);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [hoveredBook, setHoveredBook] = useState(null);

  const toggleWishlist = (bookId) => {
    if (wishlist.includes(bookId)) {
      setWishlist(wishlist.filter(id => id !== bookId))
    } else {
      setWishlist([...wishlist, bookId])
    }
  }

  const addToCart = (bookId) => {
    if (!cart.includes(bookId)) {
      setCart([...cart, bookId])
    }
  }

  const BookCard = ({ book }) => (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 flex flex-col h-full"
      onMouseEnter={() => setHoveredBook(book.id)}
      onMouseLeave={() => setHoveredBook(null)}
    >
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
            onClick={() => addToCart(book.id)}
            disabled={cart.includes(book.id)}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {cart.includes(book.id) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className={`w-full lg:w-64 flex-shrink-0 bg-white p-4 border-r z-20 transform transition-all duration-300 ease-in-out origin-top lg:translate-y-0 lg:opacity-100 lg:block
            ${showFilters 
              ? "translate-y-0 opacity-100 block" 
              : "-translate-y-full opacity-0 hidden"}
          `}>
            <SidebarFilters />
          </aside>

          <div className="flex-1 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-8">
              <div className="flex items-center gap-8">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <button className="flex items-center gap-2 text-sm font-bold text-[#2d323e]">
                     Sort by : Alphabetically, A-Z <ChevronDown className="w-4 h-4" />
                   </button>
                 </DropdownMenuTrigger>
               
                 <DropdownMenuContent className="w-56">
                   <DropdownMenuItem onClick={() => console.log("A-Z")}>
                     Alphabetically, A-Z
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => console.log("Z-A")}>
                     Alphabetically, Z-A
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => console.log("low-high")}>
                     Price: Low to High
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => console.log("high-low")}>
                     Price: High to Low
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
               
                <span className="text-sm text-gray-500">Showing 1 - {BOOKS.length} of {BOOKS.length} result</span>
              </div>
              <div className="flex items-center gap-8">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <button className="flex items-center gap-2 text-sm font-bold text-[#2d323e]">
                     Show : {showCount} <ChevronDown className="w-4 h-4" />
                   </button>
                 </DropdownMenuTrigger>
               
                 <DropdownMenuContent className="w-40">
                   <DropdownMenuItem onClick={() => setShowCount(12)}>
                     12
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setShowCount(24)}>
                     24
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setShowCount(36)}>
                     36
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setShowCount("All")}>
                     All
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>

                <div className="flex items-center gap-4 text-gray-400">
                  <LayoutGrid className="w-6 h-6 text-[#f15a24]" />
                  <List className="w-6 h-6 cursor-pointer lg:hidden" onClick={() => setShowFilters(!showFilters)}/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {BOOKS.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-3 pt-12">
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200 bg-transparent">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </Button>
              <Button className="rounded-full w-10 h-10 bg-[#f15a24] hover:bg-[#d64a1d] text-white font-bold">1</Button>
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 bg-transparent"
              >
                2
              </Button>
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 bg-transparent"
              >
                3
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200 bg-transparent">
                <ChevronRight className="w-4 h-4 text-[#f15a24]" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}