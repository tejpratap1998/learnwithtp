import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import { Award, Download } from "lucide-react";
import Link from "next/link";

export default async function CertificatesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  // Ensure Course model is registered before populating
  Course.init();

  const completedEnrollments = await Enrollment.find({
    user: (session.user as any).id,
    progress: 100
  })
    .populate("course")
    .lean();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
        <p className="text-muted-foreground">View and download certificates for your completed courses.</p>
      </div>

      {completedEnrollments.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} className="text-muted-foreground opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Certificates Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            You haven't completed any courses yet. Finish all the lessons in a course to earn your certificate!
          </p>
          <Link 
            href="/dashboard/my-courses" 
            className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go to My Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedEnrollments.map((enrollment: any) => (
            <div key={enrollment._id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-48 bg-gradient-to-br from-primary/80 to-primary flex flex-col items-center justify-center p-6 text-center relative overflow-hidden text-primary-foreground">
                <div className="absolute inset-0 bg-black/10"></div>
                <Award size={48} className="mb-4 relative z-10" />
                <h3 className="font-bold text-xl relative z-10 line-clamp-2">Certificate of Completion</h3>
                <p className="text-primary-foreground/80 text-sm mt-2 relative z-10">{enrollment.course.title}</p>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Awarded to</p>
                    <p className="font-bold text-lg">{session.user?.name || "Student"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date Completed</p>
                    <p className="font-medium">{new Date(enrollment.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
