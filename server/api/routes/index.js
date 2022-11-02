const express = require("express");
const usersRoutes = require("./users");
const videosRoutes = require("./videos");
const commentsRoutes = require("./comments");
const authRoutes = require("./auth");
const router = express.Router();

module.exports = () => {
  router.use("/", usersRoutes(), videosRoutes(), commentsRoutes(), authRoutes());
  return router;
};
