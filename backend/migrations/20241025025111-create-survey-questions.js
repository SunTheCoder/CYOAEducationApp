'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SurveyQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Surveys',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      questionType: {
        type: Sequelize.ENUM('multiple_choice', 'free_text', 'rating_scale', 'dropdown', 'visitor_info'),
        allowNull: false,
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SurveyQuestions');
  },
};
