import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const team = [
  { name: 'Alex Thompson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sarah Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Michael Rodriguez', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Emily Watson', role: 'Design Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">About Us</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Building the <span className="gradient-text">Future</span></h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We're a team of passionate developers, designers, and innovators dedicated to creating exceptional digital experiences.</p>
            </motion.div>
          </div>
        </section>

        {/* Mission/Vision */}
        <section className="section-padding bg-card">
          <div className="container-custom grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', text: 'To empower businesses with innovative technology solutions that drive growth and success.' },
              { icon: Eye, title: 'Our Vision', text: 'To be the leading force in digital transformation, shaping the future of technology.' },
              { icon: Heart, title: 'Our Values', text: 'Innovation, integrity, and excellence guide everything we do for our clients.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Meet Our <span className="gradient-text">Team</span></h2>
              <p className="text-lg text-muted-foreground">The talented people behind our success.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                  <div className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-all hover-lift">
                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/20" />
                    <h3 className="font-display text-xl font-bold group-hover:gradient-text transition-all">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
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

export default About;
