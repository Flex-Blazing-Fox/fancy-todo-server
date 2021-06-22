"use strict";
const { Model } = require("sequelize");
const moment = require("moment");

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
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isValidDate(value) {
            if (moment(value, "YYYY-MM-DD hh:mm:ss") < moment()) {
              throw new Error(
                "Due date tidak boleh kurang dari waktu saat ini"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
