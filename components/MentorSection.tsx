"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Search, TrendingUp, LineChart, FileText, Sparkles, CheckCircle2, XCircle, Play, ArrowRight, Briefcase, Settings, Target, Globe, Compass } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MentorSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Use fromTo to avoid React Strict Mode state bugs
      gsap.fromTo(".mentor-header", 
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ".mentor-header", start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".mentor-profile-left",
        { x: -50, opacity: 0 },
        { scrollTrigger: { trigger: ".mentor-profile-section", start: "top 80%" }, x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".mentor-profile-right",
        { x: 50, opacity: 0 },
        { scrollTrigger: { trigger: ".mentor-profile-section", start: "top 80%" }, x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".stat-card",
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: ".stats-grid", start: "top 85%" }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(".expertise-card",
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ".expertise-grid", start: "top 85%" }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(".philosophy-step",
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ".philosophy-section", start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
      );

      gsap.fromTo(".philosophy-quote",
        { scale: 0.95, opacity: 0 },
        { scrollTrigger: { trigger: ".philosophy-quote", start: "top 85%" }, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(".compare-col",
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ".compare-section", start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
      
      gsap.fromTo(".brand-video-section",
        { y: 40, opacity: 0, scale: 0.98 },
        { scrollTrigger: { trigger: ".brand-video-section", start: "top 85%" }, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".mentor-img-parallax",
        { y: -20 },
        { scrollTrigger: { trigger: ".mentor-img-container", start: "top bottom", end: "bottom top", scrub: 1 }, y: 20, ease: "none" }
      );

      gsap.fromTo(".expect-card",
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ".expect-grid", start: "top 85%" }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
      
      gsap.fromTo(".closing-cta-section",
        { y: 40, opacity: 0, scale: 0.95 },
        { scrollTrigger: { trigger: ".closing-cta-section", start: "top 85%" }, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      gsap.utils.toArray(".section-header-anim").forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 30, opacity: 0 },
          { scrollTrigger: { trigger: elem, start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      });

      // Horizontal Scroll Animation for Desktop
      const timelineContainer = document.querySelector(".philosophy-timeline-container") as HTMLElement;
      if (timelineContainer) {
        gsap.to(timelineContainer, {
          x: () => -(timelineContainer.scrollWidth - window.innerWidth + 200),
          ease: "none",
          scrollTrigger: {
            trigger: ".philosophy-timeline-trigger",
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + (timelineContainer.scrollWidth - window.innerWidth + 200),
            invalidateOnRefresh: true,
          }
        });
      }

    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* 1. Section Heading */}
        <div className="mentor-header text-center mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-muted text-foreground rounded-full mb-6 inline-block">
            Learn From Someone Who Actually Runs Campaigns
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            Meet Your Mentor
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Learn Digital Marketing from a Performance Marketer who works with real businesses, real campaigns, and real growth challenges.
          </p>
        </div>

        {/* 2. Main Mentor Profile & 3. Authority Stats */}
        <div className="mentor-profile-section grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="mentor-profile-left order-2 md:order-1 space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4">Tejpratap</h3>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-6 flex flex-wrap gap-2">
                <span className="bg-primary/10 px-3 py-1 rounded-full">Performance Marketer</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">Meta Ads Expert</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">Digital Marketing Trainer</span>
              </p>
            </div>
            
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-xl font-medium text-foreground">Hi, I'm Tejpratap.</p>
              <p className="text-muted-foreground">
                I'm a Performance Marketer, Digital Marketing Trainer, and Meta Ads specialist focused on helping students and businesses understand digital marketing from a practical, performance-driven perspective.
              </p>
              <p className="text-muted-foreground border-l-4 border-primary pl-4 italic">
                My approach is simple: don't just learn what a tool does—learn how to use it to generate real business results.
              </p>
            </div>

            {/* Stats Grid inside left column */}
            <div className="stats-grid grid grid-cols-2 gap-4 pt-4">
              <div className="stat-card bg-card border border-border p-5 rounded-2xl">
                <h4 className="text-3xl font-black text-foreground mb-1">3+</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Years Agency & Academy Experience</p>
              </div>
              <div className="stat-card bg-card border border-border p-5 rounded-2xl">
                <h4 className="text-3xl font-black text-foreground mb-1">100+</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Students Trained</p>
              </div>
              <div className="stat-card bg-card border border-border p-5 rounded-2xl">
                <h4 className="text-3xl font-black text-foreground mb-1">Multiple</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Industry Campaigns</p>
              </div>
              <div className="stat-card bg-card border border-border p-5 rounded-2xl">
                <h4 className="text-3xl font-black text-foreground mb-1">Hands-On</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Performance Marketing</p>
              </div>
            </div>
          </div>

          <div className="mentor-profile-right order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-muted border border-border group shadow-2xl mentor-img-container">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none"></div>
              <img 
                src="/images/tej-pratap.jpg" 
                alt="Tejpratap - Performance Marketer" 
                className="w-full h-[120%] object-cover mentor-img-parallax absolute top-[-10%]"
              />
            </div>
          </div>
        </div>

        {/* 3.5 Brand Video CTA */}
        <div className="brand-video-section max-w-5xl mx-auto mb-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[3rem] blur-3xl -z-10 group-hover:blur-4xl transition-all duration-700"></div>
          <div className="bg-black/80 dark:bg-card/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
            <div className="text-center mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/10 rounded-full mb-6 inline-block">
                YOUR MENTOR
              </span>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 mb-10 shadow-2xl group/video cursor-pointer">
              {/* Replace src with actual video later */}
              <video 
                src="/videos/intro.mp4" 
                poster="/images/tej-pratap.jpg"
                className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity duration-500"
                controls
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-20 h-20 rounded-full bg-primary/80 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover/video:scale-100 group-hover/video:bg-primary transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                   <Play className="w-8 h-8 ml-1" />
                 </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold mb-3">Tejpratap</h3>
              <p className="text-white/70 font-medium mb-8">Performance Marketer &bull; Meta Ads Expert &bull; Digital Marketing Trainer</p>
              
              <Link href="/courses" className="inline-flex items-center justify-center rounded-full px-8 h-14 text-lg font-medium group/btn bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all">
                  Explore My Courses
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Expertise */}
        <div className="mb-32">
          <div className="section-header-anim text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold">My Areas of Expertise</h3>
          </div>
          
          <div className="expertise-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Activity className="w-8 h-8 text-blue-500" />,
                title: "Meta Ads",
                subtitle: "Facebook & Instagram Advertising",
                desc: "Campaign strategy, lead generation, retargeting, audience research, creative testing and campaign optimization."
              },
              {
                icon: <Search className="w-8 h-8 text-red-500" />,
                title: "Google Ads",
                subtitle: "Search & Performance Advertising",
                desc: "Search campaigns, keyword strategy, conversion tracking, optimization and scaling."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-green-500" />,
                title: "Performance Marketing",
                subtitle: "Data-Driven Growth",
                desc: "Build campaigns around leads, conversions, CAC, ROAS and business objectives."
              },
              {
                icon: <LineChart className="w-8 h-8 text-orange-500" />,
                title: "SEO",
                subtitle: "Organic Growth Strategy",
                desc: "Keyword research, on-page SEO, technical SEO and local SEO."
              },
              {
                icon: <FileText className="w-8 h-8 text-purple-500" />,
                title: "Content Strategy",
                subtitle: "Content That Converts",
                desc: "Content planning, hooks, copywriting, social media strategy and conversion-focused content."
              },
              {
                icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                title: "AI Marketing",
                subtitle: "AI-Powered Marketing Workflows",
                desc: "Using AI for research, content creation, campaign workflows, automation and productivity."
              }
            ].map((exp, idx) => (
              <div key={idx} className="expertise-card group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.2)] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                <p className="text-sm font-semibold text-primary mb-4">{exp.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Teaching Philosophy */}
        <div className="philosophy-section mb-32 relative">
          <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -z-10"></div>
          <div className="px-6 py-16 md:p-20">
            <div className="section-header-anim text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">How I Teach</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">A structured approach to ensure you don't just learn, but actually implement and generate results.</p>
            </div>
            
            {/* Pinned Horizontal Section on Desktop */}
            <div className="philosophy-timeline-trigger overflow-hidden relative py-10 w-full">
              <div className="philosophy-timeline-container flex flex-col md:flex-row gap-12 md:gap-0 md:w-[150vw] lg:w-[120vw] relative">
                <div className="hidden md:block absolute top-8 left-[5%] right-[5%] h-[2px] bg-border -z-10"></div>
                {[
                  { step: "01", title: "Learn", desc: "Understand the concept and why it matters." },
                  { step: "02", title: "Implement", desc: "Apply it inside real tools and platforms." },
                  { step: "03", title: "Analyze", desc: "Read campaign data and identify what's working—and what's not." },
                  { step: "04", title: "Optimize", desc: "Make decisions based on data instead of assumptions." },
                  { step: "05", title: "Scale", desc: "Learn how to turn a repeatable strategy into a growth system." }
                ].map((item, idx) => (
                  <div key={idx} className="philosophy-step flex-1 flex flex-col items-center text-center relative z-10 px-4">
                    <div className="w-16 h-16 rounded-full bg-background border-[4px] border-primary flex items-center justify-center text-xl font-black text-primary mb-6 shadow-xl">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="philosophy-quote max-w-4xl mx-auto text-center p-8 md:p-12 bg-primary text-primary-foreground rounded-3xl shadow-[0_20px_50px_-12px_rgba(37,99,235,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <p className="text-xl md:text-3xl font-medium leading-relaxed relative z-10">
                "My goal isn't to make you dependent on a course. It's to make you confident enough to make marketing decisions yourself."
              </p>
            </div>
          </div>
        </div>

        {/* 5.5 What Students Can Expect */}
        <div className="mb-32">
          <div className="section-header-anim text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-muted text-foreground rounded-full mb-6 inline-block">
              What Students Can Expect
            </span>
            <h3 className="text-3xl md:text-4xl font-bold">What You'll Get From My Mentorship</h3>
          </div>
          
          <div className="expect-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Briefcase className="w-6 h-6 text-blue-500" />, title: "Practical Skills", desc: "Learn how digital marketing actually works inside businesses." },
              { icon: <Settings className="w-6 h-6 text-red-500" />, title: "Real Tools", desc: "Work with the platforms marketers use every day." },
              { icon: <Target className="w-6 h-6 text-green-500" />, title: "Campaign Thinking", desc: "Understand why campaigns work—not just where to click." },
              { icon: <Search className="w-6 h-6 text-orange-500" />, title: "Problem Solving", desc: "Learn how to diagnose poor campaign performance." },
              { icon: <Globe className="w-6 h-6 text-purple-500" />, title: "Industry Perspective", desc: "Understand how agencies and businesses approach marketing." },
              { icon: <Compass className="w-6 h-6 text-amber-500" />, title: "Career Direction", desc: "Get clarity on what skills to build and how to apply them professionally." }
            ].map((exp, idx) => (
              <div key={idx} className="expect-card p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all flex flex-col items-start text-left group hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{exp.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Why Learn From Me? */}
        <div className="compare-section">
          <div className="section-header-anim text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">More Than a Teacher. A Practicing Marketer.</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="compare-col p-8 md:p-10 rounded-3xl bg-card border border-border border-red-500/20">
              <h4 className="text-xl font-bold mb-8 text-muted-foreground text-center">Traditional Learning</h4>
              <ul className="space-y-5">
                {[
                  "Only theoretical concepts",
                  "Memorizing definitions",
                  "Following outdated strategies",
                  "Limited campaign exposure",
                  "Learning tools without business context"
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-muted-foreground">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="compare-col p-8 md:p-10 rounded-3xl bg-primary/10 border border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
              <h4 className="text-xl font-bold mb-8 text-foreground text-center">My Approach</h4>
              <ul className="space-y-5 relative z-10">
                {[
                  "Practical campaign strategies",
                  "Real-world marketing scenarios",
                  "Current platform practices",
                  "Performance-focused thinking",
                  "Data & analytics driven decisions",
                  "AI-powered workflows",
                  "Business-focused implementation"
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-4 font-medium text-foreground">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Closing CTA */}
        <div className="closing-cta-section text-center max-w-4xl mx-auto py-16 md:py-24 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Don't Just Learn Digital Marketing.<br className="hidden md:block" />
            <span className="text-primary relative inline-block mt-2">
              Learn How to Think Like a Marketer.
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Build practical skills. Work on real-world strategies. Become confident enough to create, analyze, optimize and scale campaigns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/courses" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto shadow-xl hover:shadow-primary/30 transition-all group">
                Start Learning With Me <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/courses" className="inline-flex items-center justify-center border-2 border-primary/50 text-primary hover:bg-primary/10 rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto transition-colors">
                Explore Courses
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
