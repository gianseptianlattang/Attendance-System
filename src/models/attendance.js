"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init(
    {
      payrollId: DataTypes.INTEGER,
      monthlyWorkingDaysId: DataTypes.INTEGER,
      clockIn: DataTypes.DATE,
      clockOut: DataTypes.DATE,
      dailySalary: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      payrollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clockIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clockOut: {
        type: DataTypes.DATE,
      },
      dailySalary: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {}
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Payroll, {
      foreignKey: "payrollId",
    });
  };
  return Attendance;
};
