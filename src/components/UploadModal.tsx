
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Music, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const musicGenres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Blues', 'Electronic',
  'Classical', 'Reggae', 'Folk', 'Funk', 'Gospel', 'Latin', 'Alternative'
];

const paymentMethods = [
  { id: 'credit-card', name: 'Cartão de Crédito', icon: CreditCard },
  { id: 'pix', name: 'PIX', icon: CheckCircle },
  { id: 'paypal', name: 'PayPal', icon: CreditCard },
  { id: 'bank-transfer', name: 'Transferência Bancária', icon: CreditCard }
];

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    artistName: '',
    songTitle: '',
    genre: '',
    releaseDate: '',
    description: '',
    coverFile: null as File | null,
    musicFile: null as File | null,
    paymentMethod: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (step === 1) {
      // Validação da primeira etapa
      if (!formData.artistName || !formData.songTitle || !formData.genre || !formData.releaseDate) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.coverFile || !formData.musicFile) {
        toast({
          title: "Arquivos obrigatórios",
          description: "Por favor, faça upload da capa e do arquivo de música.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!formData.paymentMethod) {
      toast({
        title: "Método de pagamento",
        description: "Por favor, selecione um método de pagamento.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: "Sua solicitação foi enviada com sucesso. Você receberá um email de confirmação em breve.",
    });
    
    // Reset form and close modal
    setFormData({
      artistName: '',
      songTitle: '',
      genre: '',
      releaseDate: '',
      description: '',
      coverFile: null,
      musicFile: null,
      paymentMethod: ''
    });
    setStep(1);
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="artistName">Nome do Artista *</Label>
          <Input
            id="artistName"
            value={formData.artistName}
            onChange={(e) => handleInputChange('artistName', e.target.value)}
            placeholder="Digite o nome do artista"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="songTitle">Título da Música *</Label>
          <Input
            id="songTitle"
            value={formData.songTitle}
            onChange={(e) => handleInputChange('songTitle', e.target.value)}
            placeholder="Digite o título da música"
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="genre">Gênero Musical *</Label>
          <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              {musicGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="releaseDate">Data de Lançamento *</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => handleInputChange('releaseDate', e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Conte-nos um pouco sobre sua música..."
          className="mt-2"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cover">Capa da Música *</Label>
          <div className="mt-2">
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('coverFile', e.target.files?.[0] || null)}
              className="hidden"
            />
            <Label
              htmlFor="cover"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.coverFile ? formData.coverFile.name : 'Clique para fazer upload'}
                </p>
              </div>
            </Label>
          </div>
        </div>

        <div>
          <Label htmlFor="music">Arquivo de Música *</Label>
          <div className="mt-2">
            <Input
              id="music"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange('musicFile', e.target.files?.[0] || null)}
              className="hidden"
            />
            <Label
              htmlFor="music"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-center">
                <Music className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.musicFile ? formData.musicFile.name : 'Clique para fazer upload'}
                </p>
              </div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Forma de Pagamento</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione como você gostaria de processar o pagamento para divulgação
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                formData.paymentMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleInputChange('paymentMethod', method.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6" />
                <span className="font-medium">{method.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Resumo da Solicitação:</h4>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Artista:</span> {formData.artistName}</p>
          <p><span className="font-medium">Música:</span> {formData.songTitle}</p>
          <p><span className="font-medium">Gênero:</span> {formData.genre}</p>
          <p><span className="font-medium">Data de Lançamento:</span> {formData.releaseDate}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 1 ? 'Divulgar Minha Música' : 'Forma de Pagamento'}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {step === 1 ? renderStep1() : renderStep2()}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => step === 1 ? onClose() : setStep(step - 1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancelar' : 'Voltar'}</span>
          </Button>

          <Button
            onClick={step === 1 ? handleNext : handleSubmit}
            className="flex items-center space-x-2"
          >
            <span>{step === 1 ? 'Próximo' : 'Enviar Solicitação'}</span>
            {step === 1 ? <ArrowRight className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
