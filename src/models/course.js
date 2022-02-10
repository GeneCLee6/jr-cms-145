const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    upperCase: true,
    alias: "code",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    default: "",
    type: String,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Model = mongoose.model("Course", schema);

module.exports = Model;
