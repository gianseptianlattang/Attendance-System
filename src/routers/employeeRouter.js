const router = require("express").Router();
const { employeeController } = require("../controllers");
const {
  validateRequest,
  validateUpdateEmployee,
} = require("../middleware/validator");
const { verifyToken, verifyEmployee } = require("../middleware/auth");

router.patch(
  "/user",
  verifyToken,
  validateUpdateEmployee,
  validateRequest,
  employeeController.updateEmployee
);
router.post(
  "/clockin",
  verifyToken,
  verifyEmployee,
  employeeController.createClockIn
);
router.post(
  "/clockout",
  verifyToken,
  verifyEmployee,
  employeeController.createClockOut
);
router.get(
  "/allreport",
  verifyToken,
  verifyEmployee,
  employeeController.getAllReport
);

module.exports = router;
