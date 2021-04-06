const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TaskController.getAllTask)
router.post('/', TaskController.createTask)

router.use('/:id', authorization)
router.get('/:id', TaskController.getTaskById)
router.put('/:id', TaskController.updateTask)
router.patch('/:id', TaskController.updateCategory)
router.delete('/:id', TaskController.deleteTask)

module.exports = router