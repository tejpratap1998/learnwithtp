import CourseCard from "@/components/CourseCard";
import { BookOpen } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

async function getPublishedCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#030303] text-foreground">
      {/* Header Section */}
      <section className="bg-card border-b border-white/5 py-20 md:py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none opacity-50"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <FadeIn direction="up">
            <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 text-primary rounded-2xl mb-6 shadow-xl backdrop-blur-md">
              <BookOpen size={32} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light">
              Level up your skills with our expert-led, practical courses designed for modern professionals who want real results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
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
              <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10 max-w-3xl mx-auto backdrop-blur-md">
                <h3 className="text-3xl font-bold mb-4 text-white">No Courses Available</h3>
                <p className="text-white/50 text-lg">We are currently updating our curriculum. Please check back later.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}
