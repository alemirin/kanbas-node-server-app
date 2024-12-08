import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
    },
    name: String,
    number: String,
    image: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);
export default courseSchema;
