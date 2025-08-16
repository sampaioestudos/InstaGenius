
export interface ApiKeys {
  gemini: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  instagram: {
    userId: string;
    accessToken: string;
  };
}

export type PostTypeId = 'feed-square' | 'feed-portrait' | 'story-reel';
export type ToneId = 'friendly' | 'professional' | 'witty' | 'inspirational' | 'casual';
export type LengthId = 'short' | 'medium' | 'long';

export interface PostFormState {
  prompt: string;
  postType: PostTypeId;
  tone: ToneId;
  length: LengthId;
}

export interface GeneratedContent {
  caption: string;
  hashtags: string;
  imageBase64: string;
}

export type AppState = 'idle' | 'loading' | 'preview' | 'publishing' | 'published' | 'error';