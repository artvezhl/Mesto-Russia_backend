const User = require('../models/user');

// TODO Fix validation (return errorMessages)

// возврат всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};

// возврат пользователя по _id
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};

// создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};