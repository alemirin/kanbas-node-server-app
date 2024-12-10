import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    instructions: String,
    quiztype: {
      type: String,
      enum: ["GRADED", "UNGRADED"],
      default: "GRADED",
    },
    course: { type: mongoose.Schema.Types.Mixed, ref: "CourseModel" },
    group: {
      type: String,
      enum: ["ASSIGNMENTS", "EXAMS", "QUIZZES"],
    },
  },
  { collection: "quizzes" }
);
export default schema;
