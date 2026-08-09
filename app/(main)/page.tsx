import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Target, BookOpen, ChevronRight, PlayCircle, Star, Sparkles, Lightbulb } from "lucide-react";
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
    <div className="flex flex-col w-full bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms] delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen" />
          
          {/* Floating Logo Elements */}
          <div className="absolute top-[15%] left-[20%] animate-[bounce_6s_infinite] opacity-60 text-accent">
            <Sparkles size={32} />
          </div>
          <div className="absolute top-[25%] right-[15%] animate-[bounce_8s_infinite_1s] opacity-70 text-accent">
            <Lightbulb size={48} className="fill-accent/20" />
          </div>
          <div className="absolute bottom-[20%] left-[10%] animate-[bounce_7s_infinite_2s] opacity-50 text-accent">
            <Lightbulb size={40} className="fill-accent/20" />
          </div>
          <div className="absolute bottom-[30%] right-[25%] animate-[bounce_5s_infinite_0.5s] opacity-60 text-accent">
            <Sparkles size={28} />
          </div>

          {/* Noise overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] dark:opacity-[0.03] opacity-0" />
        </div>

        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          <FadeIn delay={0.1} direction="up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-card/50 border border-border backdrop-blur-md mb-8 hover:bg-card/80 transition-colors cursor-pointer group shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-sm font-semibold tracking-wider text-foreground/90">New Masterclasses Open</span>
              <ChevronRight size={16} className="text-foreground/50 group-hover:text-foreground/90 transition-colors" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter mb-8 max-w-6xl leading-[1.1]">
              <span className="text-foreground drop-shadow-sm">LearnWith</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-orange-400 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">TP</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-tight text-foreground/90">
              Marketing Academy <br className="hidden md:block"/>
              <span className="font-serif italic font-light text-foreground/70">by</span> Tej Pratap
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl font-light leading-relaxed">
              Elite performance marketing training for those who want to build real brands, scale revenue, and master AI-driven growth.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up">
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
              <Link 
                href="/courses" 
                className="relative overflow-hidden bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 group shadow-[0_0_40px_-10px_rgba(43,27,84,0.6)] hover:shadow-[0_0_60px_-5px_rgba(43,27,84,0.8)] dark:shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] dark:hover:shadow-[0_0_60px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                Explore Programs
                <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-card/50 backdrop-blur-md text-foreground border border-border px-10 py-5 rounded-2xl font-bold text-lg hover:bg-card hover:border-accent/50 transition-all flex items-center justify-center hover:-translate-y-1 shadow-sm"
              >
                <PlayCircle size={22} className="mr-3 text-accent" />
                Watch Free Training
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.6} direction="up">
            <div className="mt-20 flex items-center gap-4 text-muted-foreground text-sm font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center shadow-sm">
                    <Star size={12} className="text-accent" />
                  </div>
                ))}
              </div>
              <p>Joined by <span className="text-foreground font-bold">500+</span> elite marketers.</p>
            </div>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-24 border-y border-border bg-card/30 backdrop-blur-3xl relative z-20">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {[
                { label: "Ad Spend Managed", value: "$50M+", icon: Target },
                { label: "Successful Students", value: "500+", icon: Users },
                { label: "Hours of Content", value: "100+", icon: BookOpen },
                { label: "Average ROAS", value: "4.5x", icon: TrendingUp },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-card to-transparent border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 group shadow-sm">
                    <div className="p-4 bg-primary/10 dark:bg-accent/10 rounded-2xl text-primary dark:text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-foreground mb-3 tracking-tight">{stat.value}</h3>
                    <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* --- TOOLS & PLATFORMS SECTION --- */}
      <ToolsSection />

      {/* --- TRAINER SECTION --- */}
      <section className="py-32 relative border-b border-border bg-background">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-6xl mx-auto">
              {/* Image Container */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-background ring-2 ring-accent/30 shadow-[0_0_50px_-12px_rgba(212,175,55,0.3)] group">
                  <img 
                    src="/images/tej-pratap.jpg" 
                    alt="Tej Pratap - Instructor" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                  <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} /> Meet Your Instructor
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">
                  Tej Pratap
                </h2>
                <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-white dark:to-accent font-semibold">
                  3+ Years Experience <span className="text-accent italic">&</span> Academy
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  I've spent years mastering performance marketing, building scalable revenue engines for top agencies, and teaching ambitious marketers how to dominate their niche. My mission is to give you the exact frameworks that actually work in the real world.
                </p>
                <div className="pt-4">
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-foreground">100+</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Students</span>
                    </div>
                    <div className="w-px h-10 bg-border"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-foreground flex items-center gap-2">Top <Star size={20} className="text-accent fill-accent"/></span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Agency Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- FEATURED COURSES SECTION --- */}
      <section className="py-32 relative bg-card/20">
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-20 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 animate-pulse text-accent/50 hidden md:block">
                <Lightbulb size={64} className="fill-accent/10" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-foreground relative z-10">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Masterclasses</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light relative z-10">
                Zero fluff. Just battle-tested strategies, exact frameworks, and step-by-step execution guides to print money online.
              </p>
            </div>
          </FadeIn>

          {courses.length > 0 ? (
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {courses.map((course: any) => (
                  <StaggerItem key={course._id}>
                    <div className="h-full group">
                      <CourseCard course={course} />
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <FadeIn direction="up">
              <div className="text-center py-24 bg-card rounded-3xl border border-border max-w-3xl mx-auto shadow-sm">
                <h3 className="text-3xl font-bold mb-4 text-foreground">Exciting Courses Dropping Soon</h3>
                <p className="text-muted-foreground text-lg">We are currently crafting some amazing content. Check back shortly.</p>
              </div>
            </FadeIn>
          )}
          
          {courses.length > 0 && (
            <FadeIn delay={0.4} direction="up">
              <div className="text-center mt-20">
                <Link 
                  href="/courses" 
                  className="inline-flex items-center gap-3 bg-card border border-border px-8 py-4 rounded-full text-foreground font-bold hover:bg-muted hover:border-accent/50 transition-all group shadow-sm"
                >
                  View All Programs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-accent" />
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-32 bg-primary dark:bg-background border-t border-border relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-20 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/30 mb-6 backdrop-blur-sm">
                <span className="text-xs font-bold uppercase tracking-widest">Agency Services</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-primary-foreground dark:text-foreground">
                Done-For-You <span className="font-serif italic font-light opacity-80">Execution</span>
              </h2>
              <p className="text-xl text-primary-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto font-light">
                Not looking to learn? Let my elite team build and manage your performance systems from the ground up.
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                "Meta Ads Engine", 
                "Google Ads Revenue", 
                "SEO Growth Blueprint", 
                "AI-Powered Creative", 
                "Funnel Architecture", 
                "Full Campaign Audit"
              ].map((service, i) => (
                <StaggerItem key={i}>
                  <div className="relative p-8 rounded-3xl bg-white/5 dark:bg-card border border-white/10 dark:border-border hover:bg-white/10 dark:hover:border-accent/50 transition-all cursor-pointer group overflow-hidden h-full backdrop-blur-sm">
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/40 transition-colors duration-500" />
                    
                    <h3 className="text-2xl font-bold mb-4 text-primary-foreground dark:text-foreground group-hover:text-accent transition-colors">{service}</h3>
                    <p className="text-primary-foreground/60 dark:text-muted-foreground leading-relaxed font-light">Professional execution mapped to your specific business goals, ROAS targets, and KPIs.</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <FadeIn delay={0.3} direction="up">
            <div className="text-center mt-20">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-10 py-5 bg-accent text-accent-foreground font-bold rounded-2xl hover:bg-accent/90 transition-all gap-3 group text-lg shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_-5px_rgba(212,175,55,0.6)]"
              >
                Book a Strategy Call <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
