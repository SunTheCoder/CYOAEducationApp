module.exports = (sequelize, DataTypes) => {
    const SurveyResponse = sequelize.define('SurveyResponse', {
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Surveys',
          key: 'id',
        }
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'SurveyQuestions',
          key: 'id',
        }
      },
      response: {
        type: DataTypes.STRING, // Stores the user's answer
        allowNull: false,
      },
      visitorName: {
        type: DataTypes.STRING,
        allowNull: true, // Optional for anonymous responses
      },
      visitorEmail: {
        type: DataTypes.STRING,
        allowNull: true, // Optional for anonymous responses
      },
    });
  
    SurveyResponse.associate = (models) => {
      SurveyResponse.belongsTo(models.Survey, { foreignKey: 'surveyId' });
      SurveyResponse.belongsTo(models.SurveyQuestion, { foreignKey: 'questionId' });
    };
  
    return SurveyResponse;
  };
  