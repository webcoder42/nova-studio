import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Cloud, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'web',
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge technologies for maximum performance and scalability.',
    features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'SEO Optimization', 'Performance Tuning', 'API Integration'],
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization', 'Push Notifications', 'Offline Support'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Integration',
    description: 'Harness artificial intelligence to automate processes and gain competitive advantages.',
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Chatbots', 'Automation'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & Blockchain',
    description: 'Scalable cloud infrastructure and decentralized solutions for the modern enterprise.',
    features: ['AWS & Azure', 'Kubernetes', 'Smart Contracts', 'DeFi Solutions', 'NFT Platforms', 'Web3 Integration'],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">Our Services</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">What We <span className="gradient-text">Offer</span></h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">End-to-end digital solutions tailored to your business needs.</p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className={`section-padding ${index % 2 === 0 ? 'bg-background' : 'bg-card'}`}>
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="glow-button rounded-full px-8">Get Started</Button>
                  </Link>
                </div>
                <div className={`glass-card rounded-3xl aspect-video flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <service.icon className="w-32 h-32 text-primary/20" />
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Services;
