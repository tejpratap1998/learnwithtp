import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { revalidatePath } from "next/cache";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const course = await Course.findById(params.id);

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Basic validation
    if (!data.title || !data.description || !data.price || !data.category || !data.level || !data.duration || !data.instructor) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Avoid updating slug if title changes to prevent broken links, but if they explicitly want to change it we could.
    // For now, let's keep the existing slug or regenerate if requested, but let's stick to existing slug.
    
    const course = await Course.findByIdAndUpdate(
      params.id,
      {
        ...data,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      },
      { new: true }
    );

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/courses/${course.slug}`);

    return NextResponse.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
