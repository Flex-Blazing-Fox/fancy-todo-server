const { Todo } = require("../models");

const authorize = (req, res, next) => {
  Todo.findAll({
    where: {
      user_id: req.userId,
    },
  })
    .then((results) => {
      req.authorizedTodos = results;
      next();
    })
    .catch((err) => next(err));
};

module.exports = authorize;
