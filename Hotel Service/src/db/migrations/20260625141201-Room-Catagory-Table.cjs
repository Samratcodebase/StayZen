"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS Room_Category (
             Room_Category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
             Room_Type VARCHAR(10),
             Room_Price INT,
             Hotel_id INT NOT NULL
         )
   `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
