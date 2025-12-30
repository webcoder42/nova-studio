import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Brain, Cloud, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const services: Service[] = [
  {
    id: 0,
    title: 'Web Development',
    subtitle: 'Stunning Digital Experiences',
    description: 'Custom web applications built with cutting-edge technologies. From React to Next.js, we create fast, scalable, and beautiful websites.',
    icon: Code,
  },
  {
    id: 1,
    title: 'App Development',
    subtitle: 'Mobile-First Solutions',
    description: 'Native and cross-platform mobile apps that users love. iOS, Android, and React Native development with pixel-perfect designs.',
    icon: Smartphone,
  },
  {
    id: 2,
    title: 'AI Integration',
    subtitle: 'Intelligent Automation',
    description: 'Harness the power of artificial intelligence. Machine learning, natural language processing, and smart automation solutions.',
    icon: Brain,
  },
  {
    id: 3,
    title: 'Cloud & Blockchain',
    subtitle: 'Future-Proof Infrastructure',
    description: 'Secure, scalable cloud architecture and blockchain solutions. AWS, Azure, smart contracts, and decentralized applications.',
    icon: Cloud,
  },
];

interface HeroContentProps {
  activeService: number;
  onServiceChange: (index: number) => void;
}

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export function HeroContent({ activeService, onServiceChange }: HeroContentProps) {
  const currentService = services[activeService];
  const Icon = currentService.icon;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y, scale }}
      className="relative z-10 container-custom min-h-screen flex flex-col justify-center py-20"
    >
      <div className="max-w-4xl">
        {/* Service indicator with progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex gap-2">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => onServiceChange(index)}
                className="relative group"
              >
                <motion.div
                  className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                    index === activeService
                      ? 'bg-gradient-to-r from-primary to-secondary'
                      : 'bg-muted-foreground/20 hover:bg-muted-foreground/40'
                  }`}
                />
                {index === activeService && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-primary font-medium whitespace-nowrap"
                  >
                    {service.title}
                  </motion.div>
                )}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-mono ml-4">
            {String(activeService + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon badge with glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card mb-8 group cursor-pointer hover:border-primary/50 transition-colors"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-secondary" />
              </motion.div>
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold gradient-text">{currentService.title}</span>
            </motion.div>

            {/* Main heading with letter animation */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] tracking-tight">
              <motion.span 
                className="block text-foreground overflow-hidden"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {currentService.subtitle.split(' ')[0]}
              </motion.span>
              <motion.span 
                className="block gradient-text text-glow overflow-hidden"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {currentService.subtitle.split(' ').slice(1).join(' ')}
              </motion.span>
            </h1>

            {/* Description with staggered fade */}
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-body leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {currentService.description}
            </motion.p>

            {/* CTA buttons with micro-interactions */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="glow-button text-lg px-8 py-7 rounded-full font-semibold group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-7 rounded-full border-border/50 bg-background/10 backdrop-blur-md hover:bg-background/30 hover:border-primary/50 transition-all duration-300 group"
                >
                  <span className="group-hover:gradient-text transition-all">View Our Work</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border/30"
        >
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '12+', label: 'Years Experience' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="group"
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text group-hover:text-glow transition-all">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span 
          className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-7 h-12 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-2 h-2 bg-gradient-to-b from-primary to-secondary rounded-full"
            animate={{ opacity: [1, 0.3, 1], y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}