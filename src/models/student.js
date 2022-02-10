const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        return !Joi.string().email().validate(email).error;
      },
      msg: "Invalid email format",
    },
  },
  courses: [
    {
      type: String,
      ref: "Course",
    },
  ],
});

const Model = model("Student", schema);

module.exports = Model;
