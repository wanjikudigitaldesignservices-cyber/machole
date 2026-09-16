import { FilesetResolver, FaceLandmarker, NormalizedLandmark } from '@mediapipe/tasks-vision';

let faceLandmarker: FaceLandmarker | null = null;

export const initFaceLandmarker = async () => {
  if (faceLandmarker) return faceLandmarker;

  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: "IMAGE",
    numFaces: 1,
  });

  return faceLandmarker;
};

export interface FaceMetrics {
  faceWidth: number;
  faceHeight: number;
  eyeSpacing: number;
  jawWidth: number;
  ratio: number;
  landmarks: NormalizedLandmark[];
}

// Distance helper
const distance = (p1: NormalizedLandmark, p2: NormalizedLandmark) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const extractFaceMetrics = (landmarks: NormalizedLandmark[]): FaceMetrics => {
  // Key points based on MediaPipe 478 landmarks
  const topOfForehead = landmarks[10];
  const chin = landmarks[152];
  const leftCheekbone = landmarks[234];
  const rightCheekbone = landmarks[454];
  const leftEye = landmarks[159]; // approx center top
  const rightEye = landmarks[386]; // approx center top
  const leftJaw = landmarks[132];
  const rightJaw = landmarks[361];

  const faceHeight = distance(topOfForehead, chin);
  const faceWidth = distance(leftCheekbone, rightCheekbone);
  const eyeSpacing = distance(leftEye, rightEye);
  const jawWidth = distance(leftJaw, rightJaw);
  
  return {
    faceWidth,
    faceHeight,
    eyeSpacing,
    jawWidth,
    ratio: faceHeight / faceWidth,
    landmarks
  };
};

export const classifyFaceShape = (metrics: FaceMetrics): { shape: string, confidence: string, reason: string } => {
  const { faceWidth, jawWidth, ratio } = metrics;
  
  // Very simplified rule-based classification
  if (ratio > 1.4) {
    if (jawWidth < faceWidth * 0.8) {
      return {
        shape: "Oval",
        confidence: "High",
        reason: "Your face is noticeably longer than it is wide, with softly curved jawlines, fitting the classic Oval profile."
      };
    } else {
      return {
        shape: "Rectangle",
        confidence: "Moderate",
        reason: "Your face is longer than it is wide, but your strong jawline suggests a Rectangular shape."
      };
    }
  } else if (ratio < 1.2) {
    if (jawWidth > faceWidth * 0.9) {
      return {
        shape: "Square",
        confidence: "High",
        reason: "The width and length of your face are nearly equal, combined with a strong, wide jawline."
      };
    } else {
      return {
        shape: "Round",
        confidence: "High",
        reason: "The width and length of your face are nearly equal, with soft, rounded jawlines."
      };
    }
  } else {
    if (jawWidth < faceWidth * 0.75) {
      return {
        shape: "Heart",
        confidence: "Moderate",
        reason: "Your face features a wider forehead/cheek area tapering to a narrower chin."
      };
    } else {
      return {
        shape: "Diamond",
        confidence: "Low",
        reason: "Your cheekbones are the widest part of your face, with a narrower forehead and jaw."
      };
    }
  }
};
