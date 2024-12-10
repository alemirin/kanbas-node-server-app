import model from "./model.js";

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function createQuiz(quiz) {
  return model.create(quiz);
}

export function findQuizzesForCourse(quizId) {
  return model.find({ quiz: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}
