module.exports = (sequelize, DataTypes) => {
  const Job_Type = sequelize.define(
    "Job_Type",
    {
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );

  Job_Type.associate = (models) => {
    Job_Type.hasMany(models.User, {
      foreignKey: "jobTypeId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };
  return Job_Type;
};
