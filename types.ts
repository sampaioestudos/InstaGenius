
export type PostTypeId = 'feed-square' | 'feed-portrait' | 'story-reel' | 'carousel';
export type ToneId = 'friendly' | 'professional' | 'witty' | 'inspirational' | 'casual';
export type LengthId = 'short' | 'medium' | 'long';

export interface PostFormState {
  prompt: string;
  postType: PostTypeId;
  tone: ToneId;
  length: LengthId;
}

export interface CaptionVariation {
  caption: string;
  cta: string;
}

export interface GeneratedMedia {
  imageBases64: string[];
}

export interface GeneratedText {
  captionVariations: CaptionVariation[];
  hashtags: string;
}

export type AppState =
  | 'idle'
  | 'loading-media'
  | 'selecting-image'
  | 'loading-text'
  | 'preview'
  | 'publishing'
  | 'published'
  | 'error';
