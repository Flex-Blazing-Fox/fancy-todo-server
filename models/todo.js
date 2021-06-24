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
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId'})
    }
  };
  Todo.init({
    title: {
      allowNull:false,
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "Title tidak boleh kosong"
        },
        notNull:{
          args: true,
          msg: "Title tidak boleh kosong"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description tidak boleh kosong"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        notEmpty: {
          args: true,
          msg: "Tanggal Tidak boleh kosong"
        },
        isAfter: {
          args: new Date().toString(),
          msg: 'Tidak boleh tanggal kemarin',
        }
      }
    },
    userId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User Tidak Ditemukan'
        },
        notNull: {
          args: true,
          msg: 'User Tidak Ditemukan'
        }
      }
    }
  }, { 
    sequelize,
    hooks: {
      beforeCreate: (todo) => {
        todo.status = 'belum selesai'
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};