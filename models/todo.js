'use strict';
const { Model } = require('sequelize');
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
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },

    description: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },

    status: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },

    due_date: {
      type : DataTypes.DATE,
      allowNull: false,
      validate : {
        isAfter: {
          args: new Date().toISOString(),
          msg: 'Tidak dapat menginput tanggal yang sudah lewat dari tanggal hari ini'
        },
      },
    }, 
    userId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          args : true,
          msg : "User Id can not be empty"
        }
      }
    },
     
  },
  {
    sequelize,
    modelName: 'Todo',
  });

  Todo.associate = function (models) {
    Todo.belongsTo(models.User, {foreignKey: "userId"})
  }
  return Todo;
};