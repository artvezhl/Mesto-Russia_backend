const Card = require('../models/card');

// возврат всех карточек
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// создание карточки
module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.send(newCard);
  } catch (err) {
    if (err.errors.name && err.errors.link) {
      res.status(400).send({ message: "Поля 'Имя' и 'Ссылка' не являются валидными!" });
      return;
    }
    if (err.errors.name) {
      res.status(400).send({ message: "Поле 'Имя' не является валидным!" });
      return;
    }
    if (err.errors.link) {
      res.status(400).send({ message: "Поле 'link' не является валидным!" });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// удаление карточки
module.exports.removeCard = async (req, res) => {
  try {
    const cardToRemove = await Card.findByIdAndRemove(req.params.cardId);
    res.send(cardToRemove);
  } catch (err) {
    if (err.value) {
      res.status(404).send({ message: `Карточка с номером ${err.value} отсутствует!` });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// постановка лайка карточки
module.exports.likeCard = async (req, res) => {
  try {
    const cardToLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    res.send(cardToLike);
  } catch (err) {
    if (err.value) {
      res.status(404).send({ message: `Карточка с номером ${err.value} отсутствует!` });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// снятие лайка карточки
module.exports.dislikeCard = async (req, res) => {
  try {
    const cardToDislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    res.send(cardToDislike);
  } catch (err) {
    if (err.value) {
      res.status(404).send({ message: `Карточка с номером ${err.value} отсутствует!` });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
