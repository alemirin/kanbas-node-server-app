import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });

  app.get("/api/:uid/enrollments", async (req, res) => {
    const { uid } = req.params;
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(uid);
    res.send(enrollments);
  });
}
