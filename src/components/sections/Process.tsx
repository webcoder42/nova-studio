import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Code2, Rocket, Check } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your vision, goals, and requirements to understand exactly what you need.',
    icon: Search,
    color: 'from-primary to-primary/50',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Our team crafts a detailed roadmap with timelines, milestones, and technical architecture.',
    icon: Lightbulb,
    color: 'from-secondary to-secondary/50',
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build your solution using cutting-edge technologies with regular updates and demos.',
    icon: Code2,
    color: 'from-accent to-accent/50',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Rigorous testing, optimization, and smooth deployment to get your product live.',
    icon: Rocket,
    color: 'from-primary to-secondary',
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={containerRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Our Process
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A proven methodology that transforms ideas into successful digital products.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.15 + 0.2 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  style={{
                    boxShadow: `0 0 40px hsl(var(--primary) / 0.3)`,
                  }}
                >
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors group"
                >
                  {/* Step number */}
                  <span className="text-6xl font-display font-bold text-muted/30 absolute -top-4 -right-2 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </span>
                  
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:gradient-text transition-all relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {step.description}
                  </p>

                  {/* Checkmarks */}
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-4rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}