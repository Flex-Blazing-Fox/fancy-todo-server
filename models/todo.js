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
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Todo.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'You must be signed to create or update todo',
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'title must not be empty',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'description must not be empty',
          },
        },
      },
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
