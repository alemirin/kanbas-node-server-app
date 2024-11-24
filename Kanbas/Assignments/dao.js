import Database from "../Database/index.js";
export function findAllAssignments() {
  return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return assignmentList;
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
