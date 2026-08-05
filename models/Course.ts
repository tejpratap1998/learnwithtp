import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  isPublished: boolean;
  totalStudents: number;
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    totalStudents: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
