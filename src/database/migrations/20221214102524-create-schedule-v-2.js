module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TeacherSchedules', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    avialableDate: {
      type: Sequelize.STRING,
      allowNull: true
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: true
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    year: {
      type: Sequelize.STRING,
      allowNull: true
    },
    month: {
      type: Sequelize.STRING,
      allowNull: true
    },
    day: {
      type: Sequelize.STRING,
      allowNull: true
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true
    },
    booked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    lectuererId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
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
  down: (queryInterface) => queryInterface.dropTable('TeacherSchedules')
};
