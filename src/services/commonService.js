const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const bcrypt = require("bcrypt");
const db = require("../models");
const users = db.User;
const roles = db.Role;
const jobTypes = db.Job_Type;
const monthlyWorkingDays = db.Monthly_Working_Days;

const findUserId = async (id) => {
  return await users.findOne({
    where: { id: id },
    include: [{ model: roles }, { model: jobTypes }],
  });
};

const findProfileUserId = async (id) => {
  return await profiles.findOne({ where: { userId: id } });
};

const findUsername = async (username) => {
  return await users.findOne({ where: { username: username } });
};

const findEmail = async (email) => {
  return await users.findOne({ where: { email: email } });
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  findUsername,
  findProfileUserId,
  findEmail,
  findUserId,
  validatePassword,
};
