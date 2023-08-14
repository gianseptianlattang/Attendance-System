const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../models");
const { Sequelize, Op } = require("sequelize");
const users = db.User;
const payrolls = db.Payroll;
const attendances = db.Attendance;
const monthlyWorkingDays = db.Monthly_Working_Days;
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

const findMonthlyWorkingDays = async () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  return await monthlyWorkingDays.findOne({
    where: {
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("monthYear")),
          currentYear
        ),
        Sequelize.where(
          Sequelize.fn("MONTH", Sequelize.col("monthYear")),
          currentMonth
        ),
      ],
    },
  });
};

const findDataPayroll = async (id, monthlyWorkingDaysId) => {
  return await payrolls.findOne({
    where: {
      [Op.and]: [
        { userId: id },
        { monthlyWorkingDaysId: monthlyWorkingDaysId },
      ],
    },
  });
};

const findTotalSalaryAndDay = async (payrollId) => {
  return await attendances.findOne({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("dailySalary")), "totalSalary"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "totalWorkingDays"],
    ],
    where: {
      payrollId,
    },
  });
};

const updatePayroll = async (id, totalSalary, totalWorkingDays) => {
  return await db.sequelize.transaction(async (t) => {
    return await payrolls.update(
      {
        totalSalary: totalSalary,
        totalWorkingDays: totalWorkingDays,
      },
      { where: { userId: id } },
      { transaction: t }
    );
  });
};

const createCheckIn = async (id, currentDate) => {
  let payrollId;
  let payrollMonthlyWork;
  try {
    const dataMonthlyWorking = await findMonthlyWorkingDays();

    let dataPayroll = await findDataPayroll(id, dataMonthlyWorking.id);

    const dataUser = await users.findOne({
      where: { id: id },
    });

    const result = await db.sequelize.transaction(async (t) => {
      if (!dataPayroll) {
        dataPayroll = await payrolls.create({
          userId: id,
          monthlyWorkingDaysId: dataMonthlyWorking.id,
          monthYear: currentDate,
        });
      }

      payrollMonthlyWork = dataMonthlyWorking.monthlyWorkingDays;
      payrollId = dataPayroll.id;

      const dailySalary = Math.ceil(
        dataUser.monthlySalary / payrollMonthlyWork / 2
      );
      const clockInDate = new Date();
      clockInDate.setHours(clockInDate.getHours() + 7);

      const dataAttendance = await attendances.create({
        payrollId: payrollId,
        clockIn: clockInDate,
        dailySalary: dailySalary,
      });

      const resultAttendance = await findTotalSalaryAndDay(payrollId);

      await updatePayroll(
        id,
        resultAttendance.dataValues.totalSalary,
        resultAttendance.dataValues.totalWorkingDays
      );

      return {
        dataAttendance,
        totalSalary: resultAttendance.dataValues.totalSalary,
        totalWorkingDays: resultAttendance.dataValues.totalWorkingDays,
      };
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createCheckOut = async (id, currentDate) => {
  try {
    const dataMonthlyWorking = await findMonthlyWorkingDays();

    const dataPayroll = await findDataPayroll(id, dataMonthlyWorking.id);

    const payrollMonthlyWork = dataMonthlyWorking.monthlyWorkingDays;
    const payrollId = dataPayroll.id;

    const dataUser = await users.findOne({
      where: { id: id },
    });

    const dailySalary = Math.ceil(dataUser.monthlySalary / payrollMonthlyWork);

    const result = await db.sequelize.transaction(async (t) => {
      await attendances.update(
        { clockOut: currentDate, dailySalary },
        { where: { payrollId } },
        { transaction: t }
      );

      const resultAttendance = await findTotalSalaryAndDay(payrollId);

      await updatePayroll(
        id,
        resultAttendance.dataValues.totalSalary,
        resultAttendance.dataValues.totalWorkingDays
      );
      return {
        userId: id,
        dailySalary,
        totalSalary: resultAttendance.dataValues.totalSalary,
        totalWorkingDays: resultAttendance.dataValues.totalWorkingDays,
      };
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllReport = async (userId, month, year, sortBy) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const queryOptions = {
        include: [
          {
            model: users,
          },
          {
            model: attendances,
          },
        ],
        where: {
          userId: userId,
          monthYear: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn("MONTH", Sequelize.col("monthYear")),
                month
              ),
              Sequelize.where(
                Sequelize.fn("YEAR", Sequelize.col("monthYear")),
                year
              ),
            ],
          },
        },
        order: [[{ model: attendances }, "createdAt", sortBy]],
      };

      return await payrolls.findAll(queryOptions, { transaction: t });
    });

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  validationUpdateDataFailed,
  updateNewUser,
  createCheckIn,
  createCheckOut,
  getAllReport,
};
