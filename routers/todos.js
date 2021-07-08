const express = require('express')
const TodosController = require('../controllers/TodosController')
const todosRouter = express.Router()
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')

todosRouter.use(authenticate)

todosRouter.get('/', TodosController.getTodos)

todosRouter.post('/', TodosController.postTodo)

todosRouter.get('/:id', authorization, TodosController.getTodo)

todosRouter.put('/:id', authorization, TodosController.putTodo)

todosRouter.patch('/:id', authorization, TodosController.patchTodo)

todosRouter.delete('/:id', authorization, TodosController.deleteTodo)

module.exports = todosRouter
