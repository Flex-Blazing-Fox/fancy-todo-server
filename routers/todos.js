const express = require( 'express')
const TodosController = require( '../controllers/TodosController')

const todosRouter = express.Router()

todosRouter.post('/', TodosController.postTodo)

todosRouter.get('/', TodosController.getTodos)

todosRouter.get('/:id', TodosController.getTodo)

todosRouter.put('/:id', TodosController.putTodo)

todosRouter.patch('/:id', TodosController.patchTodo)

todosRouter.delete('/:id', TodosController.deleteTodo)

module.exports = todosRouter