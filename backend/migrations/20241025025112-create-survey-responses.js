'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SurveyResponses', {
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SurveyQuestions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      response: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      visitorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visitorEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visitorPhone: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('SurveyResponses');
  },
};
