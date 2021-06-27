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
      Todo.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: true, 
          isAppropriateLength(value) {
            if (value.length > 100) {
              throw new Error(
                "Panjang judul tidak boleh lebih dari 100 karakter"
              );
            }
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          isAppropriateLength(value) {
            if (value.length > 500) {
              throw new Error(
                "Panjang deskripsi tidak boleh lebih dari 500 karakter"
              );
            }
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [["to plan", "to code", "to execute", "done"]],
        },
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: false,
          notEmpty: true,
          isValidDate(value) {
            if (!moment(value, moment.ISO_8601, true).isValid()) {
              throw new Error("Masukkan input berupa format tanggal dan waktu");
            } else if (moment(value, "YYYY-MM-DD hh:mm:ss") < moment()) {
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
