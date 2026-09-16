"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 pt-12 pb-24">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black mb-8">Cookies Policy</h1>
        <div className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground max-w-none">
          <h2>What are cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They are used to make websites work efficiently and provide information to the site owners.</p>
          
          <h2>How we use cookies</h2>
          <p>FRAMEIQ uses cookies for the following purposes:</p>
          <ul>
            <li className="text-muted-foreground"><strong>Essential Cookies:</strong> Required to enable core functionality such as user authentication and session management.</li>
            <li className="text-muted-foreground"><strong>Preferences:</strong> To remember your theme (dark/light mode) and UI choices.</li>
            <li className="text-muted-foreground"><strong>Analytics:</strong> To understand how visitors interact with our application to improve the user experience.</li>
          </ul>
          
          <h2>Managing Cookies</h2>
          <p>You can control and/or delete cookies as you wish through your browser settings. Please note that disabling essential cookies may impact your ability to use the full features of the FRAMEIQ application.</p>
        </div>
      </div>
    </main>
  );
}
