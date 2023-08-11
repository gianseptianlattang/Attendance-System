"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          jobTypeId: 1,
          roleId: 1,
          username: "admin1",
          email: "admin1@mailsac.com",
          fullname: "Admin Rasta Nugroho",
          password:
            "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
          joinDate: "2023-01-27 07:52:27",
          birthDate: "2000-01-27 07:52:27",
          monthlySalary: 7000000,
          isActive: 1,
          isVerified: 1,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          jobTypeId: 1,
          roleId: 2,
          username: "cashier1",
          email: "cashier1@mailsac.com",
          fullname: "Cashier1 Rasta Nugroho",
          password:
            "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
          joinDate: "2023-01-27 07:52:27",
          birthDate: "2000-01-27 07:52:27",
          monthlySalary: 10000000,
          isActive: 1,
          isVerified: 1,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
        {
          jobTypeId: 2,
          roleId: 2,
          username: "cashier2",
          email: "cashier2@mailsac.com",
          fullname: "Cashier2 Rasta Nugroho",
          password:
            "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
          joinDate: "2023-01-27 07:52:27",
          birthDate: "2000-01-27 07:52:27",
          monthlySalary: 20000000,
          isActive: 1,
          isVerified: 1,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
