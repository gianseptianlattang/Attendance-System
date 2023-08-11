module.exports = (sequelize, DataTypes) => {
  const Monthly_Working_Days = sequelize.define(
    "Monthly_Working_Days",
    {
      monthlyWorkingDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monthYear: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {}
  );

  Monthly_Working_Days.associate = (models) => {
    Monthly_Working_Days.hasMany(models.Attendance, {
      foreignKey: "monthlyWorkingDaysId",
    });
  };
  return Monthly_Working_Days;
};
