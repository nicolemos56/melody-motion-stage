
import React from 'react';
import { Music, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">MusicHub</span>
            </div>
            <p className="text-muted-foreground">
              Sua plataforma de música independente favorita. Descubra, ouça e baixe as melhores músicas de artistas emergentes.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Página Inicial</a></li>
              <li><a href="#popular" className="text-muted-foreground hover:text-primary transition-colors">Mais Baixadas</a></li>
              <li><a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">Categorias</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Artistas</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          {/* Artists */}
          <div>
            <h3 className="font-semibold mb-4">Para Artistas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Divulgar Música</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Painel do Artista</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analíticas</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Royalties</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 MusicHub. Todos os direitos reservados. Feito com ❤️ para a música independente.</p>
        </div>
      </div>
    </footer>
  );
};
