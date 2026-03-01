import React from 'react'
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, Users, Sparkles, ChevronRight, Quote } from "lucide-react"
import Image from 'next/image'

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Curated Collections",
      description: "Every book in our collection is handpicked by passionate readers who understand what makes a great read."
    },
    {
      icon: Sparkles,
      title: "Distraction-Free Experience",
      description: "A clean, beautiful interface designed to let you focus on what matters most—discovering your next favorite book."
    },
    {
      icon: Heart,
      title: "Reader-First Platform",
      description: "Built by readers, for readers. Every feature exists to enhance your reading journey and book discovery."
    },
    {
      icon: Users,
      title: "Community of Book Lovers",
      description: "Join thousands of readers who share recommendations, reviews, and their love for stories that move us."
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative  py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-secondary font-bold uppercase tracking-widest text-xs" style={{color: "#000000"}}>— Our Story</span>
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            About Bookmaza
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pustak Maza is Book Saga Publication's publishing imprint that aims to provide a platform for budding authors, to serve as a stepping stone for their writing careers and help authors achieve their dreams of becoming published writers.
            We intend to have an author-friendly publishing service and foster positive relationships to turn their novels into bestsellers.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

     


      {/* Why Bookmaza Exists - Feature Cards */}
      <section className="bg-accent py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-secondary">
              What Makes Us Different
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Why Bookmaza Exists
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We built Bookmaza to be the bookstore we always wanted to browse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="flex flex-col space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-card rounded-3xl p-10 md:p-12 shadow-sm border border-border space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">
                Our Mission
              </h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To make reading accessible, enjoyable, and inspiring for everyone.
              We believe that the right book at the right time can spark curiosity,
              provide comfort, and open new worlds. Our mission is to connect readers
              with those life-changing stories.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-card rounded-3xl p-10 md:p-12 shadow-sm border border-border space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">
                Our Vision
              </h3>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To become the most trusted and beloved destination for book lovers worldwide.
              A place where every visit feels like browsing your favorite local bookstore,
              with the convenience and selection of the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-12 md:p-16 shadow-lg border border-border relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10 space-y-8 text-center">
              <blockquote className="text-2xl md:text-3xl font-serif text-primary leading-relaxed italic">
                "A reader lives a thousand lives before he dies.
                The man who never reads lives only one."
              </blockquote>
              <div className="space-y-2">
                <p className="text-lg font-bold text-primary">— George R.R. Martin</p>
                <div className="w-16 h-1 bg-secondary mx-auto"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              What We Believe
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">Quality Over Quantity</h3>
              <p className="text-muted-foreground">
                We curate, not clutter. Every book in our collection earns its place.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">Community Matters</h3>
              <p className="text-muted-foreground">
                Readers inspire readers. We're building a space where book lovers thrive.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">Reading is Personal</h3>
              <p className="text-muted-foreground">
                Your reading journey is unique. We're here to support it, not dictate it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-20 md:py-28">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Ready to Start Your Next Chapter?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of readers who've made Bookmaza their go-to destination
              for discovering amazing books and building their personal library.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-[#ED553B] hover:bg-[#ED553B]/90 text-white rounded-lg px-10 py-6 uppercase tracking-wider font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Books <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 rounded-lg uppercase tracking-wider font-bold bg-transparent transition-all duration-300"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 md:py-20 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Books</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Readers</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">200+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Authors</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">4.8★</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About