'use strict';
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
    
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },

    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },

    status: {
      type : DataTypes.BOOLEAN,
      validate : {
        notEmpty : true
      }
    },

    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter: {
          args: new Date().toISOString(),
          msg: 'Tidak dapat menginput tanggal yang sudah lewat dari tanggal hari ini'
        },
      },
    }, 
  }, 
  {
    sequelize,
    modelName: 'Todo',
  });

  Todo.associate = function (models) {
    Todo.belongsTo(models.User, {foreignKey: "useerId"})
  }
  return Todo;
};