'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exhibitions', [
      {
        title: 'Bad Kitty Does Not Like Art Museums',
        description: 'A whimsical exhibition featuring Bad Kitty by Nick Bruel, highlighting humorous and curious works.',
        imageUrl: 'https://lcva.longwood.edu/wp-content/uploads/2024/08/Bady-Kitty-Starry-Night-1.jpg',
        link: 'https://lcva.longwood.edu/event/bad-kitty-does-not-like-art-museums-2/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Letters from Farmville: Reflections on Ancestral Arrival into Descendant Memory',
        description: 'In 1989 Dr. Debra Jean Ambush came to Farmville to help settle an estate for a recently passed family member.',
        imageUrl: 'https://lcva.longwood.edu/wp-content/uploads/2024/08/451624173_1005858958207827_1691580555828386781_n.jpg',
        link: 'https://lcva.longwood.edu/event/letters-from-farmville-reflections-on-ancestral-arrival-into-descendant-memory/',  
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Of Time, and The Town',
        description: 'An upcoming exhibition featuring abstract sculptures and digital art.',
        imageUrl: 'https://lcva.longwood.edu/wp-content/uploads/2024/08/Screenshot-299.png',
        link: 'https://lcva.longwood.edu/event/of-time-and-the-town/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exhibitions', null, {});
  },
};

