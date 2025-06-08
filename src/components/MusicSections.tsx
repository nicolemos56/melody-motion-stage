
import React from 'react';
import { MusicCard } from './MusicCard';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, Grid3X3 } from 'lucide-react';

const popularMusic = [
  {
    id: 'p1',
    title: 'Viral Hit',
    artist: 'Trending Artist',
    duration: '3:22',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/popular1.mp3',
    downloads: 25000,
    genre: 'Pop'
  },
  {
    id: 'p2',
    title: 'Chart Topper',
    artist: 'Radio Star',
    duration: '4:05',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/popular2.mp3',
    downloads: 32000,
    genre: 'Rock'
  },
  {
    id: 'p3',
    title: 'Crowd Favorite',
    artist: 'Fan Choice',
    duration: '3:55',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/popular3.mp3',
    downloads: 18500,
    genre: 'Electronic'
  }
];

const favoriteMusic = [
  {
    id: 'f1',
    title: 'Loved Track',
    artist: 'Beloved Artist',
    duration: '4:33',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/favorite1.mp3',
    downloads: 14200,
    genre: 'Indie'
  },
  {
    id: 'f2',
    title: 'Heart Song',
    artist: 'Emotional Voice',
    duration: '5:12',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/favorite2.mp3',
    downloads: 9800,
    genre: 'R&B'
  },
  {
    id: 'f3',
    title: 'Soul Connection',
    artist: 'Deep Feels',
    duration: '3:44',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/favorite3.mp3',
    downloads: 11600,
    genre: 'Soul'
  }
];

const categories = [
  { name: 'Pop', color: 'bg-pink-500', tracks: 1250 },
  { name: 'Rock', color: 'bg-red-500', tracks: 890 },
  { name: 'Electronic', color: 'bg-blue-500', tracks: 756 },
  { name: 'Hip Hop', color: 'bg-purple-500', tracks: 654 },
  { name: 'Jazz', color: 'bg-yellow-500', tracks: 432 },
  { name: 'Classical', color: 'bg-green-500', tracks: 321 },
  { name: 'R&B', color: 'bg-indigo-500', tracks: 567 },
  { name: 'Country', color: 'bg-orange-500', tracks: 398 }
];

export const MusicSections: React.FC = () => {
  return (
    <div className="py-16 space-y-24">
      {/* Mais Baixadas Section */}
      <section id="popular" className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold">Mais Baixadas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMusic.map((music, index) => (
              <div
                key={music.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MusicCard music={music} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white">
              Ver Todas as Populares
            </Button>
          </div>
        </div>
      </section>

      {/* Músicas Favoritas Section */}
      <section className="px-6 lg:px-12 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl lg:text-4xl font-bold">Favoritos da Comunidade</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteMusic.map((music, index) => (
              <div
                key={music.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MusicCard music={music} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="hover:bg-red-500 hover:text-white">
              Explorar Favoritos
            </Button>
          </div>
        </div>
      </section>

      {/* Categorias Section */}
      <section id="categories" className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Grid3X3 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold">Categorias Musicais</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`${category.color} relative overflow-hidden rounded-xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-in-left`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.tracks} faixas</p>
                </div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white transform translate-x-6 -translate-y-6"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white transform -translate-x-4 translate-y-4"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explorar Todas as Categorias
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
