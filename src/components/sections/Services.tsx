import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Smartphone, Brain, Cloud, ArrowRight, Palette, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with React, Next.js, and modern technologies.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
    gradient: 'from-violet-500 to-purple-600',
    shadowColor: 'violet',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter.',
    features: ['iOS & Android', 'Cross-Platform', 'App Store Ready'],
    gradient: 'from-pink-500 to-rose-600',
    shadowColor: 'pink',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Machine learning, chatbots, and AI-powered features to automate and enhance your business.',
    features: ['Machine Learning', 'Natural Language', 'Automation'],
    gradient: 'from-cyan-500 to-blue-600',
    shadowColor: 'cyan',
  },
  {
    icon: Cloud,
    title: 'Cloud & Blockchain',
    description: 'Scalable cloud infrastructure and decentralized applications for the future.',
    features: ['AWS & Azure', 'Smart Contracts', 'Web3 Ready'],
    gradient: 'from-purple-500 to-indigo-600',
    shadowColor: 'purple',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    features: ['User Research', 'Prototyping', 'Design Systems'],
    gradient: 'from-orange-500 to-amber-600',
    shadowColor: 'orange',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your digital assets with enterprise-grade security solutions.',
    features: ['Penetration Testing', 'Compliance', 'Monitoring'],
    gradient: 'from-emerald-500 to-green-600',
    shadowColor: 'emerald',
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Zap className="w-4 h-4" />
            Our Services
          </motion.span>
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
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants}>
              <TiltCard>
                <div className="h-full glass-card rounded-2xl p-7 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon with morph animation */}
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                    {/* Icon glow */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                  </motion.div>

                  {/* Content */}
                  <h3 
                    className="font-display text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-muted-foreground mb-5 leading-relaxed text-sm"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {service.description}
                  </p>

                  {/* Features with stagger reveal */}
                  <div className="flex flex-wrap gap-2 mb-5" style={{ transform: 'translateZ(15px)' }}>
                    {service.features.map((feature, i) => (
                      <motion.span
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group/link"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}