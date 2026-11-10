'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      guests: {
        type: Sequelize.INTEGER
      },
      bedRoom: {
        type: Sequelize.INTEGER
      },
      bath: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      elevator: {
        type: Sequelize.BOOLEAN
      },
      hotTub: {
        type: Sequelize.BOOLEAN
      },
      pool: {
        type: Sequelize.BOOLEAN
      },
      indoorFireplace: {
        type: Sequelize.BOOLEAN
      },
      dryer: {
        type: Sequelize.BOOLEAN
      },
      gym: {
        type: Sequelize.BOOLEAN
      },
      kitchen: {
        type: Sequelize.BOOLEAN
      },
      wifi: {
        type: Sequelize.BOOLEAN
      },
      heating: {
        type: Sequelize.BOOLEAN
      },
      cableTV: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};