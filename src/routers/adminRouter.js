const router = require("express").Router();
const { adminController } = require("../controllers");
const {
  validateRequest,
  validateUpdateSalary,
} = require("../middleware/validator");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.patch(
  "/salary",
  verifyToken,
  verifyAdmin,
  validateUpdateSalary,
  validateRequest,
  adminController.updateSalary
);

router.get(
  "/allemployee",
  verifyToken,
  verifyAdmin,
  adminController.getAllEmployee
);

module.exports = router;
