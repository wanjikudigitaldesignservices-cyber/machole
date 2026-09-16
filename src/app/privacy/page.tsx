"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 pt-12 pb-24">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground max-w-none">
          <h2>1. Introduction</h2>
          <p>At FRAMEIQ, we take your privacy seriously. This policy explains how we handle your data, particularly your biometric and facial data used during the virtual try-on experience.</p>
          
          <h2>2. Facial Data & Images</h2>
          <p>When you use the "Analyze My Face" feature, the facial landmark analysis is performed <strong>locally on your device</strong> using browser-based computer vision models. Your photos are not uploaded to our servers unless you explicitly choose to create an account and save your profile.</p>
          
          <h2>3. Data Storage</h2>
          <p>If you create an account to save your shortlist, we securely store your email, encrypted password, and the metadata of your eyewear profile (e.g., face shape, recommended frame widths). You can delete your account and all associated data at any time from your account settings.</p>
          
          <h2>4. Third-Party Services</h2>
          <p>We do not sell your personal data. We may use anonymized analytics to improve our recommendation algorithms.</p>
          
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@frameiq.example.com.</p>
        </div>
      </div>
    </main>
  );
}
