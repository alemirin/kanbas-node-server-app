import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    quizId: String,
    userId: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
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
          type: mongoose.Schema.Types.Mixed, // Can store a string, boolean, or array, depending on the question type
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        // Additional fields for specific question types
        choices: [
          {
            text: String,
            isCorrect: Boolean,
          },
        ],
        possibleAnswers: [String],
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "quizAnswers" }
);

export default answerSchema;
