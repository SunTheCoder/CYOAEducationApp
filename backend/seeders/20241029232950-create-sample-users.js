'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // User data
    const users = [
      {
        username: 'adminUser',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', 10),
        isAdmin: true
      },
      {
        username: 'regularUser1',
        email: 'user1@example.com',
        password: await bcrypt.hash('userpassword', 10),
        isAdmin: false
      },
      {
        username: 'regularUser2',
        email: 'user2@example.com',
        password: await bcrypt.hash('guestpassword', 10),
        isAdmin: false
      },
      {
        username: 'regularUser3',
        email: 'user3@example.com',
        password: await bcrypt.hash('guestpassword', 10),
        isAdmin: false
      },
      {
        username: 'regularUser4',
        email: 'user4@example.com',
        password: await bcrypt.hash('guestpassword', 10),
        isAdmin: false
      }
    ];

    // Insert each user individually to handle unique constraints
    for (const user of users) {
      try {
        await queryInterface.bulkInsert('Users', [{
          ...user,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          console.log(`User with username "${user.username}" or email "${user.email}" already exists, skipping...`);
        } else {
          console.error('Error inserting user:', error);
          throw error; // Throw other errors to prevent silent failure
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the inserted users
    await queryInterface.bulkDelete('Users', null, {});
  }
};
