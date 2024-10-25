// models/Visitor.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Visitor extends Model {}

Visitor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Visitor',
  }
);

module.exports = Visitor;
