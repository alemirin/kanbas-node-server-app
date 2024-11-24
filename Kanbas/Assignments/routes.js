import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  });

  app.get("/api/assignments/:cid", (req, res) => {
    const { cid } = req.params;
    const assignments = dao.findAssignmentsForCourse(cid);
    res.send(assignments);
  });

  app.delete("/api/assignments/:cid/:aId", (req, res) => {
    const { aId } = req.params;
    const status = dao.deleteAssignment(aId);
    res.send(status);
  });

  app.put("/api/assignments/:cid/:aId", (req, res) => {
    const { aId } = req.params;
    const aUpdates = req.body;
    const status = dao.updateAssignment(aId, aUpdates);
    res.send(status);
  });

  app.post("/api/assignments/:cid/:aId", (req, res) => {
    const assignment = {
      ...req.body,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.send(newAssignment);
  });
}
