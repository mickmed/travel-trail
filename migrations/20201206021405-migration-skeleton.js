'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Images',
        'imageBase64',
         Sequelize.TEXT
       ),
      queryInterface.addColumn(
        'Images',
        'locationId',
        Sequelize.INTEGER
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
