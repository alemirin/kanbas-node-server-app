import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (name && role) {
      const users = await dao.findUsersByNameAndRole(role, name);
      res.json(users);
      return;
    }
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      const userObject = currentUser.toObject();
      req.session["currentUser"] = userObject;
      res.json(userObject);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findEnrollmentsForUser(uid);
    res.json(courses);
  };

  // Enroll a user in a course
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      userId = currentUser._id;
    }

    try {
      const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.send(status);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Enrollment failed",
        error: error.message,
      });
    }
  });

  //Unenroll user in course
  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      userId = currentUser._id;
    }

    try {
      const status = await enrollmentsDao.unenrollUserFromCourse(
        userId,
        courseId
      );
      res.send(status);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unenrollment failed",
        error: error.message,
      });
    }
  });

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId", findUserById);
}
