import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import CoursesClient from "./CoursesClient";

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
  return <CoursesClient courses={courses} />;
}
