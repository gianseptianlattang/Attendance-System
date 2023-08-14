const { validationResult, body } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Validation failed", message: errors.array() });
  }
  next();
};

const validateLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegistration = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("joinDate").notEmpty().withMessage("Invalid join date format"),
  body("salary").notEmpty().withMessage("Salary is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("jobType").notEmpty().withMessage("Job type is required"),
];

const validateUpdateEmployee = [
  body("username").notEmpty().withMessage("Username is required"),
  body("fullname").notEmpty().withMessage("Join date is required"),
  body("birthDate").isDate().withMessage("Invalid birthdate format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password");
    }
    return true;
  }),
];

const validateClockIn = [
  body("clockIn").notEmpty().withMessage("ClockIn is required"),
  body("dailySalary").notEmpty().withMessage("DailySalary is required"),
];

const validateUpdateSalary = [
  body("employeeId").notEmpty().withMessage("EmployeeId is required"),
  body("monthlySalary").notEmpty().withMessage("MonthlySalary is required"),
];

module.exports = {
  validateRequest,
  validateLogin,
  validateRegistration,
  validateUpdateEmployee,
  validateClockIn,
  validateUpdateSalary,
};
