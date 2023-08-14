module.exports = (sequelize, DataTypes) => {
  const Payroll = sequelize.define(
    "Payroll",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monthlyWorkingDaysId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalSalary: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalWorkingDays: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      monthYear: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );

  Payroll.associate = (models) => {
    Payroll.hasMany(models.Attendance, {
      foreignKey: "payrollId",
    });
    Payroll.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Payroll.belongsTo(models.Monthly_Working_Days, {
      foreignKey: "monthlyWorkingDaysId",
    });
  };
  return Payroll;
};
