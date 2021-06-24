"use strict";
const fs = require("fs");

let data = JSON.parse(
  fs.readFileSync("./database/todo.json", { encoding: "utf-8" })
);

data = data.map((dataPoint) => {
  return {
    ...dataPoint,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Todos", data, {});
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Todos_id_seq"', (SELECT MAX(id) FROM "Todos"))`
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Todos", null, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Todos_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
