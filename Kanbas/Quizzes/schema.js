import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    quiztype: {
      type: String,
      enum: ["GRADED", "PRACTICE", "GRADED SURVEY", "UNGRADED SURVEY"],
      default: "GRADED",
    },
    points: Number,
    course: { type: mongoose.Schema.Types.Mixed, ref: "CourseModel" },
    group: {
      type: String,
      enum: ["ASSIGNMENTS", "EXAMS", "QUIZZES", "PROJECTS"],
      default: "QUIZZES",
    },
    shuffle: Boolean,
    isTimed: Boolean,
    time: Number,
    hasMultipleAttempts: Boolean,
    attempts: Number,
    showCorrect: Boolean,
    needsCode: Boolean,
    accessCode: String,
    oneAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestions: Boolean,
    assignTo: {
      type: String,
      enum: ["EVERYONE", "STUDENTS", "SECTION"],
      default: "EVERYONE",
    },
    due: String,
    availFrom: String,
    availUntil: String,
    questions: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
  },
  { collection: "quizzes" }
);
export default schema;
