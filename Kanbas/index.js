import CourseRoutes from "./Courses/routes.js";
import UserRoutes from "./Users/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import EnrollmentRoutes from "./Enrollments/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";
import QuizRoutes from "./Quizzes/routes.js";
import QuestionRoutes from "./Questions/routes.js";

export default function Kanbas(app) {
  UserRoutes(app);
  CourseRoutes(app);
  ModuleRoutes(app);
  EnrollmentRoutes(app);
  AssignmentRoutes(app);
  QuizRoutes(app);
  QuestionRoutes(app);
}
