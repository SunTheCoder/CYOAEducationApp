module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define('Survey', {
      exhibitionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Exhibitions', // Association with Exhibitions table
          key: 'id',
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Survey.associate = (models) => {
      Survey.belongsTo(models.Exhibition, { foreignKey: 'exhibitionId' });
      Survey.hasMany(models.SurveyQuestion, { foreignKey: 'surveyId', onDelete: 'CASCADE' });
    };
  
    return Survey;
  };
  