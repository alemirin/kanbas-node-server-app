import model from "./model.js";
import Emodel from "../Enrollments/model.js";
import Database from "../Database/index.js";

export function findAllCourses() {
  return model.find();
}

export function createCourse(course) {
  return model.create(course);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
