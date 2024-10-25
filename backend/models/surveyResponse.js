// models/SurveyResponse.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SurveyResponse extends Model {
  static associate(models) {
    SurveyResponse.belongsTo(models.Survey, { foreignKey: 'surveyId' });
    SurveyResponse.belongsTo(models.SurveyQuestion, { foreignKey: 'questionId' });
  }
}

SurveyResponse.init(
  {
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Surveys',
        key: 'id',
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SurveyQuestions',
        key: 'id',
      },
    },
    response: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitorEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitorPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SurveyResponse',
  }
);

module.exports = SurveyResponse;
