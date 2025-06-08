
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UploadModal } from '@/components/UploadModal';
import { MusicCarousel } from '@/components/MusicCarousel';
import { MusicSections } from '@/components/MusicSections';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header with Parallax */}
      <div 
        id="home"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)` 
        }}
      >
        <Header onOpenUploadModal={() => setIsUploadModalOpen(true)} />
      </div>

      {/* Music Carousel */}
      <div 
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)` 
        }}
      >
        <MusicCarousel />
      </div>

      {/* Music Sections */}
      <div 
        style={{ 
          transform: `translateY(${scrollY * 0.05}px)` 
        }}
      >
        <MusicSections />
      </div>

      {/* Footer */}
      <Footer />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Index;
