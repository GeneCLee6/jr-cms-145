const { Router } = require("express");
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addCourseToStudent,
  removeCourseFromStudent,
} = require("../controllers/students");

const studentRouter = Router();

studentRouter.get("", getAllStudents);
studentRouter.post("", addStudent);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/:id", updateStudentById);
studentRouter.delete("/:id", deleteStudentById);
studentRouter.post("/:id/course/:code", addCourseToStudent);
studentRouter.delete("/:id/course/:code", removeCourseFromStudent);

module.exports = studentRouter;
