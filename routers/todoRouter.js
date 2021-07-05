const router = require("express").Router();
const TodoController = require("../controllers/todoController");
const authorize = require("../middlewares/todoAuthorization");

router.get("/:id", authorize, TodoController.getTodo);
router.get("/", authorize, TodoController.getAllTodos);
router.post("/", TodoController.createTodo);
router.patch("/:id", authorize, TodoController.updateTodoValue);
router.put("/:id", authorize, TodoController.updateTodoRecord);
router.delete("/:id", authorize, TodoController.deleteTodo);

module.exports = router;
