const { Todo } = require("../models");

class todoController {
  static getAllTodos(req, res) {
    try {
      if (req.authorizedTodos.length > 0) {
        res.status(200).json(req.authorizedTodos);
      } else {
        res.status(200).json({ message: "belum ada todo list yang dibuat" });
      }
    } catch {
      res.status(500).json({ message: "terjadi error" });
    }
  }
  static getTodo(req, res) {
    try {
      const { id } = req.params;
      let authorizedTodos = req.authorizedTodos.map((todo) => todo.dataValues),
        todo = authorizedTodos.find((todo) => todo.id === +id);
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({
          message: `tidak ditemukan todo dengan id ${id} atau todo tersebut tidak terautorisasi`,
        });
      }
    } catch {
      res.status(500).json({ message: "terjadi error" });
    }
  }
  static createTodo(req, res) {
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
          res.status(400).json(err);
        } else {
          res.status(500).json(err);
        }
      });
  }
  static updateTodoValue(req, res) {
    const { id } = req.params;
    let authorizedTodos = req.authorizedTodos.map((todo) => todo.dataValues),
      todo = authorizedTodos.find((todo) => todo.id === +id);
    if (todo) {
      Todo.update(req.body, {
        where: {
          id: +id,
        },
        returning: true,
      })
        .then((result) => res.status(200).json(result[1]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            res.status(400).json(err);
          } else {
            res.status(500).json(err);
          }
        });
    } else {
      res.status(404).json({
        message: `tidak ditemukan todo dengan id ${id} atau todo tersebut tidak terautorisasi untuk diubah`,
      });
    }
  }
  static updateTodoRecord(req, res) {
    let { id } = req.params;
    const keys = ["title", "description", "status", "due_date"];
    let hasAllKeys = keys.every((item) => req.body.hasOwnProperty(item));
    let authorizedTodos = req.authorizedTodos.map((todo) => todo.dataValues),
      todo = authorizedTodos.find((todo) => todo.id === +id);
    if (!hasAllKeys) {
      res.status(400).json({
        message: `All data (title, description, status, and due date) must be provided. Use patch instead.`,
      });
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
        .then((result) => res.status(200).json(result[1]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            res.status(400).json(err);
          } else {
            res.status(500).json(err);
          }
        });
    } else {
      res.status(404).json({
        message: `tidak ditemukan todo dengan id ${id} atau todo tersebut tidak terautorisasi untuk diubah`,
      });
    }
  }

  static deleteTodo(req, res) {
    let { id } = req.params;
    let authorizedTodos = req.authorizedTodos.map((todo) => todo.dataValues),
      todo = authorizedTodos.find((todo) => todo.id === +id);
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
          res.status(500).json(err);
        });
    } else {
      res.status(404).json({
        message: `tidak ditemukan todo dengan id ${id} atau todo tersebut tidak terautorisasi untuk dihapus`,
      });
    }
  }
}

module.exports = todoController;
