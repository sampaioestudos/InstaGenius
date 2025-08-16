
import React, { useState } from 'react';
import type { GeneratedText, CaptionVariation } from '../types';
import { Edit3, Send, RotateCcw, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';

interface PreviewCardProps {
  images: string[];
  text: GeneratedText;
  onContentChange: (newVariations: CaptionVariation[], newHashtags: string) => void;
  onPublish: (currentVariation: CaptionVariation, currentImageIndex: number) => void;
  onReset: () => void;
  isCarousel: boolean;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ images, text, onContentChange, onPublish, onReset, isCarousel }) => {
  const [variationIndex, setVariationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleTextChange = (field: 'caption' | 'cta', value: string) => {
    const newVariations = [...text.captionVariations];
    newVariations[variationIndex] = { ...newVariations[variationIndex], [field]: value };
    onContentChange(newVariations, text.hashtags);
  };

  const handleHashtagsChange = (value: string) => {
    onContentChange(text.captionVariations, value);
  };

  const currentVariation = text.captionVariations[variationIndex];

  return (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center">Step 3: Review & Publish</h2>
        
        <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg relative">
            <img 
                src={`data:image/jpeg;base64,${images[imageIndex]}`} 
                alt="Generated preview"
                className="w-full max-h-[500px] object-contain rounded-md mx-auto"
            />
            {isCarousel && images.length > 1 && (
                <>
                    <button onClick={() => setImageIndex(prev => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors text-white">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => setImageIndex(prev => (prev + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors text-white">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {imageIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>

        <div className="space-y-4">
            <div>
                <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Wand2 className="w-4 h-4 mr-2"/>
                    Caption Variations
                </label>
                <div className="flex space-x-2">
                    {text.captionVariations.map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => setVariationIndex(index)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${variationIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                        >
                            Variation {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            
            <EditableField 
                label="Caption"
                value={currentVariation.caption}
                onChange={(e) => handleTextChange('caption', e.target.value)}
                rows={5}
            />
            <EditableField 
                label="Call to Action (CTA)"
                value={currentVariation.cta}
                onChange={(e) => handleTextChange('cta', e.target.value)}
                rows={2}
            />
            <EditableField 
                label="Hashtags"
                value={text.hashtags}
                onChange={(e) => handleHashtagsChange(e.target.value)}
                rows={3}
            />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <button 
                onClick={onReset}
                className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                <RotateCcw className="mr-2 h-5 w-5" />
                Start Over
            </button>
            <button
                onClick={() => onPublish(currentVariation, imageIndex)}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                <Send className="mr-2 h-5 w-5" />
                Publish to Instagram
            </button>
        </div>
    </div>
  );
};

const EditableField = ({ label, value, onChange, rows }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows: number }) => (
    <div>
        <label className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Edit3 className="w-3 h-3 mr-1.5"/>
            {label}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
    </div>
);
