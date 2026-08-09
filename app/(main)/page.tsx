import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Target, BookOpen, PlayCircle, Star, ChevronRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseCard from "@/components/CourseCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { ToolsSection } from "@/components/ToolsSection";

async function getFeaturedCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Failed to fetch featured courses:", error);
    return [];
  }
}

export default async function Home() {
  const courses = await getFeaturedCourses();

  return (
    <div className="flex flex-col w-full bg-background text-foreground selection:bg-foreground selection:text-background overflow-hidden">
      
      {/* --- HERO BENTO SECTION --- */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
              
              {/* Main Hero Card */}
              <StaggerItem>
                <div className="col-span-1 md:col-span-8 bg-card rounded-[2rem] p-8 md:p-12 border border-border flex flex-col justify-center relative overflow-hidden h-full min-h-[400px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-foreground text-background rounded-full">
                      Launch 2026
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      v2.0 Elite Training
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 text-foreground">
                    Build systems that <br/>
                    <span className="text-muted-foreground">scale revenue.</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                    Elite performance marketing training for those who want to build real brands and master AI-driven growth.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-auto relative z-10">
                    <Link 
                      href="/courses" 
                      className="bg-foreground text-background px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-foreground/90 transition-colors"
                    >
                      Explore Programs <ArrowRight size={18} />
                    </Link>
                    <Link 
                      href="/contact" 
                      className="bg-transparent border border-border text-foreground px-8 py-4 rounded-full font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <PlayCircle size={18} /> Watch Preview
                    </Link>
                  </div>
                </div>
              </StaggerItem>

              {/* Sidebar Cards */}
              <div className="col-span-1 md:col-span-4 flex flex-col gap-4 md:gap-6">
                
                {/* Stat Card 1 */}
                <StaggerItem>
                  <div className="bg-card rounded-[2rem] p-8 border border-border flex flex-col justify-between h-full min-h-[220px] group hover:border-foreground/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Target size={24} className="text-foreground" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded-full">Performance</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-semibold mb-1">$50M+</h3>
                      <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">Ad Spend Managed</p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Stat Card 2 */}
                <StaggerItem>
                  <div className="bg-card rounded-[2rem] p-8 border border-border flex flex-col justify-between h-full min-h-[220px] group hover:border-foreground/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                            <Star size={12} className="text-foreground" />
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded-full">Community</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-semibold mb-1">500+</h3>
                      <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">Elite Marketers</p>
                    </div>
                  </div>
                </StaggerItem>

              </div>

              {/* Bottom Wide Card */}
              <StaggerItem>
                <div className="col-span-1 md:col-span-12 bg-card rounded-[2rem] p-8 md:p-10 border border-border flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
                      <TrendingUp size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Average 4.5x ROAS</h3>
                      <p className="text-muted-foreground">Proven frameworks used by top agencies.</p>
                    </div>
                  </div>
                  <Link href="/courses" className="flex items-center gap-2 text-foreground font-semibold font-mono uppercase tracking-widest text-sm hover:underline">
                    View Case Studies <ChevronRight size={16} />
                  </Link>
                </div>
              </StaggerItem>

            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* --- TOOLS & PLATFORMS SECTION --- */}
      <ToolsSection />

      {/* --- FEATURED COURSES SECTION --- */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
          </FadeIn>

          {courses.length > 0 ? (
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course: any) => (
                  <StaggerItem key={course._id}>
                    <div className="h-full">
                      <CourseCard course={course} />
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <FadeIn direction="up">
              <div className="text-center py-24 bg-card rounded-[2rem] border border-border max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Exciting Courses Dropping Soon</h3>
                <p className="text-muted-foreground">We are currently crafting some amazing content.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* --- TRAINER SECTION --- */}
      <section className="py-24 border-y border-border bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-8 order-2 md:order-1">
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
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-full max-w-md aspect-square rounded-[2rem] bg-muted overflow-hidden border border-border">
                  <img 
                    src="/images/tej-pratap.jpg" 
                    alt="Tej Pratap - Instructor" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
