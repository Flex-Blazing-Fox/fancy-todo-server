'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.todo_list,{foreignKey:'user_id'})
      // define association here
    }
  };
  user.init({
    email:{
      type:DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:{args:true,msg:"Email already exits"}
      }
    }, 
    password:{
      type:DataTypes.STRING,
      validate:{
        len:{args:[6],msg:"Min 6 characters"},
        is:{args:/^[0-9]+$/i,msg:"There must be a number"}
      }
    } 
  }, {
    hooks:{
      beforeCreate:user=>{
        const salt = bcrypt.genSaltSync(11)
        const hash = bcrypt.hashSync(user.password,salt)
        user.password = hash
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};