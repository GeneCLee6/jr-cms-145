require("dotenv").config();
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const v1Router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/v1", v1Router);
app.use(errorHandler);

module.exports = app;
