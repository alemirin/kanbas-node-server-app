import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
    },
    course: { type: mongoose.Schema.Types.Mixed, ref: "CourseModel" },
    user: { type: mongoose.Schema.Types.Mixed, ref: "UserModel" },
    grade: Number,
    letterGrade: String,
    enrollmentDate: Date,
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  },
  { collection: "enrollments" }
);
export default enrollmentSchema;
