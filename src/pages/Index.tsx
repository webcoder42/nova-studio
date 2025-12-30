import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { ContactSection } from '@/components/sections/Contact';
import { CTA } from '@/components/sections/CTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
