module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      jobTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      joinDate: {
        type: DataTypes.DATE,
        defaultValue: true,
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      monthlySalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );

  User.associate = (models) => {
    User.hasMany(models.Payroll, { foreignKey: "userId" });
    User.belongsTo(models.Role, { foreignKey: "roleId" });
    User.belongsTo(models.Job_Type, { foreignKey: "jobTypeId" });
  };
  return User;
};
