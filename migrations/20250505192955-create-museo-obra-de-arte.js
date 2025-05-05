'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MuseoObraDeArtes', {
      idObraDeArte: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'ObraDeArtes', key: 'id' },
        onDelete: 'CASCADE'
      },
      idMuseo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Museos', key: 'id' },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('MuseoObraDeArtes');
  }
};
