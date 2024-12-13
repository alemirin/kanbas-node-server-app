import model from "./model.js";

export const createQuizAnswer = async (quizAnswer) =>
  await model.create(quizAnswer);

export const findAnswersByQuiz = async (quizId) =>
  await model.find({ quizId }).populate("answers.questionId");

export const findAnswersByUserAndQuiz = async (userId, quizId) =>
  await model.findOne({ userId, quizId }).populate("answers.questionId");

export const deleteQuizAnswer = async (id) => await model.findByIdAndDelete(id);

export default {
  createQuizAnswer,
  findAnswersByQuiz,
  findAnswersByUserAndQuiz,
  deleteQuizAnswer,
};
