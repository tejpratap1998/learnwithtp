import Link from "next/link";
import { Plus, Edit, Trash, Eye, LayoutList } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

async function getCourses() {
  await dbConnect();
  // We use .lean() to get a plain JavaScript object since we pass it to a client component or render it
  const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(courses)); // Convert ObjectId and Dates to string for Next.js
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Course Management</h1>
          <p className="text-muted-foreground text-sm">Manage your courses and curriculum content.</p>
        </div>
        <Link href="/admin/courses/create" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus size={18} />
          Create New Course
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">Course Name</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Students</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Revenue</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Last Updated</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No courses found. Click "Create New Course" to get started.
                  </td>
                </tr>
              ) : (
                courses.map((course: any) => (
                  <tr key={course._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{course.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        course.isPublished ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {course.isPublished ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{course.totalStudents || 0}</td>
                    <td className="px-6 py-4 font-medium">₹{(course.price * (course.totalStudents || 0)).toLocaleString()}</td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(course.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors tooltip-trigger" title="Curriculum Builder">
                          <LayoutList size={18} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Edit Course Info">
                          <Edit size={18} />
                        </button>
                        <Link href={`/courses/${course.slug}`} className="p-2 text-muted-foreground hover:text-primary transition-colors" title="View Public Page">
                          <Eye size={18} />
                        </Link>
                        <button className="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Delete Course">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
