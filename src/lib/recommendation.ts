import { Frame, mockFrames } from './mockData';
import { FaceMetrics } from './faceAnalysis';

export const recommendFrames = (faceShape: string, metrics: FaceMetrics): Array<{ frame: Frame, score: number, reason: string }> => {
  // Simple heuristic for width preference based on FaceMetrics eyeSpacing or faceWidth.
  // We'll use a mocked logic for now.
  let preferredWidth = "Medium";
  if (metrics.faceWidth > 0.4) {
    preferredWidth = "Wide";
  } else if (metrics.faceWidth < 0.3) {
    preferredWidth = "Narrow";
  }

  const results = mockFrames.map(frame => {
    let score = 50; // base score
    let reason = "An okay fit for your face.";
    
    const matchesShape = frame.compatibility_tags.includes(faceShape);
    const matchesWidth = frame.compatibility_tags.includes(preferredWidth);

    if (matchesShape && matchesWidth) {
      score = 92;
      reason = `Perfect proportion match. The ${frame.frameShape} shape complements your ${faceShape} face, and the width is ideal.`;
    } else if (matchesShape) {
      score = 85;
      reason = `Great shape match for your ${faceShape} face.`;
    } else if (matchesWidth) {
      score = 75;
      reason = `Good width fit, though the style is a bold choice for your face shape.`;
    } else {
      score = 60;
      reason = "Try with caution. This might not be the most balanced look for your proportions.";
    }

    return { frame, score, reason };
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
};
