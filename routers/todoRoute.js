const todo = require('../controllers/todoController');
const router = require('express').Router();

router.get('/',todo.listTodo)
router.get('/:id',todo.listTodo_Id)
router.post('/',todo.addTodo)
router.get('/:id',todo.deleteTodo)
router.get('/:id',todo.deleteTodo)
router.get('/:id',todo.deleteTodo)

module.exports = router