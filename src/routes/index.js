const express = require("express");
const courseRouter = require("./courses");
const studentRouter = require("./students");
const userRouter = require("./users");
const authRouter = require("./auth");
const authGuard = require("../middleware/authGuard");

const v1Router = express.Router();

v1Router.use("/courses", authGuard, courseRouter);
v1Router.use("/students", studentRouter);
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);

module.exports = v1Router;
