import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

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
  return (
    <footer className="relative bg-card border-t border-border/50">
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <div className="container-custom relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground font-display">N</span>
              </div>
              <span className="text-xl font-bold font-display">NexaTech</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Transforming ideas into exceptional digital experiences. We build the future, one line of code at a time.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexaTech. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with <span className="text-secondary">♥</span> using cutting-edge technology
          </p>
        </div>
      </div>
    </footer>
  );
}
