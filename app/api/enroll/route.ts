import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
    }

    await dbConnect();

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const userId = (session.user as any).id;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return NextResponse.json({ message: "Already enrolled in this course" }, { status: 400 });
    }

    // Create enrollment
    await Enrollment.create({
      user: userId,
      course: courseId,
    });

    // Update total students in course
    await Course.findByIdAndUpdate(courseId, { $inc: { totalStudents: 1 } });

    return NextResponse.json({ message: "Successfully enrolled" }, { status: 201 });
  } catch (error) {
    console.error("Error enrolling:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
