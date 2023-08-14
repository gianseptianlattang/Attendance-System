const { authService, commonService, employeeService } = require("../services");

const EmployeeController = {
  updateEmployee: async (req, res) => {
    try {
      const { username, fullname, birthDate, password } = req.body;
      const userData = req.user;

      if (userData.status !== "regist") {
        return employeeService.validationUpdateDataFailed(
          res,
          400,
          "Wrong token"
        );
      }

      const validateUsername = await commonService.findUsername(username);
      if (validateUsername) {
        return employeeService.validationUpdateDataFailed(
          res,
          404,
          "Username exists"
        );
      }

      const validateEmployee = await commonService.findUserId(userData.id);
      if (!validateEmployee) {
        return employeeService.validationUpdateDataFailed(
          res,
          404,
          "User not found"
        );
      }

      if (validateEmployee.isVerified) {
        return employeeService.validationUpdateDataFailed(
          res,
          400,
          "User is verified"
        );
      }

      await employeeService.updateNewUser(
        userData.id,
        username,
        fullname,
        birthDate,
        password
      );

      return res.status(200).json({
        success: "Update data succeed",
        data: {
          userId: userData.id,
          username,
          fullname,
          birthDate,
          password,
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update data failed",
        message: err.message,
      });
    }
  },
  createClockIn: async (req, res) => {
    try {
      const userData = req.user;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setHours(currentDate.getHours() + 7);
      currentDate.setDate(1);
      const createData = await employeeService.createCheckIn(
        userData.id,
        currentDate
      );
      return res.status(200).json({
        success: "Clock In succeed",
        data: { createData },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Clock In failed",
        message: err.message,
      });
    }
  },
  createClockOut: async (req, res) => {
    try {
      const userData = req.user;
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7);
      const createData = await employeeService.createCheckOut(
        userData.id,
        currentDate
      );
      return res.status(200).json({
        success: "Clock Out succeed",
        data: { createData },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Clock Out failed",
        message: err.message,
      });
    }
  },
  getAllReport: async (req, res) => {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const year = parseInt(req.query.year) || currentYear;
      const month = parseInt(req.query.month) || currentMonth;
      const userId = req.user.id;
      const sortBy = req.query.sort || "DESC";

      const data = await employeeService.getAllReport(
        userId,
        month,
        year,
        sortBy
      );

      return res.status(200).json({
        message: "Get all data succeed",
        month,
        year,
        sortBy,
        data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Get all data failed",
        message: err.message,
      });
    }
  },
};

module.exports = EmployeeController;
