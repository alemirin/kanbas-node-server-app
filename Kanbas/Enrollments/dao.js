import Database from "../Database/index.js";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findEnrollmentsForUser(uId) {
  const { enrollments } = Database;
  const enrollmentList = enrollments.filter((e) => e.user === uId);
  return enrollmentList;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  const enrollment = {
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  };
  enrollments.push(enrollment);
  return enrollment;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  // Filter out the enrollment
  const initialLength = enrollments.length;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.user !== userId && enrollment.course !== courseId
  );

  if (Database.enrollments.length === initialLength) {
    throw new Error("Enrollment not found");
  }

  return { userId, courseId };
}
