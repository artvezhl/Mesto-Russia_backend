const User = require('../models/user');

// TODO убрать если не понадобится
const urlRegex = /((https?|http)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)(\w+|\.|\-|\/|\?|\=|\&)*/;


// возврат всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};

// возврат пользователя по _id
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};

// создание нового пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  // TODO убрать консоль если не понадобится
  // console.log('TEST HERE', avatar.match(urlRegex));

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500, { Error: 'Ошибка сервера' }))
};

module.exports = {
  getUsers,
  getUser,
  createUser
};