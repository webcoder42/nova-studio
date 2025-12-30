import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechVentures Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'NexaTech transformed our legacy system into a modern, scalable platform. Their expertise in AI integration has given us a competitive edge we never thought possible.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'FinanceFlow',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'The team delivered our mobile app two weeks ahead of schedule. Their attention to detail and commitment to quality is unmatched. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Founder',
    company: 'EcoChain',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote: 'Working with NexaTech on our blockchain platform was seamless. They understood our vision and brought it to life with exceptional technical skills.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Director',
    company: 'HealthHub',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'The AI features they built into our health app have revolutionized how users interact with their health data. Truly innovative work.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'VP Engineering',
    company: 'DataSync',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    quote: 'Exceptional quality and communication throughout the project. They turned our complex requirements into an elegant, user-friendly solution.',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Testimonials
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-5xl mx-auto" ref={constraintsRef}>
          <div className="relative perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="glass-card rounded-3xl p-8 md:p-12"
              >
                {/* Quote icon with animation */}
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-8 relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Quote className="w-8 h-8 text-primary-foreground" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-50"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Stars rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text with word animation */}
                <motion.blockquote 
                  className="font-display text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonials[current].quote}"
                </motion.blockquote>

                {/* Author with slide animation */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full ring-2 ring-primary/50"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg text-foreground">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[current].role} at {testimonials[current].company}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots with progress */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 10000);
                    }}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: index === current ? 40 : 8 }}
                  >
                    <div className="absolute inset-0 bg-muted-foreground/20" />
                    {index === current && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: 'linear' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                    {index !== current && (
                      <div className="absolute inset-0 bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors" />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={next}
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}