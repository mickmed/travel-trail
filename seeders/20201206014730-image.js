'use strict';

const { stringify } = require("querystring");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      // Add seed commands here.
      await queryInterface.bulkInsert('Images', [{
        name: "Basel",
        imageBase64: "Switzerland",
        LocationId:1,
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
