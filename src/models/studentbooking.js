module.exports = (sequelize, DataTypes) => {
  const StudentBooking = sequelize.define('StudentBooking', {
    startTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Schedule',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {});
  StudentBooking.associate = (models) => {
    // associations can be defined here
    StudentBooking.belongsTo(models.Schedule, {
      as: 'booking',
      foreignKey: 'scheduleId'
    });
  };
  return StudentBooking;
};
