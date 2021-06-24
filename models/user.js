'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: 'userId'})
    }
  };
  User.init({
    Password: { 
      type:DataTypes.STRING,
      validate: {
        unique: {
          args : true,
          msg: 'Email Sudah Terdaftar'
        },
        notEmpty:{
          args: true,
          msg: 'Email Tidak Boleh Kosong'
        },
        notNull: {
          args: true,
          msg: 'Email Tidak boleh null'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      notEmpty:{
        args: true,
        msg: 'Password Tidak Boleh Kosong'
      },
      notNull: {
        args: true,
        msg: 'Password Tidak boleh null'
      },
      min : {
        args: 6,
        msg: 'Password minimal 6 karkter'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};