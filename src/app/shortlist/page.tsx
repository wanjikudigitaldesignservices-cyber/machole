"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, HelpCircle, AlertCircle } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import type { Frame } from '@/lib/mockData';

export default function ShortlistPage() {
  const { savedFrames, faceAnalysis } = useAppStore();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  if (!faceAnalysis || savedFrames.length === 0) {
    return (
      <main className="min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-3xl font-black mb-4">No frames saved yet</h2>
        <p className="text-muted-foreground mb-8">Go back to the analysis and save some frames to your shortlist.</p>
        <Link href="/analyze" className={buttonVariants({ size: "lg" })}>
          Scan My Face
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 pt-12 pb-24">
        {/* Navigation / Actions */}
        <div className="flex items-center justify-between mb-12 no-print">
          <Link href="/analyze" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Try-On
          </Link>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" /> Print Report
            </Button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="bg-card text-card-foreground border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl print-container" ref={printRef}>
          {/* Header */}
          <div className="flex justify-between items-start border-b border-border/50 pb-8 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">Your FRAMEIQ Shortlist</h1>
              <p className="text-muted-foreground mt-2">Take this to your local optical store.</p>
            </div>
            <div className="text-2xl font-black tracking-tighter">FRAMEIQ</div>
          </div>

          {/* Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm text-muted-foreground font-bold tracking-tight uppercase mb-2">Estimated Face Shape</h3>
              <p className="text-3xl font-black">{faceAnalysis.shapeClass.shape}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-bold tracking-tight uppercase mb-2">Style Analysis</h3>
              <p className="text-sm font-light leading-relaxed">{faceAnalysis.shapeClass.reason}</p>
            </div>
          </div>

          <h3 className="text-2xl font-black tracking-tight mb-6">Saved Frames ({savedFrames.length})</h3>

          <div className="grid grid-cols-1 gap-6">
            {savedFrames.map((frame) => {
              // Find the score from the original recommendations if possible, or mock it
              const rec = faceAnalysis.recommendations.find((r: { frame: Frame }) => r.frame.id === frame.id);
              const score = rec ? rec.score : 85;

              return (
                <div key={frame.id} className="flex gap-6 items-center border border-border/50 p-6 rounded-2xl bg-secondary/20">
                  <div className="w-32 h-32 bg-background border border-border/50 rounded-xl flex items-center justify-center flex-shrink-0">
                     <span className="text-xs font-bold uppercase text-muted-foreground">{frame.frameShape}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold">{frame.name}</h4>
                      <div className="text-lg font-black text-primary">{score}% Match</div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 mt-4 text-sm">
                      <div><span className="text-muted-foreground">Brand:</span> {frame.brand}</div>
                      <div><span className="text-muted-foreground">Shape:</span> {frame.frameShape}</div>
                      <div><span className="text-muted-foreground">Width:</span> {frame.widthCategory}</div>
                      <div><span className="text-muted-foreground">Color:</span> {frame.color}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-border/50 text-xs text-muted-foreground font-light flex items-start gap-4">
            <HelpCircle className="w-8 h-8 flex-shrink-0" />
            <p>
              <strong>To the Optician:</strong> These frames were selected using FRAMEIQ&apos;s facial landmark analysis engine. They represent style and proportion preferences based on an AI analysis of the customer&apos;s photo. This is not a medical prescription or an accurate pupillary distance measurement. Please provide professional fitting and styling adjustments.
            </p>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
          }
          .no-print {
            display: none;
          }
        }
      `}} />
    </main>
  );
}
