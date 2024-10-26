// models/Exhibition.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Exhibition extends Model {
  static associate(models) {
    Exhibition.hasMany(models.Survey, { foreignKey: 'exhibitionId', onDelete: 'CASCADE' });
  }
}

Exhibition.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Exhibition',
    timestamps: true,
  }
);

module.exports = Exhibition;
