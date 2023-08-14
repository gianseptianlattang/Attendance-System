"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Payrolls",
      [
        {
          userId: 2,
          monthlyWorkingDaysId: 1,
          totalSalary: 1500000,
          totalWorkingDays: 5,
          monthYear: "2023-08-01",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          userId: 3,
          monthlyWorkingDaysId: 1,
          totalSalary: 4000000,
          totalWorkingDays: 4,
          monthYear: "2023-08-01",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payrolls", null, {});
  },
};
