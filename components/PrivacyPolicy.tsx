
import React from 'react';
import { ShieldCheck, Server, DatabaseZap } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6 md:p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Privacy & Security Policy</h2>
      <div className="space-y-6 text-gray-400">
        <div className="flex items-start space-x-4">
          <ShieldCheck className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-gray-200">API Key Security</h3>
            <p>
              Your API keys are <strong>never</strong> exposed on the client-side (browser). They are configured as Environment Variables within the Vercel platform and are only accessible by the secure, server-side Serverless Functions.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Server className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-gray-200">Serverless Architecture</h3>
            <p>
              All sensitive operations, such as communicating with the Gemini API, happen on a secure, serverless backend. Your browser only communicates with our secure API routes, not directly with third-party services.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <DatabaseZap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-gray-200">No Data Storage</h3>
            <p>
              This application is completely stateless. We do not have a database and do not store any of your prompts, generated content, or personal information. Every session is ephemeral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
