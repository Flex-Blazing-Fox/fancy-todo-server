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
   
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },
    
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },
  }, 
  {
    sequelize,
    modelName: 'User',
  });

  User.associate = function (models) {
    User.hasMany(models.Todo, {foreignKey: "userId"})
  }
  return User;
};