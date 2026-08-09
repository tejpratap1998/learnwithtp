import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import StudentsClient from "./StudentsClient";

export const revalidate = 0; // Ensure data is always fresh

async function getStudents() {
  try {
    await dbConnect();
    // Fetch all users with role "student" or just all users if role isn't strictly enforced yet
    // Since the user might be testing, let's fetch all users and let the client search them
    const students = await User.find({ role: "student" }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(students));
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return [];
  }
}

export default async function StudentsPage() {
  const students = await getStudents();

  return <StudentsClient initialStudents={students} />;
}
