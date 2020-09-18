'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Adds separated databases so tests do not step on each other's data
     */
    await queryInterface.createDatabase('test_users_model', {
      template: 'foodapp_dev'
    });

    await queryInterface.createDatabase('test_users_http', {
      template: 'foodapp_dev'
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropDatabase('test_users_http');
    await queryInterface.dropDatabase('test_users_model');
  }
};
