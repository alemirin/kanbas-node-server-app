import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });

  app.get("/api/:uid/enrollments", (req, res) => {
    const { uid } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForUser(uid);
    res.send(enrollments);
  });

  app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;

    try {
      const status = enrollmentsDao.unenrollUserInCourse(userId, courseId);
      res
        .status(200)
        .json({ success: true, message: "Unenrolled successfully", status });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unenrollment failed",
        error: error.message,
      });
    }
  });

  // Enroll a user in a course
  app.post("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;

    try {
      const status = enrollmentsDao.enrollUserInCourse(userId, courseId);
      const enrollments = enrollmentsDao.findAllEnrollments();
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Enrollment failed",
        error: error.message,
      });
    }
  });
}
