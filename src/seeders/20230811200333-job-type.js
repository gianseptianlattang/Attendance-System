"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Job_Types",
      [
        {
          jobType: "Full Time",
          startTime: "08:00:00",
          endTime: "17:00:00",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          jobType: "Morning Shift",
          startTime: "06:00:00",
          endTime: "15:00:00",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          jobType: "Night Shift",
          startTime: "15:00:00",
          endTime: "00:00:00",
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Job_Types", null, {});
  },
};
