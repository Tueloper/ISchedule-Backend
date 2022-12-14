module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    startTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    month: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    day: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    color: {
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
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TeacherSchedule',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Booking.associate = (models) => {
    // associations can be defined here
    Booking.belongsTo(models.User, {
      as: 'student',
      foreignKey: 'studentId'
    });
  };
  return Booking;
};
