/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScanFace, Upload, Camera, AlertCircle, ArrowLeft, Bookmark } from 'lucide-react';
import { initFaceLandmarker, extractFaceMetrics, classifyFaceShape } from '@/lib/faceAnalysis';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { recommendFrames } from '@/lib/recommendation';
import { useAppStore } from '@/store/useAppStore';
import type { Frame } from '@/lib/mockData';
import Link from 'next/link';

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  const {
    photoUrl, setPhotoUrl,
    faceAnalysis, setFaceAnalysis,
    isAnalyzing, setIsAnalyzing,
    selectedFrame, setSelectedFrame,
    savedFrames, toggleSavedFrame
  } = useAppStore();

  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load demo image automatically if ?demo=true
  useEffect(() => {
    if (isDemo && !photoUrl) {
      // In a real app, we'd use a real public URL demo face. For now we use a placeholder or require upload.
      // Since we don't have a reliable demo face image here, let's just trigger a simulated one or ask user to upload.
      // We will simulate the analysis flow.
    }
  }, [isDemo, photoUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setFaceAnalysis(null);
      setError(null);
      setSelectedFrame(null);
    }
  };

  const runAnalysis = async () => {
    if (!imageRef.current) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const landmarker = await initFaceLandmarker();
      const results = landmarker.detect(imageRef.current);

      if (results.faceLandmarks.length === 0) {
        throw new Error("We couldn't detect a face in this image. Please try another one.");
      }

      if (results.faceLandmarks.length > 1) {
        throw new Error("Multiple faces detected. Please upload a clear solo selfie.");
      }

      const landmarks = results.faceLandmarks[0];
      const metrics = extractFaceMetrics(landmarks);
      const shapeClass = classifyFaceShape(metrics);
      const recommendations = recommendFrames(shapeClass.shape, metrics);

      // Simulate a small delay for the scanning animation effect
      setTimeout(() => {
        setFaceAnalysis({
          landmarks,
          metrics,
          shapeClass,
          recommendations
        });
        setSelectedFrame(recommendations[0].frame);
        setIsAnalyzing(false);
      }, 1500);

    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze face.";
      setError(errorMessage);
      setIsAnalyzing(false);
    }
  };

  // When photoUrl is ready, automatically run analysis
  useEffect(() => {
    if (photoUrl && !faceAnalysis && !isAnalyzing && !error) {
      // Wait for image to load before analyzing
      if (imageRef.current?.complete) {
        runAnalysis();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUrl]);

  if (!photoUrl) {
    return (
      <main className="min-h-screen flex flex-col bg-background p-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-12 w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
        <div className="max-w-xl mx-auto w-full flex flex-col items-center justify-center flex-1">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
            <ScanFace className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black mb-4 text-center">Let&apos;s Find Your Frames.</h1>
          <p className="text-muted-foreground text-center mb-12">
            Use a clear, front-facing photo with good lighting. Look directly at the camera and ensure your eyes are visible.
          </p>

          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
          />
          
          <div className="flex flex-col gap-4 w-full">
            <Button size="lg" className="h-14 text-lg" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-5 h-5 mr-2" /> Upload Photo
            </Button>
            {/* Fallback to file upload on desktop for "Take Photo" MVP simplicity */}
            <Button size="lg" variant="outline" className="h-14 text-lg" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-5 h-5 mr-2" /> Take Photo
            </Button>
          </div>
          
          <p className="mt-8 text-xs text-muted-foreground text-center">
            Your privacy matters. Photos are processed locally on your device and are never stored on our servers without your explicit consent.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Start Over
          </Link>
          <div className="font-black tracking-tighter">FRAMEIQ</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Main Visualization Area */}
          <div className="col-span-1 lg:col-span-7 bg-secondary/30 rounded-3xl overflow-hidden border border-border/50 relative flex items-center justify-center min-h-[60vh]">
            <img 
              ref={imageRef}
              src={photoUrl} 
              alt="User Face" 
              className="max-h-[80vh] w-auto object-contain"
              onLoad={() => {
                if (!faceAnalysis && !isAnalyzing && !error) runAnalysis();
              }}
            />

            {isAnalyzing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <ScanFace className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Analyzing Proportions...</h3>
                <p className="text-muted-foreground">Mapping facial landmarks to find your perfect fit.</p>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-destructive">Analysis Failed</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button onClick={() => setPhotoUrl(null)}>Try Another Photo</Button>
              </div>
            )}

            {/* Virtual Try-On Overlay */}
            {!isAnalyzing && faceAnalysis && selectedFrame && (
              <TryOnOverlay 
                imageElement={imageRef.current} 
                landmarks={faceAnalysis.landmarks} 
                frame={selectedFrame} 
              />
            )}
          </div>

          {/* Results Sidebar */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
            {!isAnalyzing && faceAnalysis && (
              <>
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold tracking-tight uppercase">Your Eyewear Profile</h2>
                      <div className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                        CONFIDENCE: {faceAnalysis.shapeClass.confidence.toUpperCase()}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Estimated Face Shape</div>
                        <div className="text-2xl font-black">{faceAnalysis.shapeClass.shape}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Analysis</div>
                        <p className="text-sm font-light leading-relaxed">{faceAnalysis.shapeClass.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-lg font-bold tracking-tight">Recommended Frames</h3>
                  <Link href="/shortlist" className={buttonVariants({ variant: "link", className: "text-primary p-0 h-auto" })}>
                    View Shortlist ({savedFrames.length})
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 pb-20 custom-scrollbar">
                  {faceAnalysis.recommendations.map((rec: { frame: Frame, score: number, reason: string }) => (
                    <div 
                      key={rec.frame.id}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${selectedFrame?.id === rec.frame.id ? 'bg-secondary/50 border-primary' : 'bg-background border-border/50 hover:border-primary/50'}`}
                      onClick={() => setSelectedFrame(rec.frame)}
                    >
                      {/* Frame Thumbnail */}
                      <div className="w-24 h-24 rounded-xl bg-secondary flex-shrink-0 p-2 flex items-center justify-center">
                        {/* We use a colored block for MVP if images aren't available, but we'll try to load the image */}
                        <div className="w-full h-full bg-background rounded-lg border border-border/50 overflow-hidden relative">
                           {/* Placeholder for frame img */}
                           <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-medium uppercase text-center p-1">
                              {rec.frame.frameShape}
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold">{rec.frame.name}</h4>
                            <div className="text-xs text-muted-foreground">{rec.frame.brand} • {rec.frame.color}</div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                             <div className="text-sm font-black text-primary">{rec.score}%</div>
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 toggleSavedFrame(rec.frame);
                               }}
                               className="text-muted-foreground hover:text-primary transition-colors"
                             >
                               <Bookmark className={`w-5 h-5 ${savedFrames.some(f => f.id === rec.frame.id) ? 'fill-primary text-primary' : ''}`} />
                             </button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Subcomponent for the Try-On Overlay
// This calculates CSS positioning based on landmarks
function TryOnOverlay({ imageElement, landmarks, frame }: { imageElement: HTMLImageElement | null, landmarks: NormalizedLandmark[], frame: Frame }) {
  if (!imageElement) return null;

  // Real calculation would map normalized landmarks [0..1] to intrinsic image pixel dimensions, 
  // then scale by the rendered clientWidth/clientHeight.
  
  // Left eye index 159, Right eye index 386 in MediaPipe
  const leftEye = landmarks[159];
  const rightEye = landmarks[386];

  // Rendered dimensions
  const rect = imageElement.getBoundingClientRect();
  
  const leftX = leftEye.x * rect.width;
  const leftY = leftEye.y * rect.height;
  const rightX = rightEye.x * rect.width;
  const rightY = rightEye.y * rect.height;

  const dx = rightX - leftX;
  const dy = rightY - leftY;
  
  // Center point between eyes
  const centerX = leftX + dx / 2;
  const centerY = leftY + dy / 2;

  // Angle of the face
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Width of the glasses relative to eye distance
  // Typical PD is ~63mm, glasses width ~140mm. So glasses are roughly 2.2x eye distance.
  const eyeDistance = Math.sqrt(dx*dx + dy*dy);
  const glassesWidth = eyeDistance * 2.3; // Magic number that works okay

  return (
    <div 
      className="absolute pointer-events-none transition-all duration-300 ease-out"
      style={{
        left: `${centerX}px`,
        top: `${centerY}px`,
        width: `${glassesWidth}px`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        // We add a slight negative margin or offset depending on where exactly the bridge aligns
      }}
    >
      {/* For MVP, we render a highly stylized CSS representation of the glasses since we lack transparent assets */}
      <div className="relative w-full h-full flex items-center justify-between">
        {/* Left Lens */}
        <div 
          className="border-[3px] border-foreground rounded-xl bg-background/10 backdrop-blur-[2px] shadow-sm"
          style={{
            width: '45%',
            aspectRatio: frame.frameShape === 'Round' ? '1/1' : '3/2',
            borderRadius: frame.frameShape === 'Round' ? '50%' : frame.frameShape === 'Aviator' ? '30% 30% 50% 50%' : '12px'
          }}
        />
        
        {/* Bridge */}
        <div className="w-[10%] h-[3px] bg-foreground mx-1" />

        {/* Right Lens */}
        <div 
          className="border-[3px] border-foreground rounded-xl bg-background/10 backdrop-blur-[2px] shadow-sm"
          style={{
            width: '45%',
            aspectRatio: frame.frameShape === 'Round' ? '1/1' : '3/2',
            borderRadius: frame.frameShape === 'Round' ? '50%' : frame.frameShape === 'Aviator' ? '30% 30% 50% 50%' : '12px'
          }}
        />
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-light tracking-widest uppercase">Loading Analysis...</div>}>
      <AnalyzeContent />
    </React.Suspense>
  );
}
