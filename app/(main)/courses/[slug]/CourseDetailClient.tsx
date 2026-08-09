"use client";

import { CheckCircle2, PlayCircle, FileText, Users, Award, MonitorPlay, Zap, ArrowLeft } from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CourseDetailClient({ course }: { course: any }) {
  const containerRef = useRef(null);

  // Fallback data
  const whatYouWillLearn = [
    "Master the core concepts of this topic",
    "Build real-world projects",
    "Learn industry best practices",
    "Get certified upon completion"
  ];

  const curriculum = [
    { title: "Module 1: Introduction", count: "3 lessons" },
    { title: "Module 2: Core Concepts", count: "5 lessons" },
    { title: "Module 3: Advanced Techniques", count: "4 lessons" },
    { title: "Module 4: Final Project", count: "1 project" }
  ];

  useGSAP(() => {
    // Cinematic Header Animation
    gsap.from(".cinematic-header > *", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
    });

    // Main Content Animation
    gsap.from(".content-block", {
      scrollTrigger: {
        trigger: ".main-content",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
    });

    // Sticky Sidebar Animation
    gsap.from(".glass-sidebar", {
      scrollTrigger: {
        trigger: ".main-content",
        start: "top 80%",
      },
      x: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-background text-foreground overflow-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden">
        {/* Deep Glowing Background */}
        <div className="absolute inset-0 bg-background z-0"></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-70 pointer-events-none mix-blend-screen animate-pulse duration-[10000ms] z-0"></div>
        
        <div className="cinematic-header container relative z-10 mx-auto px-4 text-center">
          <Link href="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 text-sm uppercase tracking-widest font-mono">
            <ArrowLeft size={16} /> Back to Programs
          </Link>

          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border text-accent shadow-[0_0_20px_-5px_rgba(212,175,55,0.2)]">
              <Zap size={16} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{course.level || "Premium Masterclass"}</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter max-w-5xl mx-auto leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              {course.title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap font-mono uppercase tracking-widest">
            <span className="flex items-center gap-2"><MonitorPlay size={16} className="text-primary"/> Lifetime Access</span>
            <span className="flex items-center gap-2"><Award size={16} className="text-accent"/> Certificate</span>
            <span className="flex items-center gap-2"><Users size={16} className="text-primary"/> Community</span>
          </div>
        </div>
      </section>

      {/* Floating Video Preview & Main Content */}
      <section className="main-content relative z-20 pb-24 -mt-32">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Floating Massive Video Player */}
          <div className="cinematic-header relative aspect-[21/9] md:aspect-[16/9] rounded-[2rem] overflow-hidden bg-card border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] mb-16 group">
            {course.thumbnail ? (
              <>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer border border-accent/30 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                    <PlayCircle size={48} className="text-accent fill-accent/20 ml-2" />
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-card to-muted flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer border border-primary/30">
                  <PlayCircle size={48} className="text-primary ml-2" />
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Content Area */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* What You'll Learn */}
              <div className="content-block">
                <h2 className="text-4xl font-black mb-8 tracking-tight">What You&apos;ll <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Learn</span></h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" size={24} />
                      <span className="text-lg text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="content-block" id="curriculum">
                <h2 className="text-4xl font-black mb-8 tracking-tight">Curriculum <span className="text-muted-foreground/30">Overview</span></h2>
                <div className="space-y-4">
                  {curriculum.map((module, i) => (
                    <div key={i} className="group border border-border rounded-2xl p-6 bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">Mod {i + 1}</span>
                          <h3 className="font-semibold text-xl group-hover:text-accent transition-colors">{module.title}</h3>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{module.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="content-block bg-card border border-border p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-3xl font-black mb-8 relative z-10">Your <span className="text-primary">Instructor</span></h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <img src="/images/tej-pratap.jpg" alt="Tej Pratap" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Tej Pratap</h3>
                    <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Performance Marketing Expert</p>
                    <p className="text-muted-foreground leading-relaxed">
                      I've spent years mastering performance marketing, building scalable revenue engines for top agencies. My mission is to give you the exact frameworks that actually work in the real world, cutting out all the theoretical fluff.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar - Glassmorphism Pricing */}
            <div className="lg:col-span-1">
              <div className="glass-sidebar sticky top-24 rounded-[2rem] bg-card/60 backdrop-blur-xl border border-white/10 p-8 shadow-[0_0_50px_-15px_rgba(43,27,84,0.4)] dark:shadow-[0_0_50px_-15px_rgba(255,255,255,0.1)]">
                
                <div className="text-center mb-8 border-b border-border pb-8">
                  <span className="block text-sm font-mono text-accent uppercase tracking-widest mb-4">Enrollment Open</span>
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-5xl font-black text-foreground">₹{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through decoration-destructive/50">₹{course.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-5 mb-8">
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MonitorPlay size={18} className="text-primary"/></div>
                    <span className="text-sm font-medium">{course.duration || "10+ Hours"} of Elite Content</span>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><FileText size={18} className="text-accent"/></div>
                    <span className="text-sm font-medium">Actionable Resources & Templates</span>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Users size={18} className="text-primary"/></div>
                    <span className="text-sm font-medium">Private Community Access</span>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><Award size={18} className="text-accent"/></div>
                    <span className="text-sm font-medium">Official Certification</span>
                  </li>
                </ul>
                
                <div className="pt-4">
                  <EnrollButton courseId={course._id.toString()} />
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2">
                  <CheckCircle2 size={12} className="text-success" /> 14-Day Money-Back Guarantee
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
