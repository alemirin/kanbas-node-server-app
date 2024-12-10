import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    title: String,
    questiontype: {
      type: String,
      enum: ["MULTIPLECHOICE", "TRUEORFALSE", "FILLINTHEBLANK"],
      default: "MULTIPLECHOICE",
    },
    points: Number,
    question: String,
    choices: [{ text: String, isCorrect: Boolean }],
  },
  { collection: "questions" }
);
export default schema;
