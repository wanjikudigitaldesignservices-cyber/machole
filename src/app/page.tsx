import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, ScanFace, Glasses, ShoppingBag, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-8 flex items-center justify-between relative z-10">
        <div className="text-2xl font-black tracking-tighter uppercase">FRAMEIQ</div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-muted-foreground">
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="#why-frameiq" className="hover:text-foreground transition-colors">Why FRAMEIQ</Link>
          <Link href="/for-stores" className="hover:text-foreground transition-colors">Optical Stores</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/analyze?demo=true" className={buttonVariants({ variant: "outline", className: "hidden sm:flex border-border/50 bg-background/50 backdrop-blur-md" })}>
            Try Demo
          </Link>
          <Link href="/analyze" className={buttonVariants({ className: "rounded-full px-6 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]" })}>
            Analyze My Face
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-24 pb-32 flex flex-col md:flex-row items-center justify-between z-10">
        <div className="flex-1 flex flex-col items-start gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            AI-powered eyewear recommendations
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-foreground">
            Stop Guessing <br />
            <span className="text-muted-foreground">Which Glasses Suit You.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mt-4 leading-relaxed font-light">
            Scan your face, discover your best frame shapes, and virtually try them on before you buy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Link href="/analyze" className={buttonVariants({ size: "lg", className: "rounded-full px-8 text-base h-14 group shadow-lg" })}>
              Start Face Scan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/analyze?demo=true" className={buttonVariants({ size: "lg", variant: "secondary", className: "rounded-full px-8 text-base h-14" })}>
              Try with Demo Photo
            </Link>
          </div>
        </div>

        {/* Hero Visual Concept */}
        <div className="flex-1 w-full mt-20 md:mt-0 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden bg-secondary border border-border/50 shadow-2xl">
            {/* We'll use a placeholder image for the hero, or just a stylized gradient/abstract UI */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 p-8">
              <div className="relative w-48 h-48 rounded-full border border-border/50 flex items-center justify-center before:absolute before:inset-0 before:border before:border-dashed before:border-muted-foreground/30 before:rounded-full before:animate-[spin_20s_linear_infinite]">
                 <ScanFace className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium mb-1">Face Geometry Mapped</div>
                <div className="text-xs text-muted-foreground font-mono">CONFIDENCE: HIGH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="w-full bg-secondary/30 border-y border-border/50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg font-light">A seamless process from analysis to your personalized shortlist.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ScanFace, title: "1. Scan", desc: "Take or upload a clear photo." },
              { icon: Sparkles, title: "2. Analyze", desc: "FRAMEIQ maps your facial proportions and identifies suitable frame characteristics." },
              { icon: Glasses, title: "3. Try", desc: "Virtually preview recommended frames on your face." },
              { icon: ShoppingBag, title: "4. Buy With Confidence", desc: "Take your personalized shortlist to your optical store." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <step.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why FRAMEIQ / Disclaimer */}
      <section id="why-frameiq" className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Why FRAMEIQ</h2>
          <ul className="space-y-4 font-light text-lg text-muted-foreground">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Personalized recommendations</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Face-proportion analysis</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Virtual try-on</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Frame size guidance</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Style comparison</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Save your favorites</li>
          </ul>
        </div>
        <div className="flex-1 bg-secondary/50 border border-border/50 p-8 rounded-3xl">
          <h4 className="font-bold tracking-tight mb-2">Important Notice</h4>
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            FRAMEIQ provides style and fit guidance based on estimated facial proportions. It does not replace an optometrist or professional fitting. Your prescription and professional measurements should always come from a qualified eye-care professional.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/50 py-12 flex flex-col items-center justify-center text-sm text-muted-foreground font-light gap-4">
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
        </div>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} FRAMEIQ. All rights reserved.</p>
          <p className="mt-2 text-xs">Know Your Frame. Before You Buy.</p>
        </div>
      </footer>
    </main>
  );
}
