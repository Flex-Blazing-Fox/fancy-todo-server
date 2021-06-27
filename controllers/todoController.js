const { Todo } = require("../models");
const getAuthorizedTodo = require("../helpers/getAuthorizedTodo");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");

class todoController {
  static getAllTodos(req, res, next) {
    try {
      if (req.authorizedTodos.length > 0) {
        res.status(200).json(req.authorizedTodos);
      } else {
        res.status(200).json({ message: "no todo list created" });
      }
    } catch {
      next({ name: "INTERNAL SERVER ERROR" });
    }
  }
  static getTodo(req, res, next) {
    try {
      const { id } = req.params;
      let todo = getAuthorizedTodo(req, id);
      if (todo) {
        res.status(200).json(todo);
      } else {
        next({ name: "TODO NOT FOUND / AUTHORIZED", id: id });
      }
    } catch {
      next({ name: "INTERNAL SERVER ERROR" });
    }
  }
  static createTodo(req, res, next) {
    let { title, description, status, due_date } = req.body;
    Todo.create(
      {
        title,
        description,
        status,
        due_date,
        user_id: +req.userId,
      },
      {
        returning: true,
        plain: true,
      }
    )
      .then((result) => res.status(201).json(result))
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          next({
            name: "SEQUELIZE VALIDATION ERROR",
            details: getValidationErrorDetails(err),
          });
        } else {
          next({ name: "INTERNAL SERVER ERROR" });
        }
      });
  }
  static updateTodoValue(req, res, next) {
    const { id } = req.params;
    let todo = getAuthorizedTodo(req, id);
    if (todo) {
      Todo.update(req.body, {
        where: {
          id: +id,
        },
        returning: true,
      })
        .then((result) => res.status(200).json(result[1][0]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            next({
              name: "SEQUELIZE VALIDATION ERROR",
              details: getValidationErrorDetails(err),
            });
          } else {
            next({ name: "INTERNAL SERVER ERROR" });
          }
        });
    } else {
      next({ name: "TODO NOT FOUND / AUTHORIZED", id: id });
    }
  }
  static updateTodoRecord(req, res, next) {
    let { id } = req.params;
    const keys = ["title", "description", "status", "due_date"];
    let hasAllKeys = keys.every((item) => req.body.hasOwnProperty(item));
    let todo = getAuthorizedTodo(req, id);
    if (!hasAllKeys) {
      next({ name: "UPDATE METHOD NEED ALL DATA" });
    } else if (todo) {
      let { title, description, status, due_date } = req.body;

      Todo.update(
        { title, description, status, due_date },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      )
        .then((result) => res.status(200).json(result[1][0]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            next({
              name: "SEQUELIZE VALIDATION ERROR",
              details: this.getValidationErrorDetails(err),
            });
          } else {
            next(err);
          }
        });
    } else {
      next({ name: "TODO NOT FOUND / AUTHORIZED", id: id });
    }
  }

  static deleteTodo(req, res, next) {
    let { id } = req.params;
    let todo = getAuthorizedTodo(req, id);
    if (todo) {
      Todo.destroy({
        where: {
          id: +id,
        },
        returning: true,
      })
        .then((_) =>
          res
            .status(200)
            .json({ message: `Record with id ${id} successfully deleted` })
        )
        .catch((err) => {
          next(err);
        });
    } else {
      next({ name: "TODO NOT FOUND / AUTHORIZED", id: id });
    }
  }
}

module.exports = todoController;
