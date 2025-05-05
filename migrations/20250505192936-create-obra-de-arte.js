'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ObraDeArtes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      artista: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { notEmpty: true }
      },
      imagen: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ObraDeArtes');
  }
};
