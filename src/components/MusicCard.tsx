
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Download, Heart } from 'lucide-react';

interface Music {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioUrl: string;
  downloads: number;
  genre: string;
}

interface MusicCardProps {
  music: Music;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({
  music,
  isPlaying = false,
  onPlay,
  onPause
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleDownload = () => {
    // Simular download
    const link = document.createElement('a');
    link.href = music.audioUrl;
    link.download = `${music.artist} - ${music.title}.mp3`;
    link.click();
  };

  return (
    <Card
      className="group relative overflow-hidden hover-lift transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={music.cover}
          alt={music.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay with buttons */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-black"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-black"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>

        {/* Like button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 transition-all duration-300 ${
            isLiked ? 'text-red-500' : 'text-white'
          } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        {/* Genre badge */}
        <div className="absolute top-2 left-2 bg-primary/80 text-white px-2 py-1 rounded-full text-xs font-medium">
          {music.genre}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{music.title}</h3>
        <p className="text-muted-foreground mb-2 truncate">{music.artist}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{music.duration}</span>
          <span>{music.downloads.toLocaleString()} downloads</span>
        </div>

        {/* Audio element for future use */}
        <audio ref={audioRef} src={music.audioUrl} preload="none" />
      </CardContent>
    </Card>
  );
};
