import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  // Get all questions for a specific quiz
  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    try {
      const questions = await dao.findQuestionsForQuiz(qid);
      res.json(questions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Create a new question for a quiz
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const question = req.body;
    try {
      const newQuestion = await dao.createQuestion(qid, question);
      res.json(newQuestion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update an existing question
  app.put("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
    const { qid, questionId } = req.params;
    const questionData = req.body;
    try {
      const status = await dao.updateQuestion(qid, questionId, questionData);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a specific question
  app.delete("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
    const { qid, questionId } = req.params;
    try {
      const status = await dao.deleteQuestion(questionId);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}
