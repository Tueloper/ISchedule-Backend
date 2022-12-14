module.exports = (sequelize, DataTypes) => {
  const TeacherSchedule = sequelize.define('TeacherSchedule',
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
      subject: {
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
      }
    },
    {});
  TeacherSchedule.associate = (models) => {
    TeacherSchedule.belongsTo(models.User, {
      as: 'lecturer',
      foreignKey: 'lectuererId'
    });
    // TeacherSchedule.belongsTo(models.User, {
    //   as: 'lecturer',
    //   foreignKey: 'studentId'
    // });
    // TeacherSchedule.hasMany(models.StudentBooking, {
    //   as: 'schedules',
    //   foreignKey: 'userId'
    // });
  };
  return TeacherSchedule;
};
