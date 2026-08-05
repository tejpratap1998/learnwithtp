import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Course from "@/models/Course";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Get total students
    const totalStudents = await User.countDocuments({ role: "student" });

    // Get active courses
    const activeCourses = await Course.countDocuments({ isPublished: true });
    
    // Get total courses
    const totalCourses = await Course.countDocuments();

    return NextResponse.json({
      totalStudents,
      activeCourses,
      totalCourses,
      newLeads: 0, // Mock for now, would typically query a Leads collection
      revenue: 0 // Mock for now, would typically query an Orders collection
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
