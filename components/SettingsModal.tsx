
import React from 'react';
import { X, AlertTriangle, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ENV_VARS = [
    { name: 'GEMINI_API_KEY', service: 'Gemini', description: 'Required for all content and image generation.' },
    { name: 'CLOUDINARY_CLOUD_NAME', service: 'Cloudinary', description: 'Used for the simulated image upload.' },
    { name: 'CLOUDINARY_API_KEY', service: 'Cloudinary', description: 'Used for the simulated image upload.' },
    { name: 'CLOUDINARY_API_SECRET', service: 'Cloudinary', description: 'Would be required for real signed uploads.' },
    { name: 'INSTAGRAM_USER_ID', service: 'Instagram', description: 'Required for the simulated publishing flow.' },
    { name: 'INSTAGRAM_ACCESS_TOKEN', service: 'Instagram', description: 'Required for the simulated publishing flow.' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700 m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Vercel Deployment Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start space-x-3 bg-blue-900/30 text-blue-300 p-3 rounded-lg border border-blue-500">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
            <div>
              <h4 className="font-semibold">Action Required for Deployment</h4>
              <p className="text-sm">To deploy this application on Vercel, you must configure the following Environment Variables in your Vercel project settings. The app's serverless functions use these keys to securely connect to the APIs.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Required Environment Variables:</h3>
            <div className="border border-gray-700 rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-900 text-xs text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-4 py-2">Variable Name</th>
                            <th scope="col" className="px-4 py-2">Service</th>
                            <th scope="col" className="px-4 py-2">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {ENV_VARS.map(v => (
                            <tr key={v.name} className="hover:bg-gray-700/50">
                                <td className="px-4 py-2 font-mono text-blue-400">{v.name}</td>
                                <td className="px-4 py-2">{v.service}</td>
                                <td className="px-4 py-2 text-gray-400">{v.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <a href="https://vercel.com/docs/projects/environment-variables" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm">
                How to add Environment Variables on Vercel
                <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex justify-end p-4 bg-gray-900 border-t border-gray-700 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};
