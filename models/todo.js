'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: new Date().toISOString(),
            msg: 'tanggal sudah lewat dari tanggal hari ini',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (todo, options) => {
          todo.status = 'not done'
        },
      },
      modelName: 'Todo',
    }
  )
  return Todo
}
