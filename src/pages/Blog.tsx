import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: 'The Future of AI in Web Development', excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build websites.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', date: 'Dec 20, 2024', readTime: '5 min', category: 'AI' },
  { id: 2, title: 'Building Scalable React Applications', excerpt: 'Best practices for creating maintainable and performant React apps.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', date: 'Dec 15, 2024', readTime: '8 min', category: 'Development' },
  { id: 3, title: 'Web3 and the Decentralized Future', excerpt: 'Understanding blockchain technology and its impact on web development.', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80', date: 'Dec 10, 2024', readTime: '6 min', category: 'Blockchain' },
  { id: 4, title: 'Mobile-First Design Principles', excerpt: 'Creating responsive designs that work seamlessly across all devices.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', date: 'Dec 5, 2024', readTime: '4 min', category: 'Design' },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4">Blog</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Latest <span className="gradient-text">Insights</span></h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Thoughts, tutorials, and updates from our team.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                  <Link to={`/blog/${post.id}`} className="block glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover-lift">
                    <div className="relative h-56 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-xs font-medium text-primary-foreground">{post.category}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold mb-2 group-hover:gradient-text transition-all">{post.title}</h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-primary font-medium">Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
