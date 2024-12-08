import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed, // Allows either a string or ObjectId
      default: () => new mongoose.Types.ObjectId(), // Generate ObjectId if not provided
    },
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.Mixed, ref: "CourseModel" },
  },
  { collection: "modules" }
);
export default schema;
