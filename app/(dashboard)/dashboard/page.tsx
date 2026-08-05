import Link from "next/link";
import { BookOpen, CheckCircle, PlayCircle, Trophy } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

async function getDashboardData() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await dbConnect();
  
  const userId = (session.user as any).id;
  
  // Fetch enrollments with populated course data
  const enrollments = await Enrollment.find({ user: userId })
    .populate("course")
    .sort({ updatedAt: -1 })
    .lean();

  return {
    user: session.user,
    enrollments: JSON.parse(JSON.stringify(enrollments)),
  };
}

export default async function DashboardOverview() {
  const data = await getDashboardData();
  
  if (!data) return null;

  const { user, enrollments } = data;
  
  const totalEnrolled = enrollments.length;
  const completedCourses = enrollments.filter((e: any) => e.progress >= 100).length;
  const overallProgress = totalEnrolled > 0 
    ? Math.round(enrollments.reduce((acc: number, curr: any) => acc + curr.progress, 0) / totalEnrolled) 
    : 0;

  const latestEnrollment = enrollments.length > 0 ? enrollments[0] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋</h1>
        <p className="text-muted-foreground">Here&apos;s a summary of your learning progress.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
            <p className="text-2xl font-bold">{totalEnrolled}</p>
          </div>
        </div>
        
        <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-4 bg-accent/10 rounded-full text-accent">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="text-2xl font-bold">{overallProgress}%</p>
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-4 bg-success/10 rounded-full text-success">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Courses</p>
            <p className="text-2xl font-bold">{completedCourses}</p>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <PlayCircle className="text-primary" /> Continue Learning
        </h2>
        
        {latestEnrollment ? (
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
            {latestEnrollment.course.thumbnail ? (
              <img 
                src={latestEnrollment.course.thumbnail} 
                alt={latestEnrollment.course.title}
                className="w-full md:w-48 aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="w-full md:w-48 aspect-video bg-muted rounded-lg flex items-center justify-center text-4xl">
                📊
              </div>
            )}
            
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-xl font-bold">{latestEnrollment.course.title}</h3>
                <p className="text-sm text-muted-foreground">Resume where you left off</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{latestEnrollment.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${latestEnrollment.progress}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <Link 
                href={`/dashboard/my-courses/${latestEnrollment.course.slug}`} 
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Resume Course
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
            <Link href="/courses" className="text-primary font-medium hover:underline">
              Browse Available Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
