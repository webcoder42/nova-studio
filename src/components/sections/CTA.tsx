import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl"
        />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium gradient-text">Ready to Start?</span>
          </motion.div>

          {/* Heading */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Let's Build Something{' '}
            <span className="gradient-text text-glow">Extraordinary</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your ideas into reality. Our team is ready to bring your vision to life with cutting-edge technology and creative solutions.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="glow-button text-lg px-10 py-7 rounded-full font-semibold group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-7 rounded-full border-border/50 bg-background/20 backdrop-blur-sm hover:bg-background/40 hover:border-primary/50"
              >
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-12 border-t border-border/30"
          >
            <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['TechVentures', 'FinanceFlow', 'EcoChain', 'HealthHub', 'SmartRetail'].map((company) => (
                <span key={company} className="font-display text-lg font-bold text-muted-foreground">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
