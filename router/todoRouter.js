const TodoController = require('../controller/todoController')
const { authorization } = require('../middleware/auth')

const router = require('express').Router()

router.get('/', TodoController.readAll)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.readDetail)
router.put('/:id', authorization, TodoController.updateAll)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router