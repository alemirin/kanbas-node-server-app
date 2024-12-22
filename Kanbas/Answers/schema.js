import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    quizId: String,
    userId: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
      required: true
    },
    attemptNumber: {
      type: Number,
      required: true,
      default: 1
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionModel",
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        questiontype: {
          type: String,
          enum: ["MULTIPLECHOICE", "TRUEORFALSE", "FILLINTHEBLANK"],
          required: true,
        },
        providedAnswer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        }
      }
    ],
    score: {
      type: Number,
      required: true,
      default: 0
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { collection: "quizAnswers" }
);

export default answerSchema;