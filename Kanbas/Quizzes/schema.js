import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
    },
    title: { type: String, required: true },
    description: String,
    quiztype: {
      type: String,
      enum: ["GRADED", "PRACTICE", "GRADED SURVEY", "UNGRADED SURVEY"],
      default: "GRADED",
    },
    points: { type: Number, default: 0 },
    course: { type: mongoose.Schema.Types.Mixed, ref: "CourseModel" },
    group: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECTS"],
      default: "QUIZZES",
    },
    quizStatus: {
      type: String,
      enum: ["CLOSED", "AVAILABLE", "NOT AVAILABLE"],
      default: "NOT AVAILABLE",
    },
    shuffle: { type: Boolean, default: true },
    isTimed: { type: Boolean, default: true },
    time: { type: Number, default: 20 },
    hasMultipleAttempts: { type: Boolean, default: false },
    attempts: { type: Number },
    showCorrect: { type: Boolean, default: true },
    needsCode: { type: Boolean, default: false },
    accessCode: { type: String },
    oneAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestions: { type: Boolean, default: false },
    assignTo: {
      type: String,
      enum: ["EVERYONE", "STUDENTS", "SECTION"],
      default: "EVERYONE",
    },
    due: String,
    availFrom: String,
    availUntil: String,
    questions: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
    isPublished: { type: Boolean, default: false },
  },
  { collection: "quizzes", _id: false }
);
export default schema;
