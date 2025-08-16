
import React from 'react';
import type { GeneratedContent } from '../types';
import { Edit3, Send, RotateCcw } from 'lucide-react';

interface PreviewCardProps {
  content: GeneratedContent;
  onContentChange: (field: 'caption' | 'hashtags', value: string) => void;
  onPublish: () => void;
  onReset: () => void;
}

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

export const PreviewCard: React.FC<PreviewCardProps> = ({ content, onContentChange, onPublish, onReset }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center">Content Preview</h2>
        <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg">
            <img 
                src={`data:image/jpeg;base64,${content.imageBase64}`} 
                alt="Generated preview"
                className="w-full max-h-[500px] object-contain rounded-md mx-auto"
            />
        </div>

        <div className="space-y-4">
            <EditableField 
                label="Caption"
                value={content.caption}
                onChange={(e) => onContentChange('caption', e.target.value)}
                rows={6}
            />
            <EditableField 
                label="Hashtags"
                value={content.hashtags}
                onChange={(e) => onContentChange('hashtags', e.target.value)}
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
                onClick={onPublish}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                <Send className="mr-2 h-5 w-5" />
                Publish to Instagram
            </button>
        </div>
    </div>
  );
};