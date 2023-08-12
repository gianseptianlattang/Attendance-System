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
        role: userData.Role.roleName,
      };

      const token = await authService.generateToken(payload);
      return res.status(200).json({
        success: "Login succeed",
        data: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
          role: userData.Role.roleName,
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

  //   createCashier: async (req, res) => {
  //     try {
  //       const { username, email, password } = req.body;
  //       const foundUser = await commonService.findUser(username);
  //       const foundEmail = await commonService.findEmail(email);
  //       if (foundUser || foundEmail) {
  //         return authService.validationRegistrationFailed(
  //           res,
  //           400,
  //           "User exists"
  //         );
  //       }

  //       const userData = await authService.createNewCashier(
  //         username,
  //         email,
  //         password
  //       );
  //       return res.status(200).json({
  //         success: "Registration succeed",
  //         user: userData,
  //       });
  //     } catch (err) {
  //       return res.status(500).json({
  //         error: "Registration failed",
  //         message: err.message,
  //       });
  //     }
  //   },

  //   forgotPassword: async (req, res) => {
  //     try {
  //       const { email } = req.body;

  //       let payload = {
  //         email: email,
  //       };
  //       const token = await authService.generateToken(payload);
  //       SendEmail.verifyEmail(email, token);
  //       return res.status(200).json({
  //         success: "Reset password succeed, Please verify from email!",
  //         token,
  //       });
  //     } catch (err) {
  //       return res.status(err.statusCode || 500).json({
  //         error: "Reset password failed",
  //         message: err.message,
  //       });
  //     }
  //   },

  //   resetPassword: async (req, res) => {
  //     try {
  //       const { id, username } = req.userReset;
  //       const { password } = req.body;
  //       await authService.updatePassword(id, password);
  //       return res.status(200).json({
  //         success: "Reset password succeed",
  //         username,
  //       });
  //     } catch (err) {
  //       return res.status(err.statusCode || 500).json({
  //         error: "Reset password failed",
  //         message: err.message,
  //       });
  //     }
  //   },
};

module.exports = AuthController;
