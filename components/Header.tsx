
import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <h1 className="text-xl font-bold text-white">InstaGenius</h1>
        </div>
        <button 
          onClick={onSettingsClick} 
          className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          aria-label="Open API settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};