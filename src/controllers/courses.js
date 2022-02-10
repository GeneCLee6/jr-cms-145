const Course = require("../models/course");
const Joi = require("joi");

async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  return res.json(courses);
}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).populate("students").exec();
  if (!course) {
    return res.status(404).json({ error: "course not found" });
  }
  return res.json(course);
}

async function addCourse(req, res) {
  // const { code, name, description } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .required(),
    description: Joi.string(),
  });
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const existingCourse = await Course.findById(code).exec();
  if (existingCourse) {
    // conflicts
    return res.sendStatus(409);
  }
  const course = new Course({ code, name, description });
  await course.save();
  return res.status(201).json(course);
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    return res.status(404).json({ error: "course not found" });
  }
  return res.json(course);
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.status(404).json({ error: "course not found" });
  }
  await Student.updateMany(
    { courses: courses._id },
    {
      $pull: {
        courses: courses._id,
      },
    }
  );
  return res.sendStatus(204);
}

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
