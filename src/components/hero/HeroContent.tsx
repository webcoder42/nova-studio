import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Brain, Cloud } from 'lucide-react';

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

export function HeroContent({ activeService, onServiceChange }: HeroContentProps) {
  const currentService = services[activeService];
  const Icon = currentService.icon;

  return (
    <div className="relative z-10 container-custom min-h-screen flex flex-col justify-center py-20">
      <div className="max-w-3xl">
        {/* Service indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => onServiceChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeService
                    ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-body">
            {String(activeService + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Icon badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium gradient-text">{currentService.title}</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[0.9]">
              <span className="block text-foreground">{currentService.subtitle.split(' ')[0]}</span>
              <span className="block gradient-text text-glow">
                {currentService.subtitle.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 font-body leading-relaxed">
              {currentService.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="glow-button text-lg px-8 py-6 rounded-full font-semibold"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full border-border/50 bg-background/20 backdrop-blur-sm hover:bg-background/40"
              >
                View Our Work
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
