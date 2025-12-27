import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, title: 'FinanceFlow', category: 'Web App', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', tech: ['React', 'Node.js', 'PostgreSQL'] },
  { id: 2, title: 'HealthHub', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', tech: ['React Native', 'TensorFlow'] },
  { id: 3, title: 'EcoChain', category: 'Blockchain', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80', tech: ['Solidity', 'Web3.js'] },
  { id: 4, title: 'SmartRetail', category: 'AI Solution', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', tech: ['Python', 'OpenCV'] },
  { id: 5, title: 'TravelBuddy', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', tech: ['Flutter', 'Firebase'] },
  { id: 6, title: 'DataViz Pro', category: 'Web App', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', tech: ['React', 'D3.js'] },
];

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">Portfolio</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Our <span className="gradient-text">Work</span></h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Explore our portfolio of successful projects across various industries.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                  <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover-lift">
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-primary">{project.category}</span>
                      <h3 className="font-display text-xl font-bold mt-1 mb-3 group-hover:gradient-text transition-all">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
