const router = require("express").Router();
const { authController } = require("../controllers");
const {
  validateRequest,
  validateLogin,
  // validateRegistration,
  // validateForgotPassword,
  // validateResetPassword,
} = require("../middleware/validator");
const {
  // verifyToken,
  // verifyAdmin,
  verifyEmployeeStatus,
  // verifyUserExist,
} = require("../middleware/auth");

router.post(
  "/login",
  validateLogin,
  validateRequest,
  verifyEmployeeStatus,
  authController.userLogin
);
// router.post(
//   "/user",
//   verifyToken,
//   verifyAdmin,
//   validateRegistration,
//   validateRequest,
//   authController.createCashier
// );
// router.put(
//   "/forgotpass",
//   validateForgotPassword,
//   validateRequest,
//   authController.forgotPassword
// );
// router.patch(
//   "/resetpass",
//   verifyToken,
//   verifyUserExist,
//   validateResetPassword,
//   validateRequest,
//   authController.resetPassword
// );

module.exports = router;
