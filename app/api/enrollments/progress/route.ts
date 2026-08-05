import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, lessonId } = await req.json();

    if (!courseSlug || !lessonId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Find the course by slug
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Find the enrollment
    const enrollment = await Enrollment.findOne({
      user: (session.user as any).id,
      course: course._id,
    });

    if (!enrollment) {
      return NextResponse.json({ message: "Not enrolled in this course" }, { status: 403 });
    }

    // Check if already completed
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);

      // Recalculate progress (total completed / total lessons)
      let totalLessons = 0;
      course.curriculum.forEach((module: any) => {
        totalLessons += module.lessons.length;
      });

      if (totalLessons > 0) {
        enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
      } else {
        enrollment.progress = 100;
      }

      await enrollment.save();
    }

    return NextResponse.json({ 
      message: "Lesson marked as complete", 
      completedLessons: enrollment.completedLessons,
      progress: enrollment.progress 
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
