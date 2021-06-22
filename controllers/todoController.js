const { Todo } = require("../models");

class todoController {
  static getAllTodos(req, res) {
    Todo.findAll()
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => res.status(500).json(err));
  }
  static getTodo(req, res) {
    let { id } = req.params;
    Todo.findOne({
      where: {
        id: +id,
      },
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
  static createTodo(req, res) {
    let { title, description, status, due_date } = req.body;
    Todo.create(
      {
        title,
        description,
        status,
        due_date,
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
    let { id } = req.params;
    Todo.update(req.body, {
      where: {
        id: +id,
      },
      returning: true,
    })
      .then((result) => {
        if (result[0] != 0) {
          res.status(200).json(result[1]);
        } else {
          res.status(404).json({ message: `Record with id ${id} not found` });
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).json(err);
        } else {
          res.status(500).json(err);
        }
      });
  }
  static updateTodoRecord(req, res) {
    let { id } = req.params;
    const keys = ["title", "description", "status", "due_date"];
    let hasAllKeys = keys.every((item) => req.body.hasOwnProperty(item));
    if (!hasAllKeys) {
      res.status(400).json({
        message: `All data (title, description, status, and due date) must be provided. Use patch instead.`,
      });
    } else {
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
        .then((result) => {
          if (result[0] != 0) {
            res.status(200).json(result[1]);
          } else if (result[0] == 0) {
            res.status(404).json({ message: `Record with id ${id} not found` });
          }
        })
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            res.status(400).json(err);
          } else {
            res.status(500).json(err);
          }
        });
    }
  }
  static deleteTodo(req, res) {
    let { id } = req.params;
    Todo.destroy({
      where: {
        id: +id,
      },
      returning: true,
    })
      .then((result) => {
        if (result != 0) {
          res.status(200).json({message: `Record with id ${id} successfully deleted`});
        } else if (result == 0) {
          res.status(404).json({ message: `Record with id ${id} not found` });
        }
      })
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = todoController;
