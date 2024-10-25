module.exports = (sequelize, DataTypes) => {
    const SurveyQuestion = sequelize.define('SurveyQuestion', {
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Surveys',
          key: 'id',
        }
      },
      questionType: {
        type: DataTypes.ENUM('multiple_choice', 'free_text', 'rating_scale', 'dropdown'),
        allowNull: false,
      },
      questionText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Only used for multiple_choice and dropdown
        allowNull: true,
      },
    });
  
    SurveyQuestion.associate = (models) => {
      SurveyQuestion.belongsTo(models.Survey, { foreignKey: 'surveyId' });
    };
  
    return SurveyQuestion;
  };
  