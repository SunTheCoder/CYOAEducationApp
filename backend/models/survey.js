// models/Survey.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Survey extends Model {
  static associate(models) {
    Survey.belongsTo(models.Exhibition, { foreignKey: 'exhibitionId' });
    Survey.hasMany(models.SurveyQuestion, { foreignKey: 'surveyId', onDelete: 'CASCADE' });
  }
}

Survey.init(
  {
    exhibitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Exhibitions',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Survey',
  }
);

module.exports = Survey;
