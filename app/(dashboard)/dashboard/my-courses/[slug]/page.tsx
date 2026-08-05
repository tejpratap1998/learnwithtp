import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";
import CoursePlayerClient from "./CoursePlayerClient";

export default async function CoursePlayerPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const course = await Course.findOne({ slug: params.slug }).lean();

  if (!course) {
    return <div className="p-8 text-center">Course not found.</div>;
  }

  const enrollment = await Enrollment.findOne({
    user: (session.user as any).id,
    course: (course as any)._id,
  }).lean();

  if (!enrollment) {
    return <div className="p-8 text-center text-destructive">You are not enrolled in this course.</div>;
  }

  return (
    <CoursePlayerClient 
      course={JSON.parse(JSON.stringify(course))} 
      enrollment={JSON.parse(JSON.stringify(enrollment))} 
    />
  );
}
