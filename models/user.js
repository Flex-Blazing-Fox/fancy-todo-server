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
      allowNull:{args:false,msg:"Email must be filled with character"},
      unique:{args:true,msg:"Email has been used"},
      validate:{
        notEmpty:{args:true,msg:"Email must be not empty"},
        isEmail:{args:true,msg:"Must be email format"},
      }
    }, 
    password:{
      type:DataTypes.STRING,
      allowNull:{args:false,msg:"Password must be filled with character"},
      validate:{
        notEmpty:{args:true,msg:"password must be filled"},
        len:{args:[6],msg:"Password min 6 characters"},
        is:{args:[/[0-9]/g],msg:"There must be a number"}
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