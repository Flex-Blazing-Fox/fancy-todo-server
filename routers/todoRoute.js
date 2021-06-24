const todo = require('../controllers/todoController');
const router = require('express').Router();

router.get('/',todo.listTodo)
router.get('/:id',todo.listTodo_Id)
router.post('/',todo.addTodo)
router.get('/:id',todo.deleteTodo)
router.put('/:id',todo.putTodo)

module.exports = router