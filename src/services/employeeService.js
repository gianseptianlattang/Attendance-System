const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../models");
const users = db.User;
const bcrypt = require("bcrypt");

const validationUpdateDataFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update data failed",
    message: message,
  });
};

const updateNewUser = async (id, username, fullname, birthDate, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await db.sequelize.transaction(async (t) => {
      const userData = await users.update(
        {
          username,
          fullname,
          birthDate,
          password: hashPassword,
          isVerified: 1,
        },
        { where: { id: id } },
        { transaction: t }
      );
      return userData;
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  validationUpdateDataFailed,
  updateNewUser,
};
