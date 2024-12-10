import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.send(quizzes);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.send(status);
  });

  app.post("/api/quizzes", async (req, res) => {
    const quiz = await dao.createQuiz(req.body);
    res.json(quiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(qid, quizUpdates);
    res.send(status);
  });

  app.get("/api/quizzes/:cid", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.send(quizzes);
  });
}
