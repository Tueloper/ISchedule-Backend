module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'userId'
    });
  };
  return Notification;
};
