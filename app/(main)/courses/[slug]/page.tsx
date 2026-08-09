import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseDetailClient from "./CourseDetailClient";

async function getCourse(slug: string) {
  await dbConnect();
  const course = await Course.findOne({ slug }).lean();
  if (!course) return null;
  return JSON.parse(JSON.stringify(course));
}

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
