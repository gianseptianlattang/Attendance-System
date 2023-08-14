const router = require("express").Router();
const { authController } = require("../controllers");
const {
  validateRequest,
  validateLogin,
  validateRegistration,
} = require("../middleware/validator");
const {
  verifyToken,
  verifyAdmin,
  verifyEmployeeStatus,
} = require("../middleware/auth");

router.post(
  "/login",
  validateLogin,
  validateRequest,
  verifyEmployeeStatus,
  authController.userLogin
);
router.post(
  "/user",
  verifyToken,
  verifyAdmin,
  validateRegistration,
  validateRequest,
  authController.createUser
);

module.exports = router;
