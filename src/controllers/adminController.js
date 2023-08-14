const { adminService } = require("../services");
const db = require("../models");
const users = db.User;

const AdminController = {
  updateSalary: async (req, res) => {
    try {
      const { employeeId, monthlySalary } = req.body;
      await adminService.updateSalary(employeeId, monthlySalary);
      return res.status(200).json({
        success: "Update salary succeed",
        user: { employeeId, monthlySalary },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update salary failed",
        message: err.message,
      });
    }
  },

  getAllEmployee: async (req, res) => {
    try {
      const pageNumber = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.size) || 100;
      const sortBy = req.query.sort || "DESC";
      const offset = (pageNumber - 1) * pageSize;

      const data = await adminService.getAllEmployee(pageSize, offset, sortBy);

      const totalEmployee = await users.count({ where: { roleId: 2 } });
      const totalPages = Math.ceil(totalEmployee / pageSize);

      return res.status(200).json({
        message: "Get all employee succeed",
        pageNumber,
        pageSize,
        sortBy,
        totalPages,
        data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Get all employee failed",
        message: err.message,
      });
    }
  },
};

module.exports = AdminController;
