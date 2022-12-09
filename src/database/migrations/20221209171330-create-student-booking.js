module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('StudentBookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    booked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    scheduleId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Schedules',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('StudentBookings')
};
