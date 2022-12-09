module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'student'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        isEmail: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  User.associate = (models) => {
    User.hasMany(models.Schedule, {
      as: 'lecturers',
      foreignKey: 'lectuererId'
    });
    User.hasMany(models.Schedule, {
      as: 'students',
      foreignKey: 'studentId'
    });
  };
  return User;
};
