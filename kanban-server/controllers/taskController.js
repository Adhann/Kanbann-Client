const { Task, User } = require('../models/')


class TaskController {
  static getAllTask(req, res, next) {
    Task.findAll({
      order: [ ['createdAt', 'ASC'] ],
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    })
    .then((data) => {
      res.status(200).json(data)  
    })
    .catch((err) => {
      next(err)
    })
  }

  static createTask(req, res, next) {
    const { title, category } = req.body
    const UserId = +req.decoded.id 

    Task.create({ title, category, UserId })
    .then((newTask) => {
      res.status(201).json(newTask)
    }).catch((err) => {
      next(err)
    })
  }

  static getTaskById(req, res, next){
    const id = +req.params.id
    Task.findByPk(id)
    .then((task) => {
      res.status(200).json(task)  
    })
    .catch((err) => {
      next(err)
    })
  }

  static updateTask(req, res, next) {
    const id = +req.params.id
    const { title, category } = req.body
    const options = {
      where: {
        id
      },
      returning: true
    }
    Task.update({ title, category }, options)
    .then((task) => {
      res.status(200).json(task[1][0])
    }).catch((err) => {
      next(err)
    })
  }

  static updateCategory(req, res, next){
    const id = +req.params.id
    const { category } = req.body
    const options = { 
      where: { 
        id 
      },
      returning: true
    }
    Task.update({ category }, options)
    .then((task) => {
      res.status(200).json(task[1][0])
    }).catch((err) => {
      next(err)
    })
  }

  static deleteTask(req, res, next){
    const id = +req.params.id
    Task.destroy({
      where: {
        id
      }
    })
    .then((task) => {
      res.status(200).json({ message : 'Task success to delete'})
    }).catch((err) => {
      next(err)
    })
  }
}

module.exports = TaskController