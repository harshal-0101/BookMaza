'use client';

import Link from "next/link";
import React, { useState } from "react";


// Reusable Components
const ContactCard = ({ icon, title, children }) => (
  <div className="rounded-xl bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-primary">{title}</h3>
    <div className="text-foreground/70">{children}</div>
  </div>
);

const SupportCategoryCard = ({ icon, title, description }) => (
  <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-2 font-semibold text-primary">{title}</h3>
    <p className="text-sm leading-relaxed text-foreground/60">{description}</p>
  </div>
);

const FormField = ({ label, id, type = 'text', required = false, placeholder, children }) => (
  <div>
    <label htmlFor={id} className="mb-2 block font-medium text-foreground">
      {label}
      {required && <span className="ml-1 text-secondary">*</span>}
    </label>
    {children || (
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    )}
  </div>
);

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus('idle');
      e.target.reset();
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact Form - 61.8% */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-card p-8 shadow-lg md:p-10">
                <h2 className="text-4xl font-bold text-primary capitalize">
                  Send Us a Message
                </h2>
                <p className="mb-8 text-foreground/60">
                  We typically respond within 24 hours
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <FormField
                    label="Full Name"
                    id="fullName"
                    required
                    placeholder="Jane Austen"
                  />

                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                  />

                  <FormField
                    label="Subject"
                    id="subject"
                    required
                  >
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-3 pr-10 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Please select a topic</option>
                        <option value="order">Order & Shipping Question</option>
                        <option value="return">Return or Exchange</option>
                        <option value="recommendation">Book Recommendation</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="feedback">Feedback or Suggestion</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-foreground/60">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </FormField>

                  <FormField
                    label="Your Message"
                    id="message"
                    required
                  >
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full rounded-full bg-primary px-8 py-4 font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>

                    {formStatus === 'success' && (
                      <div className="mt-4 rounded-lg bg-secondary/10 p-4 text-secondary">
                        <div className="flex items-center gap-2">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-foreground/50">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <ContactCard
                  icon={
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Email Support"
                >
                  <a 
                    href="mailto:hello@bookstore.com" 
                    className="text-primary transition-colors hover:text-primary/90"
                  >
                    hello@bookstore.com
                  </a>
                  <p className="mt-1 text-sm text-foreground/50">
                    We read every message personally
                  </p>
                </ContactCard>

                <ContactCard
                  icon={
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  title="Phone Support"
                >
                  <a 
                    href="tel:+18005551234" 
                    className="text-primary transition-colors hover:text-primary/90"
                  >
                    +1 (800) 555-1234
                  </a>
                  <p className="mt-1 text-sm text-foreground/50">
                    Mon–Fri: 9am–6pm EST
                  </p>
                </ContactCard>

                <ContactCard
                  icon={
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  title="Our Location"
                >
                  <p className="text-foreground/70">
                    123 Literary Lane
                    <br />
                    Portland, OR 97209
                  </p>
                  <p className="mt-1 text-sm text-foreground/50">
                    Warehouse & shipping center
                  </p>
                </ContactCard>
              </div>
            </div>
          </div>
        </div>
      </section>
                  
    </main>
  );
}