"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Attendances",
      [
        {
          payrollId: 1,
          clockIn: "2023-08-01 08:52:27",
          clockOut: "2023-08-01 16:52:27",
          dailySalary: 500000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 2,
          clockIn: "2023-08-01 08:52:27",
          clockOut: "2023-08-01 16:52:27",
          dailySalary: 1000000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 2,
          clockIn: "2023-08-02 08:52:27",
          clockOut: "2023-08-02 16:52:27",
          dailySalary: 1000000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 1,
          clockIn: "2023-08-02 08:52:27",
          clockOut: "2023-08-02 16:52:27",
          dailySalary: 500000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 2,
          clockIn: "2023-08-03 08:52:27",
          clockOut: "2023-08-03 16:52:27",
          dailySalary: 1000000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 2,
          clockIn: "2023-08-04 08:52:27",
          clockOut: "2023-08-04 16:52:27",
          dailySalary: 1000000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          payrollId: 1,
          clockIn: "2023-08-05 08:52:27",
          clockOut: "2023-08-05 16:52:27",
          dailySalary: 500000,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Attendances", null, {});
  },
};
