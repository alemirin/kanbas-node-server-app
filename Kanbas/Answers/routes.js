import * as dao from "./dao.js";

export default function AnswerRoutes(app) {
  app.post("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    const quizAnswer = req.body;
    try {
      const newQuizAnswer = await dao.createQuizAnswer({
        ...quizAnswer,
        quizId,
      });
      res.json(newQuizAnswer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    try {
      const answers = await dao.fetchAnswersByQuiz(quizId);
      res.json(answers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quizzes/:quizId/answers/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    try {
      const userAnswers = await dao.fetchAnswersByUser(quizId, userId);
      res.json(userAnswers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quizzes/:quizId/answers/:userId/count", async (req, res) => {
    const { quizId, userId } = req.params;
    try {
      const count = await dao.countAnswersByUser(quizId, userId);
      res.json({ count });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    try {
      const status = await dao.deleteQuizAnswer(answerId);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}