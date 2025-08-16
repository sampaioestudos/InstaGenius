
import type { PostTypeId, ToneId, LengthId } from './types';

export const POST_OPTIONS: { id: PostTypeId; name: string; aspectRatio: string; dimensions: string; }[] = [
  { id: 'feed-square', name: 'Feed Post (Square)', aspectRatio: '1:1', dimensions: '1080x1080' },
  { id: 'feed-portrait', name: 'Feed Post (Portrait)', aspectRatio: '4:5', dimensions: '1080x1350' },
  { id: 'story-reel', name: 'Story / Reel', aspectRatio: '9:16', dimensions: '1080x1920' },
  { id: 'carousel', name: 'Carousel (5 Images)', aspectRatio: '1:1', dimensions: '1080x1080' },
];

export const TONE_OPTIONS: { id: ToneId; name: string }[] = [
  { id: 'friendly', name: 'Friendly' },
  { id: 'professional', name: 'Professional' },
  { id: 'witty', name: 'Witty' },
  { id: 'inspirational', name: 'Inspirational' },
  { id: 'casual', name: 'Casual' },
];

export const LENGTH_OPTIONS: { id: LengthId; name: string }[] = [
  { id: 'short', name: 'Short (~50 words)' },
  { id: 'medium', name: 'Medium (~100 words)' },
  { id: 'long', name: 'Long (150+ words)' },
];
