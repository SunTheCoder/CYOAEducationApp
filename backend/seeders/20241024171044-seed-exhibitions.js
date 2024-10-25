'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exhibitions', [
      {
        title: 'Bad Kitty Does Not Like Art Museums',
        description: 'A whimsical exhibition featuring Bad Kitty by Nick Bruel, highlighting humorous and curious works.',
        imageUrl: 'https://example.com/badkitty.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Exhibition Two',
        description: 'A captivating exhibition showcasing modern art trends.',
        imageUrl: 'https://example.com/exhibition2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Exhibition Three',
        description: 'An upcoming exhibition featuring abstract sculptures and digital art.',
        imageUrl: 'https://example.com/exhibition3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exhibitions', null, {});
  },
};

