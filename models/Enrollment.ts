import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  progress: number;
  completedLessons: string[]; // Store lesson IDs here
  enrolledAt: Date;
}

const EnrollmentSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    progress: { type: Number, default: 0 },
    completedLessons: { type: [String], default: [] },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Ensure a user can only enroll in a course once
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
