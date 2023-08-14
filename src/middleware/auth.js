const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("../models");
const { findEmail } = require("../services/commonService");
const { authService } = require("../services");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const users = db.User;
const roles = db.Role;
const jobTypes = db.Job_Type;

const verifyEmployeeStatus = async (req, res, next) => {
  const { email } = req.body;
  const dataUser = await users.findOne({
    where: { email: email },
    include: [{ model: roles }, { model: jobTypes }],
  });
  if (!dataUser) {
    return authService.validationLoginFailed(res, 404, "Employee not found");
  }
  const userStatus = dataUser.isActive;
  const userRole = dataUser.Role.roleName;
  if (!userStatus && userRole !== 2) {
    return authService.validationLoginFailed(
      res,
      404,
      "Employee no longer active"
    );
  }
  req.user = dataUser;
  next();
};

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  const verifier = process.env.JWT_KEY;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized token",
      message: "No token",
    });
  }

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "No bearer token",
      });
    }

    let verifiedUser = jwt.verify(token, verifier);
    if (!verifiedUser) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "Invalid token",
      });
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Unauthorized token",
      message: err.message,
    });
  }
};

const verifyAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 1) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User not an admin",
    });
  }
  next();
};

const verifyEmployee = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 2) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User not an employee",
    });
  }
  next();
};

module.exports = {
  verifyEmployeeStatus,
  verifyToken,
  verifyAdmin,
  verifyEmployee,
};
