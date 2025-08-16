
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { PostForm } from './components/PostForm';
import { PreviewCard } from './components/PreviewCard';
import { Loader } from './components/Loader';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import type { PostFormState, GeneratedContent, AppState } from './types';
import { POST_OPTIONS } from './constants';
import { AlertTriangle, CheckCircle2, RotateCcw, RefreshCw, ServerCrash } from 'lucide-react';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [formState, setFormState] = useState<PostFormState>({
    prompt: '',
    postType: 'feed-square',
    tone: 'friendly',
    length: 'short',
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<'generate' | 'publish' | null>(null);

  const handleGenerate = useCallback(async () => {
    setAppState('loading');
    setError(null);
    setGeneratedContent(null);
    setOptimizedImageUrl(null);
    setLastAction('generate');

    const aspectRatio = POST_OPTIONS.find(p => p.id === formState.postType)?.aspectRatio || '1:1';

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, aspectRatio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch from generation endpoint.');
      }
      
      setGeneratedContent(data);
      setAppState('preview');
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during content generation.';
      setError(`Generation Failed: ${errorMessage}`);
      setAppState('error');
    }
  }, [formState]);

  const handlePublish = useCallback(async () => {
    if (!generatedContent) {
        setError('Cannot publish. Missing generated content.');
        setAppState('error');
        return;
    }
    setAppState('publishing');
    setError(null);
    setLastAction('publish');

    try {
        const response = await fetch('/api/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageBase64: generatedContent.imageBase64,
                caption: generatedContent.caption + '\n' + generatedContent.hashtags,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch from publishing endpoint.');
        }

      setOptimizedImageUrl(data.optimizedImageUrl);
      console.log(`Successfully published with ID: ${data.postId}`);
      setAppState('published');

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during publishing.';
      setError(`Publishing Failed: ${errorMessage}`);
      setAppState('error');
    }
  }, [generatedContent]);
  
  const handleContentChange = (field: 'caption' | 'hashtags', value: string) => {
    if (generatedContent) {
      setGeneratedContent({ ...generatedContent, [field]: value });
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setGeneratedContent(null);
    setError(null);
    setOptimizedImageUrl(null);
    setLastAction(null);
    setFormState({
        prompt: '',
        postType: 'feed-square',
        tone: 'friendly',
        length: 'short',
    });
  };

  const handleRetry = useCallback(() => {
    if (lastAction === 'publish') {
      handlePublish();
    } else {
      handleGenerate();
    }
  }, [lastAction, handlePublish, handleGenerate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">InstaGenius AI</h1>
            <p className="text-center text-gray-400 mb-8">Automate your Instagram content creation with AI.</p>
            
            <div className="mb-6 flex items-start space-x-3 bg-yellow-900/30 text-yellow-300 p-4 rounded-lg border border-yellow-500">
                <ServerCrash className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold">Configuration Required for Deployment</h4>
                    <p className="text-sm">This app requires server-side API keys. Please set them as Environment Variables in your Vercel project settings. Click the gear icon for details.</p>
                </div>
            </div>

            {appState === 'idle' && (
                <PostForm 
                    formState={formState} 
                    setFormState={setFormState} 
                    onSubmit={handleGenerate} 
                    isLoading={false} 
                />
            )}
            
            {(appState === 'loading' || appState === 'publishing') && (
                <Loader 
                    message={appState === 'loading' ? 'Generating content with Gemini AI...' : 'Publishing to Instagram...'} 
                />
            )}

            {appState === 'preview' && generatedContent && (
                <PreviewCard 
                    content={generatedContent} 
                    onContentChange={handleContentChange}
                    onPublish={handlePublish} 
                    onReset={handleReset}
                />
            )}
            
            {appState === 'published' && (
                <div className="text-center p-8 bg-green-900/20 border border-green-500 rounded-lg">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-300">Post Published Successfully!</h3>
                    <p className="text-green-200 mt-2 mb-6">Your content is now live on Instagram (simulation).</p>
                    {optimizedImageUrl && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Cloudinary Image URL (simulated):</p>
                            <a href={optimizedImageUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 break-all">{optimizedImageUrl}</a>
                        </div>
                    )}
                    <button onClick={handleReset} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        Create Another Post
                    </button>
                </div>
            )}
            
            {appState === 'error' && error && (
                <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg animate-fade-in">
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-red-300">An Error Occurred</h3>
                    <p className="text-red-200 mt-2 mb-6 max-w-lg mx-auto">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button 
                            onClick={handleReset} 
                            className="w-full sm:w-auto flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            <RotateCcw className="mr-2 h-5 w-5" />
                            Start Over
                        </button>
                        <button 
                            onClick={handleRetry} 
                            className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        <PrivacyPolicy />

        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Gemini, Cloudinary, and the Instagram Graph API.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
