'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add seed commands here.

    
    await queryInterface.bulkInsert('Locations', [{
      city: "Basel",
      country: "Switzerland",
      summary: "Swiss German Border",
      latitude: 88.8,
      longitude: 88.8,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
