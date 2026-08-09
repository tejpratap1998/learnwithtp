"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Target, BookOpen, PlayCircle, Star, ChevronRight, Lightbulb, Sparkles } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { ToolsSection } from "@/components/ToolsSection";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function HomeClient({ courses }: { courses: any[] }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hero Animation
    gsap.from(".hero-anim", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2
    });

    // Stats Animation
    gsap.from(".stat-anim", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15
    });

    // Courses Animation
    gsap.from(".course-card", {
      scrollTrigger: {
        trigger: ".courses-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15
    });

    // Trainer Animation
    gsap.from(".trainer-content", {
      scrollTrigger: {
        trigger: ".trainer-section",
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".trainer-image", {
      scrollTrigger: {
        trigger: ".trainer-section",
        start: "top 75%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-background text-foreground selection:bg-foreground selection:text-background overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-50 dark:opacity-20 mix-blend-screen pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] opacity-40 dark:opacity-30 pointer-events-none"></div>
          
          {/* Logo Accents - Floating */}
          <div className="absolute top-1/4 left-[10%] opacity-20 dark:opacity-10 animate-[bounce_6s_infinite]">
            <Sparkles size={80} className="text-accent" />
          </div>
          <div className="absolute bottom-1/3 right-[10%] opacity-20 dark:opacity-10 animate-[bounce_8s_infinite]">
            <Lightbulb size={120} className="text-accent" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-sm font-semibold tracking-wide">Elite Training Program v2.0</span>
          </div>
          
          <h1 className="hero-anim text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            <span className="block text-foreground">Build systems that</span>
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-xl opacity-30 dark:opacity-40 rounded-3xl"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-white dark:to-accent">
                scale revenue.
              </span>
            </span>
          </h1>
          
          <p className="hero-anim text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Performance marketing training for those who want to build real brands, master AI-driven growth, and <span className="font-semibold text-foreground">dominate the algorithm.</span>
          </p>
          
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/courses" 
              className="w-full sm:w-auto px-8 py-5 bg-foreground text-background font-bold rounded-2xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-3 text-lg group shadow-[0_0_40px_-10px_rgba(43,27,84,0.5)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              Explore Programs <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-5 bg-card/50 backdrop-blur-md border border-border text-foreground font-bold rounded-2xl hover:bg-muted transition-all flex items-center justify-center gap-3 text-lg hover:scale-105"
            >
              <PlayCircle size={22} /> Watch Free Case Study
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section py-20 bg-card/30 backdrop-blur-md border-y border-border relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
            <div className="stat-anim flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2">$50M+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Ad Spend Managed</p>
            </div>
            
            <div className="stat-anim flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <TrendingUp size={32} className="text-accent" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2">4.5x</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Average ROAS</p>
            </div>

            <div className="stat-anim flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2">500+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Marketers Trained</p>
            </div>

            <div className="stat-anim flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-accent" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2">12+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Proven Frameworks</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOOLS & PLATFORMS SECTION --- */}
      <ToolsSection />

      {/* --- FEATURED COURSES SECTION --- */}
      <section className="courses-section py-24 relative bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="course-card flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-muted text-foreground rounded-full mb-4 inline-block">
                Curriculum
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                Premium Masterclasses
              </h2>
            </div>
            <Link 
              href="/courses" 
              className="font-mono text-sm uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <div key={course._id} className="course-card h-full">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="course-card text-center py-24 bg-card rounded-[2rem] border border-border max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">Exciting Courses Dropping Soon</h3>
              <p className="text-muted-foreground">We are currently crafting some amazing content.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- TRAINER SECTION --- */}
      <section className="trainer-section py-24 border-y border-border bg-card overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="trainer-content space-y-8 order-2 md:order-1">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-foreground text-background rounded-full mb-6 inline-block">
                  The Instructor
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                  Tej Pratap
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  3+ Years Agency & Academy Experience
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I've spent years mastering performance marketing, building scalable revenue engines for top agencies, and teaching ambitious marketers how to dominate their niche. My mission is to give you the exact frameworks that actually work in the real world.
              </p>
              
              <div className="flex gap-8 pt-4">
                <div>
                  <h4 className="text-3xl font-semibold">100+</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Students</p>
                </div>
                <div>
                  <h4 className="text-3xl font-semibold">Top</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Agency Expert</p>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="trainer-image order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-[2rem] bg-muted overflow-hidden border border-border">
                <img 
                  src="/images/tej-pratap.jpg" 
                  alt="Tej Pratap - Instructor" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
