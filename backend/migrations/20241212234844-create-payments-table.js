'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      externalId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      externalReference: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending'
      },
      orderStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isTest: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      clientId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      payerId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      paidAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};