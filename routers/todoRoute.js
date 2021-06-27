const todo = require('../controllers/todoController');
const { author } = require('../helpers/auth');
const router = require('express').Router();
router.get('/',todo.listTodo)
router.get('/:id',author,todo.listTodo_Id)
router.post('/',todo.addTodo)
router.get('/:id',author,todo.deleteTodo)
router.put('/:id',author,todo.putTodo)
router.patch('/:id',author,todo.patchTodo)

module.exports = router