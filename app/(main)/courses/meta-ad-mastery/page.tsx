import Link from "next/link";
import { CheckCircle2, PlayCircle, FileText, Users, Award, MonitorPlay, MessageCircle } from "lucide-react";

export default function MetaAdMasteryCourse() {
  return (
    <div className="flex flex-col w-full">
      {/* Course Hero */}
      <section className="bg-card border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-6">
              Bestseller
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meta Ad Mastery</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Master Facebook & Instagram Ads from Zero to Advanced Scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/login?redirect=checkout" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all text-center"
              >
                Enroll Now - ₹4,999
              </Link>
              <a 
                href="#curriculum" 
                className="bg-secondary text-secondary-foreground border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-all text-center"
              >
                Preview Curriculum
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MonitorPlay size={16} /> Lifetime Access</span>
              <span className="flex items-center gap-1"><Award size={16} /> Certificate</span>
              <span className="flex items-center gap-1"><Users size={16} /> Community Access</span>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20"></div>
            <PlayCircle size={64} className="text-foreground relative z-10 opacity-80" />
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-12">
            
            {/* What you'll learn */}
            <div>
              <h2 className="text-3xl font-bold mb-6">What You&apos;ll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Business Manager Setup & Ad Account Structure",
                  "Pixel Installation & Advanced Event Tracking",
                  "Campaign Architecture & Objective Selection",
                  "Budget Optimization (CBO vs ABO)",
                  "Hook Psychology & Ad Copywriting Framework",
                  "Scaling Frameworks & Retargeting Systems",
                  "Lead Generation Funnels & E-commerce Scaling",
                  "AI Tools for Meta Ads & Creative Generation"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-success shrink-0 mt-0.5" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div id="curriculum">
              <h2 className="text-3xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4">
                {[
                  { title: "Module 1: Meta Ads Fundamentals", count: "4 lessons" },
                  { title: "Module 2: Campaign Architecture", count: "4 lessons" },
                  { title: "Module 3: Creative Strategy", count: "4 lessons" },
                  { title: "Module 4: Performance Optimization", count: "4 lessons" },
                  { title: "Module 5: Advanced Strategies", count: "4 lessons" },
                ].map((module, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-center cursor-pointer">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <span className="text-sm text-muted-foreground">{module.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-card border border-border p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-4">Course Includes</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground"><MonitorPlay size={20} className="text-primary"/> 20+ Hours of Video</li>
                <li className="flex items-center gap-3 text-muted-foreground"><FileText size={20} className="text-primary"/> Downloadable Resources</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Users size={20} className="text-primary"/> Private Community Access</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Award size={20} className="text-primary"/> Certificate of Completion</li>
                <li className="flex items-center gap-3 text-muted-foreground"><MessageCircle size={20} className="text-primary"/> Direct WhatsApp Support</li>
              </ul>
              <Link 
                href="/login?redirect=checkout" 
                className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Enroll Now - ₹4,999
              </Link>
            </div>
            
            {/* Instructor */}
            <div className="bg-card border border-border p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground">
                  TP
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Tejpratap (TP)</h4>
                  <p className="text-sm text-muted-foreground">Performance Marketer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Manager at Calibre. Experienced in scaling healthcare, education, and local businesses through data-driven performance marketing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Bottom Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40 flex items-center justify-between">
        <div className="font-bold text-lg">₹4,999</div>
        <Link 
          href="/login?redirect=checkout" 
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
