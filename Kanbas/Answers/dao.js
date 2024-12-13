import model from "./model.js";

export const createQuizAnswer = async (quizAnswer) => {
  const previousAttempts = await model.find({
    quizId: quizAnswer.quizId,
    userId: quizAnswer.userId
  }).sort({ attemptNumber: -1 }).limit(1);

  const attemptNumber = previousAttempts.length > 0 ? 
    previousAttempts[0].attemptNumber + 1 : 1;

  const correctAnswers = quizAnswer.answers.filter(a => a.isCorrect).length;
  const score = (correctAnswers / quizAnswer.answers.length) * 100;

  return await model.create({
    ...quizAnswer,
    attemptNumber,
    score
  });
};

export const fetchAnswersByQuiz = async (quizId) =>
  await model.find({ quizId }).populate("answers.questionId");

export const fetchAnswersByUser = async (quizId, userId) =>
  await model.findOne({ quizId, userId })
    .sort({ attemptNumber: -1 })
    .populate("answers.questionId");

export const countAnswersByUser = async (quizId, userId) =>
  await model.countDocuments({ quizId, userId });

export const deleteQuizAnswer = async (answerId) =>
  await model.findByIdAndDelete(answerId);