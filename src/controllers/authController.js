const SendEmail = require("../helpers/transporter");
const { authService, commonService } = require("../services");

const AuthController = {
  userLogin: async (req, res) => {
    try {
      const { password } = req.body;
      const userData = req.user;

      const validatePassword = await commonService.validatePassword(
        password,
        userData.password
      );
      if (!validatePassword) {
        return authService.validationLoginFailed(res, 400, "Invalid password");
      }

      let payload = {
        id: userData.id,
        role: userData.Role.id,
      };

      const token = await authService.generateToken(payload);
      return res.status(200).json({
        success: "Login succeed",
        data: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
          roleId: userData.roleId,
          jobTypeId: userData.jobTypeId,
          token,
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Login failed",
        message: err.message,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { email, joinDate, salary, role, jobType } = req.body;

      const foundEmail = await commonService.findEmail(email);
      if (foundEmail) {
        return authService.validationRegistrationFailed(
          res,
          400,
          "User exists"
        );
      }

      const userData = await authService.createNewUser(
        email,
        joinDate,
        salary,
        role,
        jobType
      );

      let payload = {
        id: userData.id,
        isVerified: userData.isVerified,
        role: userData.roleId,
        status: "regist",
      };

      const token = await authService.generateToken(payload);
      SendEmail.verifyEmail(email, token);
      return res.status(200).json({
        success: "Registration succeed",
        user: userData,
        token,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Registration failed",
        message: err.message,
      });
    }
  },
};

module.exports = AuthController;
