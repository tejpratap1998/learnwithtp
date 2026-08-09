import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import Settings from "@/models/Settings";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await req.json();
    
    await dbConnect();
    
    // Fetch Razorpay Secret from DB, fallback to env variables
    const settings = await Settings.findOne();
    const secret = settings?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
      return NextResponse.json({ message: "Razorpay secret not configured" }, { status: 500 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    // Check if already enrolled to avoid duplicates
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
       // Just return success if already enrolled
       return NextResponse.json({ message: "Already enrolled" }, { status: 200 });
    }

    // Create enrollment
    await Enrollment.create({
      user: userId,
      course: courseId,
    });

    // Update total students in course
    await Course.findByIdAndUpdate(courseId, { $inc: { totalStudents: 1 } });

    return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
