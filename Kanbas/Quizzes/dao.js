import model from "./model.js";

export function findAllQuizzes() {
  return model.find();
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function createQuiz(quiz) {
  return model.create(quiz);
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}
