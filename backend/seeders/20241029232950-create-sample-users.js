'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('adminpassword', 10);
    const hashedPassword2 = await bcrypt.hash('userpassword', 10);
    const hashedPassword3 = await bcrypt.hash('guestpassword', 10);
    const hashedPassword4 = await bcrypt.hash('guestpassword', 10);
    const hashedPassword5 = await bcrypt.hash('guestpassword', 10);

    // Insert users
    await queryInterface.bulkInsert('Users', [
      {
        username: 'adminUser',
        email: 'admin@example.com',
        password: hashedPassword1,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser1',
        email: 'user1@example.com',
        password: hashedPassword2,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser2',
        email: 'user2@example.com',
        password: hashedPassword3,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser3',
        email: 'user3@example.com',
        password: hashedPassword4,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser4',
        email: 'user4@example.com',
        password: hashedPassword5,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the inserted users
    await queryInterface.bulkDelete('Users', null, {});
  }
};
