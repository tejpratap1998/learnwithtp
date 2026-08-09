import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import HomeClient from "./HomeClient";

async function getFeaturedCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Failed to fetch featured courses:", error);
    return [];
  }
}

export default async function Home() {
  const courses = await getFeaturedCourses();
  return <HomeClient courses={courses} />;
}
