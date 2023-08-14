const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const db = require("../models");
const users = db.User;
const roles = db.Role;
const jobTypes = db.Job_Type;

const updateSalary = async (id, salary) => {
  const result = await db.sequelize.transaction(async (t) => {
    return await users.update(
      { monthlySalary: salary },
      { where: { id: id } },
      { transaction: t }
    );
  });
  return result;
};

const getAllEmployee = async (pageSize, offset, sortBy) => {
  const result = await db.sequelize.transaction(async (t) => {
    const queryOptions = {
      include: [
        {
          model: jobTypes,
        },
        {
          model: roles,
        },
      ],
      limit: pageSize,
      offset: offset,
      order: [["createdAt", sortBy]],
      where: {
        roleId: 2,
      },
    };

    return await users.findAll(queryOptions, { transaction: t });
  });
  return result;
};

module.exports = {
  updateSalary,
  getAllEmployee,
};
