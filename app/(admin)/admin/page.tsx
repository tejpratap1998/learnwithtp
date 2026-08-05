import { Users, BookOpen, UserPlus, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Course from "@/models/Course";

async function getStats() {
  await dbConnect();
  
  const totalStudents = await User.countDocuments({ role: "student" });
  const activeCourses = await Course.countDocuments({ isPublished: true });
  
  return {
    totalStudents,
    activeCourses,
    newLeads: 0,
    revenue: 0
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-muted-foreground">Welcome to your admin control panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: stats.totalStudents.toString(), icon: Users, trend: "+0%", up: true },
          { label: "Active Courses", value: stats.activeCourses.toString(), icon: BookOpen, trend: "+0%", up: true },
          { label: "New Leads", value: stats.newLeads.toString(), icon: UserPlus, trend: "0%", up: true },
          { label: "Revenue This Month", value: `₹${stats.revenue}`, icon: IndianRupee, trend: "0%", up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.trend}
                {stat.up ? <ArrowUpRight size={16} className="ml-1" /> : <ArrowDownRight size={16} className="ml-1" />}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Revenue Overview</h3>
          <div className="h-64 w-full bg-muted/50 rounded-lg flex items-center justify-center border border-dashed border-border">
            <span className="text-muted-foreground">Chart Component (Recharts)</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4 text-center py-10">
            <p className="text-muted-foreground">No recent activity found in the database.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
