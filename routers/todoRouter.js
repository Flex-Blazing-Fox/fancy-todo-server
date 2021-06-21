const TodoController = require('../controllers/todoController')

const router = require('express').Router()

router.get('/', TodoController.getAll)
router.post('/', TodoController.addTodos)
router.get('/:id', TodoController.findById)
router.put('/:id', TodoController.updateTodos)
router.patch('/:id', TodoController.statusUpdate)
router.delete('/:id', TodoController.deleteTodos)

module.exports = router