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
        type: DataTypes.INTEGER,
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
