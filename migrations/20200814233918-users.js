'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primarykey: true,
        autoIncrement: true,
        unique: true
      },
      auth0Id: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE
      }
      
    });

    await queryInterface.addIndex('users', ['id'], {
      unique: true,
      using: 'BTREE',
    });

    await queryInterface.addIndex('users', ['auth0Id'], {
      unique: true
    });


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
