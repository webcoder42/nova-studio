import { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './HeroScene';
import { HeroContent } from './HeroContent';

const SERVICES_COUNT = 4;
const AUTO_ROTATE_INTERVAL = 4000;

export function Hero() {
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextService = useCallback(() => {
    setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
  }, []);

  const handleServiceChange = useCallback((index: number) => {
    setActiveService(index);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextService, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextService]);

  // Handle scroll wheel to change services
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThreshold = 500; // Minimum time between scroll changes

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;
      
      // Only trigger if user is at the top of the page
      if (window.scrollY > 100) return;

      if (e.deltaY > 0) {
        setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
      } else if (e.deltaY < 0) {
        setActiveService((prev) => (prev - 1 + SERVICES_COUNT) % SERVICES_COUNT);
      }
      
      lastScrollTime = now;
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 10000);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <HeroScene activeService={activeService} />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      
      {/* Content */}
      <HeroContent
        activeService={activeService}
        onServiceChange={handleServiceChange}
      />
    </section>
  );
}
