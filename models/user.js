'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: 'user_id' })
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: {
            args: true,
            msg: 'email must not be empty',
          },
          notNull: {
            args: true,
            msg: 'email must not be null',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          min: {
            args: 6,
            msg: 'password must be at least 6 characters',
          },
          notEmpty: {
            args: true,
            msg: 'password must not be empty',
          },
          notNull: {
            args: true,
            msg: 'password must not be empty',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(user.password, salt)
          user.password = hash
        },
      },
      modelName: 'User',
    }
  )
  return User
}
