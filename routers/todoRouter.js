const router = require("express").Router();
const TodoController = require("../controllers/todoController");

router.get("/:id", TodoController.getTodo);
router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.createTodo);
router.patch("/:id", TodoController.updateTodoValue);
router.put("/:id", TodoController.updateTodoRecord);
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
