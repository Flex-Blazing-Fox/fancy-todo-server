const TodoController = require('../controller/todoController')

const router = require('express').Router()

router.get('/', TodoController.readAll)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.readDetail)
router.put('/:id', TodoController.updateAll)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.delete)

module.exports = router