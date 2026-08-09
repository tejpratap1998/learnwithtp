import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Settings from "@/models/Settings";
import Razorpay from "razorpay";

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
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Fetch Razorpay Keys from DB, fallback to env variables
    const settings = await Settings.findOne();
    const keyId = settings?.razorpayKeyId || process.env.RAZORPAY_KEY_ID;
    const keySecret = settings?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay keys are missing in DB and env");
      return NextResponse.json({ message: "Payment gateway configuration error" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Razorpay amount is in paise (smallest currency unit for INR)
    const amount = course.price * 100;
    
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${courseId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      orderId: order.id, 
      amount, 
      currency: order.currency,
      keyId: keyId
    }, { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
