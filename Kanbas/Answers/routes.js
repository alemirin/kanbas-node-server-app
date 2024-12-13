import * as dao from "./dao.js";

export default function AnswerRoutes(app) {
  // Create a new quiz answer
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

  // Get all answers for a specific quiz
  app.get("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    try {
      const answers = await dao.findAnswersByQuiz(quizId);
      res.json(answers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get a specific user's answers for a quiz
  app.get("/api/quizzes/:quizId/answers/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    try {
      const userAnswers = await dao.findAnswersByUserAndQuiz(userId, quizId);
      if (!userAnswers) {
        res.status(404).json({ message: "No answers found for the user." });
      } else {
        res.json(userAnswers);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a specific quiz answer by ID
  app.delete("/api/answers/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const status = await dao.deleteQuizAnswer(id);
      if (!status) {
        res.status(404).json({ message: "Quiz answer not found." });
      } else {
        res.json({ message: "Quiz answer deleted successfully." });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}
