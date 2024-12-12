import model from "./model.js";

export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

export function createQuestion(qid, question) {
  return model.create({ ...question, quiz: qid });
}

export function findQuestionsForQuiz(questionId) {
  return model.find({ quiz: questionId });
}

export function updateQuestion(qid, questionId, questionUpdates) {
  return model.updateOne(
    { _id: questionId },
    { ...questionUpdates, quiz: qid }
  );
}
