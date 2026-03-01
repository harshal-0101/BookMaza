import React from 'react'
import Image from "next/image"
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Books", href: "/books" },
    { name: "New Releases", href: "/new-releases" },
    { name: "Best Sellers", href: "/bestsellers" },
    { name: "Contact", href: "/contact" },
  ]

  const categories = [
    { name: "Fiction", href: "/category/fiction" },
    { name: "Non-Fiction", href: "/category/non-fiction" },
    { name: "Biography", href: "/category/biography" },
    { name: "Self-Help", href: "/category/self-help" },
    { name: "Children's Books", href: "/category/children" },
    { name: "Educational", href: "/category/educational" },
  ]

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Track Order", href: "/track-order" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "FAQs", href: "/faq" },
    { name: "Gift Cards", href: "/gift-cards" },
  ]

  return (
    <footer className="text-white" style={{ backgroundColor: "#173F5F" }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Bookmaza</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                Your trusted destination for discovering amazing books. We curate the finest 
                collection of stories, knowledge, and inspiration for readers around the world.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  123 Book Street, Reading District,<br />Mumbai, Maharashtra 400001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="tel:+911234567890" className="text-white/80 hover:text-secondary transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="mailto:hello@bookmaza.com" className="text-white/80 hover:text-secondary transition-colors">
                  hello@bookmaza.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-secondary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.href} 
                    className="text-white/80 hover:text-secondary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-white/80 hover:text-secondary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-16 pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white">Stay Updated</h4>
              <p className="text-white/80 text-sm">
                Subscribe to our newsletter for the latest book releases, exclusive deals, and reading recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg flex-1 focus:bg-white/15"
              />
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="95 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <span>© 2025 Bookmaza. All Rights Reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-secondary fill-secondary" /> for readers
              </span>
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/30">|</span>
              <a href="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <span className="text-white/30">|</span>
              <a href="/cookies" className="hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer