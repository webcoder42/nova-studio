import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechVentures Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'NexaTech transformed our legacy system into a modern, scalable platform. Their expertise in AI integration has given us a competitive edge we never thought possible.',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'FinanceFlow',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'The team delivered our mobile app two weeks ahead of schedule. Their attention to detail and commitment to quality is unmatched. Highly recommended!',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Founder',
    company: 'EcoChain',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote: 'Working with NexaTech on our blockchain platform was seamless. They understood our vision and brought it to life with exceptional technical skills.',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Director',
    company: 'HealthHub',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'The AI features they built into our health app have revolutionized how users interact with their health data. Truly innovative work.',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 md:p-12"
            >
              {/* Quote icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-8">
                <Quote className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Quote text */}
              <blockquote className="font-display text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8">
                "{testimonials[current].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-display font-bold text-foreground">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current].role} at {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 10000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
