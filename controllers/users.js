const User = require('../models/user');

// возврат всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err.message));
};

// возврат пользователя по _id
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err.message));
};

// создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err.message));
};

// обновление профиля
module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { runValidators: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err.message));
};

// обновление аватара
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body.avatar, { runValidators: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err.message));
};
