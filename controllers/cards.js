const Card = require('../models/card');

// возврат всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(err.message));
}

// создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      return res.send({data: card});
    })
    .catch(err => res.status(500).send(err.message));
}

// удаление карточки
module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(err.message))
}

// постановка лайка карточки
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
    {new: true},
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(err.message))
}

// снятие лайка карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}}, // убрать _id из массива
    {new: true},
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(err.message))
}
