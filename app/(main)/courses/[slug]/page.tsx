import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, PlayCircle, FileText, Users, Award, MonitorPlay, Zap } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import EnrollButton from "@/components/EnrollButton";

async function getCourse(slug: string) {
  await dbConnect();
  const course = await Course.findOne({ slug }).lean();
  if (!course) return null;
  return JSON.parse(JSON.stringify(course));
}

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  // Fallback data since the simple DB model didn't include these arrays initially
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

  return (
    <div className="flex flex-col w-full">
      {/* Course Hero */}
      <section className="bg-card border-b border-border py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/10 via-background to-background pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {course.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="#curriculum" 
                className="bg-secondary text-secondary-foreground border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-all text-center"
              >
                Preview Curriculum
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><MonitorPlay size={16} /> Lifetime Access</span>
              <span className="flex items-center gap-1"><Award size={16} /> Certificate</span>
              <span className="flex items-center gap-1"><Users size={16} /> Community Access</span>
              <span className="flex items-center gap-1"><Zap size={16} /> {course.level}</span>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border group">
            {course.thumbnail ? (
              <>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-primary/40 flex items-center justify-center">
                  <PlayCircle size={64} className="text-white relative z-10 opacity-90 drop-shadow-md cursor-pointer group-hover:scale-110 transition-transform" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20"></div>
                <PlayCircle size={64} className="text-foreground relative z-10 opacity-80 group-hover:scale-110 transition-transform" />
              </>
            )}
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
                {whatYouWillLearn.map((item, i) => (
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
                {curriculum.map((module, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-center cursor-pointer hover:opacity-80">
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
              <h3 className="text-xl font-bold mb-4 text-center">Course Access</h3>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-foreground">₹{course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">₹{course.originalPrice}</span>
                )}
              </div>
              <ul className="space-y-4 mb-2">
                <li className="flex items-center gap-3 text-muted-foreground"><MonitorPlay size={20} className="text-accent"/> {course.duration} of Content</li>
                <li className="flex items-center gap-3 text-muted-foreground"><FileText size={20} className="text-accent"/> Actionable Resources</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Users size={20} className="text-accent"/> Private Community Access</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Award size={20} className="text-accent"/> Certificate of Completion</li>
              </ul>
              
              <EnrollButton courseId={course._id.toString()} />
            </div>
            
            {/* Instructor */}
            <div className="bg-card border border-border p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{course.instructor}</h4>
                  <p className="text-sm text-muted-foreground">Expert Trainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
