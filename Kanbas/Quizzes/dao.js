import model from "./model.js";

export const findAllQuizzes = () => {
  return model.find();
};

export const findQuizzesForCourse = (courseId) => {
  return model.find({ course: courseId });
};

export const createQuiz = (quiz) => {
  return model.create({
    ...quiz,
    shuffle: quiz.shuffle ?? true,
    isTimed: quiz.isTimed ?? true,
    time: quiz.time ?? 20,
    hasMultipleAttempts: quiz.hasMultipleAttempts ?? false,
    showCorrect: quiz.showCorrect ?? true,
    needsCode: quiz.needsCode ?? false,
    oneAtATime: quiz.oneAtATime ?? true,
    webcamRequired: quiz.webcamRequired ?? false,
    lockQuestions: quiz.lockQuestions ?? false,
  });
};

export const updateQuiz = (quizId, quizUpdates) => {
  const sanitizedUpdates = Object.fromEntries(
    Object.entries(quizUpdates).filter(([_, v]) => v !== undefined)
  );
  
  return model.findByIdAndUpdate(
    quizId,
    { $set: sanitizedUpdates },
    { new: true, runValidators: true }
  );
};

export const deleteQuiz = (quizId) => {
  return model.findByIdAndDelete(quizId);
};

export const findQuizById = (quizId) => {
  return model.findById(quizId);
};

export const findAvailableQuizzes = (courseId) => {
  return model.find({
    course: courseId,
    quizStatus: "AVAILABLE",
    availFrom: { $lte: new Date() },
    availUntil: { $gte: new Date() }
  });
};

export const updateQuizStatus = (quizId, status) => {
  return model.findByIdAndUpdate(
    quizId,
    { $set: { quizStatus: status } },
    { new: true }
  );
};