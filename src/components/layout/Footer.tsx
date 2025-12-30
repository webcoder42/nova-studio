import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, ArrowUpRight, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const footerLinks = {
  services: [
    { name: 'Web Development', path: '/services#web' },
    { name: 'App Development', path: '/services#app' },
    { name: 'AI Integration', path: '/services#ai' },
    { name: 'Cloud & Blockchain', path: '/services#cloud' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ],
  support: [
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card border-t border-border/50 overflow-hidden">
      {/* Animated gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--secondary)), transparent)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-2xl font-bold text-primary-foreground font-display">N</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-primary blur-lg opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-2xl font-bold font-display group-hover:gradient-text transition-all">NexaTech</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Transforming ideas into exceptional digital experiences. We build the future, one line of code at a time.
            </p>
            
            {/* Social links with wave animation */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors relative group"
                >
                  <social.icon size={18} />
                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {[
            { title: 'Services', links: footerLinks.services },
            { title: 'Company', links: footerLinks.company },
            { title: 'Support', links: footerLinks.support },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-display font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} NexaTech. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-sm text-muted-foreground flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Crafted with 
            <motion.span 
              className="text-secondary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♥
            </motion.span> 
            using cutting-edge technology
          </motion.p>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0,
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-lg z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-primary blur-lg opacity-50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </footer>
  );
}