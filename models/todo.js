'use strict';
const today = new Date()
let yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
yesterday = yesterday.toString()

const {
  Model
} = require('sequelize');
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
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Title cannot be null'
        }
      }
    },
    desc: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Status cannot be null'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: yesterday,
          msg: 'DueDate cannot previus date'
        },
        notEmpty: {
          args: true,
          msg: 'DueDate cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'DueDate cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.associate = function(models){
    Todo.belongsTo(models.User, {foreignKey: 'user_id'})
  }
  return Todo;
};