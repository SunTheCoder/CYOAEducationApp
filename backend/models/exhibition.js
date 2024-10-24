const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure you have your Sequelize connection configured

const Exhibition = sequelize.define('Exhibition', {
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
    allowNull: true, // Optional
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = Exhibition;
