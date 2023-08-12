const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../models");
const users = db.User;
const jwt = require("jsonwebtoken");

const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};

const validationLoginFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Login failed",
    message: message,
  });
};

const validationRegistrationFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Registration failed",
    message: message,
  });
};

const createNewUser = async (
  email,
  joinDate,
  monthlySalary,
  roleId,
  jobTypeId
) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const userData = await users.create(
        {
          email,
          joinDate,
          monthlySalary,
          roleId,
          jobTypeId,
        },
        { transaction: t }
      );
      return userData;
    });
    return result;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user");
  }
};

module.exports = {
  generateToken,
  validationLoginFailed,
  validationRegistrationFailed,
  createNewUser,
};
