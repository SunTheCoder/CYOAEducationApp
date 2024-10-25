// models/SurveyQuestion.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SurveyQuestion extends Model {
  static associate(models) {
    SurveyQuestion.belongsTo(models.Survey, { foreignKey: 'surveyId' });
    SurveyQuestion.hasMany(models.SurveyResponse, { foreignKey: 'questionId', onDelete: 'CASCADE' });
  }
}

SurveyQuestion.init(
  {
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Surveys',
        key: 'id',
      },
    },
    questionType: {
      type: DataTypes.ENUM('multiple_choice', 'free_text', 'rating_scale', 'dropdown', 'visitor_info'),
      allowNull: false,
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [], // Set default to empty array
    },
  },
  {
    sequelize,
    modelName: 'SurveyQuestion',
  }
);

module.exports = SurveyQuestion;
