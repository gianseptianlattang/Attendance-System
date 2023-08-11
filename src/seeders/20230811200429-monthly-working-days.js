"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Monthly_Working_Days",
      [
        {
          monthlyWorkingDays: 20,
          monthYear: "2023-08",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Monthly_Working_Days", null, {});
  },
};
