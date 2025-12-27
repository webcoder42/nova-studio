import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Users, Award, Clock, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'We deliver projects on time without compromising quality. Our agile approach ensures rapid development.',
    stat: '2x',
    statLabel: 'Faster Delivery',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols and best practices baked into every project from day one.',
    stat: '99.9%',
    statLabel: 'Uptime',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our developers have an average of 8+ years of experience in cutting-edge technologies.',
    stat: '50+',
    statLabel: 'Experts',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by industry leaders for innovation, design excellence, and technical expertise.',
    stat: '25+',
    statLabel: 'Awards',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support and maintenance to keep your applications running smoothly.',
    stat: '<1hr',
    statLabel: 'Response Time',
  },
  {
    icon: Headphones,
    title: 'Dedicated Partners',
    description: 'We become an extension of your team, fully invested in your success and growth.',
    stat: '95%',
    statLabel: 'Client Retention',
  },
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="section-padding bg-background relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y }}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"
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
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine technical expertise with creative innovation to deliver solutions that exceed expectations.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl glass-card hover:border-primary/30 transition-all duration-500 hover-lift">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="font-display text-4xl font-bold gradient-text">{reason.stat}</span>
                  <span className="block text-sm text-muted-foreground">{reason.statLabel}</span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
