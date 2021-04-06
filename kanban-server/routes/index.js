const router = require('express').Router()
const taskRouter = require('./task')
const userRouter = require('./user')

// route.use('/', (req, res) => {
//   res.send('yey')
// })
router.use('/tasks', taskRouter)
router.use('/users', userRouter)

module.exports = router