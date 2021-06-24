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
    .catch((err) => res.status(500).json(err));
};

module.exports = authorize;
