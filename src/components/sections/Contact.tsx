import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FloatingInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}

function FloatingInput({ label, type = 'text', name, value, onChange, isTextarea }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className="relative group">
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full bg-muted/30 border border-border/50 rounded-xl px-4 pt-6 pb-2 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300 ${
          isTextarea ? 'min-h-[150px] resize-none' : 'h-14'
        }`}
        placeholder={label}
      />
      <motion.label
        animate={{
          y: isActive ? -10 : 0,
          scale: isActive ? 0.85 : 1,
          color: isFocused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
      >
        {label}
      </motion.label>
      
      {/* Focus line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@nexatech.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Address', value: '123 Innovation St, Tech City' },
  ];

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />

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
            className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Contact Us
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Start <span className="gradient-text">Building</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your ideas into reality? Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="font-display text-2xl font-bold">Get in Touch</h3>
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground group-hover:gradient-text transition-all">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <motion.div
              className="hidden lg:block mt-12 p-6 glass-card rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground mb-2">Average response time</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold gradient-text">2hrs</span>
                <span className="text-muted-foreground">during business hours</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FloatingInput
                      label="Your Name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                    />
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <FloatingInput
                    label="Subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                  
                  <FloatingInput
                    label="Your Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    isTextarea
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="glow-button w-full py-7 rounded-xl text-lg font-semibold relative overflow-hidden group"
                    >
                      <span className={`flex items-center justify-center gap-2 transition-opacity ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                      
                      {isSubmitting && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Loader2 className="w-6 h-6 animate-spin" />
                        </motion.div>
                      )}

                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: isSubmitting ? '0%' : '200%' }}
                        transition={{ duration: isSubmitting ? 0 : 2, repeat: isSubmitting ? 0 : Infinity, repeatDelay: 3 }}
                      />
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}