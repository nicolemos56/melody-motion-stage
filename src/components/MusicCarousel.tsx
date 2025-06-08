
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MusicCard } from './MusicCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredMusic = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Nova',
    duration: '3:45',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample1.mp3',
    downloads: 12500,
    genre: 'Electronic'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Blue Horizon',
    duration: '4:12',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample2.mp3',
    downloads: 8900,
    genre: 'Ambient'
  },
  {
    id: '3',
    title: 'City Lights',
    artist: 'Urban Beats',
    duration: '3:28',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample3.mp3',
    downloads: 15600,
    genre: 'Hip Hop'
  },
  {
    id: '4',
    title: 'Mountain Echo',
    artist: 'Nature Sounds',
    duration: '5:33',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample4.mp3',
    downloads: 7200,
    genre: 'Folk'
  },
  {
    id: '5',
    title: 'Neon Nights',
    artist: 'Synthwave Co.',
    duration: '4:07',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample5.mp3',
    downloads: 11300,
    genre: 'Synthwave'
  },
  {
    id: '6',
    title: 'Jazz Café',
    artist: 'Smooth Trio',
    duration: '6:15',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/sample6.mp3',
    downloads: 5800,
    genre: 'Jazz'
  }
];

export const MusicCarousel: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemWidth = 320; // Width of each card + gap
  const visibleItems = 4; // Number of items visible at once

  const handlePlay = (musicId: string) => {
    setCurrentPlaying(musicId);
  };

  const handlePause = () => {
    setCurrentPlaying(null);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < featuredMusic.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);

  return (
    <section className="py-16 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 animate-fade-in">
              Músicas em Destaque
            </h2>
            <p className="text-muted-foreground animate-slide-in-left">
              Descubra as últimas adições ao nosso catálogo
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollTo('left')}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollTo('right')}
              disabled={currentIndex >= featuredMusic.length - visibleItems}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex space-x-6 transition-transform duration-500 ease-in-out"
            style={{ width: `${featuredMusic.length * itemWidth}px` }}
          >
            {featuredMusic.map((music) => (
              <div
                key={music.id}
                className="flex-shrink-0"
                style={{ width: '300px' }}
              >
                <MusicCard
                  music={music}
                  isPlaying={currentPlaying === music.id}
                  onPlay={() => handlePlay(music.id)}
                  onPause={handlePause}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(featuredMusic.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                Math.floor(currentIndex / visibleItems) === index ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index * visibleItems)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
