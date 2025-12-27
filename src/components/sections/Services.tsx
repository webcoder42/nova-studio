import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with React, Next.js, and modern technologies.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
    color: 'from-primary to-primary/50',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter.',
    features: ['iOS & Android', 'Cross-Platform', 'App Store Ready'],
    color: 'from-secondary to-secondary/50',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Machine learning, chatbots, and AI-powered features to automate and enhance your business.',
    features: ['Machine Learning', 'Natural Language', 'Automation'],
    color: 'from-accent to-accent/50',
  },
  {
    icon: Cloud,
    title: 'Cloud & Blockchain',
    description: 'Scalable cloud infrastructure and decentralized applications for the future.',
    features: ['AWS & Azure', 'Smart Contracts', 'Web3 Ready'],
    color: 'from-primary to-secondary',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function Services() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
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
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From concept to deployment, we deliver end-to-end solutions that drive growth and innovation.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover-lift">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group/link"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
