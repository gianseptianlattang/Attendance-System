const router = require("express").Router();
const { employeeController } = require("../controllers");
const {
  validateRequest,
  validateUpdateEmployee,
} = require("../middleware/validator");
const { verifyToken } = require("../middleware/auth");

router.patch(
  "/user",
  verifyToken,
  validateUpdateEmployee,
  validateRequest,
  employeeController.updateEmployee
);

module.exports = router;
