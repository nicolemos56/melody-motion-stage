
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Music, Menu, X } from 'lucide-react';

const headerBackgrounds = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80'
];

interface HeaderProps {
  onOpenUploadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenUploadModal }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % headerBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Página Inicial', href: '#home' },
    { label: 'Mais Baixadas', href: '#popular' },
    { label: 'Categorias', href: '#categories' }
  ];

  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {headerBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-primary animate-pulse" />
          <span className="text-2xl font-bold text-white">MusicHub</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md md:hidden">
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 lg:px-12 h-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Descubra Novos
            <span className="block gradient-text">Sons</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 animate-slide-in-left">
            Ouça, baixe e compartilhe as melhores músicas independentes
          </p>
          <Button
            onClick={onOpenUploadModal}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <Music className="w-5 h-5 mr-2" />
            Divulgar Minha Música
          </Button>
        </div>

        {/* Floating Music Bars */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="wave-bar bg-primary w-1 rounded-full"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </header>
  );
};
