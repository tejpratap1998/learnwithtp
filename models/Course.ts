import mongoose, { Schema, Document } from "mongoose";

export interface ILesson {
  id: string; // Used for unique identification within UI without relying solely on ObjectId if not saved yet
  title: string;
  duration: string;
  videoUrl: string;
  description?: string;
  isLocked?: boolean;
}

export interface IModule {
  id: string;
  title: string;
  lessons: ILesson[];
}

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
  curriculum: IModule[];
}

const LessonSchema = new Schema<ILesson>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String },
  isLocked: { type: Boolean, default: false }
});

const ModuleSchema = new Schema<IModule>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

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
    curriculum: { type: [ModuleSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
