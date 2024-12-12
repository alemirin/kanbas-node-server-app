import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    quiz: String,
    title: String,
    questiontype: {
      type: String,
      enum: ["MULTIPLECHOICE", "TRUEORFALSE", "FILLINTHEBLANK"],
      default: "MULTIPLECHOICE",
    },
    points: Number,
    question: String,
    // Multiple Choice
    choices: [{ text: String, isCorrect: Boolean }],
    // True/False
    correctAnswer: Boolean,
    // Fill in the Blank
    possibleAnswers: [String],
    caseInsensitive: Boolean
  },
  { collection: "questions" }
);

export default schema;