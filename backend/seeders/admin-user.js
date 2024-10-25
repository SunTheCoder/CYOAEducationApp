'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const passwordHash = await bcrypt.hash('admin_password', 10); // Hash the admin password

      // Insert the admin user into the Users table
      await queryInterface.bulkInsert('Users', [
        {
          username: 'admin7',
          email: 'admin7@admin.com',
          password: passwordHash,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});

      console.log('Admin user seeded');
    } catch (error) {
      console.error('Error seeding admin user:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the seeded admin user
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
