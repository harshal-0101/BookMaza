import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Star, ChevronRight } from "lucide-react"
import frameimage from '../../../public/assets/images/Frame1.png'
import Image from 'next/image'
import HeadCardSlider from '@/components/ui/headcardslider'
import CategoriesSection from '@/components/ui/CategoriesSection'
import ebookimg from '../../../public/assets/images/ebookImage.png'
import BookCard from '@/components/ui/BookCard'
import bookimg3 from "../../../public/assets/Productimage/productimg6.png";
import Newsletterimg from '../../../public/assets/images/Rectangle8.png'
import BannerSlider from '@/components/ui/BnnerSlider';
import ArticlesCard from '@/components/ui/ArticlesCard'

const Home = () => {
  return (
     <main className="min-h-screen">
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 -mt-15">
        <div className="flex-1 space-y-6 w-full ">
          <HeadCardSlider />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4">
          <Image src={frameimage} alt="frameimage" className="w-full h-auto col-span-3 md:col-span-3"/>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoriesSection />
      </section>

      {/* Promo Section */}
      <section className="bg-accent py-20 overflow-hidden ">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between w-[90%]">
          <div className="flex-1 space-y-6 max-w-xl">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">— ebook</span>
            <h2 className="text-4xl font-bold text-primary">
              Access, Read, Practice & Engage with Digital Content (eBook)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra
              hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter Your Email Address" className="bg-white border-none rounded-none py-6 flex-1" />
              <Button className="bg-[#ED553B] hover:bg-[#ED553B]/90 text-white rounded-none px-8 py-6 uppercase tracking-wider">
                Login
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <Image src={ebookimg} alt="Student" className="w-full h-auto max-w-xs" />
          </div>

        </div>
      </section>

      {/* New Releases Carousel Placeholder */}
      <section className="container mx-auto px-4 py-20 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-primary uppercase">New Release Books</h2>
          <p className="text-muted-foreground">1000+ books are published by different authors everyday.</p>
          <a
            href="#"
            className="text-secondary bg-[#ED553B] text-sm font-bold uppercase hover:underline inline-flex items-center gap-1 px-4"
          >
            View All Products <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        {/* --- CARD SLIDER START --- */}
         <div className="relative">
           {/* Scroll Container */}
           <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4">
             <BookCard />
           </div>
         </div>
         {/* --- CARD SLIDER END --- */}

        <div className="flex justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted" />
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="bg-white py-20 border-y border-muted">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 max-w-md">
            <div className="bg-muted p-8 shadow-2xl">
              <Image src={bookimg3} alt="Featured Book" className="w-full h-auto" />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <span className="text-muted-foreground uppercase tracking-widest text-xs">Featured Book of the week</span>
            <h2 className="text-4xl font-bold text-primary capitalize">Birds gonna be happy</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed ">
              Jump start your book reading by quickly check through the popular book categories. 1000+ books are
              published by different authors everyday. Buy your favourite books on TreeBooks Today.
            </p>
            <Button
              variant="outline"
              className="rounded-none border-primary text-primary hover:bg-primary hover:text-white px-8 uppercase text-xs tracking-widest bg-transparent"
            >
              View More <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Gen Banner */}
      <section className="bg-[#e3ecf0] py-16">
        <BannerSlider/> 
      </section>

      {/* Newsletter */}
      {/* <section className="py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row bg-[#f7e8e5] rounded-3xl overflow-hidden shadow-sm">
          <div className="flex-1 relative min-h-[400px]">
            <Image
              src={Newsletterimg}
              alt="Newsletter"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-16 space-y-8 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-primary">Get over a 100 free books</h2>
            <p className="text-muted-foreground">
              Get access by subscribing to our newsletter. Jump start your book reading by quickly check through the
              popular book categories...
            </p>
           <div className="flex flex-col sm:flex-row gap-4">
             <Input
               placeholder="Enter email address..."
               className="bg-white py-6 border-none"
             />
             <Button className="bg-[#f06d4e] hover:bg-[#d95d3e] text-white py-6 px-8 font-bold">
               Get free books
             </Button>
           </div>

          </div>
        </div>
      </section> */}

      {/* FAQ CTA */}
      <section className="container mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-primary uppercase">Still not sure?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jump start your book reading by quickly check through the popular book categories. 1000+ books are published
            by different authors everyday. Buy your favourite books on TreeBooks Today.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-primary text-primary px-12 py-6 rounded-none font-bold uppercase tracking-widest bg-transparent"
        >
          Read FAQ
        </Button>
      </section>

      {/* Blog Section */}
      {/* <section className="bg-accent py-24">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Read Our Articles
            </span>
            <h2 className="text-5xl font-bold text-primary capitalize">Latest Articles</h2>
          </div>
          <div className="articles">
            <ArticlesCard />
          </div>
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary hover:text-white px-10 py-6 font-bold uppercase tracking-widest text-xs bg-transparent"
            >
              Read All Articles <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
     
    </main>
  )
}

export default Home