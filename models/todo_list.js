'use strict';
const moment = require('moment');
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todo_list.belongsTo(models.user,{foreignKey:'user_id'})
      // define association here
    }
  };
  todo_list.init({
    title:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{args:true,msg:"Title must be filled"},
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{args:true,msg:"Description must be filled"},
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty:{args:true,msg:"Status must be filled"},
      }
    },
    due_date:{
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isPost(value){
          let now = new Date()
          now = moment(now).format("YYYY-MM-DD")
          value = moment(value).format("YYYY-MM-DD")
          if (value < now) {
            throw new Error("Hanya boleh input tanggal sekarang dan setelahnya")
          }
        },
        notEmpty: true
      }
    }, 
    user_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    }, 
  }, {
    hooks:{
      beforeCreate: user =>{
        user.due_date = moment(user.due_date).format("YYYY-MM-DD")
      }
    },
    sequelize,
    modelName: 'todo_list',
  });
  return todo_list;
};