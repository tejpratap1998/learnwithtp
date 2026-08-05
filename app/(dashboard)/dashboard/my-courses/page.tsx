import Link from "next/link";
import { Play } from "lucide-react";

export default function MyCoursesPage() {
  const enrolledCourses = [
    {
      id: "meta-ad-mastery",
      title: "Meta Ad Mastery",
      progress: 80,
      icon: "📊",
      lastAccessed: "Today",
      totalModules: 5,
      completedModules: 4,
    },
    {
      id: "ai-mastery",
      title: "AI Mastery for Marketers",
      progress: 30,
      icon: "🤖",
      lastAccessed: "2 days ago",
      totalModules: 5,
      completedModules: 1,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Pick up where you left off.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
            <div className="p-6 flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{course.icon}</div>
                <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Last accessed: {course.lastAccessed}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{course.completedModules} / {course.totalModules} Modules</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30">
              <Link 
                href={`/dashboard/my-courses/${course.id}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Play size={18} fill="currentColor" />
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
