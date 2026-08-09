"use client";

import { useRef } from "react";
import { Activity, Search, TrendingUp, LineChart, FileText, Sparkles, CheckCircle2, XCircle } from "lucide-react";

export default function MentorSection() {
  const containerRef = useRef(null);

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
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-muted border border-border group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10"></div>
              <img 
                src="/images/tej-pratap.jpg" 
                alt="Tejpratap - Performance Marketer" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* 4. Expertise */}
        <div className="mb-32">
          <div className="text-center mb-16">
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
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">How I Teach</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">A structured approach to ensure you don't just learn, but actually implement and generate results.</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-6 mb-16">
              {[
                { step: "01", title: "Learn", desc: "Understand the concept and why it matters." },
                { step: "02", title: "Implement", desc: "Apply it inside real tools and platforms." },
                { step: "03", title: "Analyze", desc: "Read campaign data and identify what's working—and what's not." },
                { step: "04", title: "Optimize", desc: "Make decisions based on data instead of assumptions." },
                { step: "05", title: "Scale", desc: "Learn how to turn a working strategy into a repeatable growth system." }
              ].map((item, idx) => (
                <div key={idx} className="philosophy-step flex flex-col items-center text-center">
                  <div className="text-4xl font-black text-muted/50 mb-4">{item.step}</div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="philosophy-step max-w-4xl mx-auto text-center p-8 md:p-12 bg-primary text-primary-foreground rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <p className="text-xl md:text-3xl font-medium leading-relaxed relative z-10">
                "My goal isn't to make you dependent on a course. It's to make you confident enough to make marketing decisions yourself."
              </p>
            </div>
          </div>
        </div>

        {/* 6. Why Learn From Me? */}
        <div className="compare-section">
          <div className="text-center mb-16">
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

      </div>
    </section>
  );
}
