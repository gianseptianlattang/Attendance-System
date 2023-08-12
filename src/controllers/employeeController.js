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

      const newdata = await employeeService.updateNewUser(
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
};

module.exports = EmployeeController;
