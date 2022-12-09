module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      avialableDate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lectuererId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    },
    {}
  );
  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, {
      as: 'student',
      foreignKey: 'lectuererId'
    });
    Schedule.belongsTo(models.User, {
      as: 'lecturer',
      foreignKey: 'studentId'
    });
    Schedule.hasMany(models.StudentBooking, {
      as: 'schedules',
      foreignKey: 'userId'
    });
  };
  return Schedule;
};
