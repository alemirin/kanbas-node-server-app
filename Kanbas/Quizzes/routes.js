import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  });

  app.get("/api/quizzes/:cid", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });

  app.post("/api/quizzes", async (req, res) => {
    try {
      const quiz = await dao.createQuiz(req.body);
      res.json(quiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const status = await dao.updateQuiz(qid, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  });

  app.put("/api/quizzes/:qid/status", async (req, res) => {
    const { qid } = req.params;
    const { status } = req.body;
    try {
      const updatedQuiz = await dao.updateQuizStatus(qid, status);
      res.json(updatedQuiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}