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
          notEmpty: {
            args: true,
            msg: 'user_id must not be empty',
          },
          notNull: {
            args: true,
            msg: 'You must be signed to create or update todo',
          },
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'title must not be empty',
          },
          notNull: {
            args: true,
            msg: 'title must not be null',
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'description must not be empty',
          },
          notNull: {
            args: true,
            msg: 'description must not be null',
          },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'status must not be empty',
          },
          notNull: {
            args: true,
            msg: 'status must not be null',
          },
          isIn: {
            args: [['not done', 'done']],
            msg: 'status must be either not done or done',
          },
        },
      },
      due_date: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: new Date().toISOString(),
            msg: 'tanggal sudah lewat dari tanggal hari ini',
          },
          notEmpty: {
            args: true,
            msg: 'due_date must not be empty',
          },
          notNull: {
            args: true,
            msg: 'due_date must not be null',
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
