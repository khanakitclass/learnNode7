"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "laptop",
          description: "ok",
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "PC",
          description: "done",
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Products', null, {});
  },
};
