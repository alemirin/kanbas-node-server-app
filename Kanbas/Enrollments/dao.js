import model from "./model.js";

export function findAllEnrollments() {
  return model.find();
}

export async function findEnrollmentsForUser(uId) {
  const enrollments = await model.find({ user: uId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(userId, courseId) {
  // Check if the enrollment already exists
  const existingEnrollment = await model.findOne({
    user: userId,
    course: courseId,
  });
  if (existingEnrollment) {
    console.log("Enrollment already exists:", existingEnrollment);
    return existingEnrollment;
  }

  // Create a new enrollment if it doesn't exist
  const enrollment = await model.create({ user: userId, course: courseId });
  console.log("New enrollment created:", enrollment);
  return enrollment;
}

export async function unenrollUserFromCourse(user, course) {
  const result = await model.deleteMany({ user, course });

  if (result.deletedCount === 0) {
    throw new Error("Enrollment not found");
  }
}
