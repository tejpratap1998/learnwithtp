"use client";

import CourseCard from "@/components/CourseCard";
import { BookOpen } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CoursesClient({ courses }: { courses: any[] }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(".courses-header > *", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    });

    // Cards Animation
    gsap.from(".course-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        {/* Dynamic Glowing Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-60 dark:opacity-30 mix-blend-screen pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] opacity-50 dark:opacity-20 pointer-events-none"></div>
        </div>
        
        <div className="courses-header container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center p-4 bg-card/50 border border-border text-accent rounded-2xl mb-8 shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)] backdrop-blur-md">
            <BookOpen size={40} className="animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="block text-foreground">Explore Our</span>
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-xl opacity-30 dark:opacity-40 rounded-3xl"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-white dark:to-accent">
                Programs.
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Level up your skills with our expert-led, practical courses designed for modern professionals who want real results.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 relative bg-card/30 backdrop-blur-md z-20">
        <div className="container mx-auto px-4 relative z-10">
          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {courses.map((course: any) => (
                <div key={course._id} className="course-item h-full group">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="course-item text-center py-24 bg-card/50 rounded-3xl border border-border max-w-3xl mx-auto shadow-lg backdrop-blur-md">
              <h3 className="text-3xl font-bold mb-4 text-foreground">No Courses Available</h3>
              <p className="text-muted-foreground text-lg">We are currently updating our curriculum. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
