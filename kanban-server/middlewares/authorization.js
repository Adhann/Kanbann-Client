const { Task } = require('../models/')

const authorization = (req, res, next) => {
  const id = +req.params.id
  if (!id) {
    res.status(400).json({ errors: 'Invalid Input'})
  } else {
    Task.findByPk(id)
    .then((data) => {
      if(!data) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}
      if (data.UserId === req.decoded.id) {
        next()
      } else {
        throw { name: 'Error401', status: 401, msg: 'Access denied, you not authorized !!'}
      }
    })
    .catch((err) => {
      next(err)
    });
  }
}

module.exports = authorization