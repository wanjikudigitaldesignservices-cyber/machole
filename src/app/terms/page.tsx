"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 pt-12 pb-24">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black mb-8">Terms and Conditions</h1>
        <div className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the FRAMEIQ application, you agree to comply with and be bound by these Terms and Conditions.</p>
          
          <h2>2. Nature of the Service</h2>
          <p>FRAMEIQ provides an AI-powered styling and virtual try-on experience for eyewear. <strong>The recommendations, measurements, and compatibility scores provided by our software are estimates intended for style and guidance purposes only.</strong></p>
          
          <h2>3. Not Medical Advice</h2>
          <p>FRAMEIQ is not a medical device. It does not provide medical diagnoses, precise pupillary distance (PD) measurements for prescription manufacturing, or optical health evaluations. Always consult a qualified eye-care professional for prescriptions and accurate fittings.</p>
          
          <h2>4. User Content</h2>
          <p>You retain all rights to the photos you upload. By uploading a photo for analysis, you grant FRAMEIQ a temporary license to process the image solely for the purpose of providing the virtual try-on and recommendation features.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>FRAMEIQ is provided "as is" without any warranties. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, including the purchase of ill-fitting physical eyewear based on our virtual try-on.</p>
        </div>
      </div>
    </main>
  );
}
