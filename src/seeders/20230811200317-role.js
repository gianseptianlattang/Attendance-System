"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          roleName: "Admin",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          roleName: "Employee",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
