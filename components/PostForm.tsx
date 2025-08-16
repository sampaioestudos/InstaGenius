
import React from 'react';
import type { PostFormState } from '../types';
import { POST_OPTIONS, TONE_OPTIONS, LENGTH_OPTIONS } from '../constants';
import { Wand2 } from 'lucide-react';

interface PostFormProps {
  formState: PostFormState;
  setFormState: React.Dispatch<React.SetStateAction<PostFormState>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const SelectField = ({ label, value, onChange, options }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: {id: string, name: string}[] }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    </div>
);

export const PostForm: React.FC<PostFormProps> = ({ formState, setFormState, onSubmit, isLoading }) => {
  const handleInputChange = (field: keyof PostFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-1">
          Your Idea or Prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder:text-gray-500"
          placeholder="e.g., a relaxing Sunday morning with coffee and a book"
          value={formState.prompt}
          onChange={e => handleInputChange('prompt', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField 
            label="Post Type" 
            value={formState.postType} 
            onChange={e => handleInputChange('postType', e.target.value)} 
            options={POST_OPTIONS} 
        />
        <SelectField 
            label="Caption Tone" 
            value={formState.tone} 
            onChange={e => handleInputChange('tone', e.target.value)} 
            options={TONE_OPTIONS} 
        />
        <SelectField 
            label="Caption Length" 
            value={formState.length} 
            onChange={e => handleInputChange('length', e.target.value)} 
            options={LENGTH_OPTIONS} 
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !formState.prompt}
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        {isLoading ? 'Generating...' : 'Generate Preview'}
      </button>
    </form>
  );
};