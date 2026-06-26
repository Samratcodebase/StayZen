"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS Rooms (
        room_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        hotel_id INT NOT NULL,
        room_category_id INT NOT NULL,
        room_no VARCHAR(20) NOT NULL,
        date_of_availability DATE NOT NULL,
        booking_id INT
         )
   `);
  },

  async down(queryInterface, Sequelize) {},
};
