import { create } from 'zustand'
import { Frame } from '@/lib/mockData'
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

export interface FaceAnalysisData {
  landmarks: NormalizedLandmark[];
  metrics: {
    faceWidth: number;
    faceHeight: number;
    eyeSpacing: number;
    jawWidth: number;
    ratio: number;
  };
  shapeClass: {
    shape: string;
    confidence: string;
    reason: string;
  };
  recommendations: Array<{ frame: Frame, score: number, reason: string }>;
}

interface AppState {
  // Face Analysis State
  photoUrl: string | null;
  setPhotoUrl: (url: string | null) => void;
  
  faceAnalysis: FaceAnalysisData | null;
  setFaceAnalysis: (analysis: FaceAnalysisData | null) => void;
  
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  
  // Try-On State
  selectedFrame: Frame | null;
  setSelectedFrame: (frame: Frame | null) => void;
  
  // User Data
  savedFrames: Frame[];
  toggleSavedFrame: (frame: Frame) => void;
}

export const useAppStore = create<AppState>((set) => ({
  photoUrl: null,
  setPhotoUrl: (url) => set({ photoUrl: url }),
  
  faceAnalysis: null,
  setFaceAnalysis: (analysis) => set({ faceAnalysis: analysis }),
  
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  selectedFrame: null,
  setSelectedFrame: (frame) => set({ selectedFrame: frame }),
  
  savedFrames: [],
  toggleSavedFrame: (frame) => set((state) => {
    const exists = state.savedFrames.find(f => f.id === frame.id);
    if (exists) {
      return { savedFrames: state.savedFrames.filter(f => f.id !== frame.id) };
    }
    return { savedFrames: [...state.savedFrames, frame] };
  }),
}))
