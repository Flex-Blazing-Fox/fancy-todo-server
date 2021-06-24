'use strict';
const fs = require('fs')
let todo = JSON.parse(fs.readFileSync('./databases/todos.json', {encoding: "utf-8"}))
todo = todo.map(el=>{
  return{
    ...el ,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', todo)
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
    await queryInterface.bulkDelete('Todos')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
